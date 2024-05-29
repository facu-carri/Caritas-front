/* eslint-disable @typescript-eslint/no-explicit-any */
import { postData } from "src/utils/request/httpRequests";
import GenericForm, { FormField } from "../GenericForm";
import { endPoints } from "src/utils/constants";
import { useState } from "react";
import { ErrorCode } from "src/utils/Error/ErrorCode";
import { ErrorTypes } from "src/utils/Error/ErrorTypes";
import { useCustomModal } from "src/context/CustomModalContext";
import { AgregarFilialProps } from "src/types/PropsTypes";
import { LocationResponse } from "src/types/Types";
import { useQueryClient } from "react-query";

// Componente de Registro de Ayudante
export default function AgregarFilialModal({ geoPosition, handleSuccess }: AgregarFilialProps) {

  const [error, setError] = useState<ErrorCode>(null)
  const { closeModal } = useCustomModal()

  const queryClient = useQueryClient()

  const handleError = (errCode: number) => {
    const err = new ErrorCode(errCode, ErrorTypes.FILIALES_ERROR)
    setError(err)
    setTimeout(hiddeError, 5000)
  }

  const hiddeError = () => {
    setError(null)
  }

  const handleRegister = (data: LocationResponse) => {
    data.coordinates = JSON.stringify(geoPosition)
    postData(endPoints.location, null, data)
      .then((responseData) => handleSuccess(responseData))
      .then(() => closeModal())
      .then(() => queryClient.invalidateQueries(['location']))
      .catch((errCode: number) => handleError(errCode))
  }

  const campos: Array<FormField> = [
    { nombre: 'Nombre', value:'', etiqueta: 'name', tipo: 'text' }
  ]

  return <GenericForm id="agregar-filial-modal" campos={campos} listener={handleRegister} error={error} />;
}
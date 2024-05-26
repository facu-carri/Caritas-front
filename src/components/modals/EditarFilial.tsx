/* eslint-disable @typescript-eslint/no-explicit-any */
import { putData } from "src/utils/request/httpRequests";
import GenericForm, { FormField } from "../GenericForm";
import { endPoints } from "src/utils/constants";
import { useState } from "react";
import { ErrorCode } from "src/utils/Error/ErrorCode";
import { ErrorTypes } from "src/utils/Error/ErrorTypes";
import { useCustomModal } from "src/context/CustomModalContext";
import { EditarFilialProps } from "src/types/PropsTypes";
import { LocationFields } from "src/types/Types";

// Componente de Registro de Ayudante
export default function EditarFilialModal({ location, handleSuccess }: EditarFilialProps) {

  const [error, setError] = useState<ErrorCode>(null)
  const { closeModal } = useCustomModal()

  const handleError = (errCode: number) => {
    const err = new ErrorCode(errCode, ErrorTypes.REGISTER_HELPER_ERROR)
    setError(err)
    setTimeout(hiddeError, 5000)
  }

  const hiddeError = () => {
    setError(null)
  }

    const handleRegister = (data: LocationFields) => {
        const newLocation = Object.assign(location, data)
        putData(endPoints.location + `/${location.id}`, null, newLocation)
        .then((responseData) => handleSuccess(responseData))
        .then(() => closeModal())
        .catch((errCode: number) => handleError(errCode))
  }

  const campos: Array<FormField> = [
    { nombre: 'Descripcion', value:location.description, etiqueta: 'description', tipo: 'text' }
  ]

  return <GenericForm id="agregar-filial-modal" campos={campos} listener={handleRegister} error={error} btnText="Editar" />;
}
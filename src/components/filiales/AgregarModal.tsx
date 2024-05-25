/* eslint-disable @typescript-eslint/no-explicit-any */
import { postData } from "src/utils/request/httpRequests";
import GenericForm, { FormField } from "../GenericForm";
import { endPoints } from "src/utils/constants";
import { useState } from "react";
import { ErrorCode } from "src/utils/Error/ErrorCode";
import { ErrorTypes } from "src/utils/Error/ErrorTypes";

type LocationType = {
  coordinates: string,
  description: string,
}

// Componente de Registro de Ayudante
export default function AgregarFilialModal({modalId}) {

  const [error, setError] = useState<ErrorCode>(null)
  
  const closeModal = () => {
    const elem = modalId && (document.getElementById(modalId) as HTMLDialogElement)
    elem?.close()
  }

  const handleError = (errCode: number) => {
    const err = new ErrorCode(errCode, ErrorTypes.REGISTER_HELPER_ERROR)
    setError(err)
    setTimeout(hiddeError, 5000)
  }

  const hiddeError = () => {
    setError(null)
  }

  const handleRegister = (data: LocationType) => {
    postData(endPoints.location, null, data)
      .then(() => closeModal())
      .catch((errCode: number) => handleError(errCode))
  }

  const campos: Array<FormField> = [
    { nombre: 'Coordenadas', etiqueta: 'coordinates', tipo: 'text' },
    { nombre: 'Descripcion', etiqueta: 'description', tipo: 'text' },
  ]

  return <GenericForm id="agregar-filial-modal" campos={campos} listener={handleRegister} error={error} />;
}
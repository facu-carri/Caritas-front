/* eslint-disable @typescript-eslint/no-explicit-any */
import { postData } from "src/libs/request/httpRequests";
import GenericForm, { FormField } from "../GenericForm";
import { endPoints } from "src/libs/constants";
import { useState } from "react";
import { ErrorCode } from "src/libs/Error/ErrorCode";
import { ErrorTypes } from "src/libs/Error/ErrorTypes";

type LocationType = {
  coordenadas: string,
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
    { nombre: 'Coordenadas', etiqueta: 'coordenadas', tipo: 'text' },
    { nombre: 'Descripcion', etiqueta: 'description', tipo: 'text' },
  ]

  return <GenericForm campos={campos} listener={handleRegister} error={error} />;
}
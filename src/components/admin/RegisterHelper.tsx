/* eslint-disable @typescript-eslint/no-explicit-any */
import { postData } from "src/libs/request/httpRequests";
import GenericForm, { FormField } from "../GenericForm";
import { endPoints } from "src/libs/constants";
import { useState } from "react";
import { ErrorCode } from "src/libs/Error/ErrorCode";
import { ErrorTypes } from "src/libs/Error/ErrorTypes";

type Type = {
  photo: string,
  name: string,
  dni: string,
  phone: string,
  email: string,
  password: string,
  helperLocation: string
}

// Componente de Registro de Ayudante
export default function RegisterHelper({modalId}) {

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

  const handleRegister = (data: Type) => {
    postData(endPoints.registerHelper, null, data)
      .catch((errCode: number) => handleError(errCode))
      .then(() => closeModal())
  }

  const campos: Array<FormField> = [
    { nombre: 'Foto', etiqueta: 'photo', tipo: 'file'},
    { nombre: 'Nombre', etiqueta: 'name', tipo: 'text' },
    { nombre: 'DNI', etiqueta: 'dni', tipo: 'text' },
    { nombre: 'Teléfono', etiqueta: 'phone', tipo: 'tel' },
    { nombre: 'Email', etiqueta: 'email', tipo: 'email' },
    { nombre: 'Contraseña', etiqueta: 'password', tipo: 'password' },
    { nombre: 'Sede Asignada', etiqueta: 'helperLocation', tipo: 'text' },
  ]

  return <GenericForm campos={campos} listener={handleRegister} error={error} />;
}
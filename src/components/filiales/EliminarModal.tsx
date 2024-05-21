/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getData, postData } from "src/libs/request/httpRequests";
import GenericForm, { FormField, ListItem } from "../GenericForm";
import { endPoints } from "src/libs/constants";
import { useEffect, useState } from "react";
import { ErrorCode } from "src/libs/Error/ErrorCode";
import { ErrorTypes } from "src/libs/Error/ErrorTypes";

type Type = {
  filial: string,
}

type Location = {
  id: number,
  coordinates: string,
  description: string
}

// Componente de Registro de Ayudante
export default function EliminarFilialModal({ modalId }) {

  const [error, setError] = useState<ErrorCode>(null)
  
  const closeModal = () => {
    const elem = modalId && (document.getElementById(modalId) as HTMLDialogElement)
    elem?.close()
  }

  const handleError = (errCode: number) => {
    const err = new ErrorCode(errCode, ErrorTypes.FILIALES_ERROR)
    setError(err)
    setTimeout(hiddeError, 5000)
  }

  const hiddeError = () => {
    setError(null)
  }

  const handleRegister = (data: Type) => {
    postData(endPoints.location, null, data)
      .catch((errCode: number) => handleError(errCode))
      .then(() => closeModal())
  }

  const [campos, setCampos] = useState([])

  function generateFields(locations: Location[]): FormField[]{
    const field:FormField[] = [{ nombre: 'Selecciona una filial', etiqueta: 'filial', tipo: 'list' }]
    const items: ListItem[] = locations.map((location) => ({
      key: location.id,
      value: location.description
    }))
    field[0].items = items
    return field
  }

  useEffect(() => {
    getData(endPoints.location)
      .then((locations: Location[]) => generateFields(locations))
      .then((fields) => setCampos(fields))
      .catch((err) => handleError(err))
  }, [])

  return <>
    {campos && < GenericForm campos={campos} listener={handleRegister} error={error} />}
  </>;
}
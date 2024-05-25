/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { deleteData, getData } from "src/utils/request/httpRequests";
import GenericForm, { FormField, ListItem } from "../GenericForm";
import { endPoints } from "src/utils/constants";
import { useEffect, useState } from "react";
import { ErrorCode } from "src/utils/Error/ErrorCode";
import { ErrorTypes } from "src/utils/Error/ErrorTypes";

type Type = {
  filial: number,
}

export type Location = {
  id: number,
  coordinates: string,
  description: string
}

// Componente de Registro de Ayudante
export default function EliminarFilialModal({ closeModal }) {

  const [error, setError] = useState<ErrorCode>(null)

  const handleError = (errCode: number) => {
    const err = new ErrorCode(errCode, ErrorTypes.FILIALES_ERROR)
    if(errCode == 403) setTimeout(closeModal, 5000)
    setError(err)
    setTimeout(hiddeError, 5000)
  }

  const hiddeError = () => {
    setError(null)
  }

  const handleDelete = (data: Type) => {
    deleteData(`${endPoints.location}/${data?.filial}`, null)
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
    {campos && < GenericForm id="eliminar-filial-modal" campos={campos} listener={handleDelete} error={error} btnText="Eliminar" />}
  </>;
}
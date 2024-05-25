/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { deleteData, getHeaders } from "src/utils/request/httpRequests";
import GenericForm, { FormField, ListItem } from "../GenericForm";
import { endPoints, serverAddress } from "src/utils/constants";
import { useState } from "react";
import { ErrorCode } from "src/utils/Error/ErrorCode";
import { ErrorTypes } from "src/utils/Error/ErrorTypes";
import { useQuery } from "react-query";
import LoadingSpinner from "../LoadingSpinner";

type Type = {
  filial: number,
}

export type Location = {
  id: number,
  coordinates: string,
  description: string
}

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
    const items: ListItem[] = locations.map(location => ({
      key: location.id,
      value: `${location.description} - ${location.coordinates}`
    }))
    return [{ nombre: 'Selecciona una filial', etiqueta: 'filial', tipo: 'list', items }]
  }

  const { isLoading } = useQuery({
    queryKey: ['location'],
    queryFn: () => fetch(`${serverAddress}/location`, {
      method: 'GET',
      headers: getHeaders()
    }).then(r => r.json()),
    onSuccess: (data) => {
      setCampos(generateFields(data))
    }
  })


  return <>
    {
      isLoading || !campos.length ?
      <LoadingSpinner/> :
      <GenericForm id="eliminar-filial-modal" campos={campos} listener={handleDelete} error={error} btnText="Eliminar" />
    }
  </>
}
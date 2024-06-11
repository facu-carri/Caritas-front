/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getData, putData } from "src/utils/request/httpRequests";
import { endPoints } from "src/utils/constants";
import GenericForm, { FormField } from "src/components/GenericForm";
import { ErrorTypes } from "src/utils/Error/ErrorTypes";
import { ErrorCode } from "src/utils/Error/ErrorCode";
import { selectLocations } from "src/components/modals/modalOptions";

export default function EditItemModal({ notificationData, onEditNotification }) {

  const [freeLocations, setFreeLocations] = useState([]);
  const [nextFreeDay, setNextFreeDay] = useState("");
  const [error, setError] = useState<ErrorCode>(null)
  const [campos, setCampos] = useState([])

  const handleError = (errCode: number) => {
    const err = new ErrorCode(errCode, ErrorTypes.EDIT_ITEM_ERROR)
    setError(err)
    setTimeout(hiddeError, 5000)
  }

  const hiddeError = () => setError(null)

  const handleAcceptNotification = (data) => {
    putData(`${endPoints.acceptNotification}/${notificationData.id}`, null, data)
      .then(new_data => {
        console.log(new_data)
        onEditNotification(new_data)
      })
      .catch(err => handleError(err))
  }

  function getDefaultFileds(): Array<FormField> {
    return [
      { nombre: 'Nombre', etiqueta: 'name', value: notificationData.name, tipo: 'text' },
      { nombre: 'Descripcion', etiqueta: 'description', value: notificationData.description, tipo: 'text' },
      { nombre: 'Foto', etiqueta: 'photo', value: '', tipo: 'file', optional:true },
      { nombre: 'Cantidad', etiqueta: 'quantity', value: notificationData.quantity, tipo: 'number' },
    ]
  }

  const handleGetNextDay = (data:string) => {
    console.log("aaaaaaaaaaaaaaaaaaa")
    setNextFreeDay(data)
    getData(endPoints.freeLocations, null, nextFreeDay)
    .then(data => setFreeLocations(data))
    .catch(err => handleError(err))
  }


  useEffect(() => {
    getData(endPoints.nextFreeDay)
    .then(data => handleGetNextDay(data))
    .catch(err => handleError(err))
  }, [])
  useEffect(() => {
    if (!nextFreeDay) return

    getData(endPoints.freeLocations, null, nextFreeDay)
    .then(data => setFreeLocations(data))
    .catch(err => handleError(err))
  }, [nextFreeDay])
  useEffect(() => {
    if(freeLocations.length == 0 || !notificationData) return
    setCampos([...getDefaultFileds(), selectLocations(freeLocations)])
  }, [freeLocations])

  return ( campos && campos.length > 0 &&
    <GenericForm id="register-helper" campos={campos} listener={handleAcceptNotification} error={error} />
  )
}
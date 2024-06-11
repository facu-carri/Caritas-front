/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getData, getHeaders, putData } from "src/utils/request/httpRequests";
import { endPoints, serverAddress } from "src/utils/constants";
import GenericForm from "src/components/GenericForm";
import { ErrorTypes } from "src/utils/Error/ErrorTypes";
import { ErrorCode } from "src/utils/Error/ErrorCode";
import { selectLocations } from "src/components/modals/modalOptions";
import { FormField } from "src/types/PropsTypes";
import { useQuery } from "react-query";

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
    data.date=nextFreeDay
    data.locationId=data.employeeLocationId
    putData(`${endPoints.acceptNotification}/${notificationData.id}`, null, data)
      .then(new_data => {
        console.log(new_data)
        onEditNotification(new_data)
      })
      .catch(err => handleError(err))
  }

  function getDefaultFileds(): Array<FormField> {
    return [
    ]
  }

  const handleGetNextDay = (data:string) => {
    setNextFreeDay(data)
    getData(endPoints.freeLocations+"/"+data)
    .then(data => setFreeLocations(data))
    .catch(err => handleError(err))
  }

  useEffect(() => {
    getData(endPoints.nextFreeDay)
    .then(data => handleGetNextDay(data))
    .catch(err => handleError(err))
  }, [])
  useEffect(() => {
    if(freeLocations.length == 0 || !notificationData) return
    setCampos([...getDefaultFileds(), selectLocations(freeLocations)])
  }, [freeLocations])


  return ( campos && campos.length > 0 && 
    <div>
      <GenericForm id="register-helper" campos={campos} listener={handleAcceptNotification} error={error} >
        <p className="text-sm fond-bold text-black-500 mb-2">Solicitante: {notificationData.hostItem?.owner?.name}</p>
        <p className="text-sm fond-bold text-black-500 mb-2">Item del solicitante: {notificationData.hostItem?.name}</p>
        <p className="text-sm fond-bold text-black-500 mb-2">Tu item: {notificationData.guestItem?.name}</p>
        <p className="text-sm fond-bold text-black-500 mb-2">Cantidad restante de tu item: {notificationData.guestItem?.quantity}</p>
        <p className="text-sm fond-bold text-black-500 mb-2">Categoria: {notificationData.guestItem?.itemCategory?.name}</p>
        <p className="text-sm fond-bold text-black-500 mb-2">La fecha sera: {nextFreeDay}</p>
      </GenericForm>
    </div>
    
  )
}
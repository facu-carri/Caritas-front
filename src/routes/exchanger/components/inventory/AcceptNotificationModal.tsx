/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { FormField } from "src/types/PropsTypes";
import { getData, putData } from "src/utils/request/httpRequests";
import { endPoints } from "src/utils/constants";
import { ErrorTypes } from "src/utils/Error/ErrorTypes";
import { ErrorCode } from "src/utils/Error/ErrorCode";
import GenericForm from "src/components/GenericForm";
import { selectLocations } from "src/components/modals/modalOptions";
import { ExchangeCard } from "../ExchangeCard";
import { useCustomModal } from "src/context/CustomModalContext";

export default function AcceptNotificationModal({ notificationData, onEditNotification }) {

  const [freeLocations, setFreeLocations] = useState([]);
  const [nextFreeDay, setNextFreeDay] = useState("");
  const [error, setError] = useState<ErrorCode>(null)
  const [campos, setCampos] = useState([])
  const { setBlock } = useCustomModal()

  const handleError = (errCode: number) => {
    const err = new ErrorCode(errCode, ErrorTypes.EDIT_ITEM_ERROR)
    setError(err)
    setBlock(false)
    setTimeout(hideError, 5000)
  }

  const hideError = () => setError(null)

  const handleAcceptNotification = (data) => {
    data.date=nextFreeDay
    data.locationId = data.employeeLocationId
    setBlock(true)
    putData(`${endPoints.acceptNotification}/${notificationData.id}`, null, data)
      .then(new_data => {
        onEditNotification(new_data)
      })
      .catch(err => handleError(err))
  }

  function getDefaultFileds(): Array<FormField> {
    return []
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


  return (
    campos && campos.length > 0 && (
      <div>
        <GenericForm id="register-helper" campos={campos} listener={handleAcceptNotification} error={error} hideImg={true}>
          <div className="mb-5">
            <ExchangeCard key={notificationData.id} exchange={{ ...notificationData, date: nextFreeDay }} cancelAnim={true} />
          </div>
        </GenericForm>
      </div>
    )
  )
}
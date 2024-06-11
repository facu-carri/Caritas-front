/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getData, putData } from "src/utils/request/httpRequests";
import { endPoints } from "src/utils/constants";
import GenericForm from "src/components/GenericForm";
import { ErrorTypes } from "src/utils/Error/ErrorTypes";
import { ErrorCode } from "src/utils/Error/ErrorCode";
import { selectLocations } from "src/components/modals/modalOptions";
import { FormField } from "src/types/PropsTypes";

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


  return (
    campos && campos.length > 0 && (
      <div>
        <GenericForm id="register-helper" campos={campos} listener={handleAcceptNotification} error={error}>
          {[
            { label: "Solicitante", value: notificationData.hostItem?.owner?.name },
            { label: "Item del solicitante", value: notificationData.hostItem?.name },
            { label: "Tu item", value: notificationData.guestItem?.name },
            { label: "Cantidad restante de tu item", value: notificationData.guestItem?.quantity },
            { label: "Categoria", value: notificationData.guestItem?.itemCategory?.name },
            { label: "La fecha sera", value: nextFreeDay },
          ].map((item) => (
            <div key={item.label} className="flex items-center mb-2">
              <span key={item.label} className="text-sm font-bold text-gray-500 mr-2">
                {item.label}:
              </span>
              <span className="text-sm font-bold text-gray-500 mr-2">
                {item.value}
              </span>
            </div>
          ))}
        </GenericForm>
      </div>
    )
  );
}
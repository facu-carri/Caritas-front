/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { FormField } from "src/types/PropsTypes";
import { getData, putData } from "src/utils/request/httpRequests";
import { endPoints, routes } from "src/utils/constants";
import { ErrorTypes } from "src/utils/Error/ErrorTypes";
import { ErrorCode } from "src/utils/Error/ErrorCode";
import GenericForm from "src/components/GenericForm";
import { selectLocations } from "src/components/modals/modalOptions";
import Image from "src/components/Image";

export default function AcceptNotificationModal({ notificationData, onEditNotification }) {

  const [freeLocations, setFreeLocations] = useState([]);
  const [nextFreeDay, setNextFreeDay] = useState("");
  const [error, setError] = useState<ErrorCode>(null)
  const [campos, setCampos] = useState([])

  const handleError = (errCode: number) => {
    const err = new ErrorCode(errCode, ErrorTypes.EDIT_ITEM_ERROR)
    setError(err)
    setTimeout(hideError, 5000)
  }

  const hideError = () => setError(null)

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
          <>
          {[
            { label: "Solicitante", value: notificationData.hostItem?.owner?.name, href: `${routes.exchanger.profile}/${notificationData.hostItem.owner.id}` },
            { label: "Item del solicitante", value: notificationData.hostItem?.name, photo: notificationData.hostItem?.photo  },
            { label: "Tu item", value: notificationData.guestItem?.name, photo: notificationData.guestItem?.photo },
            { label: "Cantidad restante de tu item", value: notificationData.guestItem?.quantity },
            { label: "Categoria", value: notificationData.guestItem?.itemCategory?.name },
            { label: "La fecha será", value: nextFreeDay },
          ].map((item) => (
            <div key={item.label} className="flex items-center mb-2">
              <span key={item.label} className="text-sm font-bold text-gray-500 mr-2">
                {item.label}:
              </span>
              <span className={`text-sm font-bold text-gray-500 mr-2 ${item.href ? 'link' : ''}`}>
                {
                  item.href ?
                  <a href={item.href}>
                    {item.value}
                  </a>
                  :
                  <>
                    {item.value}
                  </>
                }
              </span>
              <span>
                <Image photo={item.photo} className="w-16 h-16" />
              </span>
            </div>
          ))}
          </>
        </GenericForm>
      </div>
    )
  );
}
import Image from 'src/components/Image';
import { useMutation } from 'react-query';
import { getHeaders } from 'src/utils/request/httpRequests';
import { useCustomModal } from 'src/context/CustomModalContext';
import { ItemCardProps } from 'src/types/PropsTypes';
import { MouseEvent } from 'src/types/Types';
import { endPoints, routes, serverAddress } from 'src/utils/constants';
import RoutesHandler from 'src/utils/routesHandler';

import { AiOutlineCheck, AiOutlineClose  } from "react-icons/ai";
import AcceptNotificationModal from './inventory/AcceptNotificationModal';
import ConfirmationModal from 'src/components/modals/Confirmation';
import { useState } from 'react';
import SelectItemModal from './SelectItemModal';

export default function BellNotificationCard({ notification }) {
  
  const [ notificationData, setNotificationData ] = useState(notification)
  const { showModal, closeModal } = useCustomModal()
  const { setRoute } = RoutesHandler()

  const onClickOwner = (ev: MouseEvent) => {
    console.log("aaaaaaaaaaa")
    //ev.stopPropagation() //TODO: Que es esto?
    closeModal()
    setRoute(`${routes.exchanger.profile}/${notificationData.hostItem.owner?.id}`)
  }

  const confirmation = (fn) => showModal(<ConfirmationModal onAccept={fn}/>)

  const onClickAccept = () => {
    showModal(
      <AcceptNotificationModal
        notificationData={notification}
        onEditNotification={(data) => {
          setNotificationData({ ...notificationData, ...data });
          //queryInvalidator(); TODO: Que es esto
          closeModal();
        }}
      />
    )
  }

  const { mutate: acceptNotification } = useMutation({
    mutationFn: () => fetch(`${serverAddress}/${endPoints.acceptNotification}/${notification.id}`, {
      method: 'PUT',
      headers: getHeaders()
    }),
    onSuccess: () => {
      //queryInvalidator(); TODO: Que es esto
    }
  })
  
  const { mutate: rejectNotification } = useMutation({
    mutationFn: () => fetch(`${serverAddress}/${endPoints.rejectNotification}/${notification.id}`, {
      method: 'PUT',
      headers: getHeaders()
    }),
    onSuccess: () => {
      //queryInvalidator() TODO: Que es esto?
    }
  })

  return (
    <div className="bg-white p-4 rounded shadow-lg max-w-sm cursor-pointer transform transition-transform duration-200 hover:scale-105">
      <button onClick={onClickOwner} className={`bg-red-500 text-white px-4 py-2 rounded transform transition-transform duration-200 hover:scale-105`}>
        Solicitado por: {notificationData.hostItem.owner.name}
      </button>
      <p className="text-sm text-gray-500 mb-2">Item del solicitante: {notification.hostItem?.name || 'N/A'}</p>
      <p className="text-sm text-gray-500 mb-2">Tu item: {notification.guestItem?.name || 'N/A'}</p>
      <p className="text-sm text-gray-500 mb-2">Cantidad restante de tu item: {notificationData.guestItem?.quantity || 'N/A'}</p>
      <p className="text-sm text-gray-500 mb-2">Categoria: {notification.guestItem?.itemCategory?.name || 'N/A'}</p>
        <div className='flex items-center justify-between'>
        {
          <div className='flex gap-2'>
            <button onClick={onClickAccept} className='btn btn-error'><AiOutlineCheck /></button>
            <button onClick={() => confirmation(rejectNotification)} className='btn btn-error'><AiOutlineClose /></button>
          </div>
        }
      </div>
  </div>
  )
}
import Image from 'src/components/Image';
import { useMutation } from 'react-query';
import { ItemCardProps } from 'src/types/PropsTypes';
import { ExchangerData, MouseEvent } from 'src/types/Types';
import { getHeaders } from 'src/utils/request/httpRequests';
import { useCustomModal } from 'src/context/CustomModalContext';
import { endPoints, routes, serverAddress } from 'src/utils/constants';
import RoutesHandler from 'src/utils/routesHandler';
import EditItemModal from './inventory/EditItemModal';
import ConfirmationModal from 'src/components/modals/Confirmation';
import SelectItemModal from './SelectItemModal';
import { FaRegTrashAlt, FaEdit } from 'react-icons/fa';
import { BiAlarm } from "react-icons/bi";
import { Exchange } from "src/types/Types";
import { BiBellPlus } from "react-icons/bi";
import { useState, useEffect, useMemo } from "react";
import { getData, putData } from "src/utils/request/httpRequests";
import { ErrorTypes } from "src/utils/Error/ErrorTypes";
import { ErrorCode } from 'src/utils/Error/ErrorCode';
import ErrorAlert from 'src/components/ErrorAlert';

//la publicacion particular del producto a intercambiar

export default function ItemCard({ userStars, item, onClick, hiddeOwner, queryInvalidator, hiddeBtns, canDelete, canEdit }: ItemCardProps) {
  
  const [ itemData, setItemData ] = useState(item)
  const { showModal, closeModal } = useCustomModal()
  const { setRoute } = RoutesHandler()
  const [error, setError] = useState<ErrorCode>(null)

  const handleError = (errCode: number) => {
    const err = new ErrorCode(errCode, ErrorTypes.EXCHANGE_ERROR)
    setError(err)
  }

  const onClickOwner = (ev: MouseEvent) => {
    ev.stopPropagation()
    closeModal()
    setRoute(`${routes.exchanger.profile}/${itemData.owner?.id}`)
  }

  const onClickExchange = (ev: MouseEvent) => {
    ev.stopPropagation()
    if(contextUserTieneMenosDe4Estrellas()){
      handleError(666)
    }
    else showModal(<SelectItemModal itemId={item.id} categoryId={item.itemCategory.id} showConfirmation={confirmation} />)
  }

  const onClickEdit = () => {
    showModal(
      <EditItemModal
        itemData={item}
        onEditItem={(data) => {
          setItemData({ ...itemData, ...data });
          queryInvalidator();
          closeModal();
        }}
      />
    )
  }

  const onClickExchangesHistory = () => {
    console.log("onClickExchangesHistory 1")
    setRoute(`${routes.exchanger.exchangesHistory}/${itemData.id}`)
    console.log("onClickExchangesHistory 2")
  }

  const onClickRequestsReceived = () => {
    console.log("onClickRequestsReceived 1")
    setRoute(`${routes.exchanger.requestsReceived}/${itemData.id}`)
    console.log("onClickRequestsReceived 2")
  }
  const { mutate: deleteItem } = useMutation({
    mutationFn: () => fetch(`${serverAddress}/${endPoints.addItem}/${item.id}`, {
      method: 'DELETE',
      headers: getHeaders()
    }),
    onSuccess: () => {
      queryInvalidator()
    }
  })

  const confirmation = (fn) => showModal(<ConfirmationModal onAccept={fn}/>)

  const [exchangeHistory, setExchangeHistory] = useState<Exchange[]>([]);

  const checkThereAreNotRequestsReceived = exchangeHistory.length == 0

  const contextUserTieneMenosDe4Estrellas = () => userStars<4
  
  useEffect(() => {
    //setLoading(true)
    getData(endPoints.requestsReceived+"/"+itemData.id)
      .then(data => setExchangeHistory(data))
      .finally(/*() => setLoading(false)*/)
  }, [/*TODO: QUE SE PONE ACA*/]);

  
  return (
    <div className="bg-white p-4 rounded shadow-lg max-w-sm cursor-pointer transform transition-transform duration-200 hover:scale-105" onClick={onClick}>
      <Image photo={itemData.photo} alt={itemData.name} className="mb-4 w-full rounded shadow-2xl h-64" />
      <h2 className="text-xl font-bold mb-2">{itemData.name}</h2>
      <p className="text-sm text-gray-500 mb-2">Categoria: {itemData.itemCategory.name}</p>
      <p className="text-sm text-gray-500 mb-2">Descripcion: {itemData.description}</p>
      <div className='flex items-center justify-between'>
        { canDelete && <p className="text-sm text-gray-500 mb-2">Cantidad restante: {itemData.quantity}</p>}
      </div>
      <div className='flex gap-2 justify-end'>
          {canEdit && <button className='btn' onClick={onClickEdit}><FaEdit /></button>}
          {canDelete && !canEdit && <button onClick={onClickExchangesHistory} className='btn btn-error'>Historial</button>}
          {canDelete && !canEdit && <button disabled={checkThereAreNotRequestsReceived} onClick={onClickRequestsReceived} className='btn btn-error'>Solicitudes</button>}
          {canDelete && <button onClick={() => confirmation(deleteItem)} className='btn btn-error'><FaRegTrashAlt /></button>}
      </div>
      {
        !hiddeBtns && 
        <div className="flex flex-col items-start">
          {error&&<ErrorAlert show={error!=null}>{error.getMessage()}</ErrorAlert>}
           <button onClick={onClickExchange} className="bg-red-500 text-white px-4 py-2 rounded mb-2 transform transition-transform duration-200 hover:scale-105">
                Intercambiar
              </button>
            <button onClick={onClickOwner} className={`bg-blue-500 ${hiddeOwner && 'hidden'} text-white px-4 py-2 rounded transform transition-transform duration-200 hover:scale-105`}>
              Ver perfil
            </button>
        </div>
      }
    </div>
  )
}
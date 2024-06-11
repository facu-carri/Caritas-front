import { useState } from 'react';
import Image from 'src/components/Image';
import { useMutation } from 'react-query';
import { ItemCardProps } from 'src/types/PropsTypes';
import { MouseEvent } from 'src/types/Types';
import { getHeaders } from 'src/utils/request/httpRequests';
import { useCustomModal } from 'src/context/CustomModalContext';
import { endPoints, routes, serverAddress } from 'src/utils/constants';
import RoutesHandler from 'src/utils/routesHandler';
import EditItemModal from './inventory/EditItemModal';
import ConfirmationModal from 'src/components/modals/Confirmation';
import SelectItemModal from './SelectItemModal';
import { FaRegTrashAlt, FaEdit } from 'react-icons/fa';
//la publicacion particular del producto a intercambiar

export default function ItemCard({ item, onClick, hiddeOwner, queryInvalidator, hiddeBtns, canDelete, canEdit }: ItemCardProps) {
  
  const [ itemData, setItemData ] = useState(item)
  const { showModal, closeModal } = useCustomModal()
  const { setRoute } = RoutesHandler()

  const onClickOwner = (ev: MouseEvent) => {
    ev.stopPropagation()
    closeModal()
    setRoute(`${routes.exchanger.profile}/${itemData.owner?.id}`)
  }

  const onClickExchange = (ev: MouseEvent) => {
    ev.stopPropagation()
    showModal(<SelectItemModal itemId={item.id} categoryId={item.itemCategory.id} showConfirmation={confirmation} />)
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

  return (
    <div className="bg-white p-4 rounded shadow-lg max-w-sm cursor-pointer transform transition-transform duration-200 hover:scale-105" onClick={onClick}>
      <Image photo={itemData.photo} alt={itemData.name} className="mb-4 w-full rounded shadow-2xl max-h-64" />
      <h2 className="text-xl font-bold mb-2">{itemData.name}</h2>
      <p className="text-sm text-gray-500 mb-2">Categoria: {itemData.itemCategory.name}</p>
      <p className="text-sm text-gray-500 mb-2">Descripcion: {itemData.description}</p>
      <div className='flex items-center justify-between'>
        <p className="text-sm text-gray-500 mb-2">Cantidad restante: {itemData.quantity}</p>
        <div className='flex gap-2'>
          {canEdit && <button className='btn' onClick={onClickEdit}><FaEdit /></button>}
          {canDelete && <button onClick={() => confirmation(deleteItem)} className='btn btn-error'><FaRegTrashAlt /></button>}
        </div>
      </div>
      {
        !hiddeBtns && 
        <div className="flex flex-col items-start">
            <button onClick={onClickExchange} className="bg-red-500 text-white px-4 py-2 rounded mb-2 transform transition-transform duration-200 hover:scale-105">
              Intercambiar
            </button>
            <button onClick={onClickOwner} className={`bg-blue-500 ${hiddeOwner && 'hidden'} text-white px-4 py-2 rounded transform transition-transform duration-200 hover:scale-105`}>
              Dueño del item: {itemData.owner.name}
            </button>
        </div>
      }
    </div>
  )
}
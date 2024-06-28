import Image from 'src/components/Image';
import { useMutation } from 'react-query';
import { ItemCardProps } from 'src/types/PropsTypes';
import { ExchangerData, MouseEvent } from 'src/types/Types';
import { getHeaders } from 'src/utils/request/httpRequests';
import { useCustomModal } from 'src/context/CustomModalContext';
import { endPoints, routes, serverAddress } from 'src/utils/constants';
import RoutesHandler from 'src/utils/routesHandler';
import EditItemModal from '../../exchanger/components/inventory/EditItemModal';
import ConfirmationModal from 'src/components/modals/Confirmation';
import SelectItemModal from '../../exchanger/components/SelectItemModal';
import { FaRegTrashAlt, FaEdit } from 'react-icons/fa';
import { BiAlarm } from "react-icons/bi";
import { Exchange } from "src/types/Types";
import { BiBellPlus } from "react-icons/bi";
import { useState, useEffect, useMemo } from "react";
import { getData, putData } from "src/utils/request/httpRequests";

//la publicacion particular del producto a intercambiar

export default function CategoryCard({ category, queryInvalidator }) {
  
  const [ categoryData, setCategoryData ] = useState(category)
  const { showModal, closeModal } = useCustomModal()
  const { setRoute } = RoutesHandler()

  const onClickOwner = (ev: MouseEvent) => {
    ev.stopPropagation()
    closeModal()
    setRoute(`${routes.exchanger.profile}/${categoryData.owner?.id}`)
  }

  const { mutate: deleteCategory } = useMutation({
    mutationFn: () => fetch(`${serverAddress}/${endPoints.itemCategories}/${category.id}`, {
      method: 'DELETE',
      headers: getHeaders()
    }),
    onSuccess: () => {
      queryInvalidator()
    }
  })

  const confirmation = (fn) => showModal(<ConfirmationModal onAccept={fn}/>)
  
  return (
    <div className="bg-white p-4 rounded shadow-lg max-w-sm cursor-pointer transform transition-transform duration-200 hover:scale-105" >
      <h2 className="text-xl font-bold mb-2">{categoryData.name}</h2>
      <p className="text-sm text-gray-500 mb-2">Cantidad de publicaciones con esta categoria: {categoryData.itemsCount}</p>
      <div className='flex gap-2 justify-end'>
          {<button onClick={() => confirmation(deleteCategory)} className='btn btn-error'><FaRegTrashAlt /></button>}
      </div>
    </div>
  )
}
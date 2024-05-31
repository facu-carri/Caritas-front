import Image from 'src/components/Image';
import { useCustomModal } from 'src/context/CustomModalContext';
import { ItemCardProps } from 'src/types/PropsTypes';
import { MouseEvent } from 'src/types/Types';
import { routes } from 'src/utils/constants';
import RoutesHandler from 'src/utils/routesHandler';
//la publicacion particular del producto a intercambiar

export default function ItemCard({ item, onClick, hiddeBtns, hiddeOwner }: ItemCardProps) {
  
  const { photo, name, description, owner, itemCategory, quantity } = item
  const { closeModal } = useCustomModal()
  const { setRoute } = RoutesHandler()

  const onClickOwner = (ev: MouseEvent) => {
    ev.stopPropagation()
    closeModal()
    setRoute(`${routes.exchanger.profile}/${owner?.id}`)
  }

  const onClickExchange = (ev: MouseEvent) => {
    ev.stopPropagation()
    console.log('Intercambiar')
  }

  return (
    <div className="bg-white p-4 rounded shadow-lg max-w-sm cursor-pointer transform transition-transform duration-200 hover:scale-105" onClick={onClick}>
      <Image photo={photo} alt={name} className="mb-4 w-full rounded shadow-2xl" />
      <h2 className="text-xl font-bold mb-2">{name}</h2>
      <p className="text-sm text-gray-500 mb-2">Categoria: {itemCategory.name}</p>
      <p className="text-sm text-gray-500 mb-2">Descripcion: {description}</p>
      <p className="text-sm text-gray-500 mb-2">Cantidad restante: {quantity}</p>
      {
        !hiddeBtns &&
        <div className="flex flex-col items-start">
            <button onClick={onClickExchange} className="bg-red-500 text-white px-4 py-2 rounded mb-2 transform transition-transform duration-200 hover:scale-105">
              Intercambiar
            </button>
            <button onClick={onClickOwner} className={`bg-blue-500 ${hiddeOwner && 'hidden'} text-white px-4 py-2 rounded transform transition-transform duration-200 hover:scale-105`}>
              Dueño del item: {owner.name}
            </button>
        </div>
      }
    </div>
  )
}
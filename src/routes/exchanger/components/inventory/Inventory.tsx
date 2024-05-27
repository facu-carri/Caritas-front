import { useState } from 'react';
import AddItemModal from './AddItemModal';
import { endPoints } from "src/utils/constants";
import { postData } from 'src/utils/request/httpRequests';
import ItemListInventory from '../ItemListInventory';
import { ItemData } from 'src/types/Types';
import { useCustomModal } from 'src/context/CustomModalContext';
import { BsPlus } from 'react-icons/bs';

export default function Inventory() {
    const [newItem, setNewItem] = useState<ItemData>(null)
    const { showModal } = useCustomModal()

    const handleModal = () => showModal(<AddItemModal onClose={handleModal} onAddItem={addItem}/>)
    const addItem = (item:ItemData) => postData(endPoints.addItem, null, item).then((itemData) => setNewItem(itemData))

    return (
        <>
            <ItemListInventory item={newItem} ruta={endPoints.inventory} text='Mi inventario' subText="Consejo: Para intercambiar con un producto tienes que tener un producto de la misma cartegoria cargado"/>
            <button onClick={handleModal} className="absolute top-[100px] right-4 flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-500">
                <BsPlus className='h-4 w-4'/>
                Agregar Item
            </button>
        </>
    )
}

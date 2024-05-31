import { useState } from 'react';
import AddItemModal from './AddItemModal';
import { endPoints } from "src/utils/constants";
import { postData } from 'src/utils/request/httpRequests';
import { ItemData } from 'src/types/Types';
import { useCustomModal } from 'src/context/CustomModalContext';
import { BsPlus } from 'react-icons/bs';
import ExchangerHeader from 'src/components/ExchangerHeader';
import ItemList from '../ItemList';

export default function Inventory() {
    const [newItem, setNewItem] = useState<ItemData>(null)
    const { showModal, closeModal } = useCustomModal()

    const handleModal = () => showModal(<AddItemModal onClose={closeModal} onAddItem={addItem}/>)
    const addItem = (item:ItemData) => postData(endPoints.addItem, null, item).then((itemData) => setNewItem(itemData))

    return (
        <div className="bg-gray-100 min-h-screen">
            <ExchangerHeader title="Mi inventario" text="Ayuda: Para intercambiar con un producto tienes que tener un producto de la misma cartegoria cargado"/>
            <ItemList canEdit={true} item={newItem} ruta={endPoints.inventory}>
                <button onClick={handleModal} className="p-2 flex flex-row items-center space-x-2 px-2 gap-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-500">
                    <BsPlus className='h-4 w-4'/>
                    Agregar Item
                </button>
            </ItemList>
        </div>
    )
}

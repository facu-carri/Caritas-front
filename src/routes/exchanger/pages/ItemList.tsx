/* eslint-disable react-hooks/exhaustive-deps */
import { getData } from "src/utils/request/httpRequests";
import { endPoints } from "src/utils/constants";
import { useEffect, useState } from 'react';
import { ItemCategory, ItemData } from 'src/types/Types';
import ItemCard from '../components/ItemCard';
import ItemModal from '../../../components/modals/Item';
import { useCustomModal } from 'src/context/CustomModalContext';

export default function ItemList({ruta, text, subText}) { // endPoints.exchangeablesProducts
    const [category, setCategory] = useState<string>('');
    const [inventory, setInventory] = useState<ItemData[]>([]);
    const [categories, setCategories] = useState<ItemCategory[]>([]);
    const [currentItem, setCurrentItem] = useState<ItemData>(null)
    const { showModal } = useCustomModal()

    const resetInvetory = (error: number) => error == 404 && setInventory([])
    const resetCategories = () => setCategories([])

    useEffect(() => {
        getData(ruta).then(inventory => setInventory(inventory)).catch(error => resetInvetory(error));
        getData(endPoints.categories).then(categories => setCategories(categories)).catch(() => resetCategories());
    }, [ruta]);

  
    useEffect(() => currentItem && showModal(<ItemModal item={currentItem}/>), [currentItem])

    const getCategories = () => categories.map((cat) => (<option key={cat.id} value={cat.name}>{cat.name}</option>))

    const filteredItems = category ? inventory.filter(item => item.itemCategory.name === category) : inventory

    const getItems = () => filteredItems.map(item => (<ItemCard key={item.id} item={item} onClick={() => setCurrentItem(item)}/>))
  
    return (
        <div className="bg-gray-100 min-h-screen">
            <header className="mt-16 bg-blue-600 text-white p-4 text-center shadow-md">
                <h1 className="text-3xl font-bold">{text}</h1>
                <p className="text-sm">{subText}</p>
            </header>
            <div className="bg-gray-200 py-8 container mx-auto px-4">
                <select className="mb-4 p-2 border border-gray-300 rounded" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Todas las Categorías</option>
                    {
                        categories.length == 0 ? <option value="">No hay categorias cargadas</option> : getCategories()
                    }
                </select>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {
                        filteredItems.length == 0 ? <p className="text-gray-600 dark:text-gray-400 line-clamp-2">No hay elementos</p> : getItems()
                    }
                </div>
            </div>
        </div>
    )
}
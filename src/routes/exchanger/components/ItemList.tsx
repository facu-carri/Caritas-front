/* eslint-disable react-hooks/exhaustive-deps */
import { deleteData, getData, putData } from "src/utils/request/httpRequests";
import { endPoints } from "src/utils/constants";
import { useEffect, useState } from 'react';
import EditItemModal from './inventory/EditItemModal';
import { ItemCategory, ItemData } from "src/types/Types";
import ItemCard from "./ItemCard";
import { ItemListInventoryProps } from "src/types/PropsTypes";
import { useCustomModal } from "src/context/CustomModalContext";

export default function ItemListInventory({ ruta, item, children }: ItemListInventoryProps) {
  const [category, setCategory] = useState('');
  const [inventory, setInventory] = useState<ItemData[]>();
  const [categories, setCategories] = useState<ItemCategory[]>();
  const [selectedItem, setselectedItem] = useState<ItemData>();
  const { showModal, closeModal } = useCustomModal()
  
  const resetInvetory = (error:number) => error == 404 && setInventory([])
  const resetCategories = () => setCategories([])

  useEffect(() => {
    getData(ruta).then(inventory => setInventory(inventory)).catch(error => resetInvetory(error));
    getData(endPoints.categories).then(categories => setCategories(categories)).catch(() => resetCategories());
  }, [ruta]);

  useEffect(() => {
    item && setInventory(inventory.concat(item))
  }, [item])

  const filteredItems = category ? inventory.filter(item => item.itemCategory.name === category) : inventory;

  const getCategories = () => categories.map((cat) => <option key={cat.id} value={cat.name}>{cat.name}</option>)
  const getItemCards = () => filteredItems.map(item => <ItemCard key={item.id} item={item} onClick={() => onClickItem(item)} />)

  const editItem = (item:ItemData) => !selectedItem && putData(`${endPoints.addItem}/${selectedItem?.id}`, null, item).then(res => console.log(res))
  const showEditModal = (item:ItemData) => showModal(<EditItemModal onEditItem={editItem} onDeleteItem={deleteItem} itemData={item}/>)
  
  const deleteItem = () => !selectedItem && deleteData(`${endPoints.addItem}/${selectedItem?.id}`, null).then(() => closeModal())

  const onClickItem = (item:ItemData) => {
    setselectedItem(item)
    showEditModal(item)
  }

  return (
    <div className="bg-gray-200 py-8 container mx-auto px-4 relative">
      <div className="flex flex-row gap-2 mb-4">
        {
            (categories || categories.length == 0) ? 
            <span className="p-2 border rounded-lg">No hay categorias cargadas</span> :
            <select className="p-2 border border-gray-700 rounded-lg" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="default">Todas las Categorías</option>
              {getCategories()}
            </select>
        }
        {children}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {
          (!filteredItems || filteredItems.length == 0) ? 
          <p className="text-gray-400 line-clamp-2">No hay elementos</p> :
          getItemCards()
        }
      </div>
    </div>
  )
}

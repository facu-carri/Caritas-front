/* eslint-disable react-hooks/exhaustive-deps */
import { deleteData, getData, getHeaders, putData } from "src/utils/request/httpRequests";
import { endPoints, serverAddress } from "src/utils/constants";
import { useEffect, useMemo, useState } from 'react';
import EditItemModal from './inventory/EditItemModal';
import { CategoryListParam, ItemCategory, ItemData } from "src/types/Types";
import ItemCard from "./ItemCard";
import { ItemListInventoryProps } from "src/types/PropsTypes";
import { useCustomModal } from "src/context/CustomModalContext";
import ItemModal from "src/components/modals/Item";
import { useMutation, useQuery, useQueryClient } from "react-query";

export default function ItemList({ ruta, inventory, canEdit, children }: ItemListInventoryProps) {
  const [category, setCategory] = useState('');
  const [selectedItem, setselectedItem] = useState<ItemData>();
  const { showModal, closeModal } = useCustomModal()
  
  const queryClient = useQueryClient()


  const { data: categories = [] }: CategoryListParam = useQuery({
    queryKey: ['categories'],
    queryFn: () => fetch(`${serverAddress}/${endPoints.categories}`, {
      method: 'GET',
      headers: getHeaders()
    }).then(r => r.json()),
  })

  const filteredItems = useMemo(() => {
    if(!category) {
      return inventory
    }
    return inventory.filter(item => item.itemCategory.name === category)
  }, [category, inventory])


  const editItem = (item:ItemData) => !selectedItem && putData(`${endPoints.addItem}/${selectedItem?.id}`, null, item).then(res => console.log(res))
  const showEditModal = (item:ItemData) => showModal(<EditItemModal onEditItem={editItem} onDeleteItem={deleteItem} itemData={item}/>)
  
  const { mutate: deleteItem } = useMutation({
    mutationFn: () => fetch(`${serverAddress}/${endPoints.addItem}/${selectedItem?.id}`, {
      method: 'DELETE',
      headers: getHeaders()
    }),
    onSuccess: () => {
      queryClient.invalidateQueries([ruta])
      closeModal()
    }
  })

  const onClickItem = (item: ItemData) => {
    if (canEdit) {
      setselectedItem(item)
      showEditModal(item) 
    } else {
      showModal(<ItemModal item={item}/>)
    }
  }

  return (
    <div className="bg-gray-200 py-8 container mx-auto px-4 relative">
      <div className="flex flex-row gap-2 mb-4">
        {
            (!categories || categories.length == 0) ? 
            <span className="p-2 border rounded-lg">No hay categorias cargadas</span> :
            <select className="p-2 border border-gray-700 rounded-lg" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="default">Todas las Categorías</option>
              {
                categories?.map(cat =>
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                )
              }
            </select>
        }
        {children}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {
          (!filteredItems || filteredItems.length == 0) ? 
          <p className="text-gray-400 line-clamp-2">No hay productos intercambiables</p> :
          filteredItems.map(item =>
            <ItemCard hiddeBtns={canEdit} key={item.id} item={item} onClick={() => onClickItem(item)} />
          )
        }
      </div>
    </div>
  )
}

/* eslint-disable react-hooks/exhaustive-deps */
import { getData, getHeaders } from "src/utils/request/httpRequests";
import { endPoints, serverAddress } from "src/utils/constants";
import { useEffect, useMemo, useState } from 'react';
import { CategoryListParam, ExchangerData, ItemData } from "src/types/Types";
import ItemCard from "./ItemCard";
import { ItemListInventoryProps } from "src/types/PropsTypes";
import { useCustomModal } from "src/context/CustomModalContext";
import ItemModal from "src/components/modals/Item";
import { useQuery, useQueryClient } from "react-query";
import LoadingSpinner from "src/components/LoadingSpinner";

export default function ItemList({ ruta, inventory, children }: ItemListInventoryProps) {
  const [category, setCategory] = useState('');
  const { showModal } = useCustomModal()
  const queryClient = useQueryClient()
  const [userData, setUserData] = useState<ExchangerData>();

  const getProfile = () => getData(`${endPoints.profile}`).then(userData => setUserData(userData))
  
  useEffect(() => {
    getProfile()
  }, [ruta]);

  const { data: categories = [], isLoading: isLoadingCats }: CategoryListParam = useQuery({
    queryKey: ['categories'],
    queryFn: () => fetch(`${serverAddress}/${endPoints.categories}`, {
      method: 'GET',
      headers: getHeaders()
    }).then(r => r.json()),
  })

  const filteredItems = useMemo(() => {
    if(!category) return inventory
    return inventory.filter(item => item.itemCategory.name === category)
  }, [category, inventory])

  const queryInvalidator = () => queryClient.invalidateQueries([ruta])

  const isInventory = ruta === endPoints.inventory

  const onClickItem = (item: ItemData) => {
    if (!isInventory) showModal(<ItemModal item={item} userStars={userData?.stars}/>)
  }
  
  return (
    <div className="bg-gray-200 py-8 container mx-auto px-4 relative">
      <div className="flex flex-row gap-2 mb-4">
        {
          <select className="p-2 border border-gray-700 rounded-lg" value={category} onChange={e => setCategory(e.target.value)}>
            <option value="">
            {
                isLoadingCats ? 'Cargando categorias...' :
                !categories || categories.length == 0 ? 'No hay categorias cargadas' :
                'Todas las categorías'
            }
            </option>
            {
              categories?.map(cat =><option key={cat.id} value={cat.name}>{cat.name}</option>)
            }
          </select>
        }
        {children}
      </div>
      {!inventory ? <LoadingSpinner className="relative left-1/2 transform -translate-x-1/2" /> :
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {
            ((!filteredItems || filteredItems.length == 0) ?
              <p className="text-gray-400 line-clamp-2">No hay productos intercambiables</p> :
              filteredItems.map(item =>
                <ItemCard
                  key={item.id}
                  userStars={userData?.stars}
                  item={item}
                  canEdit={item.editable && isInventory}
                  canDelete={isInventory}
                  hiddeBtns={true}
                  onClick={() => onClickItem(item)}
                  queryInvalidator={queryInvalidator}
                />
              ))
          }
        </div>
      }
    </div>
  )
}

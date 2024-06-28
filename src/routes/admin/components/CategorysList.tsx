/* eslint-disable react-hooks/exhaustive-deps */
import { getData, getHeaders } from "src/utils/request/httpRequests";
import { endPoints, serverAddress } from "src/utils/constants";
import { useEffect, useMemo, useState } from 'react';
import { CategoryListParam, ExchangerData, ItemData } from "src/types/Types";
import CategoryCard from "./CategoryCard";
import { useCustomModal } from "src/context/CustomModalContext";
import ItemModal from "src/components/modals/Item";
import { useQuery, useQueryClient } from "react-query";
import LoadingSpinner from "src/components/LoadingSpinner";

export default function CategorysList({children}) {
  const [category, setCategory] = useState('');
  const { showModal } = useCustomModal()
  const queryClient = useQueryClient()

  const { data: categories = [], isLoading: isLoadingCats }: CategoryListParam = useQuery({
    queryKey: ['categories'],
    queryFn: () => fetch(`${serverAddress}/${endPoints.itemCategories}`, {
      method: 'GET',
      headers: getHeaders()
    }).then(r => r.json()),
  })

  const queryInvalidator = () => queryClient.invalidateQueries([]) // Que es esto?
  
  return (
    <div className="bg-gray-200 py-8 container mx-auto px-4 relative">
      <div className="flex flex-row gap-2 mb-4">
        {children}
      </div>
      {!categories ? <LoadingSpinner className="relative left-1/2 transform -translate-x-1/2" /> :
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {
            ((!categories || categories.length == 0) ?
              <p className="text-gray-400 line-clamp-2">No hay categorias</p> :
              categories.map(category =>
                <CategoryCard
                  key={category.id}
                  category={category}
                  queryInvalidator={queryInvalidator} // Que es esto?
                />
              ))
          }
        </div>
      }
    </div>
  )
}

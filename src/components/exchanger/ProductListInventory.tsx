/* eslint-disable react-hooks/exhaustive-deps */
import ProductCard from './ProductCard';
import { deleteData, getData, putData } from "src/libs/request/httpRequests";
import { endPoints } from "src/libs/constants";
import { useEffect, useState } from 'react';
import EditItemModal from './inventory/EditItemModal';
// TODO: Juntarlo con lo del Profiles 
export type ItemData = {
  id: number
  photo: string
  name: string
  description: string
  owner: UserData
  itemCategory: ItemCategory
  quantity:number
}
type UserData = {
  id: number,
  name: string,
  email: string, 
  dni: string,
  phone: string, 
  photo: string,
  stars: number,
  absentees: number,
}
type ItemCategory = {
  id: number
  name: string
}

type Props = {
  ruta: string,
  text: string,
  subText: string,
  item?: ItemData
}

export default function ProductListInventory({ ruta, text, subText, item }: Props) { // endPoints.exchangeablesProducts
  const [category, setCategory] = useState('');
  const [inventory, setInventory] = useState<ItemData[]>();
  const [categories, setCategories] = useState<ItemCategory[]>();
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ItemData>();
  const [userId, setUserId] = useState()
  
  function resetInvetory(error) {
    if(error == 404)
      setInventory([])
  }   
  function resetCategories() {
    // TODO: CHECK ERROR TYPE if(error == 404)
      setCategories([])
  }   
  useEffect(() => {
    getData(ruta)
      .then(inventory => setInventory(inventory))
      .catch(error => resetInvetory(error));
    getData(endPoints.categories)
      .then(categories => setCategories(categories))
      .catch(() => resetCategories());
  }, [ruta]);

  useEffect(() => {
    if (item) {
      setInventory(inventory.concat(item))
    }
  }, [item])

  const filteredProducts = category
    ? inventory.filter(product => product.itemCategory.name === category)
    : inventory;

  function toggleModal(product) {
    setSelectedProduct(product);
    console.log(product)
    setShowModal(prev => !prev);
    if(!userId) {
      getData(endPoints.profile, null)
        .then(res => setUserId(res.id))
    }
  }

  function editItem(item) {
    if(!selectedProduct) return
    putData(`${endPoints.addItem}/${selectedProduct?.id}`, null, item)
      .then(res => console.log(res))
  }

  function deleteItem() {
    if(!selectedProduct) return
    deleteData(`${endPoints.addItem}/${selectedProduct?.id}`, null)
      .then(() => toggleModal({}))
  }

  return (
    <>
      {
        showModal &&
        <EditItemModal
          onClose={()=>toggleModal({})}
          onEditItem={editItem}
          onDeleteItem={deleteItem}
          defaultName={selectedProduct?.name}
          defaultDescription={selectedProduct?.description}
          defaultItemCategoryId={selectedProduct?.itemCategory.id}
          defaultQuantity={selectedProduct?.quantity}
        />
      }
      <div className="bg-gray-100 min-h-screen">
        <header className="bg-blue-600 text-white p-4 text-center shadow-md">
          <div className='mt-16'>
            <h1 className="text-3xl font-bold">{text}</h1>
            <p className="text-sm">{subText}</p>
          </div>
        </header>
        <main className="bg-gray-200 py-8">
          <div className="container mx-auto px-4">
            <div className="mb-4">
              <select
                className="p-2 border border-gray-300 rounded"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Todas las Categorías</option>
                {!(categories)||categories.length==0? 
                    <option value="">No hay categorias cargadas</option>
                :categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {!(filteredProducts)||filteredProducts.length==0? 
                  <div >
                    <p className="text-gray-600 dark:text-gray-400 line-clamp-2">No hay elementos</p>
                  </div>
                : filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} onClick={() => toggleModal(product)} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

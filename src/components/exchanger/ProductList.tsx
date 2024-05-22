import ProductCard from './ProductCard';
import { getData } from "src/libs/request/httpRequests";
import { endPoints } from "src/libs/constants";
import { useEffect, useRef, useState } from 'react';
import ProductModal from './ProductModal';
// TODO: Juntarlo con lo del Profiles 
type ItemData = {
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
function ProductList({ruta, text, subText}) { // endPoints.exchangeablesProducts
  const [category, setCategory] = useState('');
  const [inventory, setInventory] = useState<ItemData[]>();
  const [categories, setCategories] = useState<ItemCategory[]>();
  const [currentProduct, setCurrentProduct] = useState<ItemData>(null)

  function resetInvetory(error){
    if(error == 404)
      setInventory([])
  }   
  function resetCategories(){
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

  const filteredProducts = category
    ? inventory.filter(product => product.itemCategory.name === category)
    : inventory;

  const modalRef = useRef(null)

  const handleClickModal = (ev) => {
    const target = ev ? ev.target : null
    if (target == null || target.id && target.id == modalRef.current.id) {
      modalRef.current.close()
      setCurrentProduct(null)
    }
  }
  
  return (
    <>
    <dialog className="modal bg-gray-500/50" id='editarHelperModal' open={currentProduct != null} onClick={handleClickModal} ref={modalRef}>
      {currentProduct && <ProductModal product={currentProduct} />}
    </dialog>
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
              <ProductCard key={product.id} product={product} onClick={() => setCurrentProduct(product)}/>
            ))}
          </div>
        </div>
      </main>
    </div>
    </>
  );
}

export default ProductList;

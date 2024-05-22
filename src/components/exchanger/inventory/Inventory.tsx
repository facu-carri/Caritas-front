import { useState } from 'react';
import AddItemModal from './AddItemModal';
import { ProductType } from './ProductType';
import ProductList from "src/components/exchanger/ProductList";
import { endPoints } from "src/libs/constants";
import { postData } from 'src/libs/request/httpRequests';

function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

export default function Inventory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<ProductType[]>();
  const [showModal, setShowModal] = useState(false)

  const handleModal = () => {
    setShowModal(!showModal)
  };

  const addItem = (item:ProductType) => {
    //setProducts(products.concat(item))
    postData(endPoints.addItem, null, item)
  }

  return (
    <>
      <div className="relative">
        {showModal && <AddItemModal onClose={handleModal} onAddItem={addItem} />}
        <ProductList ruta={endPoints.inventory} text='Mi inventario' subText="Consejo: Para intercambiar con un producto tienes que tener un producto de la misma cartegoria cargado"/>
        <button
          onClick={handleModal}
          className="absolute top-[100px] right-4 flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-500"
        >
          <PlusIcon className="h-4 w-4" />
          <span>Agregar Item</span>
        </button>
      </div>
    </>
  );
}

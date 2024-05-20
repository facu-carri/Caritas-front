import { useState } from 'react';
import AddItemModal from './AddItemModal';

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
  const [products, setProducts] = useState(bruteProducts);
  const [showModal, setShowModal] = useState(false)

  const handleModal = () => {
    setShowModal(!showModal)
  };

  const addItem = (item) => {
    setProducts(products.concat(item))
  }

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query)
    );
    setProducts(filtered);
  };

  return (
  <div className='mt-16'>
    {showModal && <AddItemModal onClose={handleModal} onAddItem={addItem} />}
    <main className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blue-700">My Inventory</h1>
          <p className="text-blue-500 dark:text-blue-400">Keep track of all the products you own.</p>
        </div>
        <button
          onClick={handleModal}
          className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-500"
        >
          <PlusIcon className="h-4 w-4" />
          <span>Add Item</span>
        </button>
      </div>
      <div className="mb-6">
        <div className="relative">
          <input
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
            placeholder="Search products..."
            type="search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product, index) => (
          <div key={index} className="group flex flex-col h-full overflow-hidden rounded-lg shadow-md bg-gray-100">
            <div className="flex-shrink-0">
              <img
                alt={product.name}
                className="h-60 w-full object-cover"
                src={`https://via.placeholder.com/300x200?text=${product.name}`}
              />
            </div>
            <div className="flex-grow p-4 bg-gray-700">
              <h3 className="text-lg font-semibold dark:text-white truncate">{product.name}</h3>
              <p className="text-sm dark:text-gray-300">{product.description}</p>
            </div>
          </div>
        ))}
      </div>

    </main></div>
  );
}

const bruteProducts = [
  {
    name: 'Smart TV',
    description: '4K resolution for an immersive viewing experience.',
  },
  {
    name: 'Outdoor Grill',
    description: 'Perfect for summer barbecues.',
  },
  {
    name: 'Robotic Vacuum',
    description: 'Effortless floor cleaning.',
  },
];

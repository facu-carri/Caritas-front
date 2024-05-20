import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';

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

function SearchIcon(props) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export default function Component() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleAddItem = () => {
    alert('Add Item button clicked');
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  };

  return (
    <main className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blue-700">My Inventory</h1>
          <p className="text-blue-500 dark:text-blue-400">Keep track of all the products you own.</p>
        </div>
        <button
          onClick={handleAddItem}
          className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-500"
        >
          <PlusIcon className="h-4 w-4" />
          <span>Add Item</span>
        </button>
      </div>
      <div className="mb-6">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-500 dark:text-blue-400" />
          <input
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
            placeholder="Search products..."
            type="search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredProducts.map((product, index) => (
          <div key={index} className="relative group overflow-hidden rounded-lg shadow-md bg-gray-100 dark:bg-gray-800">
            <a className="absolute inset-0 z-10" href="#">
              <span className="sr-only">View</span>
            </a>
            <img
              alt={product.name}
              className="h-60 w-full object-cover"
              src={`https://via.placeholder.com/300x200?text=${product.name}`}
            />
            <div className="bg-white p-4 dark:bg-gray-700">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{product.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{product.description}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

const products = [
  {
    name: 'Wireless Headphones',
    description: 'High-quality sound for your music.',
  },
  {
    name: 'Leather Backpack',
    description: 'Durable and stylish everyday bag.',
  },
  {
    name: 'Smart TV',
    description: '4K resolution for an immersive viewing experience.',
  },
  {
    name: 'Espresso Machine',
    description: 'Brew barista-quality coffee at home.',
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

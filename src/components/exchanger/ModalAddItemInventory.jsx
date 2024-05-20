import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';

function AddItemModal({ isOpen, onClose, onAddItem }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [photoFile, setPhotoFile] = useState(null);

  const handleAddItem = () => {
    if (!name || !description || !photoFile) {
      alert('Por favor, completa todos los campos');
      return;
    }

    // Convert photoFile to a URL
    const photoURL = URL.createObjectURL(photoFile);

    // Call the onAddItem function with the new item data
    onAddItem({ name, description, photoURL });

    // Clear input fields
    setName('');
    setDescription('');
    setPhotoFile(null);

    // Close the modal
    onClose();
  };

  return (
    <div className={`fixed z-10 inset-0 overflow-y-auto ${isOpen ? 'block' : 'hidden'}`}>
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
          <div className="bg-white px-6 py-8">
            <div className="mt-3 text-center sm:mt-0 sm:text-left">
              <h3 className="text-lg font-medium text-gray-900">Agregar Nuevo Artículo</h3>
              <div className="mt-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mt-4">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
                  <textarea
                    id="description"
                    name="description"
                    rows="3"
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <div className="mt-4">
                  <label htmlFor="photoFile" className="block text-sm font-medium text-gray-700">Foto</label>
                  <input
                    type="file"
                    accept="image/*"
                    name="photoFile"
                    id="photoFile"
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    onChange={(e) => setPhotoFile(e.target.files[0])}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={handleAddItem}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Agregar Artículo
            </button>
            <button
              onClick={onClose}
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Inventory() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inventory, setInventory] = useState([]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addItem = (item) => {
    setInventory([...inventory, item]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={openModal}
        className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Agregar Artículo
      </button>

      <AddItemModal isOpen={isModalOpen} onClose={closeModal} onAddItem={addItem} />

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {inventory.map((item, index) => (
          <div key={index} className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">{item.name}</h2>
            <p className="mt-2 text-sm text-gray-600">{item.description}</p>
            <img src={item.photoURL} alt={item.name} className="mt-4 w-full h-40 object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

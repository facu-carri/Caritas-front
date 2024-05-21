import { useState } from "react";
import Input from "../../Input";
import Button from "../../Button";

export default function AddItemModal({ onClose, onAddItem }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [itemCategoryId, setCategory] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [photoFile, setPhotoFile] = useState(null);

  const handleAddItem = () => {
    if (!name || !description || !photoFile|| !itemCategoryId || !quantity)  {
      alert('Por favor, completa todos los campos');
      return;
    }

    // Convert photoFile to a URL
    const photo = URL.createObjectURL(photoFile);

    // Call the onAddItem function with the new item data
    onAddItem({ name, description,itemCategoryId, photo, quantity });

    // Clear input fields
    setName('');
    setDescription('');
    setCategory(0);
    setQuantity(0);
    setPhotoFile(null);

    // Close the modal
    onClose();
  };
  
  return (
    <div className={`fixed z-10 inset-0 overflow-y-auto`}>
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
          <div className="bg-white px-6 py-8">
            <div className="mt-3 text-center sm:mt-0 sm:text-left">
              <h3 className="text-lg font-medium text-gray-900">Agregar Nuevo Artículo</h3>
              <div className="mt-5 flex flex-col gap-4">
                <Input text="Nombre" onChange={(e) => setName(e.target.value)}></Input>
                <Input text="Description" onChange={(e) => setDescription(e.target.value)}></Input>
                <Input file={true} onChange={(e) => setPhotoFile(e.target.files[0])}></Input>
                <Input text="ItemCategory" onChange={(e) => setCategory(parseInt(e.target.value))}></Input>
                <Input text="Cantidad" onChange={(e) => setQuantity(parseInt(e.target.value))}></Input>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-5">
            <Button onClick={handleAddItem}>Agregar Artículo</Button>
            <Button onClick={onClose}>Cancelar</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
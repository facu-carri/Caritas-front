import { useEffect, useState } from "react";
import Input from "../../Input";
import Button from "../../Button";
import { getData } from "src/libs/request/httpRequests";
import { endPoints } from "src/libs/constants";
import { getImageBase64 } from "src/components/GenericForm";
import Trash from "src/icons/Trash";

export default function EditItemModal({ onClose, onEditItem, onDeleteItem, defaultName, defaultDescription, defaultItemCategoryId, defaultQuantity }) {
  const [name, setName] = useState(defaultName);
  const [description, setDescription] = useState(defaultDescription);
  const [itemCategoryId, setItemCategoryId] = useState(defaultItemCategoryId);
  const [quantity, setQuantity] = useState(defaultQuantity);
  const [photoFile, setPhotoFile] = useState(null);

  const [categories, setCategories] = useState([]);

  const handleAddItem = () => {
    console.log(name, description, photoFile, itemCategoryId, quantity)
    if (!name || !description || !photoFile|| !itemCategoryId || !quantity)  {
      alert('Por favor, completa todos los campos');
      return;
    }

    // Convert photoFile to a URL
    getImageBase64(photoFile)
      .then(photo => {
        // Call the onEditItem function with the new item data
        onEditItem({ name, description, itemCategoryId, photo, quantity });

        // Clear input fields
        setName('');
        setDescription('');
        setItemCategoryId(0);
        setQuantity(0);
        setPhotoFile(null);

        // Close the modal
        onClose();
      })
  };

  useEffect(() => {
    getData(endPoints.categories, null)
      .then(data => setCategories(data))
      .catch(err => console.log(err))
  }, [])
  
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
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Editar Artículo</h3>
                <Button onClick={onDeleteItem}><Trash/></Button>
              </div>
              <div className="mt-5 flex flex-col gap-4">
                <Input text="Nombre" onChange={(e) => setName(e.target.value)} value={name}></Input>
                <Input text="Description" onChange={(e) => setDescription(e.target.value)} value={description}></Input>
                <Input file={true} onChange={(e) => setPhotoFile(e.target.files[0])}></Input>
                <select
                  className="select select-bordered w-full max-w-xs"
                  onChange={e => setItemCategoryId(Number(e.target.value))}
                  value={itemCategoryId}
                >
                  <option value="" disabled hidden>Selecciona una opción</option>
                  {
                    categories.map(({ id, name }) => 
                      <option key={id} value={id}>{name}</option>
                    )
                  }
                </select>
                <Input type="number" min="1" text="Cantidad" onChange={(e) => setQuantity(parseInt(e.target.value))} value={quantity}></Input>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-5">
            <Button onClick={handleAddItem}>Aplicar cambios</Button>
            <Button onClick={onClose}>Cancelar</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
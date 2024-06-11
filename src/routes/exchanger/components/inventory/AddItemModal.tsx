import { useEffect, useState } from "react";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import { getData } from "src/utils/request/httpRequests";
import { endPoints } from "src/utils/constants";
import { getImageBase64 } from "src/components/GenericForm";

export default function AddItemModal({ onClose, onAddItem }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [itemCategoryId, setItemCategoryId] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [photoFile, setPhotoFile] = useState(null);

  const [categories, setCategories] = useState([]);

  const handleAddItem = () => {
    if (isDisabled) return;
    getImageBase64(photoFile)
      .then(photo => {
        onAddItem({ name, description, itemCategoryId, photo, quantity });
        onClose();
      })
  };

  useEffect(() => {
    getData(endPoints.categories, null)
      .then(data => setCategories(data))
      .catch(err => console.log(err))
  }, [])

  const validateQty = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) setQuantity(value)
    else setQuantity(1)
  }

  const isDisabled = !name || !description || !photoFile || !itemCategoryId || !quantity;

  return (
    <div className="w-2/5 items-center bg-white rounded-lg overflow-hidden shadow-xl transform transition-all">
      <div className="mt-3 text-center sm:mt-0 sm:text-left bg-white px-6 py-8">
        <h3 className="text-lg font-medium text-gray-900">Agregar Nuevo Artículo</h3>
        <div className="mt-5 flex flex-col gap-4">
          <Input text="Nombre" onChange={(e) => setName(e.target.value)}></Input>
          <Input text="Description" onChange={(e) => setDescription(e.target.value)}></Input>
          <Input file={true} onChange={(e) => setPhotoFile(e.target.files[0])}></Input>
          <select
            className="select select-bordered w-full max-w-xs"
            onChange={e => setItemCategoryId(Number(e.target.value))}
            defaultValue={'default'}
          >
            <option disabled value={'default'}>Selecciona una opción</option>
            {
              categories.map(({ id, name }) => <option key={id} value={id}>{name}</option>)
            }
          </select>
          <Input type="number" min="1" text="Cantidad" value={quantity} onChange={validateQty} />
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-5">
        <Button onClick={handleAddItem} disabled={isDisabled}>Agregar Artículo</Button>
        <Button onClick={onClose}>Cancelar</Button>
      </div>
    </div>
  );
}
/*

SIN USO

import { useEffect, useState } from "react";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import { getData } from "src/utils/request/httpRequests";
import { endPoints } from "src/utils/constants";
import { getImageBase64 } from "src/components/GenericForm";
import Trash from "src/assets/icons/Trash";
import { EditItemModalProps } from "src/types/PropsTypes";
import { useCustomModal } from "src/context/CustomModalContext";

export default function EditItemModal({ onEditItem, onDeleteItem, itemData }: EditItemModalProps) {
  const [name, setName] = useState(itemData.name)
  const [description, setDescription] = useState(itemData.description)
  const [itemCategoryId, setItemCategoryId] = useState(itemData.itemCategory.id)
  const [quantity, setQuantity] = useState(itemData.quantity)
  const [photoFile, setPhotoFile] = useState(null)

  const [categories, setCategories] = useState([]);
  const { closeModal } = useCustomModal()

  const handleAddItem = () => {
    if (!name || !description || !photoFile|| !itemCategoryId || !quantity)  {
      alert('Por favor, completa todos los campos')
      return
    }

    getImageBase64(photoFile)
    .then(photo => {
      const itemObj = { name: name, description: description, itemCategory: {id: itemCategoryId, name: ''}, photo: String(photo), quantity: quantity }
      const newItemData = {...itemData, ...itemObj}
      onEditItem(newItemData)
      closeModal()
    })
  };

  useEffect(() => {
    getData(endPoints.categories, null)
      .then(data => setCategories(data))
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="w-2/5 items-center bg-white rounded-lg overflow-hidden shadow-xl transform transition-all">
      <div className="mt-3 text-center sm:mt-0 sm:text-left bg-white px-6 py-8">
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
            defaultValue={'default'}
          >
            <option disabled value={'default'}>{itemCategoryId}</option>
            {
              categories.map(({ id, name }) => <option key={id} value={id}>{name}</option>)
            }
          </select>
          <Input type="number" min="1" text="Cantidad" onChange={(e) => setQuantity(parseInt(e.target.value) ?? 1)} value={Number.isNaN(quantity) ? 1 : quantity}></Input>
        </div>
      </div>
      {
        false && // preguntar a Cacho
      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-5">
        <Button attrs="!bg-blue-600" onClick={handleAddItem}>Aplicar cambios</Button>
        <Button onClick={closeModal}>Cancelar</Button>
      </div>
      }
    </div>
  );
}*/
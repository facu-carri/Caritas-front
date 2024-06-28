import { useState } from "react";
import Input from "src/components/Input";
import Button from "src/components/Button";

export default function AddCategoryModal({ onClose, onAddItemCategory }) {
  const [name, setName] = useState('');

  const handleAddItem = () => {
    if (isDisabled) return;
    onAddItemCategory({ name });
    onClose();
  };

  const isDisabled = !name ;

  return (
    <div className="w-2/5 items-center bg-white rounded-lg overflow-hidden shadow-xl transform transition-all">
      <div className="mt-3 text-center sm:mt-0 sm:text-left bg-white px-6 py-8">
        <h3 className="text-lg font-medium text-gray-900">Agregar Nueva Categoria</h3>
        <div className="mt-5 flex flex-col gap-4">
          <Input text="Nombre" onChange={(e) => setName(e.target.value)}></Input>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-5">
        <Button onClick={handleAddItem} disabled={isDisabled}>Agregar Categoria</Button>
        <Button onClick={onClose}>Cancelar</Button>
      </div>
    </div>
  );
}
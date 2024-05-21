import { useEffect, useState } from 'react';
import HelpersList from './HelpersList';
import EditHelperModal from '../EditHelperModal';
import { getData } from 'src/libs/request/httpRequests';
import Button from '../Button';
import RegisterHelper from '../admin/RegisterHelper';

//tiene toda la logica de eliminar y editar ayudantes listados y su estado.
export default function HelpersManager() {
  const [helpers, setHelpers] = useState([]);


  const [isEditing, setIsEditing] = useState(false);
  const [currentHelper, setCurrentHelper] = useState(null);

  const handleEdit = (helper) => {
    setCurrentHelper(helper);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    setHelpers(helpers.filter(helper => helper.id !== id));
  };

  const handleSave = (updatedHelper) => {
    setHelpers(helpers.map(helper =>
      helper.id === updatedHelper.id ? updatedHelper : helper
    ));
    setIsEditing(false);
  };

  const handleRegisterHelper = () => {
    const elem = (document.getElementById('registerModal') as HTMLDialogElement)
    elem.showModal()
  }

  return (
  <>
    <dialog className="modal" id='registerModal'>
        <RegisterHelper modalId={'registerModal'} />
    </dialog>
      <div className="min-h-screen bg-gray-100 flex items-center flex-col gap-4 justify-center p-4">
      <Button onClick={handleRegisterHelper} >Registrar ayudante</Button>
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">Listado de Ayudantes</h1>
        <HelpersList helpers={helpers} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
      {isEditing && <EditHelperModal helper={currentHelper} onSave={handleSave} onClose={() => setIsEditing(false)} />}
      </div>
      </>
  );
}
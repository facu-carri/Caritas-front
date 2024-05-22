import { useEffect, useRef, useState } from 'react';
import HelpersList from './HelpersList';
import EditHelperModal from './EditHelperModal';
import Button from '../Button';
import RegisterHelper from '../admin/RegisterHelper';
import { deleteData, getData, putData } from 'src/libs/request/httpRequests';
import { endPoints } from "src/libs/constants";

//tiene toda la logica de eliminar y editar ayudantes listados y su estado.
export default function HelpersManager() {
  const [helpers, setHelpers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentHelper, setCurrentHelper] = useState(null);

  useEffect(() => {
    getData(endPoints.employees)
      .then(data => setHelpers(data));
  }, []);

  const handleEdit = (helper) => {
    setCurrentHelper(helper);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    deleteData(`${endPoints.employees}/${id}`, null)
      .then(() => setHelpers(helpers.filter(helper => helper.id !== id)))
  };

  const handleSave = (updatedHelper) => { // EDIT: usar putData de httpRequests
    putData(`${endPoints.employees}/${updatedHelper.id}`, null, updatedHelper)
      .then(res => console.log(res))
      
    /*setHelpers(helpers.map(helper =>
      helper.id === updatedHelper.id ? updatedHelper : helper
    ));*/
    setIsEditing(false);
  };

  const handleRegisterHelper = () => {
    const elem = (document.getElementById('registerModal') as HTMLDialogElement)
    elem.showModal()
  }

  const modalRef = useRef(null)

  const handleClickModal = (ev) => {
    const target = ev.target
    if(target.id && target.id == modalRef.current.id)  modalRef.current.close()
  }

  return (
  <>
    <dialog className="modal" id='registerModal' onClick={handleClickModal} ref={modalRef}>
        <RegisterHelper modalId={'registerModal'} />
    </dialog>
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 relative">
      <div className="absolute top-1/2 transform -translate-y-1/2 flex flex-col items-center gap-4">
        <Button onClick={handleRegisterHelper}>Registrar ayudante</Button>
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold text-blue-700 mb-4">Listado de Ayudantes</h1>
          <HelpersList helpers={helpers} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
        {isEditing && <EditHelperModal helper={currentHelper} onSave={handleSave} onClose={() => setIsEditing(false)} />}
      </div>
    </div>
  </>
  );
}
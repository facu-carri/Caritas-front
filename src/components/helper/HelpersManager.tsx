import { useEffect, useState } from 'react';
import HelpersList from './HelpersList';
import EditHelperModal from '../EditHelperModal';
import { getData } from 'src/libs/request/httpRequests';

//tiene toda la logica de eliminar y editar ayudantes listados y su estado.
export default function HelpersManager() {
  const [helpers, setHelpers] = useState([]);

  useEffect(() => {
    getData('employee')
      .then(data => setHelpers(data));
  }, []);


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

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">Listado de Ayudantes</h1>
        <HelpersList helpers={helpers} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
      {isEditing && <EditHelperModal helper={currentHelper} onSave={handleSave} onClose={() => setIsEditing(false)} />}
    </div>
  );
}
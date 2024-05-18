import { useState } from 'react';
import HelpersList from './HelpersList';
import EditHelperModal from './EditHelperModal';
//tiene toda la logica de eliminar y editar ayudantes listados y su estado.
const HelpersManager = () => {
  const [helpers, setHelpers] = useState([
    { id: 1, firstName: 'Jose', lastName: 'Gomez', email: 'correoFalso@gmial.com', dni: '43221777', phone: '123-555-444', password: 'AA11B2C37', office: '5' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane@domain.com', dni: '12345678', phone: '987-555-321', password: '123456', office: '3' }
  ]);

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
};

export default HelpersManager;

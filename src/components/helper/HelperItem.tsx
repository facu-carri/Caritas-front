
import { FaUser } from 'react-icons/fa';
//se encarga de representar un ayudante individual con las opciones de editar y eliminar.
const HelperItem = ({ helper, onEdit, onDelete, onSelect }) => {
  return (
    <li className="flex items-center justify-between p-4 border-b border-gray-200">
      <div className="flex items-center">
        <a onClick={() => onSelect(helper.id)}>
          <FaUser className="text-blue-500 mr-2" />
        </a>
        <span className="text-lg text-gray-700">{`${helper.name} ${helper.email}`}</span>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onEdit(helper)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(helper.id)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Eliminar
        </button>
      </div>
    </li>
  );
};

export default HelperItem;

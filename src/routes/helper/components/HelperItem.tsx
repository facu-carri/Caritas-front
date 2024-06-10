
import { FaUser } from 'react-icons/fa';
//se encarga de representar un ayudante individual con las opciones de editar y eliminar.
const HelperItem = ({ helper, onSelect }) => {
  return (
    <li className="flex items-center justify-between p-4 border-b border-gray-200">
      <div className="flex items-center">
        <button
          onClick={() => onSelect(helper.id)}
        >
          <FaUser className="text-blue-500 mr-2 hover:text-blue-700 transition duration-300" />
        </button>
        <span className="text-lg text-gray-700">{`${helper.name} ${helper.email}`}</span>
      </div>
    </li>
  );
};

export default HelperItem;

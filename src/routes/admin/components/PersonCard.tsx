import { routes } from "src/utils/constants";
import RoutesHandler from "src/utils/routesHandler";
/*
type Type = {
  person: ExchangerData
  onEdit: ???
  onDelete: ???
}
*/
export default function PersonCard({ person, onEdit, onDelete }) {

  const { setRoute } = RoutesHandler()
  function handleEdit(e){
    e.stopPropagation();
    onEdit(person)
  }
  function handleDelete(e){
    e.stopPropagation();
    onDelete(person.id)  
  }

  return (
    <div
      className="bg-white rounded-lg shadow-lg max-w-sm cursor-pointer transform transition-transform duration-200 hover:scale-105"
      onClick={() => setRoute(`${routes.exchanger.profile}/${person.id}`)}
    >
      <div className="p-4">
        <h3 className="text-lg font-semibold">{person.name}</h3>
        <p className="text-gray-500 dark:text-gray-400">{person.email}</p>
        <p className="text-gray-500 dark:text-gray-400">{person.phone}</p>
        <p className="text-gray-500 dark:text-gray-400">{person.dni}</p>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={handleEdit}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Editar
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
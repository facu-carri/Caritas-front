
import HelperItem from './HelperItem';
//se encarga de recibir props y renderizar la lista de ayudantes.
const HelpersList = ({ helpers, onEdit, onDelete, onSelect }) => {
  return (
    <div>
      {helpers.length > 0 ? (
        <ul>
          {helpers.map(helper => (
            <HelperItem key={helper.id} helper={helper} onEdit={onEdit} onDelete={onDelete} onSelect={onSelect} />
          ))}
        </ul>
      ) : (
        <p className="text-red-500 text-center">No hay ayudantes registrados en el sistema.</p>
      )}
    </div>
  );
};

export default HelpersList;

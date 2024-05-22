import { FaStar } from 'react-icons/fa';
import { routes } from 'src/libs/constants';
import RoutesHandler from 'src/libs/routesHandler';
//la publicacion particular del producto a intercambiar
function ProductCard({ product }) {
  const { id, photo, name, description, owner, itemCategory, quantity } = product;

  const { setRoute } = RoutesHandler()

  function onClickHandler() {
    setRoute(`${routes.exchanger.profile}/${owner?.id}`)
  }
  return (
    <div className="bg-white p-4 rounded shadow-lg">
      <div className="mb-4">
        <img src={`data:image/jpeg;base64,${photo}`} alt={name} className="w-full rounded" />
      </div>
      <h2 className="text-xl font-bold mb-2">{name}</h2>
      <p className="text-sm text-gray-500 mb-2">ItemCategory: {itemCategory.name}</p>
      <p className="text-sm text-gray-500 mb-2">Description: {description}</p>
      <p className="text-sm text-gray-500 mb-2">Cantidad restante: {quantity}</p>
      <button className="bg-red-500 text-white px-4 py-2 rounded">Intercambiar </button>
      <button onClick={onClickHandler} className="bg-blue-500 text-white px-4 py-2 rounded">Dueño del item: {owner.name}</button>
    </div>
  );
}

export default ProductCard;

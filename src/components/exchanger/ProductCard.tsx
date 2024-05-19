import { FaStar } from 'react-icons/fa';
//la publicacion particular del producto a intercambiar
function ProductCard({ product }) {
  const { name, rating, absences, image } = product;

  return (
    <div className="bg-white p-4 rounded shadow-lg">
      <div className="mb-4">
        <img src={image} alt={name} className="w-full h-auto rounded" />
      </div>
      <h2 className="text-xl font-bold mb-2">{name}</h2>
      <div className="flex items-center mb-2">
        {[...Array(5)].map((_, index) => (
          <FaStar key={index} className={index < rating ? "text-yellow-500" : "text-gray-300"} />
        ))}
      </div>
      <p className="text-sm text-gray-500 mb-2">Inasistencias: {absences}</p>
      <button className="bg-red-500 text-white px-4 py-2 rounded">Intercambiar con el usuario</button>
    </div>
  );
}

export default ProductCard;

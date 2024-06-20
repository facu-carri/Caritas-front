import Image from 'src/components/Image';
import ExchangerCard from 'src/routes/admin/components/ExchangerCard';
import Rating from "src/components/Rating";

export default function ReviewCard({ review }) {
  return (
    <div className="bg-white p-4 rounded shadow-lg max-w-sm cursor-pointer transform transition-transform duration-200 hover:scale-105">
      <p className="text-sm text-gray-500 mb-2">Intercmbiador que hizo la reseña:</p>
      <ExchangerCard cardData={review.producer} removeClick={true} key={review.producer.id} />
      <p className="text-sm text-gray-500 mb-2">Producto puntuado:</p>
      <Image photo={review.itemReciver?.photo} className="mb-4 w-full rounded shadow-2xl max-h-64" />
      <p className="text-sm text-gray-500 mb-2">Estrellas dadas al producto:</p>
      <Rating qty={review.stars}/>
      <p className="text-sm text-gray-500 mb-2">Fecha de la reseña: {review.date}</p>
      <p className="text-sm text-gray-500 mb-2">Reseña: {review.description}</p>

    </div>
  )
}
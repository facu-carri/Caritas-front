import React, { useState } from 'react';

const StarRating = ({ initialRating = 5, onRatingChange }) => {
  const [rating, setRating] = useState(initialRating);

  const handleClick = (index) => {
    setRating(index + 1);
    onRatingChange(index + 1);
  };

  return (
    <div className="rating flex space-x-1 text-3xl">
      {Array(10).fill(null).map((_, index) => (
        <span
          key={index}
          className={`cursor-pointer ${index < rating ? 'text-orange-400' : 'text-gray-300'}`}
          onClick={() => handleClick(index)}
          style={{ fontSize: '1em' }}  // Ajusta el tamaño de la estrella aquí
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default StarRating;

import React from 'react';
import { useNavigate } from 'react-router-dom';

const ParkingCard = ({ id, name, price, rating, description, imageUrl }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/manage-slots`);
  };

  return (
    <div
      className="max-w-sm rounded overflow-hidden shadow-lg bg-white transform transition duration-300 hover:scale-105 hover:bg-gray-100 cursor-pointer"
      onClick={handleClick}
    >
      <img className="w-full h-48 object-cover" src={imageUrl} alt={name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="px-6 pt-4 pb-2 flex justify-between items-center">
        <div>
          <span className="text-gray-900 font-bold text-lg">₹{price}/3hrs</span>
        </div>
        <div className="flex items-center">
          <span className="text-yellow-500">⭐</span>
          <span className="text-gray-700">{rating}/5</span>
        </div>
      </div>
    </div>
  );
};

export default ParkingCard;

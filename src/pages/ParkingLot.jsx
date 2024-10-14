import React from 'react';
import { useParking } from '../context/ParkingContext2';
import ParkingCard from '../components/ParkingCard';
import StarIcon from '../assets/StarIcon.jpg';
import aboutBg from '../assets/aboutBg.jpg'


const ParkingLot = () => {
  const { parkingLots } = useParking();

  return (
    <div className="min-h-screen bg-cover bg-center flex justify-center bg-gray-100" style={{ backgroundImage: `url(${aboutBg})`}}>
      <div className="flex flex-wrap justify-center gap-4 mt-8 h-96">
        {parkingLots.map((lot) => (
        <ParkingCard
          key={lot.id}
          id={lot.id}
          name={lot.name}
          price={lot.price}
          rating={lot.rating}
          description={lot.description}
          imageUrl={StarIcon} // Update this with the correct path
        />
      ))}
      </div>
      
    </div>
  );
};

export default ParkingLot;

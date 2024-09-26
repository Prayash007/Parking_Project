import React from 'react';
import { useParking } from '../context/ParkingContext2';
import ParkingCard from '../components/ParkingCard';
import StarIcon from '../assets/StarIcon.jpg';

const ParkingLot = () => {
  const { parkingLots } = useParking();

  return (
    <div className="flex flex-wrap justify-center gap-4 mt-8">
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
  );
};

export default ParkingLot;

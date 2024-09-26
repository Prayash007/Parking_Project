import React, { createContext, useState, useContext } from 'react';

const ParkingContext2 = createContext();

export const useParking = () => {
  return useContext(ParkingContext2);
};

export const Parking2Provider = ({ children }) => {
  const [parkingLots, setParkingLots] = useState([
    { id: 1, name: 'Downtown Parking', price: 15, rating: 4.5, description: 'Secure downtown parking' },
    { id: 2, name: 'Mall Parking', price: 10, rating: 4.2, description: 'Spacious mall parking' },
    { id: 3, name: 'Downtown Parking', price: 15, rating: 4.5, description: 'Secure downtown parking' }
    // Add more parking lots as needed
  ]);

  return (
    <ParkingContext2.Provider value={{ parkingLots }}>
      {children}
    </ParkingContext2.Provider>
  );
};

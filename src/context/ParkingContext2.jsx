import React, { createContext, useState, useContext } from 'react';

const ParkingContext2 = createContext();

export const useParking = () => {
  return useContext(ParkingContext2);
};

export const Parking2Provider = ({ children }) => {
  const [parkingLots, setParkingLots] = useState([
    { id: 1, name: 'Magneto Mall Parking', price: 150, rating: 4.5, description: 'Secure parking' },
    { id: 2, name: 'Ambuja Mall Parking', price: 100, rating: 4.2, description: 'Spacious parking' },
    { id: 3, name: 'NIT Raipur Parking', price: 150, rating: 4.5, description: 'Secure parking' }
    // Add more parking lots as needed
  ]);

  return (
    <ParkingContext2.Provider value={{ parkingLots }}>
      {children}
    </ParkingContext2.Provider>
  );
};

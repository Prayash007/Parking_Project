import { createContext, useState, useContext } from 'react';

// Create context
const ParkingContext = createContext();

// Parking context provider
export const ParkingProvider = ({ children }) => {
  const [slots, setSlots] = useState([false, true, false, true, false, false]);

  const toggleSlot = (index) => {
    setSlots((prevSlots) => prevSlots.map((slot, i) => (i === index ? !slot : slot)));
  };

  return (
    <ParkingContext.Provider value={{ slots, toggleSlot }}>
      {children}
    </ParkingContext.Provider>
  );
};

// Custom hook for using context
export const useParking = () => {
  return useContext(ParkingContext);
};

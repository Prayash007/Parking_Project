// src/components/ManageSlots.js

import React from 'react';
import { useParking } from '../context/ParkingContext';
import parkingImage from '../assets/parkingImage.png';

const ManageSlots = () => {
  const { slots, toggleSlot } = useParking();

  const handleSlotClick = (index) => {
    if (slots[index]) {
      alert(`Slot ${index + 1} is already booked.`);
    } else {
      toggleSlot(index);
      alert(`Slot ${index + 1} has been successfully booked!`);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <h2 className="text-3xl font-bold text-center mb-6">Parking Lot Management</h2>
      <div
        className="relative bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${parkingImage})`, width: '735px', height: '478px' }} // Match the image size
      >
        {/* Overlay for parking slots */}
        <div className="absolute top-0 left-0 w-full h-full">
          {slots.map((occupied, index) => (
            <div
              key={index}
              style={{
                position: 'absolute',
                top: `${calculateTop(index)}px`, // Calculate top position
                left: `${calculateLeft(index)}px`, // Calculate left position
                width: '65px',  // Adjust to fit each slot on the image
                height: '110px', // Adjust to fit each slot on the image
              }}
            >
              <ParkingSlot
                index={index}
                occupied={occupied}
                onToggle={() => handleSlotClick(index)} // Handle click event
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Parking Slot Component remains unchanged...

const ParkingSlot = ({ index, occupied, onToggle }) => {
  return (
    <div
      onClick={onToggle}
      role="button" // Accessibility improvement
      tabIndex={0} // Make it focusable
      onKeyPress={(e) => { if (e.key === 'Enter') onToggle(); }} // Handle keyboard interaction
      className={`w-full h-full border-4 rounded-lg flex flex-col justify-center items-center cursor-pointer transition duration-300 ${
        occupied ? 'bg-red-500 border-red-700 text-white' : 'bg-green-400 border-green-600'
      }`}
    >
      <p className="font-bold">Slot {index + 1}</p>
      <p>{occupied ? 'Occupied' : 'Available'}</p>
    </div>
  );
};

// Position calculation functions remain unchanged...

const calculateTop = (index) => {
  const positions = [23, 23, 23, 323, 323, 323]; // Example top positions for slots
  return positions[index];
};

const calculateLeft = (index) => {
  const positions = [101, 427, 558, 101, 427, 296]; // Example left positions for slots
  return positions[index];
};

export default ManageSlots;
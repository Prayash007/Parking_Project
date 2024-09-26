import React from 'react';
import { useParking } from '../context/ParkingContext';
import parkingImage from '../assets/parkingImage.jpg'; // Add the path to the uploaded image

const ManageSlots = () => {
  const { slots, toggleSlot } = useParking();

  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <h2 className="text-3xl font-bold text-center mb-6 ">Parking Lot Management</h2>
      <div
        className="relative bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${parkingImage})`, width: '735px', height: '478px' }} // Match the image size
      >

        {/* Overlay for parking slots */}
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Adjust divs positioned according to the parking slots in the image */}
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
                onToggle={() => toggleSlot(index)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Parking Slot Component
const ParkingSlot = ({ index, occupied, onToggle }) => {
  return (
    <div
      onClick={onToggle}
      className={`w-full h-full bg-gray-200 border-4 rounded-lg flex flex-col justify-center items-center cursor-pointer ${
        occupied ? 'bg-red-500 border-red-700 text-white' : 'bg-green-400 border-green-600 '
      } transition duration-300`}
    >
      <p className="font-bold">Slot {index + 1}</p>
      <p className="">{occupied ? 'Occupied' : 'Available'}</p>
    </div>
  );
};

// These functions should return the proper top and left position for each slot
const calculateTop = (index) => {
  // Adjust based on the layout from the image
  const positions = [23,23,23, 323,  323,  323]; // Example top positions
  return positions[index];
};

const calculateLeft = (index) => {
  // Adjust based on the layout from the image
  const positions = [101, 427, 558, 101, 427, 296]; // Example left positions for 6 slots
  return positions[index];
};

export default ManageSlots;

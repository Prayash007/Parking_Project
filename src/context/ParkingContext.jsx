// src/context/ParkingContext.js

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useFirebase } from './FirebaseContext'; // Import your Firebase context

const ParkingContext = createContext();

// Parking context provider
export const ParkingProvider = ({ children }) => {
    const [slots, setSlots] = useState([false, false, false, false, false, false]);
    const timeoutRefs = useRef([]); // Use ref to keep track of timeouts
    const firebase = useFirebase(); // Get the database instance

    // Fetch slots from Firebase on mount
    useEffect(() => {
        const fetchSlots = async (userId) => {
            try {
                const snapshot = await firebase.getData(`users/ ${userId}/parkingSlots/`); // Ensure firebase is not null
                if (snapshot.exists()) {
                    setSlots(snapshot.val());
                } else {
                    console.log("No data available");
                }
            } catch (error) {
                console.error("Error fetching slots:", error);
            }
        };

        fetchSlots();

        // Cleanup function to clear timeouts on unmount
        return () => {
            timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
        };
    }, [firebase]); // Removed db from dependencies

    const toggleSlot = async (index) => {
        if (!slots[index]) { // Only allow booking if the slot is available
            const newSlots = [...slots];
            newSlots[index] = true; // Mark as booked
            
            // Update Firebase
            try {
                await firebase.putData('parkingSlots', newSlots); // Use putData for updating
                setSlots(newSlots); // Update local state
                
            } catch (error) {
                console.error("Error updating slot:", error);
            }
        } else {
            alert(`Slot ${index + 1} is already booked.`);
        }
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
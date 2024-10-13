// src/context/ParkingContext.js

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { ref, set, get } from 'firebase/database';
import { useFirebase } from './FirebaseContext'; // Import your Firebase context

const ParkingContext = createContext();

// Parking context provider
export const ParkingProvider = ({ children }) => {
    const [slots, setSlots] = useState([false, false, false, false, false, false]);
    const timeoutRefs = useRef([]); // Use ref to keep track of timeouts
    const db  = useFirebase(); // Get the database instance

    // Fetch slots from Firebase on mount
    useEffect(() => {
        const fetchSlots = async () => {
            try {
                const snapshot = await get(ref(db, 'parkingSlots'));
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
    }, [db]);

    const toggleSlot = async (index) => {
        if (!slots[index]) { // Only allow booking if the slot is available
            const newSlots = [...slots];
            newSlots[index] = true; // Mark as booked
            
            // Update Firebase
            try {
                await set(ref(db, 'parkingSlots'), newSlots);
                setSlots(newSlots); // Update local state

                // Clear any existing timeout for this slot
                if (timeoutRefs.current[index]) {
                    clearTimeout(timeoutRefs.current[index]);
                }

                // Reset the slot after 1 minute (60000 milliseconds)
                timeoutRefs.current[index] = setTimeout(async () => {
                    newSlots[index] = false; // Mark as available
                    await set(ref(db, 'parkingSlots'), newSlots); // Update Firebase again
                    setSlots(newSlots); // Update local state again
                }, 60000);
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
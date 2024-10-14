// src/components/BookSlotComponent.js
import React, { useState, useEffect } from 'react';
import { BookSlot, getUserBookedSlots } from '../services/ParkingService'; // Ensure getUserBookedSlots is defined in your ParkingService

const BookSlotComponent = () => {
    const [slotId, setSlotId] = useState('');
    const [userId, setUserId] = useState(''); // Assuming userId comes from authentication context
    const [message, setMessage] = useState('');
    const [bookedSlots, setBookedSlots] = useState([]);

    // Fetch booked slots for the current user on component mount
    useEffect(() => {
        const fetchBookedSlots = async () => {
            if (userId) { // Only fetch if userId is available
                try {
                    const slots = await getUserBookedSlots(userId);
                    setBookedSlots(slots);
                } catch (error) {
                    console.error("Error fetching booked slots:", error);
                }
            }
        };

        fetchBookedSlots();
    }, [userId]); // Re-run if userId changes

    const handleBooking = async () => {
        const success = await BookSlot(slotId, userId);
        if (success) {
            setMessage(`Successfully booked slot ${slotId}.`);
            // After booking, refresh the booked slots
            const updatedSlots = await getUserBookedSlots(userId);
            setBookedSlots(updatedSlots);
        } else {
            setMessage(`Failed to book slot ${slotId}.`);
        }
    };

    return (
        <div>
            <h2>Book Parking Slot</h2>
            <input 
                type="text" 
                placeholder="Enter Slot ID" 
                value={slotId} 
                onChange={(e) => setSlotId(e.target.value)} 
            />
            <input 
                type="text" 
                placeholder="Enter User ID" 
                value={userId} 
                onChange={(e) => setUserId(e.target.value)} 
            />
            <button onClick={handleBooking}>Book Slot</button>
            {message && <p>{message}</p>}

            <h3>Your Booked Slots</h3>
            {bookedSlots.length > 0 ? (
                <ul>
                    {bookedSlots.map((slot) => (
                        <li key={slot}>{slot}</li> // Assuming slot is a unique identifier
                    ))}
                </ul>
            ) : (
                <p>No booked slots found.</p>
            )}
        </div>
    );
};

export default BookSlotComponent;
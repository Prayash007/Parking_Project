// src/components/BookSlotComponent.js
import React, { useState } from 'react';
import { BookSlot } from '../services/ParkingService';

const BookSlotComponent = () => {
    const [slotId, setSlotId] = useState('');
    const [userId, setUserId] = useState('');
    const [message, setMessage] = useState('');

    const handleBooking = async () => {
        const success = await BookSlot(slotId, userId);
        if (success) {
            setMessage(`Successfully booked slot ${slotId}.`);
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
        </div>
    );
};

export default BookSlotComponent;
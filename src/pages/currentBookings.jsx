import React, { useEffect, useState } from 'react';
import { ref, onValue, getDatabase } from 'firebase/database';

const CurrentBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const dbRef = ref(getDatabase(), 'parkingSlots/');
    onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const slots = snapshot.val();
        const reservedSlots = Object.keys(slots).filter(slotId => slots[slotId].reserved);
        setBookings(reservedSlots);
      }
    });
  }, []);

  return (
    <div>
      <h1>Current Bookings</h1>
      {bookings.length === 0 ? (
        <p>No current bookings.</p>
      ) : (
        <ul>
          {bookings.map(slotId => (
            <li key={slotId}>Slot {slotId} is currently reserved.</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CurrentBookings;

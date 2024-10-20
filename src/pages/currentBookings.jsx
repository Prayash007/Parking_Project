// src/components/CurrentBookings.js

import React, { useEffect, useState } from 'react';
import { ref, onValue, getDatabase, update } from 'firebase/database';
import { useFirebase } from '../context/FirebaseContext';

const CurrentBookings = () => {
  const firebase = useFirebase();
  const { userId } = firebase; // Access userId from context

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userId) {
      const dbRef = ref(getDatabase(), `parkingSlots/`);

      const unsubscribe = onValue(dbRef, (snapshot) => {
        setLoading(false);
        if (snapshot.exists()) {
          const slots = snapshot.val();
          // Filter to get only reserved slots
          const reservedSlots = Object.keys(slots).filter(slotId => slots[slotId] === true);
          setBookings(reservedSlots);
        } else {
          setBookings([]); // No slots found
        }
      }, (error) => {
        setLoading(false);
        setError(error.message); // Set error message on failure
      });

      return () => unsubscribe();
    } else {
      setLoading(false); 
      setBookings([]); // No bookings if no userId
    }
  }, [userId]);

  // Function to cancel booking by setting the slot value to false
  const cancelBooking = (slotId) => {
    const db = getDatabase();
    const slotRef = ref(db, `parkingSlots/${slotId}`); 
    update(slotRef, { reserved: false })
      .then(() => {
        // Update UI to remove the canceled booking
        setBookings((prevBookings) => prevBookings.filter((id) => id !== slotId));
      })
      .catch((error) => {
        setError(`Failed to cancel booking for slot ${slotId}: ${error.message}`);
      });
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Current Bookings</h1>
      {loading && <p className="text-center text-gray-500">Loading bookings...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}
      {bookings.length === 0 && !loading ? (
        <p className="text-center text-gray-500">No current bookings.</p>
      ) : (
        <ul className="mt-4 space-y-2">
          {bookings.map(slotId => (
            <li key={slotId} className="p-4 bg-gray-100 rounded-md shadow hover:bg-gray-200 transition duration-200">
              <div className="flex justify-between items-center">
                <span>Slot {slotId} is currently reserved.</span>
                <button
                  onClick={() => cancelBooking(slotId)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-200"
                >
                  Cancel Booking
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CurrentBookings;

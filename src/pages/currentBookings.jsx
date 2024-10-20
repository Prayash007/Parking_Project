// src/components/CurrentBookings.js

import React, { useEffect, useState } from 'react';
import { ref, onValue, getDatabase } from 'firebase/database';
import { useFirebase } from '../context/FirebaseContext';

const CurrentBookings = () => {
  const firebase = useFirebase();
  const userId = firebase.userId; // Access userId from context

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Ensure userId is available before querying the database
    if (userId) {
      const dbRef = ref(getDatabase(), `parkingSlots/`); // Removed space after `users/`

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

      return () => unsubscribe(); // Cleanup subscription on unmount
    } else {
      setLoading(false); // If userId is not available, stop loading
      setBookings([]); // No bookings if no userId
    }
  }, [userId]); // Add userId as a dependency

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
              Slot {slotId} is currently reserved.
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CurrentBookings;
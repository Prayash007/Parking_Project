// src/services/parkingService.js
import { ref, set, get } from 'firebase/database';
import { useFirebase } from '../context/FirebaseContext';

export const BookSlot = async (slotId, userId) => {
    const db = useFirebase();
    
    const slotRef = ref(db, `parkingSlots/${slotId}`);

    try {
        // Check if the slot is already booked
        const snapshot = await get(slotRef);
        if (snapshot.exists()) {
            const slotData = snapshot.val();
            if (slotData.isBooked) {
                console.log(`Slot ${slotId} is already booked.`);
                return false; // Slot is not available
            } else {
                // Reserve the slot
                await set(slotRef, {
                    isBooked: true,
                    userId: userId
                });
                console.log(`Slot ${slotId} has been successfully booked for user ${userId}.`);
                return true; // Slot booked successfully
            }
        } else {
            console.log(`Slot ${slotId} does not exist.`);
            return false; // Slot does not exist
        }
    } catch (error) {
        console.error("Error booking slot:", error);
        return false; // Handle error case
    }
};
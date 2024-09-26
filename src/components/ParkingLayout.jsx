import React, { useState } from 'react';
import ParkingSlot from './ParkingSlot';

const ParkingLayout = () => {
  // Initial state for 6 parking slots (true: occupied, false: available)
  const [slots, setSlots] = useState([false, true, false, true, false, false]);

  // Toggle slot availability
  const toggleSlot = (index) => {
    setSlots(slots.map((slot, i) => (i === index ? !slot : slot)));
  };

  return (
    <div style={styles.layout}>
      {slots.map((occupied, index) => (
        <ParkingSlot
          key={index}
          index={index}
          occupied={occupied}
          onToggle={() => toggleSlot(index)}
        />
      ))}
    </div>
  );
};

const styles = {
  layout: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
    padding: '20px',
  },
};

export default ParkingLayout;

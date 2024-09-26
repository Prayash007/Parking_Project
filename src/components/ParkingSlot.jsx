import React from 'react';

const ParkingSlot = ({ index, occupied, onToggle }) => {
  return (
    <div
      style={{
        ...styles.slot,
        backgroundColor: occupied ? '#ff6b6b' : '#4caf50',
      }}
      onClick={onToggle}
    >
      <p>{`Slot ${index + 1}`}</p>
      <p>{occupied ? 'Occupied' : 'Available'}</p>
    </div>
  );
};

const styles = {
  slot: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100px',
    borderRadius: '10px',
    color: 'white',
    cursor: 'pointer',
  },
};

export default ParkingSlot;

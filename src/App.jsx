import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import ManageSlots from './pages/ManageSlots';
import ParkingLot from './pages/ParkingLot';
import { ParkingProvider } from './context/ParkingContext';
import { Parking2Provider } from './context/ParkingContext2';
import Logo from './assets/Logo.png';

const App = () => {
  return (
    <div className='bg-orange-100 h-full'>
      <ParkingProvider>
        <Parking2Provider>
          <Router>
            <nav className="bg-orange-100 p-4 text-slate flex justify-between items-center">
              <img src={Logo} className='h-10' alt="Logo" />
              <ul className="flex space-x-4 text-xl font-semibold font-serif">
                <li className='hover:text-orange-600'><Link to="/">Home</Link></li>
                <li className='hover:text-orange-600'><Link to="/manage-slots">Reserve Slot</Link></li>
                <li className='hover:text-orange-600'><Link to="/parking-lot">Parking Lot</Link></li>
                <li className='hover:text-orange-600'><Link to="/about">About Us</Link></li>
              </ul>
            </nav>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/manage-slots" element={<ManageSlots />} />
              <Route path="/parking-lot" element={<ParkingLot />} />
              {/* Add additional routes here */}
            </Routes>
          </Router>
        </Parking2Provider>
      </ParkingProvider>
    </div>
  );
};

export default App;

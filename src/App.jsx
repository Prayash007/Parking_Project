// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import ManageSlots from './pages/ManageSlots';
import ParkingLot from './pages/ParkingLot';
import { ParkingProvider } from './context/ParkingContext';
import { Parking2Provider } from './context/ParkingContext2';
import Logo from './assets/Logo.png';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Contact from './pages/Contact';
import CurrentBookings from './pages/currentBookings';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { FirebaseProvider, useFirebase } from './context/FirebaseContext';
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute component

const App = () => {
    const [isOpen, setIsOpen] = useState(false); // State to toggle the menu

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='bg-orange-100 h-full'>
            <FirebaseProvider>
                <ParkingProvider>
                    <Parking2Provider>
                        <Router>
                            <nav className="bg-slate-200 p-4 text-slate flex justify-between items-center">
                                <img src={Logo} className='h-10' alt="Logo" />
                                
                                {/* Hamburger Icon for mobile */}
                                <div className="md:hidden" onClick={toggleMenu}>
                                    {isOpen ? (
                                        <AiOutlineClose size={28} className="text-orange-600 cursor-pointer" />
                                    ) : (
                                        <AiOutlineMenu size={28} className="text-orange-600 cursor-pointer" />
                                    )}
                                </div>

                                {/* Normal navbar for medium and larger screens */}
                                <ul className="hidden md:flex space-x-4 text-xl font-semibold font-serif">
                                    <li className='hover:text-pink-700'><Link to="/">Home</Link></li>
                                    <li className='hover:text-pink-700'><Link to="/SignUp">Sign Up</Link></li>
                                    <li className='hover:text-pink-700'><Link to="/parking-lot">Parking Lot</Link></li>
                                    <li className='hover:text-pink-700'><Link to="/Booking">Bookings</Link></li>
                                    <li className='hover:text-pink-700'><Link to="/about">About Us</Link></li>
                                </ul>

                                {/* Logout button on top-right corner if user is signed in */}
                                <div className="hidden md:block">
                                    <AuthButton />
                                </div>

                                {/* Mobile menu (only visible when isOpen is true) */}
                                <ul className={`md:hidden absolute z-20 top-16 left-0 w-full bg-orange-100 p-6 flex flex-col items-center space-y-6 transition-all duration-300 ease-in-out ${isOpen ? 'block' : 'hidden'}`}>
                                    <li className='hover:text-pink-700 text-2xl'><Link to="/" onClick={toggleMenu}>Home</Link></li>
                                    <li className='hover:text-pink-700 text-2xl'><Link to="/SignUp" onClick={toggleMenu}>Sign Up</Link></li>
                                    <li className='hover:text-pink-700 text-2xl'><Link to="/Booking" onClick={toggleMenu}>Reservations</Link></li>
                                    <li className='hover:text-pink-700 text-2xl'><Link to="/parking-lot" onClick={toggleMenu}>Parking Lot</Link></li>
                                    <li className='hover:text-pink-700 text-2xl'><Link to="/about" onClick={toggleMenu}>About Us</Link></li>
                                    {/* Show logout button in mobile menu if user is signed in */}
                                    <AuthButton mobile={true} />
                                </ul>
                            </nav>

                            <Routes>
                                {/* Public Routes */}
                                <Route path="/" element={<Home />} />
                                <Route path="/SignUp" element={<SignUp />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/contact" element={<Contact />} />

                                {/* Protected Routes */}
                                <Route element={<ProtectedRoute />}>
                                    <Route path="/manage-slots" element={<ManageSlots />} />
                                    <Route path="/parking-lot" element={<ParkingLot />} /> 
                                    <Route path="/Booking" element={<CurrentBookings />} />
                                </Route>
                            </Routes>
                        </Router>
                    </Parking2Provider>
                </ParkingProvider>
            </FirebaseProvider>
        </div>
    );
};

// AuthButton component to show logout button
const AuthButton = ({ mobile = false }) => {
    const { userId, logout } = useFirebase();

    const handleLogout = async () => {
        try {
            await logout();
            console.log("Logged out successfully");
        } catch (error) {
            console.error("Error logging out", error);
        }
    };

    if (userId !== 'guest') {
        return (
            <button
                onClick={handleLogout}
                className={`text-pink-700 hover:text-pink-500 font-semibold ${mobile ? 'text-2xl' : ''}`}
            >
                Logout
            </button>
        );
    }

    return null; // Don't show the button if user is not signed in
};

export default App;

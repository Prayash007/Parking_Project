import React from 'react';
import { useNavigate } from 'react-router-dom';
import aboutBg from '../assets/aboutBg.jpg'

function About() {
  const navigate = useNavigate();

  return (
    <>
    <div className="bg-cover bg-center flex flex-col items-center justify-center py-10" style={{ backgroundImage: `url(${aboutBg})` }}>
      <div className="max-w-4xl bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6">About Us</h1>
        <p className="text-gray-700 text-lg mb-4">
          Welcome to ParkEasy, your reliable partner in hassle-free parking reservations.
          We understand that finding a parking spot can be a daunting task, especially in busy urban areas.
          That’s why we’ve created a seamless platform that allows you to reserve your parking space in advance.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Our Mission</h2>
        <p className="text-gray-700 text-lg mb-4">
          Our mission is to simplify the parking experience for everyone.
          We aim to provide our customers with the best parking solutions by offering:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Convenient online reservations</li>
          <li>Real-time availability updates</li>
          <li>Competitive pricing</li>
          <li>Exceptional customer support</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Our Story</h2>
        <p className="text-gray-700 text-lg mb-4">
          Founded in 2021, ParkEasy was born out of a desire to make parking easier and more accessible.
          Our team consists of passionate individuals who are dedicated to improving the parking experience for our users.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Join Us</h2>
        <p className="text-gray-700 text-lg mb-4">
          Whether you're a frequent traveler or just need a spot for a quick errand, ParkEasy is here to help.
          Join us in revolutionizing the way you park!
        </p>

        <div className="mt-8 text-center">
          <button 
            onClick={() => navigate('/contact')} 
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Contact Us
          </button>
        </div>
      </div>
    </div>
    </>
    
  );
}

export default About;
import React from 'react';
import Home1 from '../assets/home1.png';
import Image1 from '../assets/image1.png';
import Image2 from '../assets/image2.png';
import Image3 from '../assets/image3.png';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const navigate = useNavigate();

  return (
    <div className="bg-orange-100 min-h-screen flex flex-col justify-between">
      {/* Hero Section */}
      <div className="relative h-[600px]">
        {/* Background Image with overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${Home1})`, // Fix this line by using a template literal
            filter: 'blur(1px)',
            height: '100%',
            zIndex: 0,
          }}
        />
        <div className="absolute inset-0 bg-black opacity-50" style={{ zIndex: 0 }}></div>

        {/* Text overlay on top of the image */}
        <div
          className="relative flex flex-col items-center justify-center h-full z-3 text-center px-4"
          style={{ zIndex: 3 }}
        >
          <h1 className="text-5xl font-extrabold font-serif text-white">
            Reserve Your Spot Before Others!
          </h1>
          <p className="mt-4 font-medium text-2xl text-orange-300 max-w-lg">
            Click on the button below to reserve your parking slot now.
          </p>
          <button onClick={()=>navigate('/parking-lot')} className="mt-6 bg-pink-700 text-white py-3 px-8 rounded-full shadow-lg hover:bg-pink-500 transition duration-200 transform hover:scale-105">
            Reserve Slot
          </button>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-slate-200 py-10">
        <div className="max-w-screen-xl mx-auto flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Explore More</h2>
          <div className="flex space-x-6 mb-6">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img
                src={Image1}
                alt="Image 1"
                className="w-32 h-32 object-cover rounded-lg shadow-lg hover:opacity-90 transition duration-300"
              />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img
                src={Image2}
                alt="Image 2"
                className="w-32 h-32 object-cover rounded-lg shadow-lg hover:opacity-90 transition duration-300"
              />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img
                src={Image3}
                alt="Image 3"
                className="w-32 h-32 object-cover rounded-lg shadow-lg hover:opacity-90 transition duration-300"
              />
            </a>
          </div>
          <p className="mt-6 text-gray-600">© 2024 ParkEasy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;

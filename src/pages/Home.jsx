import React from 'react';
import Home1 from '../assets/Home1.png';

const Home = () => {
  return (
    <div className='bg-orange-100 h-screen'>
      <div className="relative h-96">
        {/* Background Image with slight blur and gradient from the top */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${Home1})`,
            filter: 'blur(1px)',
            height: '100%',
            zIndex: 1
          }}
        />

        {/* Overlay with gradient effect on the top of the image */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-transparent to-white"
          style={{ height: '70%', zIndex: 2 }}
        />

        {/* Text overlay on top of the image */}
        <div
          className="relative flex flex-col items-center top-10 h-full z-3"
          style={{ zIndex: 3 }} // Ensure this comes above the image and the gradient
        >
          <h1 className="text-3xl font-bold font-serif text-gray-900">
            Reserve your Spot before others!
          </h1>
          <p className="mt-4 font-semibold text-xl text-orange-800">
            Click on Reserve Slot to reserve your slot.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;

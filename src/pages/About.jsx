import React from 'react';
import { useNavigate } from 'react-router-dom';
import aboutBg from '../assets/aboutBg.png';

function About() {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-cover bg-center flex flex-col items-center justify-center py-10" style={{ backgroundImage: `url(${aboutBg})` }}>
        <div className="max-w-4xl bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-6">About This Project</h1>
          <p className="text-gray-700 text-lg mb-4">
            Welcome to ParkEasy, a real-time parking spot reservation platform. This project was developed by Prayash Sinha, a second-year B.Tech student at the National Institute of Technology, Raipur. It was created as part of "Vigyaan," a college hackathon aimed at fostering innovative technological solutions.
          </p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-4">Project Inspiration</h2>
          <p className="text-gray-700 text-lg mb-4">
            Finding parking in urban areas can be a hassle. This project was designed to provide a seamless experience for users by enabling real-time parking reservations, ensuring convenience and efficiency.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">Technologies Used</h2>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>ReactJS for frontend development</li>
            <li>Firebase for real-time data updates</li>
            <li>Tailwind CSS for a modern UI design</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-4">About the Developer</h2>
          <p className="text-gray-700 text-lg mb-4">
            Prayash Sinha is an aspiring software developer with a keen interest in web development, competitive programming, and machine learning. He has participated in several hackathons, including the Smart India Hackathon 2024 as a finalist. He is also an active member of multiple technical clubs at NIT Raipur, contributing to coding events and open-source projects.
          </p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-4">Connect with Me</h2>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li><a href="https://www.linkedin.com/in/prayash-sinha-836454280/" className="text-blue-600 hover:underline">LinkedIn</a></li>
            <li><a href="https://github.com/Prayash007" className="text-blue-600 hover:underline">GitHub</a></li>
            <li><a href="https://codeforces.com/profile/Prayash_7" className="text-blue-600 hover:underline">Codeforces</a></li>
          </ul>
          
          <div className="mt-8 text-center">
            <button 
              onClick={() => navigate('/contact')} 
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Contact Me
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;

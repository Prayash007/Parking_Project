import React from 'react';

function Contact() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-10">
      <div className="max-w-4xl bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Contact Us</h1>
        
        <p className="text-gray-700 text-lg mb-4 text-center">
          We’d love to hear from you! Please fill out the form below or reach us through the contact information provided.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col col-span-full">
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              placeholder="Your message here..."
              rows="4"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
        </div>

        <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200">
          Send Message
        </button>

        <h2 className="text-xl font-semibold mt-8 mb-4 text-center">Contact Information</h2>
        <p className="text-gray-700 mb-2 text-center">📞 Phone: (+91) 955-433-966</p>
        <p className="text-gray-700 mb-2 text-center">📧 Email: sinhaprayash79@gmail.com</p>
        <p className="text-gray-700 mb-4 text-center">🏢 Address: --/--</p>

        {/* Optional: Embed Google Maps */}
        <h2 className="text-xl font-semibold mt-8 mb-4 text-center">Find Us Here</h2>
        <div className="w-full h-[300px] mb-8">
          {/* Replace with your Google Maps embed link */}
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.1234567890123!2d144.9630579153166!3d-37.81410797975152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f123456%3A0xabcdef1234567890!2sYour%20Business%20Location!5e0!3m2!1sen!2sus!4v1616161616161" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Contact;
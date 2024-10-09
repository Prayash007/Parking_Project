import React, { useState } from 'react';
import { useFirebase } from '../context/FirebaseContext';

function SignUp() {
  const firebase = useFirebase();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const handleSignUp = async () => {
    try {
      await firebase.signUpWithEmailAndPassword(email, password);
      setAlertMessage("Sign up successful!"); 
      setEmail(''); 
      setPassword(''); 

      setTimeout(() => {
        setAlertMessage('');
      }, 3000);
    } catch (error) {
      setAlertMessage("Error signing up: " + error.message); // Display error message
    }
  };

  return (
    <div className="flex justify-center bg-gray-100 min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 mt-32 h-96">
        <h1 className="text-2xl font-bold text-center mb-6">Create an Account</h1>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            value={email}
            placeholder='Enter your email'
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            value={password}
            placeholder='Enter your password'
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        <button 
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          onClick={handleSignUp}
        >
          Sign Up
        </button>

        {alertMessage && (
          <div className={`mt-4 text-center ${alertMessage.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
            {alertMessage}
          </div>
        )}
      </div>
    </div>
  );
}

export default SignUp;
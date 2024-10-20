// components/SignUp.js
import React, { useState, useEffect } from 'react';
import { useFirebase } from '../context/FirebaseContext';
import signupBg from '../assets/signupBg.png';
import { getAuth } from 'firebase/auth';

function SignUp() {
    const firebase = useFirebase();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [isSignUp, setIsSignUp] = useState(true); // Toggle between Sign Up and Sign In
    const { userId } = firebase; // Access userId from context

    const handleAuth = async () => {
        try {
            if (isSignUp) {
                await firebase.signUpWithEmailAndPassword(email, password);
                setAlertMessage("Sign up successful!");
            } else {
                await firebase.signIn(email, password);
                setAlertMessage("Sign In successful!");
            }
            // Clear fields after successful authentication
            setEmail('');
            setPassword('');

            setTimeout(() => {
                setAlertMessage('');
            }, 3000);
        } catch (error) {
            setAlertMessage("Error: " + error.message);
        }
    };

    const toggleAuthMode = () => {
        setIsSignUp((prev) => !prev);
        setAlertMessage(''); // Clear alert message when toggling
    };

    return (
        <div className="min-h-screen bg-cover bg-center flex flex-col justify-center bg-gray-100" style={{ backgroundImage: `url(${signupBg})` }}>
            <button onClick={toggleAuthMode} className='bg-green-700 w-40 h-12 ml-auto mr-auto mt-12 rounded-lg text-white'>
                {isSignUp ? 'Switch to Sign In' : 'Switch to Sign Up'}
            </button>

            <div className="bg-white p-8 rounded-lg shadow-md w-96 m-auto mt-14">
                <h1 className="text-2xl font-bold text-center mb-6">{isSignUp ? 'Create an Account' : 'Sign In'}</h1>

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
                    onClick={handleAuth}
                >
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                </button>

                {alertMessage && (
                    <div className={`mt-4 text-center ${alertMessage.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
                        {alertMessage}
                    </div>
                )}

                {/* Display current user ID */}
                <div className="mt-4 text-center">
                    Current User ID: {userId}
                </div>
            </div>
        </div>
    );
}

export default SignUp;
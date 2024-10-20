// src/context/FirebaseContext.js

import React, { createContext , useState, useEffect} from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getDatabase, set, ref, get } from 'firebase/database';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATKDKFolmVmO6dlsiZCbcNRZ2rI5a6CjM",
  authDomain: "fir-proj-6dda9.firebaseapp.com",
  databaseURL: "https://fir-proj-6dda9-default-rtdb.firebaseio.com",
  projectId: "fir-proj-6dda9",
  storageBucket: "fir-proj-6dda9.appspot.com",
  messagingSenderId: "216368665414",
  appId: "1:216368665414:web:736e251f8579b285b54b47"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getDatabase(firebaseApp);

const FirebaseContext = createContext(null);

// Custom hook to use Firebase context
export const useFirebase = () => {
  const context = React.useContext(FirebaseContext);
  if (!context) {
    throw new Error("useFirebase must be used within a FirebaseProvider");
  }
  return context;
};

// Firebase provider component
export const FirebaseProvider = (props) => {
  // Sign up with email and password
  const signUpWithEmailAndPassword = async (email, password) => {
    try {
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error signing up:", error);
      throw error; // Propagate the error if needed
    }
  };

  //Sign IN
  const signIn = async (email, password) => {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch(error) {
      console.error("error signing in:", error);
      throw error;
    }   
  };

  // Log out user
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  };

  // Function to write data to the database
  const putData = async (key, data) => {
    try {
      return await set(ref(db, key), data);
    } catch (error) {
      console.error("Error writing data:", error);
      throw error; // Propagate the error if needed
    }
  };

  // Function to read data from the database
  const getData = async (path) => {
    try {
      const snapshot = await get(ref(db, path)); // Use get() with ref() to fetch data
      return snapshot; // Return the snapshot for further processing
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Re-throw the error for handling in the calling function
    }
  };

  const [userId, setUserId] = useState('guest');

  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged((user) => {
      setUserId(user ? user.uid : 'guest');
    });

    return () => unsubscribe();
  }, []);

  return (
    <FirebaseContext.Provider value={{ signUpWithEmailAndPassword, putData, getData, signIn, logout, userId }}>
      {props.children}
    </FirebaseContext.Provider>
  );
};

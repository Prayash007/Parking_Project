import React, { createContext } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, set, ref } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyATKDKFolmVmO6dlsiZCbcNRZ2rI5a6CjM",
  authDomain: "fir-proj-6dda9.firebaseapp.com",
  databaseURL: "https://fir-proj-6dda9-default-rtdb.firebaseio.com",
  projectId: "fir-proj-6dda9",
  storageBucket: "fir-proj-6dda9.appspot.com",
  messagingSenderId: "216368665414",
  appId: "1:216368665414:web:736e251f8579b285b54b47"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getDatabase(firebaseApp);

const FirebaseContext = createContext(null);

export const useFirebase = () => {
  return React.useContext(FirebaseContext);
};

export const FirebaseProvider = (props) => {
  const signUpWithEmailAndPassword = async (email, password) => {
    try {
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error signing up:", error);
      throw error; // Propagate the error if needed
    }
  };

  const putData = async (key, data) => {
    try {
      return await set(ref(db, key), data);
    } catch (error) {
      console.error("Error writing data:", error);
      throw error; // Propagate the error if needed
    }
  };

  return (
    <FirebaseContext.Provider value={{ signUpWithEmailAndPassword, putData ,db}}>
      {props.children}
    </FirebaseContext.Provider>
  );
};
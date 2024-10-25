// src/components/ProtectedRoute.js

import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useFirebase } from '../context/FirebaseContext';

const ProtectedRoute = () => {
    const { userId } = useFirebase(); // Access userId from context

    useEffect(() => {
        if (userId === 'guest') {
            alert("Please log in to access this page.");
        }
    }, [userId]);

    // If user is not authenticated, redirect to home
    if (userId === 'guest') {
        return <Navigate to="/" replace />;
    }

    // Render child routes if authenticated
    return <Outlet />;
};

export default ProtectedRoute;

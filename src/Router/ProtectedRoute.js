import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (isLoggedIn) {
        console.log('User is logged in.');
    } else {
        console.log('User is not logged in.');
    }
    return isLoggedIn ? children : <Navigate to="/login"/>;
};

export default ProtectedRoute;

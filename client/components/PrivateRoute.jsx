import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ element, ...rest }) => {
  const { user } = useAuth();

  // Conditionally render either the route's element or redirect
  return user && user.role === 'admin' ? element : <Navigate to="/login" />;
};

export default PrivateRoute;

// ProtectedRoute.js
import React from 'react';
import { Route, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();

  // If the user is not authenticated and trying to access a protected route, redirect to login
  if (!isAuthenticated && location.pathname !== '/') {
    return <Navigate to="/login" />;
  }

  // If the user is authenticated or trying to access the home page, render the original component
  return <Route {...rest} element={element} />;
};

export default ProtectedRoute;

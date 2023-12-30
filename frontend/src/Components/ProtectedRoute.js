// ProtectedRoute.js
import React from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();

  // If the user is not authenticated and trying to access a protected route, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If the user is authenticated or trying to access the home page, render the original component
  return element;
//   return (
//   <Routes> 
//     <Route element={element}/>
//   </Routes>);
};

export default ProtectedRoute;

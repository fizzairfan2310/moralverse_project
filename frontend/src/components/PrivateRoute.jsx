import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children, requiredRole }) {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoute;
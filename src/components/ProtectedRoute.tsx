import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { getUserSession } from '../utils/auth';
// import { useState, useEffect } from 'react';

const ProtectedRoute = () => {
  const user = getUserSession();
  const location = useLocation();

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
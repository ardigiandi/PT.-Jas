import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoutes = () => {
  const { isAdminLoggedIn } = useAuth();

  return isAdminLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminRoutes;

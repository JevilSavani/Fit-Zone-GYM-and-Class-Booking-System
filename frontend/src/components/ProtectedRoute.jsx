import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ allowedRoles }) {
    const { token, role } = useAuth();
    if (!token) return <Navigate to="/" replace />;
    if (allowedRoles && !allowedRoles.includes(role)) return <main className="page-shell access-denied"><h1>Access Denied</h1><p>You do not have permission to view this page.</p></main>;
    return <Outlet />;
}

export default ProtectedRoute;

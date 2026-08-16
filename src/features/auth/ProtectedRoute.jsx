import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Checkpoint 1: Protected Route 
export default function ProtectedRoute() {

    const isAuthenticated = localStorage.getItem('authToken');

    // Əgər istifadəçi login olmayıbsa login səhifəsinə yönləndirir
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Əgər login olubsa tələb olunan səhifənin açılmasına icazə verir
    return <Outlet />;
}
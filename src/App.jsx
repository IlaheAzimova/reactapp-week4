import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { MediaProvider } from './context/MediaContext';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
    return (
        <ErrorBoundary>
            <BrowserRouter>
                <MediaProvider>
                    <Routes>
                        <Route path="/" element={<Navigate to="/login" replace />} />

                        <Route path="/login" element={<Login />} />

                        <Route element={<ProtectedRoute />}>
                            <Route path="/dashboard" element={<Dashboard />} />
                        </Route>

                        <Route path="*" element={<Navigate to="/login" replace />} />
                    </Routes>
                </MediaProvider>
            </BrowserRouter>
        </ErrorBoundary>
    );
}
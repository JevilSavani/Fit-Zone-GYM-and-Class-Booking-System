import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import ClassesPage from './pages/ClassesPage';
import MyBookingsPage from './pages/MyBookingsPage';
import TrainerDashboard from './pages/TrainerDashboard';

const AdminPanel = React.lazy(() => import('./pages/AdminPanel'));

function App() {
    return <AuthProvider><BrowserRouter><Navbar /><Routes><Route path="/" element={<LoginPage />} /><Route element={<ProtectedRoute allowedRoles={['Member']} />}><Route path="/classes" element={<ClassesPage />} /><Route path="/my-bookings" element={<MyBookingsPage />} /></Route><Route element={<ProtectedRoute allowedRoles={['Trainer']} />}><Route path="/trainer" element={<TrainerDashboard />} /></Route><Route element={<ProtectedRoute allowedRoles={['Admin']} />}><Route path="/admin" element={<Suspense fallback={<p className="loading-page">Loading Admin Panel...</p>}><AdminPanel /></Suspense>} /></Route></Routes></BrowserRouter></AuthProvider>;
}

export default App;

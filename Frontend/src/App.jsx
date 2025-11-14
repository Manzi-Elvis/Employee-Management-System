import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import Departments from './pages/Departments';
import Employees from './pages/Employees';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
export default function App(){
  return (
    <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
          <Route path="/departments" element={<ProtectedRoute><Departments/></ProtectedRoute>} />
          <Route path="/employees" element={<ProtectedRoute><Employees/></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </BrowserRouter>
);
}
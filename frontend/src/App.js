import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import CharacterManagement from './pages/CharacterManagement';
import StoryManagement from './pages/StoryManagement';
import UserDashboard from './pages/UserDashboard';
import StoryViewer from './pages/StoryViewer';
import PrivateRoute from './components/PrivateRoute';

// 👇 Import the new UserBase page
import UserBase from './pages/UserBase';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <PrivateRoute requiredRole="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/characters"
          element={
            <PrivateRoute requiredRole="admin">
              <CharacterManagement />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/stories"
          element={
            <PrivateRoute requiredRole="admin">
              <StoryManagement />
            </PrivateRoute>
          }
        />
        {/* 👇 NEW: User Base route */}
        <Route
          path="/admin/users"
          element={
            <PrivateRoute requiredRole="admin">
              <UserBase />
            </PrivateRoute>
          }
        />

        {/* User Routes */}
        <Route
          path="/user"
          element={
            <PrivateRoute>
              <UserDashboard />
            </PrivateRoute>
          }
        />

        {/* Story Viewer */}
        <Route
          path="/story/:id"
          element={
            <PrivateRoute>
              <StoryViewer />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

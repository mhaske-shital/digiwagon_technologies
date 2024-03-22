import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminRegistration from './components/AdminRegistraction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Login from './components/Login';
import { useSelector } from 'react-redux';
import UserRegistration from './components/UserRegistration';
import UserDashbord from './components/UserDashbord';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth)
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<UserRegistration />} />
          <Route path="/admin-registration" element={<AdminRegistration />} />
          <Route path="/login" element={<Login />} />
          {isAuthenticated ? (
            <>
              <Route path="/admin-dash" element={<AdminDashboard />} />
              <Route path="user-dashbord" element={<UserDashbord />} />
            </>
          ) : (
            <Route path="/unauthorized" element={<Navigate to="/" />} />
          )}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;

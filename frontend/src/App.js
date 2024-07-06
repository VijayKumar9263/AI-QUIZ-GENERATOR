import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminPage from './components/AdminPage';
import AdminLogin from './components/AdminLogin';
import AdminSignup from './components/AdminSignup';
import ExamPage from './components/ExamPage';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';

const ProtectedRoute = ({ element, ...rest }) => {
  const token = localStorage.getItem('adminToken');
  return token ? element : <Navigate to="/admin-login" />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/AdminPage" element={<ProtectedRoute element={<AdminPage />} />} />
        <Route path="/ExamPage" element={<ExamPage />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-signup" element={<ProtectedRoute element={<AdminSignup />} />} />
      </Routes>
    </Router>
  );
};

export default App;

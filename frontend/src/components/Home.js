import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <div className="home-container">
        <h1>Welcome to Exam Management System</h1>
        <div className="navigation-links">
          <Link to="/Signup">Sign Up For Exam</Link>
          <Link to="/Login">Login For Exam</Link>
          <Link to="/admin-login">Admin Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

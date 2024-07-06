import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Signup.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    // Basic input validation
    if (!username || !password) {
      alert('Please enter both username and password');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        username,
        password
      });
  
      // Check if the signup request was successful
      if (response.status === 201) {
        alert('You have successfully Registered for the Exam');
        // Optionally, redirect the user to another page after successful signup
        navigate('/login');
      } else {
        // Handle other possible responses (e.g., validation errors)
        alert('Error signing up. Please try again.');
      }
    } catch (error) {
      // Handle network errors or server-side errors
      console.error('Error signing up:', error);
      alert('Error signing up. Please try again.');
    }
  };
  

  return (
    <div className='signup-page'>
      <h1>Student SignUp</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>SignUp</button>
      <p>Allready have an account ? <Link to="/Login">Login Here</Link></p>
    </div>
  );
};

export default Signup;

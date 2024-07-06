import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import axios from "axios";
import '../styles/Login.css';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password
      });
  
      const { token } = response.data;
  
      // Store the token in localStorage or state
      localStorage.setItem('token', token);
  
      // Fetch the questions from the server
      const examResponse = await axios.get('http://localhost:5000/api/exams/questions');
      const { questions } = examResponse.data;
  
      if (questions && Array.isArray(questions)) {
        // Navigate to the exam page and pass the exam data
        navigate('/ExamPage', { state: { questions: JSON.stringify(questions) } });
      } else {
        console.error('No questions found in the exam');
        alert('No questions found in the exam');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      if (error.response && error.response.data) {
        console.error('Error response from server:', error.response.data);
      }
      alert('Exam Not Started Yet');
    }
  };

  return (
    <div className="login-page">
      <h1> Student Login</h1>
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
      <button onClick={handleLogin}>Login</button>
      <p>Don't have an account ? <Link to="/Signup">SignUp Here</Link></p>
    </div>
  );
};

export default Login;

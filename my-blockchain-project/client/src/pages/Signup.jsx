// src/pages/Signup.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page
  
    // Make sure all fields are provided
    if (!username || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }
  
    try {
      // Sending the signup request to the server
      const response = await axios.post('http://localhost:5000/api/users/signup', {
        username,
        email,
        password,
      });
  
      // On success, show a success message and redirect to login
      alert(response.data.message);
      navigate('/login'); // Redirect to login page
    } catch (error) {
      // Improved error handling
      console.error('Signup failed:', error.response?.data || error.message);
  
      // Show error message from the backend or a general error message
      alert(error.response?.data?.message || 'Signup failed. Please try again.');
    }
  };
  
  return (
    <div className="bg-zinc-800 min-vh-100 d-flex flex-column justify-content-center align-items-center text-white">
      <div className="card p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mt-3">
            Sign Up
          </button>
        </form>
        <div className="text-center mt-3">
          <p>Already have an account?</p>
          <button
            className="btn "
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;

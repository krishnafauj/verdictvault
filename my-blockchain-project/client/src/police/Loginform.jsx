import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm({ setErrorMessage }) {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [blockchainNo, setBlockchainNo] = useState(''); // State for Blockchain number

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/verify/police', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
          blockchainNo: blockchainNo,
        }),
      });
  
      const result = await response.json();
      if (response.ok) {
        console.log('User verified:', result);
  
        // Store data in local storage (optional)
        localStorage.setItem('policeId', result.policeId);
        localStorage.setItem('email', result.email);
  
        // Pass data using state
        navigate('/police', { state: { email: result.email, blockchainNo: blockchainNo } });
      } else {
        setErrorMessage(result.message); // Display error message
      }
    } catch (error) {
      console.error('Request failed', error);
      setErrorMessage('Failed to connect to server.');
    }
  };
  return (
    <div className="w-1/2 p-8 space-y-6 bg-gray-100">
      <h2 className="text-2xl font-semibold text-center text-gray-800">Police Login</h2>
      <form onSubmit={handleLoginSubmit} className="space-y-6">
        <div>
          <label htmlFor="loginEmail" className="block text-sm font-medium text-gray-700">Email:</label>
          <input
            type="email"
            id="loginEmail"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            required
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter Email"
          />
        </div>
        <div>
          <label htmlFor="loginPassword" className="block text-sm font-medium text-gray-700">Password:</label>
          <input
            type="password"
            id="loginPassword"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            required
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter Password"
          />
        </div>
        <div>
          <label htmlFor="blockchainNo" className="block text-sm font-medium text-gray-700">Blockchain No:</label>
          <input
            type="text"
            id="blockchainNo"
            value={blockchainNo}
            onChange={(e) => setBlockchainNo(e.target.value)}
            required
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter Blockchain Number"
          />
        </div>
        
        <button
          type="submit"
          className="w-full py-2 mt-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;

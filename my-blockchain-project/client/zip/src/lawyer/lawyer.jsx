import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import navigate hook
import axios from 'axios'; // Import axios

function Lawyer() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [blockchain,setBlockchain]=useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Add error state
  const navigate = useNavigate(); // Initialize navigate
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make the API call using fetch or axios
      const response = await axios.post('http://localhost:5000/verify/lawyer', {
        email,
        password,
        blockchain
      });

      if (response.status === 200) {
        console.log('User verified:', response.data);

        
        navigate('/lawyerform', {
          state: {
            email, 
            blockchain, 
          },
        });
      } 
      else {
        setErrorMessage(response.data.message || 'Login failed.'); // Set error message if response not OK
      }
    } 
    catch (error) {
      console.error('Request failed', error);
      setErrorMessage('Failed to connect to server.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Lawyer Login</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter Email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter Password"
            />
          </div>
          <div>
            <label htmlFor="blockchain" className="block text-sm font-medium text-gray-700">Blockchain No:</label>
            <input
            type="text"
            id="blockchain"
            value={blockchain}
      
            onChange={(e)=>setBlockchain(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter Blockchain No"
              />
          </div>

          {errorMessage && (
            <div className="text-red-500 text-sm mt-2">{errorMessage}</div> // Display error if present
          )}

          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Lawyer;

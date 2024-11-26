import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import the navigate function from react-router-dom

function RegisterForm() {
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();  // Hook for navigation

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    const userData = { email: regEmail, password: regPassword };
    try {
      const response = await fetch('http://localhost:5000/register/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('User successfully registered in the database');
        setErrorMessage('');

        // Show the transaction hash in an alert
        alert(`Transaction Hash: ${result.transactionHash}`);

        // Redirect to police login page after successful registration
        navigate('/policelogin');  // Redirect to policelogin page
      } else {
        setErrorMessage(result.message || 'Failed to register user');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setErrorMessage('Registration failed due to an error.');
    }
  };

  return (
    <div className="w-1/2 p-8 space-y-6 bg-gray-200">
      <h2 className="text-2xl font-semibold text-center text-gray-800">User Register</h2>
      <form onSubmit={handleRegisterSubmit} className="space-y-6">
        <div>
          <label htmlFor="regEmail" className="block text-sm font-medium text-gray-700">Email:</label>
          <input
            type="email"
            id="regEmail"
            value={regEmail}
            onChange={(e) => setRegEmail(e.target.value)}
            required
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter Email"
          />
        </div>
        <div>
          <label htmlFor="regPassword" className="block text-sm font-medium text-gray-700">Password:</label>
          <input
            type="password"
            id="regPassword"
            value={regPassword}
            onChange={(e) => setRegPassword(e.target.value)}
            required
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter Password"
          />
        </div>
        {errorMessage && (
          <div className="text-red-500 text-sm">{errorMessage}</div> // Display error message if any
        )}
        <button
          type="submit"
          className="w-full py-2 mt-4 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;

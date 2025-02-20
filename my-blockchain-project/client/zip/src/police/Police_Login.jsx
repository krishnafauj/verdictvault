import React, { useState } from 'react';
import LoginForm from './Loginform';
import RegisterForm from './RegisterForm';
function PoliceLogin() {
  const [errorMessage, setErrorMessage] = useState('');
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-md overflow-hidden gap-8">
        <LoginForm setErrorMessage={setErrorMessage} /> {/* Pass setErrorMessage as a prop */}
        <RegisterForm />
      </div>
    </div>
  );
}

export default PoliceLogin;

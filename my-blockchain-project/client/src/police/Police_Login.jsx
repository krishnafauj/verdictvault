import React, { useState } from 'react';
import LoginForm from './Loginform';
import RegisterForm from './RegisterForm';
import { Link } from 'react-router-dom';
function PoliceLogin() {
  const [errorMessage, setErrorMessage] = useState('');
  return (
<>
 <div className="bg-gray-900 p-2">
                          <Link to="/">
                            <img className='w-10 h10'
                              src="https://cdn-icons-png.flaticon.com/256/189/189252.png"
                              alt="Go to Police Login"
                              title="Go back to Home page"
                            />
                          </Link>
                  
            </div> 
<div className="flex items-center justify-center min-h-screen bg-gray-900">
      
      <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-md overflow-hidden gap-8">
        <LoginForm setErrorMessage={setErrorMessage} /> {/* Pass setErrorMessage as a prop */}
        <RegisterForm />
      </div>
    </div>
</>
  );
}

export default PoliceLogin;

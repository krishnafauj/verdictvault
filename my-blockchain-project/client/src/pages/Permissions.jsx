import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '../UserContext'; // Import the UserContext

const Permissions = () => {
  const { user } = useUser(); // Get current user from context
  const [optionsState, setOptionsState] = useState(['Access Given', 'Access Given', 'Access Given']);
  const [activeIndex, setActiveIndex] = useState(null);

  const handleOptionSelect = (index, option) => {
    const newState = [...optionsState];
    newState[index] = option;
    setOptionsState(newState);
  };

  const handleSavePermissions = async () => {
    if (!user) {
      console.error("No user logged in.");
      return;
    }

    try {
      const permissions = optionsState;
      const email = user.email; // Get the email of the logged-in user
      const response = await axios.post('http://localhost:5000/api/savePermissions', { email, permissions });
      
      console.log('Permissions saved:', response.data);
    } catch (error) {
      console.error('Error saving permissions:', error);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 bg-zinc-800 min-h-screen text-white">
      <div className='pt-40 flex gap-40'>
        {/* First SVG with options */}
        <div className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="75" height="75"
            fill="currentColor"
            className="bi bi-bookmarks-fill text-white transition-transform transform hover:scale-70 hover:text-gray-200 hover:shadow-lg hover:shadow-white"
            viewBox="0 0 16 16"
            onClick={() => handleOptionSelect(0, optionsState[0] === 'Access Given' ? null : 'Access Given')}
          >
            <path d="M2 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L7 13.101l-4.223 2.815A.5.5 0 0 1 2 15.5z" />
            <path d="M4.268 1A2 2 0 0 1 6 0h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L13 13.768V2a1 1 0 0 0-1-1z" />
          </svg>
          {(activeIndex === null || activeIndex === 0) && (
            <div className="flex flex-col items-center mt-2">
              <button 
                className={`bg-red-600 p-2 m-1 rounded ${optionsState[0] === 'Access Denied' ? 'border-2 border-white' : ''}`}
                onClick={() => handleOptionSelect(0, 'Access Denied')}
              >
                Access Denied
              </button>
              <button 
                className={`bg-green-600 p-2 m-1 rounded ${optionsState[0] === 'Access Given' ? 'border-2 border-white' : ''}`}
                onClick={() => handleOptionSelect(0, 'Access Given')}
              >
                Access Given
              </button>
            </div>
          )}
        </div>

        {/* Second SVG with options */}
        <div className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="75" height="75"
            fill="currentColor"
            className="bi bi-clipboard2 text-white transition-transform transform hover:scale-70 hover:text-gray-200 hover:shadow-lg hover:shadow-white"
            viewBox="0 0 16 16"
            onClick={() => handleOptionSelect(1, optionsState[1] === 'Access Given' ? null : 'Access Given')}
          >
            <path d="M3.5 2a.5.5 0 0 0-.5.5v12a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-12a.5.5 0 0 0-.5-.5H12a.5.5 0 0 1 0-1h.5A1.5 1.5 0 0 1 14 2.5v12a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-12A1.5 1.5 0 0 1 3.5 1H4a.5.5 0 0 1 0 1z" />
            <path d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5" />
          </svg>
          {(activeIndex === null || activeIndex === 1) && (
            <div className="flex flex-col items-center mt-2">
              <button 
                className={`bg-red-600 p-2 m-1 rounded ${optionsState[1] === 'Access Denied' ? 'border-2 border-white' : ''}`}
                onClick={() => handleOptionSelect(1, 'Access Denied')}
              >
                Access Denied
              </button>
              <button 
                className={`bg-green-600 p-2 m-1 rounded ${optionsState[1] === 'Access Given' ? 'border-2 border-white' : ''}`}
                onClick={() => handleOptionSelect(1, 'Access Given')}
              >
                Access Given
              </button>
            </div>
          )}
        </div>

        {/* Third SVG with options */}
        <div className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="75" height="75"
            fill="currentColor"
            className="bi bi-database-fill text-white transition-transform transform hover:scale-70 hover:text-gray-200 hover:shadow-lg hover:shadow-white"
            viewBox="0 0 16 16"
            onClick={() => handleOptionSelect(2, optionsState[2] === 'Access Given' ? null : 'Access Given')}
          >
            <path d="M3.904 1.777C4.978 1.289 6.427 1 8 1s3.022.289 4.096.777C13.125 2.245 14 2.993 14 4s-.875 1.755-1.904 2.223C11.022 6.711 9.573 7 8 7s-3.022-.289-4.096-.777C2.875 5.755 2 5.007 2 4s.875-1.755 1.904-2.223" />
            <path d="M2 6.161V7c0 1.007.875 1.755 1.904 2.223C4.978 9.71 6.427 10 8 10s3.022-.289 4.096-.777C13.125 8.755 14 8.007 14 7v-.839c-.457.432-1.004.751-1.49.972C11.278 7.693 9.682 8 8 8s-3.278-.307-4.51-.867c-.486-.22-1.033-.54-1.49-.972" />
            <path d="M2 9.161V10c0 1.007.875 1.755 1.904 2.223C4.978 12.711 6.427 13 8 13s3.022-.289 4.096-.777C13.125 11.755 14 11.007 14 10v-.839c-.457.432-1.004.751-1.49.972C11.278 10.693 9.682 11 8 11s-3.278-.307-4.51-.867c-.486-.22-1.033-.54-1.49-.972" />
          </svg>
          {(activeIndex === null || activeIndex === 2) && (
            <div className="flex flex-col items-center mt-2">
              <button 
                className={`bg-red-600 p-2 m-1 rounded ${optionsState[2] === 'Access Denied' ? 'border-2 border-white' : ''}`}
                onClick={() => handleOptionSelect(2, 'Access Denied')}
              >
                Access Denied
              </button>
              <button 
                className={`bg-green-600 p-2 m-1 rounded ${optionsState[2] === 'Access Given' ? 'border-2 border-white' : ''}`}
                onClick={() => handleOptionSelect(2, 'Access Given')}
              >
                Access Given
              </button>
            </div>
          )}
        </div>
      </div>
      <button className="mt-4 bg-blue-600 p-2 rounded" onClick={handleSavePermissions}>
        Save Permissions
      </button>
    </div>
  );
};

export default Permissions;

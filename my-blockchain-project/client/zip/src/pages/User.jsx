// src/pages/UserProfile.jsx
import React from 'react';
import { useUser } from '../UserContext';
import { Link, Outlet } from 'react-router-dom';

function UserProfile() {
    const { user } = useUser(); // Access user data from context

    return (
      <div className="bg-zinc-800 min-vh-100 d-flex flex-column  text-white">
        {user ? (
          <div className='text-5xl font-bold'>
            <h2>Welcome, {user.username}!</h2>
          </div>
      ) : (
        <p>Please log in to see your profile.</p>
      )}
      <div className="d-flex flex-row items-center gap-10 justify-center space-x-4">
        <Link to="/user/profile">
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="75"
              height="75"
              fill="currentColor"
              className="bi bi-person"
              viewBox="0 0 16 16"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
            </svg>
            PROFILE
          </button>
        </Link>

        <Link to="/user/permissions">
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" fill="currentColor" className="bi bi-arrow-repeat" viewBox="0 0 16 16">
              <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9" />
              <path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z" />
            </svg>
          </button>
        </Link>
      </div>

      <Outlet /> {/* This will render the child routes */}
    </div>
  );
}

export default UserProfile;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  // State to toggle Login/Signup buttons
  const [showButtons, setShowButtons] = useState(false);

  return (
    <div className="bg-zinc-800 min-h-screen flex flex-col items-center justify-center">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold text-white mb-6">Welcome to Verdict-Vault</h1>
      </div>
      <div className="flex space-x-40 pt-20 cursor-pointer">
        {/* First SVG with hover functionality */}
        

        {/* Other SVGs */}
        <Link to="policelogin">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="75" height="75"
          fill="currentColor"
          className="bi bi-bookmarks-fill text-white transition-transform transform hover:scale-75 hover:text-gray-200 hover:shadow-lg hover:shadow-white"
          viewBox="0 0 16 16"
        >
          <path d="M2 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L7 13.101l-4.223 2.815A.5.5 0 0 1 2 15.5z" />
          <path d="M4.268 1A2 2 0 0 1 6 0h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L13 13.768V2a1 1 0 0 0-1-1z" />
        </svg>
        </Link>
        <Link to="/lawyer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="75" height="75"
          fill="currentColor"
          className="bi bi-clipboard2 text-white transition-transform transform hover:scale-75 hover:text-gray-200 hover:shadow-lg hover:shadow-white"
          viewBox="0 0 16 16"
        >
          <path d="M3.5 2a.5.5 0 0 0-.5.5v12a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-12a.5.5 0 0 0-.5-.5H12a.5.5 0 0 1 0-1h.5A1.5 1.5 0 0 1 14 2.5v12a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-12A1.5 1.5 0 0 1 3.5 1H4a.5.5 0 0 1 0 1z" />
          <path d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5" />
        </svg>
        </Link>
        <Link to="/judgelogin">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="75" height="75"
          fill="currentColor"
          className="bi bi-database-fill text-white transition-transform transform hover:scale-75 hover:text-gray-200 hover:shadow-lg hover:shadow-white"
          viewBox="0 0 16 16"
        >
          <path d="M3.904 1.777C4.978 1.289 6.427 1 8 1s3.022.289 4.096.777C13.125 2.245 14 2.993 14 4s-.875 1.755-1.904 2.223C11.022 6.711 9.573 7 8 7s-3.022-.289-4.096-.777C2.875 5.755 2 5.007 2 4s.875-1.755 1.904-2.223" />
          <path d="M2 6.161V7c0 1.007.875 1.755 1.904 2.223C4.978 9.71 6.427 10 8 10s3.022-.289 4.096-.777C13.125 8.755 14 8.007 14 7v-.839c-.457.432-1.004.751-1.49.972C11.278 7.693 9.682 8 8 8s-3.278-.307-4.51-.867c-.486-.22-1.033-.54-1.49-.972" />
          <path d="M2 9.161V10c0 1.007.875 1.755 1.904 2.223C4.978 12.711 6.427 13 8 13s3.022-.289 4.096-.777C13.125 11.755 14 11.007 14 10v-.839c-.457.432-1.004.751-1.49.972-1.232.56-2.828.867-4.51.867s-3.278-.307-4.51-.867c-.486-.22-1.033-.54-1.49-.972" />
          <path d="M2 12.161V13c0 1.007.875 1.755 1.904 2.223C4.978 15.711 6.427 16 8 16s3.022-.289 4.096-.777C13.125 14.755 14 14.007 14 13v-.839c-.457.432-1.004.751-1.49.972-1.232.56-2.828.867-4.51.867s-3.278-.307-4.51-.867c-.486-.22-1.033-.54-1.49-.972" />
        </svg>
        </Link>
      </div>
    </div>
  );
}

export default Home;

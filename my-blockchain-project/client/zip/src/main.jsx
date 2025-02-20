// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import  { UserProvider } from './UserContext'; // Import UserProvider
import './index.css'; // Import your styles

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);

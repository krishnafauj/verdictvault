// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './Home';
import Permissions from './pages/Permissions';
import User_Dashboard from './pages/User_Dashboard';
import UserProfile from './pages/User';
import Police_Login from './police/Police_Login';
import Police from './police/Police';
import Lawyer from './lawyer/lawyer';
import Lawyerform from './lawyer/lawyerform';
import JudgeLogin from './judge/judgelogin';
import Judge from './judge/judge';
import UploadToIPFS from './New';
import Fileipfs from './judge/index3';
 
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/krishna" element={<Permissions /> } />
          <Route path="profile" element={<User_Dashboard />} />
          <Route path="/user" element={<UserProfile />}>
            <Route path="permissions" element={<Permissions />} />
            <Route path="profile" element={<User_Dashboard />} />
          </Route>
          <Route path="/police" element={<Police />} />
          <Route path="/policelogin" element={<Police_Login />} />
          <Route path="/lawyerform" element={<Lawyerform />} />
          <Route path="/lawyer" element={<Lawyer />} />
          <Route path="/judgelogin" element={<JudgeLogin/>}/>   
          <Route path="/judge" element={<Judge/>} />
          <Route path="/upload" element={<UploadToIPFS/>} /> 
          <Route path="/fileips" element={<Fileipfs/>} /> 
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;

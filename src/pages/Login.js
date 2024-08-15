import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import hospitalLogo from '../assets/hospital-logo-design-vector-medical-cross_53876-136743.avif';
import axios from 'axios';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const checkUsernameInTable = async (username, table) => {
    try {
      const response = await axios.get(`http://localhost:8080/${table}/checkUsername/${username}`);
      return response.data; // This should return true or false
    } catch (error) {
      console.error(`Error checking username in ${table}:`, error);
      return false;
    }
  };

  const handleLogin = async () => {
    if (username === 'girish@admin.com') {
      if (password === 'pharma1234') {
        navigate('/dashboard');
      } else {
        alert('Wrong password');
      }
    } 
    else if(username==='sak2003@doctor.com'){
        navigate('/doctorhome');
       }else {
      const [localPart, domain] = username.split('@');
      let table = '';

      if (domain === 'doctor.com') {
        table = 'admin';
      } else if (domain === 'pharmacist.com') {
        table = 'pharmacist';
      } else if (domain === 'manufacturer.com') {
        table = 'manufacturer';
      } else if (domain === 'supplier.com') {
        table = 'supplier';
      } else {
        alert('Invalid domain');
        return;
      }

      const usernameExists = await checkUsernameInTable(localPart, table);
      if (usernameExists) {
        navigate(`/${table}home`);
      } else {
        alert('Username not found');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login Page</h2>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="submit-button" onClick={handleLogin}>Submit</button>
      </div>
      <div className="image-container">
        <img src={hospitalLogo} alt="Hospital Logo" />
      </div>
    </div>
  );
}

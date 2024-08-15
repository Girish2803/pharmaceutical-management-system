import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Pharmahome.css';

export default function Pharmahome() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/');
  };

  return (
    <div className="container">
      <button className="login-button" onClick={handleLoginClick}>Login</button>
      <img src='https://www.sarasolutions.in/assets/images/products/pharm1.png' alt='Pharma' className="pharma-image"></img>
    </div>
  )
}

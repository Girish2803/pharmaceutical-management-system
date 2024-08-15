import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'; // You can create this CSS file for styling

export default function Navbar() {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/home');
  };

  return (
    <div className='navbar'>
      <div className='left'>
        <button onClick={goToHome}>Doctor</button>
      </div>
      <div className='right'>
        Pharmaceutical management system
      </div>
    </div>
  );
}


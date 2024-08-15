import React from 'react';
import { Link } from 'react-router-dom';
import './Doctorhome.css';

export default function Doctorhome() {
  return (
    <div className="doctor-home-container">
      <div className="doctor-image-container">
        <img src="https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Doctor" className="doctor-image" />
      </div>
      <div className="doctor-buttons-container">
        <Link to='/doctorbuy' className="link-button">Buy medicines</Link>
        <Link to='/doctorview' className="link-button">View medicines</Link>
      </div>
    </div>
  );
}

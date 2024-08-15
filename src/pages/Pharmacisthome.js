import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'
import './PharmacistHome.css';

export default function Pharmacisthome() {
  const [medicinesCount, setMedicinesCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [approvedOrdersCount, setApprovedOrdersCount] = useState(0);

  useEffect(() => {
    fetch('http://localhost:8080/pharmacistkemedicines/count')
      .then(response => response.json())
      .then(data => setMedicinesCount(data));

    fetch('http://localhost:8080/pharmacistorders/count')
      .then(response => response.json())
      .then(data => setOrdersCount(data));

    fetch('http://localhost:8080/doctorapprovedorders/count')
      .then(response => response.json())
      .then(data => setApprovedOrdersCount(data));
  }, []);

  return (
    <div className="manufacturer-container">
      <div className="manufacturer-sidebar">
        <Link to='/pharmacistmedicine' className='link-button'>Order</Link>
        <Link to='/pharmacistkemedicines' className='link-button'>View Medicines</Link>
        <Link to='/pharmaorders' className='link-button'>View Orders</Link>
        <Link to='/approvedpharma' className='link-button'>Approved Orders</Link>
      </div>
      <div className="manufacturer-content">
        <div className="card">
          <h3>Total Medicines</h3>
          <p>{medicinesCount}</p>
        </div>
        <div className="card">
          <h3>Total Orders</h3>
          <p>{ordersCount}</p>
        </div>
        <div className="card">
          <h3>Approved Orders</h3>
          <p>{approvedOrdersCount}</p>
        </div>
      </div>
    </div>
  );
}

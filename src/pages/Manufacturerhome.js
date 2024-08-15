import React, { useState, useEffect } from 'react';
import './Manufacturer.css';
import { Link } from 'react-router-dom';

export default function Manufacturerhome() {
  const [medicineCount, setMedicineCount] = useState(0);
  const [approvedOrdersCount, setApprovedOrdersCount] = useState(0);
  const [manufacturerOrdersCount, setManufacturerOrdersCount] = useState(0);

  useEffect(() => {
    fetchMedicineCount();
    fetchApprovedOrdersCount();
    fetchManufacturerOrdersCount();
  }, []);

  const fetchMedicineCount = async () => {
    try {
      const response = await fetch('http://localhost:8080/medicines/count');
      const data = await response.json();
      setMedicineCount(data);
    } catch (error) {
      console.error('Error fetching medicine count:', error);
    }
  };

  const fetchApprovedOrdersCount = async () => {
    try {
      const response = await fetch('http://localhost:8080/approvedorders/count');
      const data = await response.json();
      setApprovedOrdersCount(data);
    } catch (error) {
      console.error('Error fetching approved orders count:', error);
    }
  };

  const fetchManufacturerOrdersCount = async () => {
    try {
      const response = await fetch('http://localhost:8080/manufacturerorders/count');
      const data = await response.json();
      setManufacturerOrdersCount(data);
    } catch (error) {
      console.error('Error fetching manufacturer orders count:', error);
    }
  };

  return (
    <div className='dashboard'>
      <div className='dashboard-sidebar'>
        <Link to='/medicines' className='link-button'>Medicines</Link>
        <Link to='/home1' className='link-button'>Near-expiry</Link>
        <Link to='/manufacturerorders' className='link-button'>Orders</Link>
        <Link to='/approvedorders' className='link-button'>Approved</Link>
        <Link to='/POS' className='link-button'>POS</Link>
      </div>
      <div className='dashboard-content'>
        <div className='dashboard-stats'>
          <div className='card'>
            <div className='card-header'>
              MEDICINE STATS
            </div>
            <div className='card-body'>
              <div className='subtitle'>Total Medicines</div>
              <h2>{medicineCount}</h2>
            </div>
          </div>
          <div className='card'>
            <div className='card-header'>
              APPROVED ORDERS STATS
            </div>
            <div className='card-body'>
              <div className='subtitle'>Total Approved Orders</div>
              <h2>{approvedOrdersCount}</h2>
            </div>
          </div>
        </div>
        <div className='card'>
          <div className='card-header'>
            MANUFACTURER ORDERS STATS
          </div>
          <div className='card-body'>
            <div className='subtitle'>Total Manufacturer Orders</div>
            <h2>{manufacturerOrdersCount}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

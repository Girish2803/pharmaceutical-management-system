import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css'; // Updated to point to the correct CSS file

const Dashboard = () => {
  const [counts, setCounts] = useState({
    doctors: 0,
    pharmacists: 0,
    manufacturers: 0,
    medicines: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const doctorsResponse = await axios.get('http://localhost:8080/admins/count');
        const pharmacistsResponse = await axios.get('http://localhost:8080/pharmacists/count');
        const manufacturersResponse = await axios.get('http://localhost:8080/manufacturers/count');
        const medicinesResponse = await axios.get('http://localhost:8080/medicines/count');

        setCounts({
          doctors: doctorsResponse.data,
          pharmacists: pharmacistsResponse.data,
          manufacturers: manufacturersResponse.data,
          medicines: medicinesResponse.data,
        });
      } catch (error) {
        console.error('Error fetching counts', error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div className="dashboard-sidebar">
        <Link to="/dashboard" className='link-button'>Dashboard</Link>
        <Link to="/home" className="link-button">Doctors</Link>
        <Link to="/pharmacists" className="link-button">Pharmacists</Link>
        <Link to="/manufacturers" className="link-button">Manufacturers</Link>
        <Link to="/POS" className="link-button">POS</Link>
      </div>
      <div className="dashboard-content">
        <h1>Pharmaceutical Management System</h1>
        <div className="dashboard-cards">
          <div className="card">
            <div className="card-header">
              MEDICINE STATS
            </div>
            <div className="card-body">
              <div className="subtitle">Total Medicines</div>
              <h2>{counts.medicines}</h2>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              DOCTOR STATS
            </div>
            <div className="card-body">
              <div className="subtitle">Total Doctors</div>
              <h2>{counts.doctors}</h2>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              PHARMACIST STATS
            </div>
            <div className="card-body">
              <div className="subtitle">Total Pharmacists</div>
              <h2>{counts.pharmacists}</h2>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              MANUFACTURER STATS
            </div>
            <div className="card-body">
              <div className="subtitle">Total Manufacturers</div>
              <h2>{counts.manufacturers}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

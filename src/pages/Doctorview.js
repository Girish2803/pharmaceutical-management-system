import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Doctorview.css';

const Doctorview = () => {
  const [doctorMedicines, setDoctorMedicines] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/doctorkemedicines')
      .then(response => setDoctorMedicines(response.data))
      .catch(error => console.error('Error fetching data: ', error));
  }, []);

  return (
    <div className="doctor-view-container">
      <h1>Doctor Medicines</h1>
      <table className="doctor-medicines-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Manufacture Date</th>
            <th>Expiry Date</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {doctorMedicines.map(medicine => (
            <tr key={medicine.id}>
              <td>{medicine.name}</td>
              <td>{medicine.price}</td>
              <td>{medicine.manufacture_date}</td>
              <td>{medicine.expiry_date}</td>
              <td>{medicine.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Doctorview;

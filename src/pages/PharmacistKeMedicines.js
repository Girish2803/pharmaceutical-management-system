import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ph.css';

export default function PharmacistKeMedicines() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadPharmacistKeMedicines();
  }, []);

  const loadPharmacistKeMedicines = async () => {
    const result = await axios.get('http://localhost:8080/pharmacistskemedicines');
    setUsers(result.data);
  };

  const deletePharmacistKeMedicines = async (id) => {
    await axios.delete(`http://localhost:8080/pharmacistkemedicines/${id}`);
    loadPharmacistKeMedicines();
  };

  return (
    <div className='container'>
      <div className='py-4'>
        <h2>Pharmacist Medicines</h2>
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>SI.No</th>
              <th scope='col'>Name</th>
              <th scope='col'>Manufacture Date</th>
              <th scope='col'>Expiry Date</th>
              <th scope='col'>Price</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.manufacture_date}</td>
                <td>{user.expiry_date}</td>
                <td>{user.price}</td>
                <td>{user.quantity}</td>
                <td>
                  <button className='link-button'>
                    <Link to={`/viewpharmacistkemedicines/${user.id}`}>View</Link>
                  </button>
                  <button className='link-button'>
                    <Link to={`/editpharmacistkemedicines/${user.id}`}>Edit</Link>
                  </button>
                  <button onClick={() => deletePharmacistKeMedicines(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

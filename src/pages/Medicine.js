import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import './Medicine.css';

export default function Medicine() {
  const [medicines, setMedicines] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    loadMedicines();
  }, []);

  const loadMedicines = async () => {
    try {
      const result = await axios.get('http://localhost:8080/medicines');
      setMedicines(result.data);
    } catch (error) {
      console.error('Error loading medicines:', error);
    }
  };

  const deleteMedicine = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/medicine/${id}`);
      loadMedicines();
    } catch (error) {
      console.error('Error deleting medicine:', error);
    }
  };

  return (
    <div className="container">
      <div className="py-4">
        <table>
          <thead>
            <tr>
              <th scope="col">SI.No</th>
              <th scope="col">Name</th>
              <th scope="col">Manufacture Date</th>
              <th scope="col">Expiry Date</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((medicine, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{medicine.name}</td>
                <td>{medicine.manufacture_date}</td>
                <td>{medicine.expiry_date}</td>
                <td>{medicine.price}</td>
                <td>{medicine.quantity}</td>
                <td>
                  <button className="view-btn">
                    <Link to={`/viewmedicines/${medicine.id}`}>View</Link>
                  </button>
                  <button className="edit-btn">
                    <Link to={`/editmedicines/${medicine.id}`}>Edit</Link>
                  </button>
                  <button className="delete-btn" onClick={() => deleteMedicine(medicine.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="add-btn">
          <Link to="/addmedicines">Add Medicine</Link>
        </button>
        <button className="view-store-btn">
          <Link to="/home1">View Store</Link>
        </button>
      </div>
    </div>
  );
}

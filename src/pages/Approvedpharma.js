import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Approvedpharma.css';

export default function Approvedpharma() {
  const [approvedOrders, setApprovedOrders] = useState([]);

  useEffect(() => {
    loadApprovedOrders();
  }, []);

  const loadApprovedOrders = async () => {
    const result = await axios.get('http://localhost:8080/doctorapprovedorders');
    setApprovedOrders(result.data);
  };

  return (
    <div className="container">
      <div className="py-4">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">SI.No</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {approvedOrders.map((order, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{order.name}</td>
                <td>{order.price}</td>
                <td>{order.quantity}</td>
                <td>
                  <button className="link-button" disabled>
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

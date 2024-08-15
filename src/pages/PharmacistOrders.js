import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PharmacistOrders.css'; // Import CSS file for styling

const PharmacistOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8080/pharmacistorders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const approveOrder = async (order) => {
    try {
      // Move order to doctor approved orders table
      const approvedOrder = {
        name: order.name,
        price: order.price,
        quantity: order.quantity,
      };
      await axios.post('http://localhost:8080/doctorapprovedorder', approvedOrder);

      // Get the corresponding medicine by name
      const medicineResponse = await axios.get(`http://localhost:8080/pharmacistkemedicines/name/${order.name}`);
      const medicine = medicineResponse.data;

      // Update the quantity in pharmacist's medicines table
      medicine.quantity -= order.quantity;
      await axios.put(`http://localhost:8080/pharmacistkemedicines/${medicine.id}`, medicine);

      // Add medicine to doctor's medicines table
      const doctorMedicine = {
        name: order.name,
        price: order.price,
        quantity: order.quantity,
        manufacture_date: medicine.manufacture_date,
        expiry_date: medicine.expiry_date
      };
      await axios.post('http://localhost:8080/doctorkemedicine', doctorMedicine);

      // Delete the order from pharmacist orders table
      await axios.delete(`http://localhost:8080/pharmacistorder/${order.id}`);

      // Refresh orders list
      fetchOrders();
    } catch (error) {
      console.error('Error approving order:', error);
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:8080/pharmacistorder/${orderId}`);
      fetchOrders();
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  return (
    <div>
      <h2>Pharmacist Orders</h2>
      <div className="container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Approve</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.name}</td>
                <td>{order.price}</td>
                <td>{order.quantity}</td>
                <td>
                  <button className="approve-btn" onClick={() => approveOrder(order)}>Approve</button>
                </td>
                <td>
                  <button className="delete-btn" onClick={() => deleteOrder(order.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PharmacistOrders;

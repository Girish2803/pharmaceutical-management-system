// Order.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Order.css'; // Import CSS file for styling

const Order = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8080/manufacturerorders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const approveOrder = async (order) => {
    try {
      // Move order to approved orders table
      await axios.post('http://localhost:8080/approvedorder', order);

      // Get the corresponding medicine by name
      const medicineResponse = await axios.get(`http://localhost:8080/medicine/name/${order.name}`);
      const medicine = medicineResponse.data;

      // Update the quantity in medicines table
      medicine.quantity -= order.quantity;
      await axios.put(`http://localhost:8080/medicine/${medicine.id}`, medicine);

      // Add quantity to pharmacist's medicines table with additional details
      const pharmacistMedicine = {
        name: order.name,
        price: order.price,
        quantity: order.quantity,
        manufacture_date: medicine.manufacture_date,
        expiry_date: medicine.expiry_date
      };
      await axios.post('http://localhost:8080/pharmacistkemedicine', pharmacistMedicine);

      // Delete the order from manufacturer orders table
      await axios.delete(`http://localhost:8080/manufacturerorder/${order.id}`);

      // Refresh orders list
      fetchOrders();
    } catch (error) {
      console.error('Error approving order:', error);
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:8080/manufacturerorder/${orderId}`);
      fetchOrders();
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  return (
    <div><h2>Manufacturer Orders</h2>
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

export default Order;

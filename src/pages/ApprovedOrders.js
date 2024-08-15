// ApprovedOrders.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ApprovedOrders.css';

export default function ApprovedOrders() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const result = await axios.get("http://localhost:8080/approvedorders");
        setUsers(result.data);
    };

    return (
        <div className='container'>
            <h1>Approved Orders</h1>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Status</th> {/* Added column header for status */}
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.price}</td>
                            <td>{user.quantity}</td>
                            <td>
                                <button className="approved-button" disabled>Approved</button> {/* Non-clickable button */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

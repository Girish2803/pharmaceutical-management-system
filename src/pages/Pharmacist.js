import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Pharmacist.css';

export default function Pharmacist() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const result = await axios.get("http://localhost:8080/pharmacists");
        setUsers(result.data);
    };

    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:8080/pharmacist/${id}`);
        loadUsers();
    };

    return (
        <div className='container'>
            <div className="pharmacist-table-container">
                <h1>Pharmacist List</h1>
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Username</th>
                            <th>Phone</th>
                            <th>Specialization</th>
                            <th>LicenseId</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{user.username}</td>
                                <td>{user.phone}</td>
                                <td>{user.specialization}</td>
                                <td>{user.licenseId}</td>
                                <td>
                                    <Link to={`/editpharmacist/${user.id}`} className="link-button edit-button">Edit</Link>
                                    <Link to={`/viewpharmacist/${user.id}`} className="link-button view-button">View</Link>
                                    <button onClick={() => deleteUser(user.id)} className="link-button delete-button">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <center><Link to='/addpharmacist' className='addpharma'>AddPharmacist</Link></center>
            </div>
        </div>
    );
}

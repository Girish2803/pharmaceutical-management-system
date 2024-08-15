import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the CSS file for styling
import './Manufacturer.css'
function Manufacturer() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const result = await axios.get("http://localhost:8080/manufacturers");
        setUsers(result.data);
    };

    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:8080/manufacturer/${id}`);
        loadUsers();
    };

    return (
        <div className="home-container">
           <h1 >Manufacturers List</h1>
            <Link to="/addmanufacturer" className="link-button add-button">ADD Manufacturer</Link>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Username</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Location</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{user.username}</td>
                            <td>{user.phone}</td>
                            <td>{user.email}</td>
                            <td>{user.location}</td>
                            <td>
                                <Link to={`/editmanufacturer/${user.id}`} className="link-button edit-button">Edit</Link>
                                <Link to={`/viewmanufacturer/${user.id}`} className="link-button view-button">View</Link>
                                <button onClick={() => deleteUser(user.id)} className="link-button delete-button">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Manufacturer;

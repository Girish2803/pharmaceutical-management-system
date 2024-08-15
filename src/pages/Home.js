import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the new CSS file

function Home() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const result = await axios.get("http://localhost:8080/admins");
        setUsers(result.data);
    };

    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:8080/admin/${id}`);
        loadUsers();
    };

    return (
        <div className="home-container">
            <h1>Doctors List</h1>
            <Link to="/adddoctor" className="link-button add-button">ADD Doctor</Link>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Specialization</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.username}</td>
                            <td>{user.specialization}</td>
                            <td>
                                <Link to={`/edituser/${user.id}`} className="link-button edit-button">Edit</Link>
                                <Link to={`/viewuser/${user.id}`} className="link-button view-button">View</Link>
                                <button onClick={() => deleteUser(user.id)} className="link-button delete-button">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Home;

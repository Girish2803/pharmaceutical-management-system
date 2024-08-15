import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../App.css';
import './ViewDoctor.css'; // Import the new CSS file

export default function ViewDoctor() {
    const [user, setUser] = useState({
        name: "",
        username: "",
        specialization: ""
    });
    const { id } = useParams();

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        const result = await axios.get(`http://localhost:8080/admin/${id}`);
        setUser(result.data);
    };

    return (
        <div className='container'>
            <div className='details-container'>
                <h2>Doctor Details</h2>
                <div>
                    Details of user id:
                    <ul>
                        <li>
                            <b>Name:</b> {user.name}
                        </li>
                        <li>
                            <b>Username:</b> {user.username}
                        </li>
                        <li>
                            <b>Specialization:</b> {user.specialization}
                        </li>
                    </ul>
                </div>
                <Link to={"/home"} className="link-button">Back to Home</Link>
            </div>
        </div>
    );
}

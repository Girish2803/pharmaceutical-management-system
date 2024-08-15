import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../Pharmacists/ViewPharmacist.css'

export default function ViewManufacturer() {
    const [user, setUser] = useState({
        username: "",
        phone:"",
        email:"",
        location:""
    });
    const { id } = useParams();

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        const result = await axios.get(`http://localhost:8080/manufacturer/${id}`);
        setUser(result.data);
    };

    return (
        <div className='container'>
            <h2>Manufacturer Details</h2>
            <div className="user-details">
                <table className="user-table">
                    <tbody>
                        <tr>
                            <td><b>UserName:</b></td>
                            <td>{user.username}</td>
                        </tr>
                        <tr>
                            <td><b>Phone:</b></td>
                            <td>{user.phone}</td>
                        </tr>
                        <tr>
                            <td><b>Email:</b></td>
                            <td>{user.email}</td>
                        </tr>
                        <tr>
                            <td><b>Location:</b></td>
                            <td>{user.location}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="button-container">
                <Link to={"/manufacturers"} className="link-button">Back to home</Link>
            </div>
        </div>
    );
}

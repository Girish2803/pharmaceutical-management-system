import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ViewPharmacist.css';

export default function ViewPharmacist() {
    const [user, setUser] = useState({
        username: "",
        phone:"",
        specialization:"",
        licenseId:""
    });
    const { id } = useParams();

    useEffect(() => {
        loadUser();
    },[]);

    const loadUser = async () => {
        const result = await axios.get(`http://localhost:8080/pharmacist/${id}`);
        setUser(result.data);
    };
    
    return (
        <div className='container'>
            <h2>Pharmacist Details</h2>
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
                            <td><b>Specialization:</b></td>
                            <td>{user.specialization}</td>
                        </tr>
                        <tr>
                            <td><b>LicenseId:</b></td>
                            <td>{user.licenseId}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="button-container">
                <button className="link-button">
                    <a href="/pharmacists">Back to home</a>
                </button>
            </div>
        </div>
    )
}

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../App.css'
export default function ViewSupplier() {
    const [user, setUser] = useState({
        username: "",
        phone:"",
        companyName:"",
        email:""
    });
    const { id } = useParams();

    useEffect(() => {
        loadUser();
    },[]);

    const loadUser = async () => {
        const result = await axios.get(`http://localhost:8080/supplier/${id}`);
        setUser(result.data);
    };
  return (
    <div className='container'>
      <h2>supplier details</h2>
            <div>
                Details of supplier id:
                <ul>
                    <li>
                        <b>UserName:</b> {user.username}
                    </li>
                    <li>
                        <b>Phone:</b> {user.phone}
                    </li>
                    <li>
                        <b>contactName:</b> {user.companyName}
                    </li>
                    <li>
                        <b>Email:</b> {user.email}
                    </li>
                </ul>
            </div>
            <Link to={"/supplier"} className='link-button'>Back to suppliers list</Link>
    </div>
  )
}

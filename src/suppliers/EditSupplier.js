import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import '../App.css'
export default function EditSupplier() {
    let navigate = useNavigate();
    const { id } = useParams();
    const [user, setUser] = useState({
        username: "",
        phone: "",
        companyName: "",
        email:""
    });

    const {username,phone,companyName,email } = user;

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        loadUser();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8080/supplier/${id}`, user);
        navigate("/suppliers");
    };

    const loadUser = async () => {
        const result = await axios.get(`http://localhost:8080/supplier/${id}`);
        setUser(result.data);
    };

    return (
        <div>
            <h2>Edit Supplier</h2>
            <form onSubmit={(e) => onSubmit(e)}>
                <div>
                    <label htmlFor='username'>UserName</label>
                    <input
                        type='text'
                        placeholder='Enter username'
                        name='username'
                        value={username}
                        onChange={(e) => onInputChange(e)}
                    />
                </div>
                <br />
                <div>
                    <label htmlFor='phone'>Phone</label>
                    <input
                        type='text'
                        placeholder='Enter phone'
                        name='phone'
                        value={phone}
                        onChange={(e) => onInputChange(e)}
                    />
                </div>
                <br />
                <div>
                    <label htmlFor='companyName'>contact name</label>
                    <input
                        type='text'
                        placeholder='Enter contact name'
                        name='companyName'
                        value={companyName}
                        onChange={(e) => onInputChange(e)}
                    />
                </div>
                <br />
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='text'
                        placeholder='Enter email'
                        name='email'
                        value={email}
                        onChange={(e) => onInputChange(e)}
                    />
                </div>
                <br />
                <button type='submit'  className="link-button">Submit</button>
                <br />
                <Link to='/suppliers'  className="link-button">Cancel</Link>
            </form>
        </div>
    );
}

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import '../App.css'
export default function EditManufacturer() {
    let navigate = useNavigate();
    const { id } = useParams();
    const [user, setUser] = useState({
        username: "",
        phone: "",
        email: "",
        location:""
    });

    const {username,phone,email,location } = user;

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        loadUser();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8080/manufacturer/${id}`, user);
        navigate("/manufacturers");
    };

    const loadUser = async () => {
        const result = await axios.get(`http://localhost:8080/manufacturer/${id}`);
        setUser(result.data);
    };

    return (
        <div>
            <h2>Edit User</h2>
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
                <div>
                    <label htmlFor='location'>Email</label>
                    <input
                        type='text'
                        placeholder='Enter location'
                        name='location'
                        value={location}
                        onChange={(e) => onInputChange(e)}
                    />
                </div>
                <br />
                <button type='submit'  className="link-button">Submit</button>
                <br />
                <Link to='/manufacturers'  className="link-button">Cancel</Link>
            </form>
        </div>
    );
}

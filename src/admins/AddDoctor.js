import React, { useState } from 'react';
import axios from "axios";
import '../App.css';
import './AddDoctor.css'; // Import the new CSS file
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function AddDoctor() {
    let navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        username: "",
        specialization: ""
    });
    const { name, username, specialization } = user;

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8080/admin", user);
        navigate("/home");
    };

    return (
        <div className='container'>
            <div className='form-container'>
                <h2>Register User</h2>
                <form onSubmit={(e) => onSubmit(e)}>
                    <div>
                        <label htmlFor='Name'>Name</label>
                        <input type='text' placeholder='Enter name' name='name' value={name} onChange={(e) => onInputChange(e)} />
                    </div>
                    <div>
                        <label htmlFor='UserName'>UserName</label>
                        <input type='text' placeholder='Enter username' name='username' value={username} onChange={(e) => onInputChange(e)} />
                    </div>
                    <div>
                        <label htmlFor='specialization'>Specialization</label>
                        <input type='text' placeholder='Enter specialization' name='specialization' value={specialization} onChange={(e) => onInputChange(e)} />
                    </div>
                    <button type='submit' className="link-button">Submit</button>
                    <Link to='/home' className="link-button cancel">Cancel</Link>
                </form>
            </div>
        </div>
    )
}

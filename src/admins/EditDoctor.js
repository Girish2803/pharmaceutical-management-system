import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import '../App.css';
import './EditDoctor.css'; // Import the new CSS file

export default function EditDoctor() {
    let navigate = useNavigate();
    const { id } = useParams();
    const [user, setUser] = useState({
        name: "",
        username: "",
        specialization: ""
    });

    const { name, username, specialization } = user;

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        loadUser();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8080/admin/${id}`, user);
        navigate("/home");
    };

    const loadUser = async () => {
        const result = await axios.get(`http://localhost:8080/admin/${id}`);
        setUser(result.data);
    };

    return (
        <div className='container'>
            <div className='form-container'>
                <h2>Edit User</h2>
                <form onSubmit={(e) => onSubmit(e) } className='form-gt'>
                    <div>
                        <label htmlFor='name'>Name</label>
                        <input
                            type='text'
                            placeholder='Enter name'
                            name='name'
                            value={name}
                            onChange={(e) => onInputChange(e)}
                        />
                    </div>
                    <br />
                    <div>
                        <label htmlFor='username'>Username</label>
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
                        <label htmlFor='specialization'>Specialization</label>
                        <input
                            type='text'
                            placeholder='Enter specialization'
                            name='specialization'
                            value={specialization}
                            onChange={(e) => onInputChange(e)}
                        />
                    </div>
                    <br />
                    <button type='submit' className="link-button">Submit</button>
                    <Link to='/home' className="link-button cancel">Cancel</Link>
                </form>
            </div>
        </div>
    );
}

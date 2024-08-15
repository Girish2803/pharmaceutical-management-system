import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import '../App.css'
export default function EditPharmacist() {
    let navigate = useNavigate();
    const { id } = useParams();
    const [user, setUser] = useState({
        username: "",
        phone: "",
        specialization: "",
        licenseId:""
    });

    const {username,phone,specialization,licenseId } = user;

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        loadUser();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8080/pharmacist/${id}`, user);
        navigate("/pharmacists");
    };

    const loadUser = async () => {
        const result = await axios.get(`http://localhost:8080/pharmacist/${id}`);
        setUser(result.data);
    };

    return (
        <div>
            <h2>Edit Pharmacist</h2>
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
                <div>
                    <label htmlFor='licenseId'>LicenseId</label>
                    <input
                        type='text'
                        placeholder='Enter licesneId'
                        name='licenseId'
                        value={licenseId}
                        onChange={(e) => onInputChange(e)}
                    />
                </div>
                <br />
                <button type='submit'  className="link-button">Submit</button>
                <br />
                <Link to='/pharmacists'  className="link-button">Cancel</Link>
            </form>
        </div>
    );
}

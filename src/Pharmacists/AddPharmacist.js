import React, { useState} from 'react';
import axios from "axios"
import '../App.css'
import './AddPharmacist.css'
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom'
export default function AddPharmacist() {
    let navigate=useNavigate()
    const [user,setUser]=useState({
        username:"",
        phone:"",
        specialization:"",
        licenseId:""
    })
    const{username,phone,specialization,licenseId}=user

    const onInputChange=(e)=>{
    setUser({...user,[e.target.name]:e.target.value})
    }

    const onSubmit=async(e)=>{
    e.preventDefault()
   await axios.post("http://localhost:8080/pharmacist",user)
   navigate("/pharmacists")
    };
  return (
    <div className='container'>
       <form onSubmit={(e)=>onSubmit(e)}>
            <div>
                <label htmlFor='username'>UserName</label>
                <input type='text' placeholder='enter username' name='username' value={username} onChange={(e)=>onInputChange(e)}></input>
            </div><br></br>
            <div>
                <label htmlFor='phone'>Phone</label>
                <input type='text' placeholder='enter phone number' name='phone' value={phone}  onChange={(e)=>onInputChange(e)}></input>
            </div><br></br>
            <div>
                <label htmlFor='specialization'>Email</label>
                <input type='text' placeholder='enter specialization' name='specialization' value={specialization}  onChange={(e)=>onInputChange(e)}></input>
            </div><br></br>
            <div>
                <label htmlFor='licenseId'>Location</label>
                <input type='text' placeholder='enter licenseId' name='licenseId' value={licenseId}  onChange={(e)=>onInputChange(e)}></input>
            </div><br></br>
            <button type='submit'  className="link-button">Submit</button>
            <br>
            </br>
            <center><Link to='/pharmacists'  className="linkbuttonred">Cancel</Link></center>
            </form>
    </div>
  )
}


import React, { useState} from 'react';
import axios from "axios"
import '../App.css'
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom'
export default function AddManufacturer() {
    let navigate=useNavigate()
    const [user,setUser]=useState({
        username:"",
        phone:"",
        email:"",
        location:""
    })
    const{username,phone,email,location}=user

    const onInputChange=(e)=>{
    setUser({...user,[e.target.name]:e.target.value})
    }

    const onSubmit=async(e)=>{
    e.preventDefault()
   await axios.post("http://localhost:8080/manufacturer",user)
   navigate("/manufacturers")
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
                <label htmlFor='email'>Email</label>
                <input type='text' placeholder='enter email' name='email' value={email}  onChange={(e)=>onInputChange(e)}></input>
            </div><br></br>
            <div>
                <label htmlFor='location'>Location</label>
                <input type='text' placeholder='enter location' name='location' value={location}  onChange={(e)=>onInputChange(e)}></input>
            </div><br></br>
            <button type='submit'  className="link-button">Submit</button>
            <br>
            </br>
            <Link to='/manufacturers'  className="link-button">Cancel</Link>
            </form>
    </div>
  )
}

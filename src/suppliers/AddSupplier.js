import React, { useState} from 'react';
import axios from "axios"
import '../App.css'
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom'
export default function AddSupplier() {
    let navigate=useNavigate()
    const [user,setUser]=useState({
        username:"",
        phone:"",
        companyName:"",
        email:""
    })
    const{username,phone,companyName,email}=user

    const onInputChange=(e)=>{
    setUser({...user,[e.target.name]:e.target.value})
    }

    const onSubmit=async(e)=>{
    e.preventDefault()
   await axios.post("http://localhost:8080/supplier",user)
   navigate("/suppliers")
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
                <label htmlFor='contactName'>Company Name</label>
                <input type='text' placeholder='enter contact name' name='companyName' value={companyName}  onChange={(e)=>onInputChange(e)}></input>
            </div><br></br>
            <div>
                <label htmlFor='email'>email</label>
                <input type='text' placeholder='enter email' name='email' value={email}  onChange={(e)=>onInputChange(e)}></input>
            </div><br></br>
            <button type='submit'  className="link-button">Submit</button>
            <br>
            </br>
            <Link to='/suppliers'  className="link-button">Cancel</Link>
            </form>
    </div>
  )
}

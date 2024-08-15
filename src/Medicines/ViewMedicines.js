import React from 'react'
import { useState,useEffect } from 'react'
import axios from "axios";
import {Link, useParams} from 'react-router-dom';

export default function ViewMedicines() {
    const [user,setUser]=useState({
        name:"",
        manufacture_date:"",
        expiry_date:"",
        price:"",
        quantity:"",
    })
    const {id}=useParams();
    useEffect(()=>{
     loadMedicine()
    },[])
    const loadMedicine=async()=>{
        const result=await axios.get(`http://localhost:8080/medicine/${id}`)
        setUser(result.data)
    }
  return (
    <div className='container'>
     <div>
      <center> <h2 >Medicine Details</h2></center>
      <div>
        <div><h2>Details of Medicine id:{user.id}</h2></div>
        <ul>
            <li>
                <b>Name:</b>
                {user.name}
            </li>
            <li>
                <b>Manufacture date:</b>
                {user.manufacture_date}
            </li>
            <li>
                <b>Expiry date:</b>
                {user.expiry_date}
            </li>
            <li>
                <b>Price for unit:</b>
                {user.price}
            </li>
            <li>
                <b>Quantity:</b>
                {user.quantity}
            </li>
        </ul>
      </div>
     <button> <Link  to={"/medicines"}>Back to home</Link></button>
      </div>
      
      </div>
  )
}
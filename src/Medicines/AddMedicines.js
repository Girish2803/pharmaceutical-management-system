import React, { useState } from 'react'
import axios from "axios";
import { Link,useNavigate } from 'react-router-dom';
export default function AddMedicines() {
    let navigate=useNavigate()
    const [user,setUser]=useState({
        name:"",
        manufacture_date:"",
        expiry_date:"",
        price:"",
        quantity:"",
    })
    const{name,manufacture_date,expiry_date,price,quantity}=user
    const onInputChange=(e)=>{
      setUser({...user,[e.target.name]:e.target.value})
    }
    const onSubmit=async(e)=>{
  e.preventDefault();
  await axios.post("http://localhost:8080/medicine",user);
navigate("/medicines");
    }
  return (
    <div>
     <div>
      <center> <h2 >Add Medicine</h2></center> 
     </div>
     <form onSubmit={(e)=>onSubmit(e)}>
     <div>
     <label htmlFor="name">Name</label>
     <input type={"text"} placeholder="Enter the Medicine name" name="name" value={name} onChange={(e)=>onInputChange(e)}/>
     </div>
     <div>
     <label htmlFor="manufacture_date">Manufacture date</label>
     <input type={"text"} placeholder="Enter the Manufacture date" name="manufacture_date" value={manufacture_date} onChange={(e)=>onInputChange(e)}/>
     </div>
     <div>
     <label htmlFor="expiry_date">Expiry date</label>
     <input type={"text"} placeholder="Enter the Expiry date" name="expiry_date" value={expiry_date} onChange={(e)=>onInputChange(e)}/>
     </div>
     <div>
     <label htmlFor="price">Price</label><br></br>
     <input type={"number"} placeholder="Enter the Price for 1 unit" name="price" value={price} onChange={(e)=>onInputChange(e)}/>
     </div>
     <div>
     <label htmlFor="quantity">Quantity</label><br></br>
     <input type={"number"} placeholder="Enter the Quantity" name="quantity" value={quantity} onChange={(e)=>onInputChange(e)}/>
     </div>
     <button type="submit" >Submit</button>
     <button><Link to="/medicines" >Cancel</Link></button></form>
    </div>
  )
}
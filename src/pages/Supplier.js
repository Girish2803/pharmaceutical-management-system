import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../App.css'
export default function Supplier() {
    const [users,setUsers]=useState([]);
    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const result = await axios.get("http://localhost:8080/suppliers");
        setUsers(result.data);
    };
    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:8080/supplier/${id}`);
        loadUsers();
    };
  return (
    <div className='container'>
       <h1>Pharmacist List</h1>
            <Link to="/addsupplier" className="link-button">Add Supplier</Link>
      <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>username</th>
                        <th>phone</th>
                        <th>companyName</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{user.username}</td>
                            <td>{user.phone}</td>
                            <td>{user.companyName}</td>
                            <td>{user.email}</td>
                            <td>
                                <Link to={`/editsupplier/${user.id}` } className="link-button">Edit</Link>
                                <Link to={`/viewsupplier/${user.id}`} className="link-button">View</Link>
                                <button onClick={() => deleteUser(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
    </div>
  )
}

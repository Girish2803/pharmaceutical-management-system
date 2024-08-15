import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './Home1.css'; // Import CSS file for styling

const Home1 = () => {
    const [expiredMedicines, setExpiredMedicines] = useState([]);
    const [expiringMedicines, setExpiringMedicines] = useState([]);

    useEffect(() => {
        loadMedicines();
    }, []);

    const loadMedicines = async () => {
        try {
            const response = await axios.get('http://localhost:8080/medicines');
            const allMedicines = response.data;

            const today = moment().startOf('day');
            const oneMonthLater = moment().add(1, 'month').startOf('day');

            const expired = [];
            const expiring = [];

            allMedicines.forEach(medicine => {
                const expiryDate = moment(medicine.expiry_date).startOf('day');

                if (expiryDate.isBefore(today)) {
                    expired.push(medicine);
                } else if (expiryDate.isBetween(today, oneMonthLater)) {
                    expiring.push(medicine);
                }
            });

            setExpiredMedicines(expired);
            setExpiringMedicines(expiring);
        } catch (error) {
            console.error('Error fetching medicines:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/medicine/${id}`);
            loadMedicines();
        } catch (error) {
            console.error('Error deleting medicine:', error);
        }
    };

    return (
        <div className='container'>
            <div className='py-4'>
                <div>
                {expiredMedicines.length === 0 ? (
                    <h2>No Expired Medicines</h2>
                ) : (
                    <div>
                        <h2>Expired Medicines</h2>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Manufacture Date</th>
                                    <th>Expiry Date</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Actions</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {expiredMedicines.map((medicine, index) => (
                                    <tr key={index}>
                                        <td>{medicine.name}</td>
                                        <td>{medicine.manufacture_date}</td>
                                        <td>{medicine.expiry_date}</td>
                                        <td>{medicine.price}</td>
                                        <td>{medicine.quantity}</td>
                                        <td>
                                            <button className="delete-btn" onClick={() => handleDelete(medicine.id)}>Delete</button>
                                            <button className="view-btn"><Link to={`/viewmedicine/${medicine.id}`}>View</Link></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
</div>
                {expiringMedicines.length === 0 ? (
                    <h2>No Expiring Medicines Within a Month</h2>
                ) : (
                    <div>
                        <h2>Expiring Medicines Within a Month</h2>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Manufacture Date</th>
                                    <th>Expiry Date</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {expiringMedicines.map((medicine, index) => (
                                    <tr key={index}>
                                        <td>{medicine.name}</td>
                                        <td>{medicine.manufacture_date}</td>
                                        <td>{medicine.expiry_date}</td>
                                        <td>{medicine.price}</td>
                                        <td>{medicine.quantity}</td>
                                        <td>
                                            <button className="delete-btn" onClick={() => handleDelete(medicine.id)}>Delete</button>
                                            <button className="view-btn"><Link to={`/viewmedicines/${medicine.id}`}>View</Link></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

<button className="back-btn"> <Link  to={"/medicines"}>Back to home</Link></button>

            </div>
        </div>
    );
};

export default Home1;

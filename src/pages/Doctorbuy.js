import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Doctorbuy.css';

const Doctorbuy = () => {
    const [medicines, setMedicines] = useState([]);
    const [quantityInputs, setQuantityInputs] = useState({});

    useEffect(() => {
        loadMedicines();
    }, []);

    const loadMedicines = async () => {
        try {
            const response = await axios.get('http://localhost:8080/pharmacistskemedicines');
            setMedicines(response.data);
        } catch (error) {
            console.error('Error fetching medicines:', error);
        }
    };

    const handleInputChange = (e, medicineId) => {
        setQuantityInputs({
            ...quantityInputs,
            [medicineId]: e.target.value
        });
    };

    const handleBook = async (medicine) => {
        const inputQuantity = quantityInputs[medicine.id];

        if (!inputQuantity || inputQuantity <= 0) {
            alert('Please enter a valid quantity');
            return;
        }

        if (inputQuantity > medicine.quantity) {
            alert(`Quantity entered is more than available for ${medicine.name}`);
            return;
        }

        try {
            const orderData = {
                name: medicine.name,
                price: medicine.price,
                quantity: inputQuantity
            };

            await axios.post('http://localhost:8080/pharmacistrorder', orderData);

            alert(`Booked ${medicine.name} successfully`);

            // Update the medicines state to reflect the new quantity
            setMedicines(medicines.map(m => 
                m.id === medicine.id ? { ...m, quantity: m.quantity - inputQuantity } : m
            ));
        } catch (error) {
            console.error('Error booking medicine:', error);
        }
    };

    return (
        <div>
            <h2>Available Medicines</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Available Quantity</th>
                        <th>Quantity to Book</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {medicines.map(medicine => (
                        <tr key={medicine.id}>
                            <td>{medicine.name}</td>
                            <td>{medicine.price}</td>
                            <td>{medicine.quantity}</td>
                            <td>
                                <input 
                                    type="number" 
                                    min="1" 
                                    value={quantityInputs[medicine.id] || ''} 
                                    onChange={(e) => handleInputChange(e, medicine.id)} 
                                />
                            </td>
                            <td>
                                <button onClick={() => handleBook(medicine)}>Book</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Doctorbuy;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function POS() {
  const [approvedOrders, setApprovedOrders] = useState([]);
  const [doctorKeMedicines, setDoctorKeMedicines] = useState([]);
  const [pharmacistKeMedicines, setPharmacistKeMedicines] = useState([]);

  useEffect(() => {
    fetchApprovedOrders();
    fetchDoctorKeMedicines();
    fetchPharmacistKeMedicines();
  }, []);

  const fetchApprovedOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8080/approvedorders');
      setApprovedOrders(response.data);
    } catch (error) {
      console.error('Error fetching approved orders:', error);
    }
  };

  const fetchDoctorKeMedicines = async () => {
    try {
      const response = await axios.get('http://localhost:8080/doctorkemedicines');
      setDoctorKeMedicines(response.data);
    } catch (error) {
      console.error('Error fetching doctor ke medicines:', error);
    }
  };

  const fetchPharmacistKeMedicines = async () => {
    try {
      const response = await axios.get('http://localhost:8080/pharmacistskemedicines');
      setPharmacistKeMedicines(response.data);
    } catch (error) {
      console.error('Error fetching pharmacist ke medicines:', error);
    }
  };

  const aggregateData = (data) => {
    const dataMap = data.reduce((acc, item) => {
      if (acc[item.name]) {
        acc[item.name] += item.quantity;
      } else {
        acc[item.name] = item.quantity;
      }
      return acc;
    }, {});

    const labels = Object.keys(dataMap);
    const quantities = Object.values(dataMap);

    return {
      labels,
      datasets: [
        {
          label: 'Total Quantity Sold',
          data: quantities,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
        <div style={{ flex: '1 1 45%', minWidth: '300px', margin: '10px' }}>
          <h2>Approved Orders Quantity Chart</h2>
          <Bar
            data={aggregateData(approvedOrders)}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Approved Orders Quantity Chart',
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'Quantity',
                  },
                },
                x: {
                  title: {
                    display: true,
                    text: 'Medicines',
                  },
                },
              },
            }}
          />
        </div>

        <div style={{ flex: '1 1 45%', minWidth: '300px', margin: '10px' }}>
          <h2>Doctor Medicines Quantity Chart</h2>
          <Bar
            data={aggregateData(doctorKeMedicines)}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Doctor Medicines Quantity Chart',
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'Quantity',
                  },
                },
                x: {
                  title: {
                    display: true,
                    text: 'Medicines',
                  },
                },
              },
            }}
          />
        </div>
      </div>

      <div style={{ flex: '1 1 90%', minWidth: '300px', margin: '10px' }}>
        <h2>Pharmacist Medicines Quantity Chart</h2>
        <Bar
          data={aggregateData(pharmacistKeMedicines)}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Pharmacists Medicines Quantity Chart',
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Quantity',
                },
              },
              x: {
                title: {
                  display: true,
                  text: 'Medicines',
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
}

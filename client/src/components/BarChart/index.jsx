import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);


const BarChart = ({ data, label }) => {
    const options = {
        responsive: true,
        maintainAspectRatio : false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: label,
            }
        },
    };

    const barChartData = {
        labels: data.map((entry, index) => entry.label || index),
        datasets: [
            {
                label: label,
                data: data.map((entry) => entry.count),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    return <Bar options={options} data={barChartData} />;
}

export default BarChart
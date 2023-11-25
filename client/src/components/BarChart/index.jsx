import React, { useEffect } from 'react'
import Chart from 'chart.js/auto';

const BarChart = ({ data, label }) => {

    const renderBarChart = (data, label) => {
        const ctx = document.getElementById('barChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
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
            },
        });
    };

    useEffect(() => {
        renderBarChart(data, label);
    }, []);

    return (
        <canvas id="barChart" width="300" height="200"></canvas>
    )
}

export default BarChart
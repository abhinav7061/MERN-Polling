import React, { useEffect } from 'react'
import Chart from 'chart.js/auto';

const LineChart = ({ data, label }) => {

    const renderLineChart = (data, label) => {
        const ctx = document.getElementById('lineChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map((entry, index) => entry.label || index),
                datasets: [
                    {
                        label: label,
                        data: data.map((entry) => entry.count),
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                        fill: false,
                    },
                ],
            },
        });
    };

    useEffect(() => {
        renderLineChart(data, label);
    }, []);

    return (
        <canvas id="lineChart" width="300" height="200"></canvas>
    )
}

export default LineChart
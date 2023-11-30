import React, { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto';

const BarChart = ({ data, label }) => {
    const barCanvasRef = useRef(null);

    const renderBarChart = (data, label) => {
        const ctx = barCanvasRef.current.getContext('2d');
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
    }, [data, label]);

    return <canvas ref={barCanvasRef} width="300" height="200"></canvas>;
}

export default BarChart
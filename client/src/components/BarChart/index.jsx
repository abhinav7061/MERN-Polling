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
import clampText, { wrapText } from '../../utilities/clampText';
import useMediaQuery from '../../Hooks/useMediaQuery';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);


const BarChart = ({ data, label, title, footer, xAxisTitle, yAxisTitle, borderColor = 'rgba(75, 192, 192, 1)', backgroundColor = 'rgba(75, 192, 192, 0.2)', }) => {
    const isSmallScreen = useMediaQuery("(max-width: 500px)");
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: title,
                text: title,
            },
            tooltip: {
                callbacks: {
                    footer,
                }
            }
        },
        interaction: {
            mode: 'nearest',
            intersect: false,
            axis: 'x'
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: xAxisTitle,
                },
                ticks: {
                    autoSkip: false,
                    callback: function (value) {
                        return clampText(this.getLabelForValue(value), isSmallScreen ? 7 : 15);
                    }
                }
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: yAxisTitle,
                },
                ticks: {
                    beginAtZero: true,
                    callback: function (value) {
                        if (value % 1 === 0 && value > 0) {
                            return value;
                        }
                    }
                }
            },
        }
    };

    const barChartData = {
        labels: data.map((entry, index) => wrapText(entry.label, isSmallScreen ? 45 : 60) || index),
        datasets: [
            {
                label: label,
                data: data.map((entry) => entry.count),
                borderColor,
                backgroundColor,
                borderWidth: 1,
            },
        ],
    };

    return <Bar options={options} data={barChartData} />;
}

export default BarChart
import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2'
import clampText, { wrapText } from '../../utilities/clampText';
import useMediaQuery from '../../Hooks/useMediaQuery';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const LineChart = ({ data, label, title, footer, xAxisTitle, yAxisTitle, borderColor = 'rgba(255, 99, 132, 1)', backgroundColor = 'rgba(255, 99, 132, 0.2)' }) => {
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
        animations: {
            radius: {
                duration: 500,
                easing: 'linear',
                loop: (context) => context.active
            }
        },
        hoverRadius: 8,
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

    const lineChartData = {
        labels: data.map((entry) => wrapText(entry.label, isSmallScreen ? 50 : 75) || ''),
        datasets: [
            {
                label: label,
                data: data.map((entry) => entry.count),
                borderColor,
                backgroundColor,
                borderWidth: 1,
                fill: true,
                tension: 0.4,
            },
        ],
    };

    return <Line options={options} data={lineChartData} />;
}

export default LineChart
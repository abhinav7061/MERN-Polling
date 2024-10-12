import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import useMediaQuery from '../../Hooks/useMediaQuery';
import { wrapText } from '../../utilities/clampText';

ChartJS.register(ArcElement, Tooltip, Legend);

const createLegendList = (chart, id) => {
    const legendContainer = document.getElementById(id);
    let listContainer = legendContainer.querySelector('ul');

    if (!listContainer) {
        listContainer = document.createElement('ul');
        listContainer.style.display = 'flex';
        listContainer.style.justifyContent = "center"
        listContainer.style.gap = "0px 5px";
        listContainer.style.flexWrap = 'wrap';
        listContainer.style.margin = 0;
        listContainer.style.padding = 0;


        legendContainer.appendChild(listContainer);
    }

    return listContainer;
};

const htmlLegendPlugin = {
    id: 'htmlLegend',
    afterUpdate(chart, args, options) {
        const ul = createLegendList(chart, options.containerID);

        // Remove old legend items
        while (ul.firstChild) {
            ul.firstChild.remove();
        }

        // Reuse the built-in legendItems generator
        const items = chart.options.plugins.legend.labels.generateLabels(chart);

        items.forEach(item => {
            const li = document.createElement('li');
            li.style.alignItems = 'center';
            li.style.cursor = 'pointer';
            li.style.display = 'flex';
            li.style.flexDirection = 'row';
            li.style.marginLeft = '10px';

            li.onclick = () => {
                const { type } = chart.config;
                if (type === 'pie' || type === 'doughnut') {
                    chart.toggleDataVisibility(item.index);
                } else {
                    chart.setDatasetVisibility(item.datasetIndex, !chart.isDatasetVisible(item.datasetIndex));
                }
                chart.update();
            };

            // Color box
            const boxSpan = document.createElement('span');
            boxSpan.style.background = item.fillStyle;
            boxSpan.style.borderColor = item.strokeStyle;
            boxSpan.style.borderWidth = item.lineWidth + 'px';
            boxSpan.style.display = 'block';
            boxSpan.style.flexShrink = 0;
            boxSpan.style.height = '10px';
            boxSpan.style.marginRight = '5px';
            boxSpan.style.width = '30px';

            // Text
            const textContainer = document.createElement('p');
            textContainer.style.color = item.fontColor;
            textContainer.style.margin = 0;
            textContainer.style.padding = 0;
            textContainer.style.textDecoration = item.hidden ? 'line-through' : '';

            const text = document.createTextNode(item.text);
            textContainer.appendChild(text);

            li.appendChild(boxSpan);
            li.appendChild(textContainer);
            ul.appendChild(li);
        });
    }
};

const Piechart = ({ data, label, backgroundColor, borderColor, footer, id }) => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                display: false
            },
            htmlLegend: {
                containerID: id || `${label}`,
            },
            tooltip: {
                callbacks: {
                    footer,
                }
            },
        },
    };

    const isSmallScreen = useMediaQuery("(max-width: 500px)");
    const pieData = {
        labels: data.map((entry, index) => wrapText(entry.label, isSmallScreen ? 50 : 75) || index),
        datasets: [
            {
                label: label,
                data: data.map((entry) => entry.count),
                backgroundColor,
                borderColor,
                borderWidth: 1,
            },
        ],
    };
    return (
        <div className='flex flex-col justify-between items-center w-full h-full'>
            <div id={id || `${label}`} className='p-2 text-[10px] flex-grow'></div>
            <div className='flex-grow w-full flex items-center justify-center'><Pie options={options} data={pieData} plugins={[htmlLegendPlugin]} /></div>
        </div>
    )
}

export default Piechart
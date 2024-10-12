import { useState, useCallback, useMemo } from 'react'
import LineChart from '../LineChart';
import CustomPopup from '../CustomPopup';
import Piechart from '../PieChart';
import styles from '../../styles';
import MainActionBtn from './MainActionBtn';
import { toast } from 'sonner';

const VisualizeVotes = ({ data, title, voted, ended, isPollCreator }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [showPie, setShowPie] = useState(true);
    const popupCloseHandler = () => {
        setShowPopup(false);
    };

    const graphData = data.map((item) => {
        return {
            label: item.subject,
            count: item.votes,
        }
    });

    const footer = () => {
        let sum = 0;

        data.forEach((item) => {
            sum += item.votes;
        });
        return `Total Votes: ${sum}`;
    };

    const generateColors = useCallback((numColors) => {
        const colors = new Set();
        while (colors.size < numColors) {
            const color = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`;
            colors.add(color);
        }
        return Array.from(colors);
    }, [data]);

    const backgroundColor = useMemo(() => generateColors(data.length), [data]);

    return (
        <>
            <MainActionBtn icon={<ion-icon name="pie-chart"></ion-icon>} onClick={() => {
                if (!voted && !isPollCreator) {
                    toast(ended ? 'You had not voted on this poll' : 'You have not voted on this poll. Vote first to see the result');
                    return;
                }
                setShowPopup(true);
            }} title='Result' />
            <CustomPopup
                onClose={popupCloseHandler}
                visibility={showPopup}
            >
                <div className='flex flex-col w-[80vw] max-w-[575px] h-[65vh] max-h-[575px] min-h-[250px]'>
                    <span className='w-full'>
                        <ul className='w-full flex gap-5 px-5 border-b'>
                            <li className={`p-1 font-semibold border-b-2 border-transparent ${showPie ? "text-green-600 border-green-600" : " hover:border-green-500 hover:text-green-600"} cursor-pointer ${styles.heading5}`} onClick={() => setShowPie(true)}>Pie Chart</li>
                            <li className={`p-1 font-semibold border-b-2 border-transparent ${showPie ? "hover:border-pink-500 hover:text-pink-600" : "border-pink-600 text-pink-600"} cursor-pointer ${styles.heading5}`} onClick={() => setShowPie(false)}>Line Chart</li>
                        </ul>
                        <h3 className='text-center text-sm py-2'>Q. {title}</h3>
                    </span>
                    <span className='flex items-center justify-center flex-grow w-full'>
                        {showPie ? (
                            <div className='h-full'><Piechart data={graphData} label='No Of Votes' backgroundColor={backgroundColor} borderColor={backgroundColor.map(color => color.replace('0.2', '0.5'))} footer={footer} id='lagend-container' /></div>
                        ) : (
                            <LineChart data={graphData} label='No Of Votes' xAxisTitle='Options' yAxisTitle='Numbers of Votes' footer={footer} />
                        )}
                    </span>
                </div>
            </CustomPopup>
        </>
    )
}

export default VisualizeVotes
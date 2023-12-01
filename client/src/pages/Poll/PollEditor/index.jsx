import React, { useState } from 'react'
import styles from '../../../styles'
import PollOption from './PollOption';
import { add } from '../../../assets';
import Button from '../../../components/Button';
import { toast } from 'sonner';

const PollEditor = ({ handleSubmit, initialData, type, reset }) => {
    const [question, setQuestion] = useState(initialData.question || '')
    const [description, setDescription] = useState(initialData.description || '')
    const [option, setOption] = useState('');
    const [optionList, setOptionList] = useState(initialData.optionList || []);
    const [endDate, setEndDate] = useState((initialData.endDate instanceof Date) ? (new Date(initialData.endDate)).toISOString().split('T')[0] : '')
    const addList = () => {
        if (option === "") return toast.error("You can not add a option blank");
        if (optionList.includes(option)) return toast.error("You have already added this option");
        setOptionList((olditems) => {
            return [...olditems, option];
        });
        setOption("");
    };

    const deleteItem = (id) => {
        if (optionList.length === 1) {
            toast.warning('This is last option! Delete it?', {
                action: {
                    label: 'Yes',
                    onClick: () => setOptionList((olditems) => {
                        return olditems.filter((arrElement, index) => {
                            return index !== id;
                        });
                    }),
                },
            });
        } else {
            setOptionList((olditems) => {
                return olditems.filter((arrElement, index) => {
                    return index !== id;
                });
            })
        }
    };

    const sendPollData = (e) => {
        e.preventDefault();
        if (!question || question.length < 3) return toast.error("Length of question should be min 3");
        if (!description || description.length < 5) return toast.error("Description is required and length should be at least 5 characters");
        if (!optionList || optionList.length < 2) return toast.error("Minimum two options is required");
        if (reset) {
            setQuestion('');
            setDescription("");
            setOption("");
            setOptionList([]);
            setEndDate('');
        }
        handleSubmit({ question, description, optionList, endDate })
    }
    return (
        <div className={`${styles.flexCenter}`}>
            <form onSubmit={sendPollData} className={`${styles.flexCenter} ${styles.heading5} flex-col w-full sm:w-3/5 md:h-3/4 lg:w-1/2`}>
                {/* textArea fot the taking input for the question */}
                <textarea
                    type="text"
                    placeholder="Enter your question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className='w-full p-2 md:p-4 rounded-md mb-5'
                />
                {/* textArea fot the taking input for the description */}
                <textarea
                    type="text"
                    placeholder="Enter your description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className='w-full p-2 md:p-4 rounded-md mb-5'
                />
                {/* div for adding the option */}
                <div className='flex justify-between w-full items-cente'>
                    <input
                        type="text"
                        placeholder="Enter your option"
                        value={option}
                        onChange={(e) => setOption(e.target.value)}
                        className='w-4/5 p-2 md:py-3 md:px-4 rounded-md'
                    />
                    <button type='button' title='Click to add option' onClick={addList} className={` ${styles.flexCenter} md:w-12 sm:w-11 w-8 rounded-md hover:border-slate-500 hover:border-2 md:px-3 md:py-2 p-[5px]  bg-slate-300`}><img src={add} alt="Add Option" className=' object-contain' /></button>
                </div>
                {/* div for the date */}
                <div className='flex flex-wrap gap-3 py-4 w-full items-center font-semibold'>
                    <label htmlFor="endDate">Select End Date:</label>
                    <input type="date" name="endDate" id="endDate" value={endDate} onChange={e => setEndDate(e.target.value)} className='p-2 rounded-md text-slate-600  outline-none cursor-pointer' />
                </div>

                {/* This is for showing options */}
                {optionList.length > 0 && (<div className='mt-6 w-full'>
                    <h1 className='text-[26px] font-semibold'>Your options</h1>
                    <ol className='my-6'>
                        {optionList.map((each, index) => {
                            return (
                                <div className={`${index > 0 ? 'mt-2.5' : 'mt-0'} px-3 py-1 hover:bg-slate-200 flex items-center text-[20px] rounded-md font-semibold`} key={index}>
                                    <PollOption
                                        listText={each}
                                        id={index}
                                        onSelect={deleteItem}
                                    />
                                </div>
                            );
                        })}
                    </ol>
                    <Button type={'submit'} title={`${type} poll`} styles={'px-5 py-2'} />
                </div>)}

            </form>
        </div>
    )
}

export default PollEditor
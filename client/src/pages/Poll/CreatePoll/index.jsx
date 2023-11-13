import React, { useState } from 'react'
import styles from '../../../styles'
import PollOption from './PollOption';
import { add } from '../../../assets';
import Button from '../../../components/Button';
import { toast } from 'sonner';

const CreatePoll = () => {
    const [question, setQuestion] = useState("")
    const [descripition, setDescripition] = useState("")
    const [options, setOptions] = useState("");
    const [optionList, setOptionList] = useState([]);

    const addList = () => {
        setOptionList((olditems) => {
            return [...olditems, options];
        });
        setOptions("");
    };
    const deleteItem = (id) => {
        setOptionList((olditems) => {
            return olditems.filter((arrElement, index) => {
                return index !== id;
            });
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("submitted data is:-");
        console.log({
            question,
            descripition,
            optionList,
        });
        setQuestion('');
        setDescripition("");
        setOptionList([]);
        toast.success("Your poll has been created")
    }
    return (
        <div>
            <h1 className={`${styles.heading2} mb-6`}>Create Free Poll With PollLab</h1>
            <div className={`${styles.flexCenter}`}>
                <form onSubmit={handleSubmit} className={`${styles.flexCenter} ${styles.heading5} flex-col w-full sm:w-3/5 md:h-3/4 lg:w-1/2`}>
                    {/* textArea fot the taking input for the question */}
                    <textarea
                        type="text"
                        placeholder="Enter your question"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        className='w-full p-2 md:p-4 rounded-md mb-5'
                    />
                    {/* textArea fot the taking input for the descripition */}
                    <textarea
                        type="text"
                        placeholder="Enter your descripition"
                        value={descripition}
                        onChange={(e) => setDescripition(e.target.value)}
                        className='w-full p-2 md:p-4 rounded-md mb-5'
                    />
                    {/* div for adding the option */}
                    <div className='flex justify-between w-full items-cente'>
                        <input
                            type="text"
                            placeholder="Enter your option"
                            value={options}
                            onChange={(e) => setOptions(e.target.value)}
                            className='w-4/5 p-2 md:py-3 md:px-4 rounded-md'
                        />
                        <button type='button' title='Click to add option' onClick={addList} className={` ${styles.flexCenter} md:w-12 sm:w-11 w-8 rounded-md hover:border-slate-500 hover:border-2 md:px-3 md:py-2 p-[5px]  bg-slate-300`}><img src={add} alt="Add Option" className=' object-contain' /></button>
                    </div>

                    {/* This is for showing options */}
                    {optionList.length > 0 && (<div className='mt-6 w-full'>
                        <h1 className='text-[26px] font-semibold'>Your options</h1>
                        <ol className='my-6 md:w-3/5'>
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
                        <Button type={'submit'} title={'Create poll'} styles={'px-5 py-2'} />
                    </div>)}

                </form>
            </div>
        </div >
    )
}

export default CreatePoll
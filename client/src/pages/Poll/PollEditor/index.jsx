import React, { useState } from 'react'
import styles from '../../../styles'
import PollOption from './PollOption';
import { add } from '../../../assets';
import Button from '../../../components/Button';
import { toast } from 'sonner';
import WarningPrompt from '../../../components/CustomPopup/WarningPrompt';
import { useFormik } from 'formik';
import { PollSchema } from '../../../schemas';


const PollEditor = ({ handleSubmit, initialData = { question: "", description: "", optionList: [], endDate: "" }, type, reset }) => {
    const [showPrompt, setShowPrompt] = useState(false);
    const [option, setOption] = useState('');
    const [focusedField, setFocusedField] = useState(null);

    const formik = useFormik({
        initialValues: initialData,
        validationSchema: PollSchema,
        onSubmit: (values, { resetForm }) => {
            handleSubmit(values);
            if (reset) resetForm();
        }
    });

    const addOption = () => {
        if (option.trim() === "") return toast.error("You cannot add a blank option");
        if (formik.values.optionList.includes(option.trim())) return toast.error("You have already added this option");
        formik.setFieldValue('optionList', [...formik.values.optionList, option.trim()]);
        setOption('');
    };

    const deleteOption = (index) => {
        if (formik.values.optionList.length === 1) {
            setShowPrompt(true);
        } else {
            formik.setFieldValue('optionList', formik.values.optionList.filter((_, idx) => idx !== index));
        }
    };

    const handleAcceptance = (accepted) => {
        if (accepted) {
            formik.setFieldValue('optionList', []);
        }
        setShowPrompt(false);
    };

    const handleInputOptionKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            addOption();
        }
    }

    return (
        <div className={`${styles.flexCenter}`}>
            <form onSubmit={formik.handleSubmit} className={`${styles.flexCenter} ${styles.heading5} flex-col w-full sm:w-4/5`}>
                <label className='w-full mb-5 relative'>
                    <p className={`absolute select-none cursor-text transition-all duration-300 px-1 ${(focusedField === 'question' || formik.values.question != '') ? `-top-2 md:-top-2.5 left-3 bg-slate-100 ${styles.smHeading} ${formik.touched.question && formik.errors.question ? 'text-red-500' : 'text-blue-600'}` : 'text-slate-500 left-5 top-2.5'}`}>Enter your question</p>
                    <textarea
                        name="question"
                        value={formik.values.question}
                        onChange={formik.handleChange}
                        onBlur={(e) => { setFocusedField(null); formik.handleBlur(e) }}
                        onFocus={() => setFocusedField('question')}
                        className={`w-full p-2 md:p-4 rounded-md outline-none border bg-slate-100 ${formik.touched.question && formik.errors.question ? 'border-red-500' : 'border-blue-600'}`}
                    />
                    {formik.touched.question && formik.errors.question && <div className={`text-red-500 mt-1 ${styles.smHeading} font-thin`}>{formik.errors.question}</div>}
                </label>
                <label className='w-full mb-5 relative'>
                    <p className={`absolute select-none cursor-text transition-all duration-300 px-1 ${(focusedField === 'description' || formik.values.description != '') ? `-top-2 md:-top-2.5 left-3 bg-slate-100 ${styles.smHeading} ${formik.touched.description && formik.errors.description ? 'text-red-500' : 'text-blue-600'}` : 'text-slate-500 left-5 top-2.5'}`}>Enter your description</p>
                    <textarea
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={(e) => { setFocusedField(null); formik.handleBlur(e) }}
                        onFocus={() => setFocusedField('description')}
                        className={`w-full p-2 md:p-4 rounded-md outline-none border bg-slate-100 ${formik.touched.description && formik.errors.description ? 'border-red-500' : 'border-blue-600'}`}
                    />
                    {formik.touched.description && formik.errors.description && <div className={`text-red-500 mt-1 ${styles.smHeading} font-thin`}>{formik.errors.description}</div>}
                </label>

                <div className='flex justify-between w-full items-center h-10 sm:h-[45px] md:h-[52px] lg:h-14'>
                    <label className='relative w-4/5'>
                        <p className={`absolute select-none cursor-text transition-all duration-300 px-1 ${(focusedField === 'option' || option.trim() !== '') ? `-top-2 md:-top-2.5 bg-slate-100 left-3 ${styles.smHeading} ${option.trim() === "" ? 'text-red-600' : 'text-blue-600'}` : 'text-slate-500 top-2.5 left-5'}`}>Enter your option</p>
                        <input
                            type="text"
                            value={option}
                            onFocus={() => setFocusedField('option')}
                            onBlur={() => setFocusedField(null)}
                            onChange={(e) => setOption(e.target.value)}
                            onKeyDown={handleInputOptionKeyDown}
                            className={`p-2 md:py-3 md:px-4 rounded-md outline-none border bg-slate-100 ${focusedField === "option" && option.trim() === "" ? 'border-red-500' : 'border-blue-600'} w-full`}
                        />
                    </label>
                    <button type='button' title='Click to add option' onClick={addOption} className={`${styles.flexCenter} h-full aspect-square rounded-md hover:border-slate-500 hover:border-2 md:px-3 md:py-2 p-[5px] bg-slate-300`}>
                        <img src={add} alt="Add Option" className='object-contain' />
                    </button>
                </div>

                <div className='flex flex-wrap gap-3 py-4 w-full items-center font-semibold'>
                    <label htmlFor="endDate">
                        <p className='inline-block mr-4'>Select End Date:</p>
                        <input
                            type="date"
                            name="endDate"
                            id="endDate"
                            value={formik.values.endDate}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className='p-2 rounded-md text-slate-600 outline-none cursor-pointer'
                        />
                        {formik.touched.endDate && formik.errors.endDate && <div className={`text-red-500 mt-1 ${styles.smHeading} font-thin`}>{formik.errors.endDate}</div>}
                    </label>
                </div>

                {
                    formik.values.optionList.length > 0 && (
                        <div className='mt-6 w-full'>
                            <h1 className='text-[26px] font-semibold'>Your options</h1>
                            <ol className='my-6'>
                                {formik.values.optionList.map((each, index) => (
                                    <div className={`${index > 0 ? 'mt-2.5' : 'mt-0'} px-3 py-1 hover:bg-slate-200 flex items-center text-[20px] rounded-md font-semibold`} key={index}>
                                        <PollOption listText={each} id={index} onSelect={() => deleteOption(index)} />
                                    </div>
                                ))}
                            </ol>
                            {formik.errors.optionList && <div className={`text-red-500 mb-1 ${styles.smHeading} font-thin`}>{formik.errors.optionList}</div>}
                            <Button type={'submit'} title={`${type} poll`} styles={'px-5 py-2'} />

                        </div>
                    )
                }
            </form >

            <WarningPrompt
                visibility={showPrompt}
                warningMessage='This is the last option, Are you sure you want to delete this?'
                onClose={(val) => setShowPrompt(val)}
                onAcceptance={handleAcceptance}
            />
        </div >
    );
};

export default PollEditor;

import React from 'react'

function Feature() {
    return (
        <div className='bg-yellow-300 sm:p-16 p-6 '>
            <h1 className=' underline decoration-indigo-800 decoration-4 mx-2 text font-bold text-6xl'>Features</h1>
            <p className='my-4 px-2  text-center font-medium text-4xl font-serif text-gray-900'>It’s time to interact with your audience during your presentation.
                DirectPoll offers you a real-time responsiveelement on stage.Ask
                questions, feel the pulse of your audience
                and visualize the answers as they come in, right here, right now.</p>
            <div className='flex mx-4 my-4 p-2 flex-col md:flex-row'>
                <section className=' border-solid border-4 border-gray-900 p-4 mx-2 font-medium text-2xl'>

                    <h2 className=' underline text-3xl'>Preparation</h2>
                    <p > Set up your poll in advance or on the fly.
                        Combine single as well as multiple choice
                        questions and more. Easy as a breeze with
                        DirectPoll.</p>

                </section>
                <section className=' border-solid border-4 border-gray-900 ... p-4 mx-2 text-2xl font-medium md:mt-0 mt-4'>
                    <h2 className=' underline text-3xl'>Presentation</h2>
                    <p > Include your poll in your presentation. Automatically trigger new questions and integrate live visualization of incoming answers. Easy setup, automated handling:
                        Focus on your presentation, not the technology</p>
                </section>
            </div>
        </div>
    )
}

export default Feature

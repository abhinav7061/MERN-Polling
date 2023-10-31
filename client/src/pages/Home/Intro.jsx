import React from 'react'

function Intro() {
    return (

        <div className=" bg-stone-500 sm:p-16 p-6 ">
            <div className="">
                <div className='md:flex justify-between items-center'>
                    <p className="text-center text-5xl font-extrabold text-yellow-400 my-8">
                        Create and conduct polls in a minute.
                        Use it in your flipped classroom,in your
                        lecture or just to amaze your audience.
                    </p>
                    <div className='md:ml-8'>
                        <button className="my-8 h-20 w-80 bg-indigo-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-3xl">
                            Create Poll
                        </button>
                    </div>
                </div>
                <div className='md:flex justify-between items-center my-5'>
                    <div className='my-4 flex items-center justify-center md:w-1/2'>
                        <video className="rounded-lg" autoPlay="autoplay" muted loop>
                            <source src="Videos/video.mp4" type="video/mp4"></source>
                        </video>
                    </div>
                    <div className="my-4 md:w-1/2 md:ml-6">
                        <img className='rounded-3xl' src="https://img.freepik.com/free-vector/quiz-show-concept-illustration_114360-9621.jpg?size=626&ext=jpg" alt="pic1" />
                        {/* <img className='h-80 rounded-3xl' src="https://img.freepik.com/free-psd/3d-illustration-young-man-checking-list-rendering_1150-53754.jpg?size=626&ext=jpg" alt="pic2" /> */}
                    </div>
                </div>

                {/* <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr> */}

                <div className=' pt-10'>
                    <div className='flex mb-10'>
                        <img className="rounded-l-3xl w-1/2" src="https://img.freepik.com/free-vector/instagram-poll-sticker-set_23-2150317764.jpg?size=626&ext=jpg" alt="pic1" />
                        <section className=' bg-purple-50 p-2 text-gray-700 rounded-r-3xl w-1/2 flex items-center'>
                            <p className='font-semibold md:text-2xl text-sm'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur, quia? Atque aliquid recusandae ipsum minima placeat eveniet in perferendis laborum? Magni possimus maxime sed tenetur tempora quia quaerat cum id?</p>
                        </section>
                    </div>
                    <h1 className='text-2xl font-medium underline decoration-4 decoration-blue-800 text-yellow-400'>Just take these easy steps!</h1>
                    <p className='text-center m-2 font-medium  text-white'>
                        Create and conduct polls in a minute.
                        Use it in your flipped classroom,in your
                        lecture or just to amaze your audience.
                    </p>
                    <div className='p-2 mt-4'>
                        <button className=' hover:scale-110 border-solid border-4 bg-red-800 rounded-full p-2 text-white m-2'>1.Create poll</button>
                        <button className='hover:scale-110 border-solid border-4 bg-green-700 rounded-full p-2 text-white m-2'>2.Add questions</button>
                        <button className='hover:scale-110 border-solid border-4 bg-blue-800 rounded-full p-2 text-white m-2'>3.Show off</button>
                        <br /><br />

                        <p>
                            Please check out our <a className='text-blue-400 underline decoration-2' href="#"> FAQ</a> for the most common questions. If that doesn’t help
                            don’t hesitate to contact us at <a className='text-blue-400 underline decoration-2' href="#"> help@polllab.com</a>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Intro
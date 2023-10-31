import React from 'react'

function Quote() {
  return (
    <div className='md:flex sm:p-16 p-6'>
      <div className='mb-4 md:w-1/2 flex flex-col justify-center'>
        <h1 className=' flex font-bold text-blue-600 text-4xl md:text-6xl'>Your Vote </h1>
        <h1 className='flex justify-center mr-16 font-bold text-orange-400 text-4xl md:text-6xl'>Your Choice</h1>
      </div>
      <section className=' md:w-1/2'>
        <img src="https://images.ctfassets.net/rvt0uslu5yqp/2pNqrsAVccUJnMt5IELRrt/1aea0fd09fc6f4fec6929dd647f4f24c/image.png?fm=webp&w=1200&q=75" alt="" />
      </section>
    </div>
  )
}

export default Quote
import React from 'react'

const HeroSection = () => {
  return (
    <div className='flex h-screen ml-40 justify-center items-center w-3/4'>
    <span className='w-4/6 mb-20 ml-20 text-white text-center'>
    <div className='flex flex-col justify-center items-center'>
        <span className='text-4xl font-bold'>Where Conversations Flourish: </span>
        <span className='text-4xl font-bold'>and imaginations come to</span>
        <span className='text-4xl font-bold'> life Ready to dive in?</span>
        <span className='text-4xl font-bold mb-10'>sign in now   </span>
        <button className='bg-black p-6 text-xl w-1/3 rounded-md font-bold text-white'>Get Started</button>
    </div>

    </span>
      <div className="bg-[url('chathero.png')] bg-cover bg-center h-1/2 w-1/3">
      </div>
    </div>
  )
}

export default HeroSection

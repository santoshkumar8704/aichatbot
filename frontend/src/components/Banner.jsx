import React from 'react';

const Banner = ({ clearChat }) => {
  return (
    <div className='h-[600px] flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600 text-white'>
      <div className='text-center w-[90%] flex flex-col items-between justify-between'>
        <h1 className='text-5xl font-bold mb-20'>Welcome to Accenchat</h1>
        <p className='text-lg mb-20'>
          Your friendly chatbot assistant from , here to simplify your queries and provide solutions.
        </p>
        <button 
          onClick={clearChat} 
          className='px-6 py-3 bg-white text-purple-500 font-semibold rounded-lg shadow-md hover:bg-purple-100'>
          Clear Chat
        </button>
        <p className='text-sm mt-20'>Empowering digital interactions with AI</p>
      </div>
      
    </div>
  );
};

export default Banner;

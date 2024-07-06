import React from "react";
import { Link } from "react-router-dom";

const AppFiller = () => {
  return (
    <div className="w-full h-[100%] moving-gradient">
      <h1 className="text-5xl font-bold ">Welcome to Accenchat, </h1>

      <p className="text-lg font-semibold">
      Your friendly AI companion ready to chat and create beautiful images with you!
        
      </p>
      
      <div className="mt-10">
      <h1 className="text-3xl font-bold text-center">Our services</h1>
      <div className=" flex max-lg:flex-col  h-screen items-center justify-around p-4 mb-10">
        <div className="w-1/6 max-lg:w-1/2 max-lg:mt-10  h-1/2  rounded-lg shadow-lg bg-[url('https://th.bing.com/th/id/OIP.hhPvSN3HtOWdwwezy5hQPwHaES?w=293&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7')] bg-cover bg-center flex flex-col p-4 transform transition-transform hover:scale-105">
          <Link to="/chat" className="">
            <h1 className="text-white text-3xl mb-2">Chat</h1>
            <p className="text-white mt-60 max-lg:mt-20">
              Start a conversation and get instant responses.
            </p>
          </Link>
        </div>
        <div className="w-1/6 h-1/2 max-lg:w-1/2 max-lg:mt-10  bg-[url('https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/starry-night-by-vincent-van-gogh-vincent-van-gogh.jpg')] bg-cover bg-center  rounded-lg shadow-lg flex flex-col  p-4 transform transition-transform hover:scale-105">
          <Link to="/image" className="">
            <h1 className="text-white text-3xl ">Image</h1>
            <p className="text-white mt-60  max-lg:mt-20">
              Generate and explore beautiful images.
            </p>
          </Link>
        </div>
      </div>
      </div>
    </div>
  );
};

export default AppFiller;

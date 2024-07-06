import React from "react";
import { Link } from "react-router-dom";

import HeroSection from "./HeroSection";

const AppFiller = () => {
  return (
    <div className="w-full h-[100%] moving-gradient mb-10">
      <div className="flex flex-col items-center justify-center ">
      <span className="text-5xl font-bold bg-white px-2 text-black text-center mt-10">Welcome to Accenchat, </span>

<span className="text-lg font-semibold bg-black text-white px-2">
Your friendly AI companion ready to chat and create beautiful images with you!
  
</span>
      </div>
      <HeroSection />
      
      <div className="mt-10 text-center mb-10">
      <span className="bg-white text-5xl text-black font-mono font-bold text-center">our services</span>
      </div>
      <div className=" flex max-lg:flex-col max-lg:items-center h-screen  justify-around p-4">
        <div className="w-1/6 max-md:w-1/3 max-sm:w-1/2 max-lg:mt-10  h-1/2  rounded-lg shadow-lg bg-[url('https://th.bing.com/th/id/OIP.t1ENE540iaGTpSFiPH0PXgHaHa?pid=ImgDet&w=187&h=187&c=7&dpr=1.3')] bg-cover bg-center flex flex-col p-4 transform transition-transform hover:scale-105">
          <Link to="/chat" className="">
            <h1 className="text-white text-3xl font-bold mb-2">Chat</h1>
            <p className="text-white mt-60 max-lg:mt-20">
              Start a conversation and get instant responses.
            </p>
          </Link>
        </div>
        <div className="w-1/6 h-1/2 max-md:w-1/3 max-sm:w-1/2 max-lg:w-1/2 max-lg:mt-10  bg-[url('https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/starry-night-by-vincent-van-gogh-vincent-van-gogh.jpg')] bg-cover bg-center  rounded-lg shadow-lg flex flex-col  p-4 transform transition-transform hover:scale-105">
          <Link to="/image" className="">
            <h1 className="text-white text-3xl ">Image</h1>
            <p className="text-white mt-60  max-lg:mt-20">
              Generate and explore beautiful images.
            </p>
          </Link>
        </div>
      </div>
      {/* <AppFillerBanner /> */}
      </div>
    
  );
};

export default AppFiller;

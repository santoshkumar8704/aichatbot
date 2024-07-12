import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const HeroSection = () => {
  const {isAuthenticated} = useAuth();
  return (
    <div className="flex h-screen ml-40 justify-center items-center w-3/4">
      <span className="w-4/6 mb-20 ml-20 text-white text-center max-lg:ml-0 max-lg:w-full">
        <div className="flex flex-col justify-center items-center w-3/4">
          <span className="text-3xl font-bold">
            Where Conversations Flourish:{" "}
          </span>
          <span className="text-3xl font-bold">
            and imagination come to life
          </span>
          <span className="text-xl text-gray-800 font-light mb-5">
            Welcome to a place where dreams take flight and imaginations come to
            life.dive into a world of endless conversations and transofrm your ideas into a reality.
          </span>
          {isAuthenticated ? (
            <Link to="/chat" className="">
                          <button className="bg-orange-500 p-6 text-xl w-full rounded-md font-bold text-white">
                            Get started
                          </button>
                        </Link>

          ) : (
            <Link to="/login" className="">
            <button className="bg-orange-500 p-6 text-xl w-full rounded-md font-bold text-white">
              Get Started
            </button>
          </Link>
          )}
        </div>
      </span>
      <div className="flex justify-center items-center bg-cover bg-center h-1/2 w-auto rounded-full overflow-hidden max-lg:hidden">
        <div className="h-full w-full rounded-full overflow-hidden">
          <img
            src="https://www.kantar.com/-/media/project/kantar/global/articles/images/2019/artificial-intelligence-ai.jpg"
            alt="Background"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

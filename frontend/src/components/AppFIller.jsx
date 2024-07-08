import React from "react";
import { Link } from "react-router-dom";
import HeroSection from "./HeroSection";
import Card from "./Card";

const AppFiller = () => {
  return (
    <div className="w-full  h-[100%] moving-gradient mb-10">
      <div className="flex flex-col items-center justify-center ">
        <span className="text-5xl font-bold bg-white px-2 text-black text-center mt-10">
          Welcome to <span className="">Accenchat,</span>
        </span>
        <span className="text-lg font-semibold bg-black text-white px-2">
          Your friendly AI companion ready to chat and create beautiful images with you!
        </span>
      </div>
      <HeroSection />
      <div className="mt-10 text-center mb-10">
        <span className="bg-white text-5xl text-black font-mono font-bold text-center">
          our services
        </span>
      </div>
      <div className="flex max-lg:flex-col max-lg:items-center h-screen justify-around p-4">
        <Card
          title="Chat"
          description="Start a conversation and get instant responses."
          link="/chat"
          imageUrl="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnFrbTFiaXhjMXg4MWI4ejlkZTJvZnJvb3U3MncyNTdhcjhrczRmciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/27bY60liFpCScDJozd/giphy.webp"
        />
        <Card
          title="Image"
          description="Generate and explore beautiful images."
          link="/image"
          imageUrl="https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/starry-night-by-vincent-van-gogh-vincent-van-gogh.jpg"
        />
      </div>
    </div>
  );
};

export default AppFiller;

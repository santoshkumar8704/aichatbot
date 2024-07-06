import React from "react";

const GeneratedImage = ({ imageUrl }) => {
  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md mb-8">
      {imageUrl && (
        <div className="flex justify-center">
          <img src={imageUrl} alt="Generated Image" className="max-w-full" />
        </div>
      )}
    </div>
  );
};

export default GeneratedImage;

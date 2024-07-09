import React from 'react';

const ImageContainer = ({ url }) => {
  return (
    <div className="w-1/5 h-64 overflow-hidden rounded-lg shadow-lg">
      <img src={url} alt="Image" className="w-full h-full object-cover" />
    </div>
  );
};

export default ImageContainer;

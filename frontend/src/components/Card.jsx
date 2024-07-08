import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ title, description, link, imageUrl }) => {
  return (
    <div
      className="w-1/6 max-md:w-1/3 max-sm:w-1/2 max-lg:w-1/2 max-lg:mt-10 h-1/2 rounded-lg shadow-lg bg-cover bg-center flex flex-col p-4 transform transition-transform hover:scale-105"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <Link to={link} className="">
        <h1 className="text-3xl font-bold mb-2 text-white">{title}</h1>
        <p className="mt-60 font-semibold text-white max-lg:mt-20">
          {description}
        </p>
      </Link>
    </div>
  );
};

export default Card;

import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 h-40 text-white py-4">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src="logobot.png" className="h-8" alt="Logo" />
          <h1 className="text-lg font-bold ml-2">Accenchat</h1>
        </div>
        <div className="text-gray-300">
          &copy; 2024 AccenChat. All rights reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;

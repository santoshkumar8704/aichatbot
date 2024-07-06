import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation(); // useLocation hook to get current URL path

  // Determine if the active tab is "home" based on the pathname
  const isActiveHome = pathname === "/";

  // Determine if the pathname is "/image"

  return (
    <nav
      className={`sticky top-0 z-10 ${
        isActiveHome ? "moving-gradient" : "bg-white"
      } backdrop-filter backdrop-blur-lg bg-opacity-30 `}
    >
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/">
            <div className="flex items-center">
              <img src="logobot.png" className="h-10" alt="Logo" />
              <h1 className="text-2xl font-bold text-gray-600 ml-4">
                Accenchat
              </h1>
            </div>
          </Link>
          <div className="flex space-x-4 text-gray-600">
            <Link to="/">Home</Link>
            <Link to="/image">Image Generator</Link>
            <Link to="/chat">Chat</Link>
            <a href="#">Contact</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

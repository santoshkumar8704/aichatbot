import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from './AuthProvider';

const Navbar = () => {
  const { pathname } = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActiveHome = pathname === "/";

  return (
    <nav
      className={`sticky top-0 z-10 ${
        isActiveHome ? "moving-gradient" : "bg-white"
      } ${
        isActiveHome ? "text-white" : "text-gray-600"
      } backdrop-filter backdrop-blur-lg bg-opacity-30`}
    >
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex max-lg:flex-col items-center justify-between h-16">
          <Link to="/">
            <div className="flex items-center">
              <img src="accenchatlogo-removebg-preview.png" className="h-20" alt="Logo" />
              <h1 className="text-2xl font-bold ">
                Accenchat
              </h1>
            </div>
          </Link>
          <div className="flex space-x-4 max-lg:space-x-11 font-bold text-lg max-lg:pb-5">
            <Link to="/">Home</Link>
            {isAuthenticated && (
              <>
                <Link to="/image">Image Generator</Link>
                <Link to="/chat">Chat</Link>
                <button
                  onClick={handleLogout}
                  
                >
                  Logout
                </button>
              </>
            )}
            {!isAuthenticated && (
              <>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

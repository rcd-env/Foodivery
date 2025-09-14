import React, { useState } from "react";
import { Link } from "react-router";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="h-16 w-full px-8 sm:px-36 text-[14.4px] bg-[#1A202C] flex justify-between items-center shadow-md fixed z-50 top-0">
      <div>
        <Link to="/" onClick={closeMenu}>
          <h1 className="text-xl font-semibold tracking-widest text-orange-500">
            Foodivery
          </h1>
        </Link>
      </div>

      <div className="hidden bg-[#1A202C] sm:flex gap-12 font-light">
        <Link
          to="/user/register"
          className="text-green-500 hover:text-green-600"
        >
          Register
        </Link>
        <Link to="/user/login" className="text-green-500 hover:text-green-600">
          Login
        </Link>
      </div>

      <button
        className="block bg-[#1A202C] sm:hidden cursor-pointer"
        onClick={toggleMenu}
      >
        <div className="w-6 h-6 flex flex-col justify-center items-center relative">
          <span
            className={`w-full h-0.5 bg-white absolute transition-all duration-300 ${
              isMenuOpen ? "rotate-45" : "-translate-y-2"
            }`}
          ></span>
          <span
            className={`w-full h-0.5 bg-white transition-all duration-300 ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`w-full h-0.5 bg-white absolute transition-all duration-300 ${
              isMenuOpen ? "-rotate-45" : "translate-y-2"
            }`}
          ></span>
        </div>
      </button>

      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-[#1A202C] shadow-md block sm:hidden">
          <div className="flex flex-col gap-4 font-light px-8 pt-2 pb-4">
            <Link
              to="/user/register"
              className="text-green-500 hover:text-blue-400"
              onClick={closeMenu}
            >
              Register
            </Link>
            <Link
              to="/user/login"
              className="text-green-500 hover:text-blue-400"
              onClick={closeMenu}
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

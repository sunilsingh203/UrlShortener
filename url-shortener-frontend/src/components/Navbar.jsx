import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const path = useLocation().pathname;

  const toggleNavbar = () => setNavbarOpen(!navbarOpen);

  return (
    <header className="bg-custom-gradient sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-14 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-white text-2xl font-bold italic tracking-wide">
          Linklytics
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden sm:flex gap-10 items-center">
          <NavLink to="/" currentPath={path} label="Home" />
          <NavLink to="/about" currentPath={path} label="About" />
          <Link
            to="/register"
            className="bg-rose-700 text-white px-4 py-2 rounded-md hover:bg-rose-600 transition"
          >
            Sign Up
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleNavbar}
          className="sm:hidden text-white text-3xl focus:outline-none"
          aria-label="Toggle menu"
        >
          {navbarOpen ? <RxCross2 /> : <IoIosMenu />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`sm:hidden transition-all duration-300 ease-in-out overflow-hidden bg-custom-gradient px-4 ${
          navbarOpen ? "max-h-60 py-4" : "max-h-0 py-0"
        }`}
      >
        <ul className="flex flex-col gap-4 text-white">
          <NavLink to="/" currentPath={path} label="Home" mobile />
          <NavLink to="/about" currentPath={path} label="About" mobile />
          <Link
            to="/register"
            className="bg-rose-700 text-white px-4 py-2 rounded-md hover:bg-rose-600 transition text-center"
          >
            Sign Up
          </Link>
        </ul>
      </div>
    </header>
  );
};

// Reusable NavLink component
const NavLink = ({ to, label, currentPath, mobile = false }) => {
  const isActive = currentPath === to;
  return (
    <li>
      <Link
        to={to}
        className={`transition-colors duration-200 ${
          isActive
            ? "text-white font-semibold"
            : mobile
            ? "text-gray-200"
            : "text-slate-200 hover:text-white"
        }`}
      >
        {label}
      </Link>
    </li>
  );
};

export default Navbar;

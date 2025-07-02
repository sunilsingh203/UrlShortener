import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useStoreContext } from "../contextApi/ContextApi";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken } = useStoreContext();
  const path = useLocation().pathname;
  const [navbarOpen, setNavbarOpen] = useState(false);

  const onLogOutHandler = () => {
    setToken(null);
    localStorage.removeItem("JWT_TOKEN");
    navigate("/login");
  };

  const toggleNavbar = () => setNavbarOpen(!navbarOpen);

  return (
    <header className="bg-custom-gradient sticky top-0 z-50 shadow-md w-full">
      {/* Full-width Navbar container */}
      <div className="w-full px-6 sm:px-12 h-16 flex items-center justify-between">
        {/* Logo: Center on mobile, left on larger screens */}
        <div className="flex-1 flex justify-center sm:justify-start">
          <Link
            to="/"
            className="text-white text-2xl font-bold italic tracking-wide"
          >
            Shrinkify
          </Link>
        </div>

        {/* Desktop Nav: Right aligned */}
        <nav className="hidden sm:flex gap-8 items-center justify-end flex-1">
          <NavLink to="/" currentPath={path} label="Home" />
          <NavLink to="/about" currentPath={path} label="About" />
          {token && <NavLink to="/dashboard" currentPath={path} label="Dashboard" />}
          {!token && (
            <Link
              to="/register"
              className="bg-rose-700 text-white px-4 py-2 rounded-md hover:bg-rose-600 transition"
            >
              Sign Up
            </Link>
          )}
          {token && (
            <button
              onClick={onLogOutHandler}
              className="bg-rose-700 text-white px-4 py-2 rounded-md hover:bg-rose-600 transition"
            >
              Log Out
            </button>
          )}
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={toggleNavbar}
          className="sm:hidden text-white text-3xl focus:outline-none"
          aria-label="Toggle menu"
        >
          {navbarOpen ? <RxCross2 /> : <IoIosMenu />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`sm:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          navbarOpen ? "max-h-60 py-4 bg-custom-gradient" : "max-h-0 py-0 bg-transparent"
        }`}
      >
        <ul className="flex flex-col gap-4 text-white px-6">
          <NavLink to="/" currentPath={path} label="Home" mobile />
          <NavLink to="/about" currentPath={path} label="About" mobile />
          {token && <NavLink to="/dashboard" currentPath={path} label="Dashboard" mobile />}
          {!token && (
            <Link
              to="/register"
              className="bg-rose-700 text-white px-4 py-2 rounded-md hover:bg-rose-600 transition text-center"
            >
              Sign Up
            </Link>
          )}
          {token && (
            <button
              onClick={onLogOutHandler}
              className="bg-rose-700 text-white px-4 py-2 rounded-md hover:bg-rose-600 transition text-center"
            >
              Log Out
            </button>
          )}
        </ul>
      </div>
    </header>
  );
};

// 🔁 Reusable NavLink Component
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

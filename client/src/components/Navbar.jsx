import React, { useState } from "react";
import { HiX } from "react-icons/hi";
import { MdMenu } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Check login status from localStorage
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      {/* Navbar */}
      <div className="py-4 px-3 md:px-8 justify-between bg-black flex items-center">
        <Link to="/" className="flex items-center gap-2">
          <img src="/SafeCityIcon.png" alt="SafeCity" className="w-12 h-12" />
          <h1 className="text-green-600 font-bold text-2xl">SafeCity Hub</h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-sm text-white mr-6">
          <Link className="hover:text-green-500" to="/">
            Home
          </Link>
          <Link className="hover:text-green-500" to="/communities">
            Communities
          </Link>
          <Link className="hover:text-green-500" to="/about">
            About
          </Link>

          {!isLoggedIn ? (
            <Link className="hover:text-green-500" to="/login">
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="text-red-500 hover:text-red-700"
            >
              Logout
            </button>
          )}
        </div>

        {!isLoggedIn && (
          <Link to="/register">
            <button className="hidden md:block bg-gray-800 px-6 py-2 text-white rounded-xl hover:bg-gray-900">
              Sign Up
            </button>
          </Link>
        )}

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl text-green-500"
          >
            {isOpen ? <HiX /> : <MdMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col p-4 space-y-4 shadow bg-black transition">
          <Link
            to="/"
            className="hover:bg-gray-900 text-white transition p-2 rounded"
          >
            Home
          </Link>
          <Link
            to="/communities"
            className="hover:bg-gray-900 text-white transition p-2 rounded"
          >
            Communities
          </Link>
          <Link
            to="/about"
            className="hover:bg-gray-900 text-white transition p-2 rounded"
          >
            About
          </Link>

          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="transition p-2 rounded hover:bg-gray-900 text-white"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="transition p-2 rounded hover:bg-gray-900 text-white"
              >
                <button className="bg-green-700 p-2 w-full text-white rounded hover:bg-green-500">
                  Get Started
                </button>
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="transition p-2 rounded text-red-500 hover:text-red-700"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  FaUserPlus,
  FaUsers,
  FaExclamationTriangle,
  FaChartLine,
} from "react-icons/fa";

const LandingPage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="text-center items-center py-16 md:py-24 px-4">
        <img
          src="/SafeCity.png"
          alt="SafeCity Logo"
          className="w-32 h-auto mx-auto mb-6 drop-shadow-lg"
        />
        <h1 className="text-4xl md:text-6xl font-semibold leading-tight">
          Build Better{" "}
          <span className="bg-green-600 text-black px-3 py-1 rounded-xl">
            Communities
          </span>
          , <br />
          One Solution at a Time.
        </h1>
        <p className="mt-6 text-gray-300 text-lg max-w-2xl mx-auto">
          Join or create communities where real issues get solved together.
        </p>

        {/* Show different buttons based on login state */}
        {!user ? (
          <Link to="/register">
            <button className="mt-8 bg-green-600 hover:bg-green-700 px-8 py-3 rounded-xl font-semibold text-black transition">
              Get Started
            </button>
          </Link>
        ) : (
          <button
            onClick={() => navigate("/communities")}
            className="mt-8 bg-green-600 hover:bg-green-700 px-8 py-3 rounded-xl font-semibold text-black transition"
          >
            Go to Communities
          </button>
        )}
      </div>

      {/* Illustration */}
      <div className="flex justify-center px-4">
        <img
          src="/pic2.jpeg"
          alt="Community illustration"
          className="w-full max-w-4xl rounded-2xl shadow-lg"
        />
      </div>

      {/* Features Section */}
      <div className="mt-20 px-6">
        <p className="text-center text-gray-400 mb-12 text-lg">
          Your community, your power step by step
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="p-6 bg-gray-900 rounded-xl hover:bg-gray-800 transition">
            <FaUserPlus className="text-4xl text-green-500 mx-auto" />
            <p className="mt-4 font-medium">Register</p>
          </div>
          <div className="p-6 bg-gray-900 rounded-xl hover:bg-gray-800 transition">
            <FaUsers className="text-4xl text-green-500 mx-auto" />
            <p className="mt-4 font-medium">Join or Create Community</p>
          </div>
          <div className="p-6 bg-gray-900 rounded-xl hover:bg-gray-800 transition">
            <FaExclamationTriangle className="text-4xl text-green-500 mx-auto" />
            <p className="mt-4 font-medium">Report Issues</p>
          </div>
          <div className="p-6 bg-gray-900 rounded-xl hover:bg-gray-800 transition">
            <FaChartLine className="text-4xl text-green-500 mx-auto" />
            <p className="mt-4 font-medium">Track Progress</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

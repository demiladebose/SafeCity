import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://safecity-ifru.onrender.com/api/users/login",
        {
          email,
          password,
        }
      );

      // Save token and user in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Login successful!");
      navigate("/communities"); // redirect to CommunityList after login
    } catch (error) {
      toast.error(
        `Login failed: ${error.response?.data?.message || error.message}`
      ); //
    }
  };

  return (
    <div>
      <Navbar />
      <section className="bg-black text-white min-h-screen flex items-center justify-center relative overflow-hidden">
        <form
          onSubmit={handleLogin}
          className="bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-bold text-center text-green-600 mb-6">
            Login
          </h2>

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 border text-white border-gray-300 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-6 border text-white border-gray-300 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 mb-6"
          >
            Login
          </button>
          <Link to="/register">
            <p className="text-green-500 text-sm text-center">
              Don't have an account yet? Click here to get started
            </p>
          </Link>
        </form>
      </section>
    </div>
  );
};

export default Login;

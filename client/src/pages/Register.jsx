import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast"; // import toast

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://safecity-ifru.onrender.com/api/users/register",
        {
          name,
          email,
          password,
        }
      );

      toast.success("Signup was successful!"); // ✅ toast success
      navigate("/login");
    } catch (error) {
      toast.error(
        `Signup failed: ${error.response?.data?.message || error.message}` // ✅ toast error
      );
    }
  };

  return (
    <div>
      <Navbar />
      <section className="bg-black transition text-white min-h-screen flex items-center justify-center relative overflow-hidden">
        <form
          onSubmit={handleRegister} // ✅ updated function name
          className="bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-bold text-center text-green-600 mb-6">
            Register your account
          </h2>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 mb-4 border text-white border-gray-300 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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
            Register
          </button>

          <Link to="/login">
            <p className="text-green-500 text-sm">
              Already have an account? Click here to login
            </p>
          </Link>
        </form>
      </section>
    </div>
  );
};

export default Register;

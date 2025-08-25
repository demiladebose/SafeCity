import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateCommunity = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const navigate = useNavigate();

  const handleCreateCommunity = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "https://safecity-ifru.onrender.com/api/communities",
        { name, description, isPublic },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Community was successfully created!");
      navigate("/communities");
    } catch (error) {
      alert(
        `Error creating community: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  return (
    <div className="bg-black text-white min-h-screen p-6">
      <Navbar />

      {/* Go Back Button */}
      <div className="px-4 py-4">
        <button
          onClick={() => navigate(-1)} // goes back to previous page
          className="text-green-500 hover:text-green-400 flex items-center gap-2"
        >
          <span className="text-xl font-bold">&#8592;</span> Back
        </button>
      </div>

      {/* Form */}
      <div className="flex items-center justify-center">
        <form
          onSubmit={handleCreateCommunity}
          className="bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-bold text-center text-green-600 mb-6">
            Create a community
          </h2>

          <input
            type="text"
            placeholder="Name of the community"
            className="w-full p-3 mb-4 border text-white border-gray-300 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Describe the community"
            className="w-full p-3 mb-4 border text-white border-gray-300 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <label className="flex items-center space-x-2 mb-4">
            <input
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
            />
            <span>Public Community</span>
          </label>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 mb-6"
          >
            Create Community
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCommunity;

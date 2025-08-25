import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import Navbar from "../components/Navbar";

const ReportPage = () => {
  const { communityId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [photo, setPhoto] = useState(null);

  const token = localStorage.getItem("token");

  if (!communityId) {
    return (
      <div className="text-center text-white bg-black min-h-screen flex items-center justify-center">
        <p>Invalid community. Please go back and select a community first.</p>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !location) {
      toast.error("Please fill in all fields."); // toast instead of alert
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("communityId", communityId);
    if (photo) formData.append("photo", photo);

    try {
      await axios.post("http://localhost:5000/api/reports", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Report submitted successfully!");
      navigate(`/communities/${communityId}`);
    } catch (err) {
      console.error("Error submitting report:", err);
      toast.error(
        err.response?.data?.message ||
          "Failed to submit report. Please try again."
      );
    }
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      {/* Back Button */}
      <div className="max-w-4xl mx-auto p-6">
        <button
          onClick={() => navigate(-1)} // ✅ Correct usage of useNavigate
          className="text-green-500 hover:text-green-400 flex items-center gap-2 mb-6"
        >
          <span className="text-xl font-bold">&#8592;</span> Back
        </button>

        <h1 className="text-3xl font-bold text-green-500 mb-6">
          Submit a Report
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 p-6 rounded-lg shadow-md"
        >
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 mb-3 rounded bg-gray-800 border border-gray-600"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 mb-3 rounded bg-gray-800 border border-gray-600"
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-3 mb-3 rounded bg-gray-800 border border-gray-600"
          />
          <input
            type="file"
            onChange={(e) => setPhoto(e.target.files[0])}
            className="mb-4"
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg w-full"
          >
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportPage;

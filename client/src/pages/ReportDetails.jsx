import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { toast } from "react-hot-toast";

const ReportDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/api/reports/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReport(res.data);
      } catch (err) {
        console.error("Error fetching report:", err);
        toast.error("Failed to load report details");
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <p>Report not found</p>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      {/* Back Button */}
      <div className="max-w-3xl mx-auto px-4 py-4">
        <button
          onClick={() => navigate(-1)}
          className="text-green-500 hover:text-green-400 flex items-center gap-2"
        >
          <span className="text-xl font-bold">&#8592;</span> Back
        </button>
      </div>

      {/* Report Card */}
      <div className="max-w-3xl mx-auto px-4 pb-10">
        <div className="bg-gray-900 p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-green-500">{report.title}</h1>

          <p className="mt-3 text-gray-300 leading-relaxed">
            {report.description}
          </p>

          <div className="mt-4 space-y-2 text-gray-400">
            <p>
              <span className="font-semibold">Location:</span>{" "}
              {report.location || "Not specified"}
            </p>
            <p>
              <span className="font-semibold">Reported by:</span>{" "}
              {report.reportedBy?.name || "Anonymous"}
            </p>
            <p>
              <span className="font-semibold">Status:</span>{" "}
              <span
                className={
                  report.status === "resolved"
                    ? "text-green-500"
                    : report.status === "in-progress"
                    ? "text-yellow-400"
                    : "text-gray-400"
                }
              >
                {report.status}
              </span>
            </p>
          </div>

          {report.imageUrl && (
            <div className="flex justify-center mt-6">
              <img
                src={report.imageUrl}
                alt="Report"
                className="rounded-lg max-h-[400px] w-full object-contain border border-gray-700"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportDetails;

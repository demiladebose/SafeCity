import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const CommunityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [community, setCommunity] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);

  const [showEdit, setShowEdit] = useState(false);
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `https://safecity-ifru.onrender.com/api/communities/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCommunity(res.data);

        const reportsRes = await axios.get(
          `https://safecity-ifru.onrender.com/api/reports/community/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setReports(reportsRes.data || []);

        const user = JSON.parse(localStorage.getItem("user"));
        if (
          user &&
          (res.data.createdBy?._id === user._id ||
            res.data.createdBy?._id === user.id)
        ) {
          setIsOwner(true);
        }
      } catch (err) {
        console.error("Failed to load community details:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const handleDeleteCommunity = async () => {
    if (!window.confirm("Delete this community?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://safecity-ifru.onrender.com/api/communities/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Community deleted"); // toast success
      navigate("/");
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Could not delete community"); // toast error
    }
  };

  const handleEditCommunity = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `https://safecity-ifru.onrender.com/api/communities/${id}`,
        { name: editName, description: editDesc },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCommunity(res.data.community);
      setShowEdit(false);
      toast.success("Community updated"); // optional success toast
    } catch (err) {
      console.error("Edit failed:", err);
      toast.error("Could not update community"); // toast error
    }
  };

  const handleStatusChange = async (reportId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `https://safecity-ifru.onrender.com/api/reports/${reportId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setReports((prev) =>
        prev.map((r) => (r._id === reportId ? { ...r, status: newStatus } : r))
      );
      toast.success("Report status updated"); // optional success toast
    } catch (err) {
      console.error("Status update failed:", err);
      toast.error("Could not update status"); // toast error
    }
  };

  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!community) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <p>Community not found</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <div className="bg-black text-white min-h-screen p-6">
        <div className="max-w-3xl mx-auto mb-4 flex items-center">
          <button
            onClick={() => navigate(-1)} // goes back to previous page
            className="text-green-500 hover:text-green-400 flex items-center gap-2"
          >
            <span className="text-xl font-bold">&#8592;</span> Back
          </button>
        </div>
        {/* Community Header */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-md mb-6 max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-green-500">
            {community.name}
          </h1>
          <p className="mt-2 text-gray-300">{community.description}</p>
          <p className="text-sm text-gray-400 mt-2">
            Created by: {community.createdBy?.name || "Unknown"}
          </p>

          {isOwner && (
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => {
                  setEditName(community.name);
                  setEditDesc(community.description);
                  setShowEdit(true);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Edit Community
              </button>
              <button
                onClick={handleDeleteCommunity}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          )}

          <div
            className="flex items-center justify-center mt-5 bg-gray-800 border-2 border-dashed border-gray-400 rounded-xl cursor-pointer hover:bg-gray-700 transition h-32"
            onClick={() => navigate(`/report/${id}`)}
          >
            <span className="text-2xl text-green-600">Make a report +</span>
          </div>
        </div>

        {/* Edit Modal */}
        {showEdit && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-gray-900 p-6 rounded-lg w-96">
              <h2 className="text-xl font-semibold mb-4">Edit Community</h2>
              <input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full p-2 mb-3 rounded bg-gray-800 text-white"
                placeholder="Community name"
              />
              <textarea
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
                className="w-full p-2 mb-3 rounded bg-gray-800 text-white"
                placeholder="Description"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowEdit(false)}
                  className="bg-gray-700 px-3 py-1 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditCommunity}
                  className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-white"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reports Section */}
        <h2 className="text-2xl font-semibold mb-4 max-w-3xl mx-auto">
          Reports
        </h2>
        {reports.length === 0 ? (
          <p className="text-gray-400 max-w-3xl mx-auto">No reports yet.</p>
        ) : (
          <div className="space-y-4 max-w-3xl mx-auto">
            {reports.map((report) => (
              <div
                key={report._id}
                className="bg-gray-800 p-4 rounded-lg shadow-md"
              >
                <Link
                  to={`/report/${report._id}/details`}
                  className="text-green-400 hover:underline"
                >
                  <h3 className="text-xl font-bold text-green-400">
                    {report.title}
                  </h3>
                </Link>
                <p className="text-gray-300">{report.description}</p>

                {report.imageUrl && (
                  <div className="flex justify-center mt-3">
                    <img
                      src={report.imageUrl}
                      alt="Report"
                      className="rounded-lg max-h-80 w-full object-contain border border-gray-700"
                    />
                  </div>
                )}

                <p className="mt-2 text-gray-400 text-sm">
                  Location: {report.location || "Not specified"}
                </p>
                <p className="mt-1 text-gray-400 text-sm">
                  Reported by: {report.reportedBy?.name || "Anonymous"}
                </p>

                <p className="mt-2">
                  <span className="font-semibold">Status:</span>{" "}
                  {isOwner ? (
                    <select
                      value={report.status}
                      onChange={(e) =>
                        handleStatusChange(report._id, e.target.value)
                      }
                      className="ml-2 p-1 rounded bg-gray-700 text-white"
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  ) : (
                    <span className="text-yellow-400">{report.status}</span>
                  )}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityDetail;

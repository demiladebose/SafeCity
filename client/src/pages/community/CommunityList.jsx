import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";

const CommunityList = () => {
  const [communities, setCommunities] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch all communities
  useEffect(() => {
    const fetchCommunities = async () => {
      if (!token || !user) {
        console.error("No user or token found. Redirecting...");
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get(
          "https://safecity-ifru.onrender.com/api/communities",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCommunities(res.data);
      } catch (err) {
        console.error("Error fetching communities", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunities();
  }, [navigate, token, user]);

  // Handle joining a community
  const handleJoin = async (id) => {
    try {
      await axios.post(
        `https://safecity-ifru.onrender.com/api/communities/${id}/join`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Refresh community list after joining
      const res = await axios.get(
        "https://safecity-ifru.onrender.com/api/communities",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCommunities(res.data);
    } catch (err) {
      console.error("Error joining community", err);
    }
  };

  if (loading) {
    return (
      <div className="text-center text-white bg-black min-h-screen flex items-center justify-center">
        <p>Loading communities...</p>
      </div>
    );
  }

  // Filter communities based on search input
  const filteredCommunities = communities.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-green-500 mb-6">
          Discover Communities
        </h1>

        {/*Search bar */}
        <input
          type="text"
          placeholder="Search communities..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 mb-6 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        {filteredCommunities.length === 0 ? (
          <p className="text-gray-400">No communities found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCommunities.map((community) => {
              // Safe check so it never crashes if members is missing
              const isMember = community.members?.includes(user.id);

              return (
                <div
                  key={community._id}
                  className="bg-gray-800 rounded-lg shadow-md p-4 hover:bg-gray-700"
                >
                  <h2 className="text-xl font-semibold text-green-400">
                    {community.name}
                  </h2>
                  <p className="text-gray-300 mb-4">{community.description}</p>

                  {isMember ? (
                    <button
                      onClick={() => navigate(`/communities/${community._id}`)}
                      className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg w-full"
                    >
                      View
                    </button>
                  ) : (
                    <button
                      onClick={() => handleJoin(community._id)}
                      className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg w-full"
                    >
                      Join
                    </button>
                  )}
                </div>
              );
            })}

            {/* Create community button */}
            <div
              className="flex items-center justify-center bg-gray-900 border-2 border-dashed border-gray-400 rounded-xl cursor-pointer hover:bg-gray-800 transition h-32"
              onClick={() => navigate("/create-community")}
            >
              <span className="text-2xl text-green-600">
                Create a community +
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityList;

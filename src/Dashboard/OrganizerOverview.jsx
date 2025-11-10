import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://medicamp-server-app.vercel.app"; // backend URL

const OrganizerOverview = () => {
  const [profileData, setProfileData] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("authToken"); // replace with your auth token

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const profileRes = await axios.get(`${BASE_URL}/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfileData(profileRes.data);

        const statsRes = await axios.get(`${BASE_URL}/organizer-stats`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(statsRes.data);

      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.response?.status === 401
          ? "Unauthorized access. Please log in."
          : "Something went wrong while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Organizer Profile</h2>
      {profileData ? (
        <div>
          <p><strong>Name:</strong> {profileData.name}</p>
          <p><strong>Email:</strong> {profileData.email}</p>
          <p><strong>Role:</strong> {profileData.role}</p>
        </div>
      ) : (
        <p>No profile data available.</p>
      )}

      <h2>Organizer Stats</h2>
      {stats ? (
        <pre>{JSON.stringify(stats, null, 2)}</pre>
      ) : (
        <p>No stats available.</p>
      )}
    </div>
  );
};

export default OrganizerOverview;

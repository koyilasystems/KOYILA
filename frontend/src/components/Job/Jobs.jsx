import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("${import.meta.env.VITE_API_BASE_URL}/api/v1/job/getall", {
          withCredentials: true,
        });
        setJobs(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchJobs();
  }, []);

  if (!isAuthorized) {
    navigateTo("/");
  }

  const filteredJobs =
    jobs.jobs?.filter((job) =>
      job.title.toLowerCase().includes(searchTitle.toLowerCase()) ||
      job.category.toLowerCase().includes(searchTitle.toLowerCase())
    ).filter((job) =>
      job.country.toLowerCase().includes(searchLocation.toLowerCase())
    ) || [];

  return (
    <section className="jobs page">
      <div className="container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: "20px"
          }}
        >
          <h1>ALL AVAILABLE JOBS</h1>

          {/* 🔍 Search Inputs on Right */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              style={{
                padding: "8px 12px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                width: "200px",
              }}
            />
            <input
              type="text"
              placeholder="Search location..."
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              style={{
                padding: "8px 12px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                width: "200px",
              }}
            />
          </div>
        </div>

        <div className="banner">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((element) => (
              <div className="card" key={element._id}>
                <p><strong>Title:</strong> {element.title}</p>
                <p><strong>Category:</strong> {element.category}</p>
                <p><strong>Location:</strong> {element.country}</p>
                <Link to={`/job/${element._id}`}>Job Details</Link>
              </div>
            ))
          ) : (
            <p>No jobs match your search.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Jobs;

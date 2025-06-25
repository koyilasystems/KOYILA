import React, { useEffect, useState } from "react";
import "./RecruitersList.css";

const dummyRecruiters = [
  {
    id: 1,
    name: "Ravi Sharma",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    contact: "+91 9876543210",
    email: "ravi@abc.com",
    company: "TechNova Solutions",
    role: "Senior Recruiter",
    hiringFor: "Full Stack Developer",
  },
  {
    id: 2,
    name: "Anita Verma",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    contact: "+91 8765432109",
    email: "anita@xyz.com",
    company: "Innovatech Pvt Ltd",
    role: "Recruitment Lead",
    hiringFor: "Java Backend Developer",
  },
  {
    id: 3,
    name: "Rahul Mehta",
    photo: "https://randomuser.me/api/portraits/men/54.jpg",
    contact: "+91 7654321098",
    email: "rahul@hiringhub.com",
    company: "HiringHub",
    role: "HR Manager",
    hiringFor: "UI/UX Designer",
  },
  {
    id: 4,
    name: "Priya Kapoor",
    photo: "https://randomuser.me/api/portraits/women/65.jpg",
    contact: "+91 9123456780",
    email: "priya@nextgen.com",
    company: "NextGen Talent",
    role: "Talent Acquisition",
    hiringFor: "Frontend Developer",
  },
  {
    id: 5,
    name: "Aman Joshi",
    photo: "https://randomuser.me/api/portraits/men/41.jpg",
    contact: "+91 9988776655",
    email: "aman@coders.com",
    company: "Coders Inc",
    role: "Tech Recruiter",
    hiringFor: "React Developer",
  },
  {
    id: 6,
    name: "Sneha Reddy",
    photo: "https://randomuser.me/api/portraits/women/75.jpg",
    contact: "+91 9090909090",
    email: "sneha@designhub.com",
    company: "DesignHub",
    role: "Recruitment Executive",
    hiringFor: "Graphic Designer",
  },
];

const RecruitersList = () => {
  const [searchRecruiter, setSearchRecruiter] = useState("");
  const [searchCompany, setSearchCompany] = useState("");
  const [filteredRecruiters, setFilteredRecruiters] = useState(dummyRecruiters);

  useEffect(() => {
    const filtered = dummyRecruiters.filter((rec) =>
      `${rec.name} ${rec.role} ${rec.hiringFor}`.toLowerCase().includes(searchRecruiter.toLowerCase()) &&
      rec.company.toLowerCase().includes(searchCompany.toLowerCase())
    );
    setFilteredRecruiters(filtered);
  }, [searchRecruiter, searchCompany]);

  return (
    <div className="recruiters-container">
      <div className="recruiters-header">
        <h2>Recruiters List</h2>
        <div className="search-boxes">
          <input
            type="text"
            placeholder="Search by company..."
            value={searchCompany}
            onChange={(e) => setSearchCompany(e.target.value)}
            className="search-box"
          />
          <input
            type="text"
            placeholder="Search recruiters..."
            value={searchRecruiter}
            onChange={(e) => setSearchRecruiter(e.target.value)}
            className="search-box"
          />
        </div>
      </div>

      <div className="recruiters-list">
        {filteredRecruiters.map((recruiter) => (
          <div key={recruiter.id} className="recruiter-card">
            <img
              src={recruiter.photo}
              alt={`${recruiter.name} profile`}
              className="profile-photo"
            />
            <div className="recruiter-details">
              <h3>{recruiter.name}</h3>
              <p><strong>Contact:</strong> {recruiter.contact}</p>
              <p><strong>Email:</strong> {recruiter.email}</p>
              <p><strong>Current Company:</strong> {recruiter.company}</p>
              <p><strong>Current Role:</strong> {recruiter.role}</p>
              <p><strong>Hiring For:</strong> {recruiter.hiringFor}</p>
            </div>
          </div>
        ))}
        {filteredRecruiters.length === 0 && <p>No recruiters found.</p>}
      </div>
    </div>
  );
};

export default RecruitersList;

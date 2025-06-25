import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";

const MyApplications = () => {
  const { user, isAuthorized } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeUrl, setResumeUrl] = useState("");

  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const url =
          user?.role === "Employer"
            ? "http://localhost:4000/api/v1/application/employer/getall"
            : "http://localhost:4000/api/v1/application/jobseeker/getall";

        const res = await axios.get(url, { withCredentials: true });
        setApplications(res.data.applications);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    };

    if (user) fetchApplications();
  }, [user]);

  if (!isAuthorized) {
    navigateTo("/");
    return null;
  }

  const deleteApplication = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:4000/api/v1/application/delete/${id}`,
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setApplications((prev) => prev.filter((app) => app._id !== id));
    } catch (error) {
      toast.error(error?.response?.data?.message || "Delete failed");
    }
  };

  const openModal = (url) => {
    setResumeUrl(url);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const downloadResume = (url) => {
    if (!url) {
      toast.error("Resume URL not available");
      return;
    }

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "resume"); // browser will auto handle the extension
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="my_applications page">
      <div className="container">
        <h1>
          {user?.role === "Job Seeker"
            ? "My Applications"
            : "Applications From Job Seekers"}
        </h1>

        {applications.length === 0 ? (
          <h4>No Applications Found</h4>
        ) : (
          applications.map((element) =>
            user?.role === "Job Seeker" ? (
              <JobSeekerCard
                key={element._id}
                element={element}
                deleteApplication={deleteApplication}
                openModal={openModal}
                downloadResume={downloadResume}
              />
            ) : (
              <EmployerCard
                key={element._id}
                element={element}
                openModal={openModal}
                downloadResume={downloadResume}
              />
            )
          )
        )}
      </div>

      {modalOpen && <ResumeModal resumeUrl={resumeUrl} onClose={closeModal} />}
    </section>
  );
};

export default MyApplications;

// ✅ Shared application detail component
const ApplicationDetails = ({ element, openModal }) => (
  <>
    <div className="detail">
      <p><span>Name:</span> {element.name}</p>
      <p><span>Email:</span> {element.email}</p>
      <p><span>Phone:</span> {element.phone}</p>
      <p><span>Address:</span> {element.address}</p>
      <p><span>Cover Letter:</span> {element.coverLetter}</p>
    </div>
    <div className="resume-preview">
      <p
        className="resume-link"
        style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
        onClick={() => openModal(element?.resume?.url)}
      >
        📄 View Resume
      </p>
    </div>
  </>
);

// ✅ Job Seeker Card
const JobSeekerCard = ({
  element,
  deleteApplication,
  openModal,
  downloadResume,
}) => (
  <div className="job_seeker_card">
    <ApplicationDetails element={element} openModal={openModal} />
    <div className="btn_area">
      <button onClick={() => deleteApplication(element._id)}>Delete Application</button>
      <button
        onClick={() => downloadResume(element?.resume?.url)}
        className="download-btn"
      >
        Download Resume
      </button>
    </div>
  </div>
);

// ✅ Employer Card
const EmployerCard = ({ element, openModal, downloadResume }) => (
  <div className="job_seeker_card">
    <ApplicationDetails element={element} openModal={openModal} />
    <div className="btn_area">
      <button
        onClick={() => downloadResume(element?.resume?.url)}
        className="download-btn"
      >
        Download Resume
      </button>
    </div>
  </div>
);

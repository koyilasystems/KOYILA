import React from "react";

const ResumeModal = ({ resumeUrl, onClose }) => {
  return (
    <div className="resume-modal">
      <div className="modal-content">
        <span className="close" onClick={onClose} style={{ cursor: "pointer", float: "right", fontSize: "24px" }}>
          &times;
        </span>

        {/* View Resume Link */}
        <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
          🔗 Open Resume in New Tab
        </a>

        {/* PDF Preview */}
        {resumeUrl && (
  <iframe
    src={resumeUrl}
    width="100%"
    height="500px"
    title="Resume Preview"
    style={{ marginTop: "1rem" }}
  />
)}

      </div>
    </div>
  );
};

export default ResumeModal;

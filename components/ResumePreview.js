import React from "react";
import html2pdf from "html2pdf.js";

function ResumePreview({ resumeData }) {
  const downloadPDF = () => {
    const element = document.getElementById("resume");
    html2pdf().from(element).save("resume.pdf");
  };

  const formatExperience = (text) => {
    if (!text) return "";
    // escape HTML
    const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    let t = esc(text);
    // move duration (years or year-range) after a dash onto the next line
    t = t.replace(/\s[–—-]\s*(\d{4}(?:[–—-]\d{4})?)/g, "<br/><span class=\"duration\">$1</span>");
    // preserve user newlines
    t = t.replace(/\r?\n/g, "<br/>");
    return t;
  };

  return (
    <div className="preview">
      <div id="resume">
        {(resumeData.photo || resumeData.photoURL) && (
          <div className="photo-wrap">
            <img
              src={resumeData.photo || resumeData.photoURL}
              alt="Profile"
              className="profile-photo"
            />
          </div>
        )}
        <h1>{resumeData.name}</h1>
        <p className="contact">{resumeData.email} | {resumeData.phone}</p>

        <h3>Skills</h3>
        <p>{resumeData.skills}</p>

        <h3>Education</h3>
        <p>{resumeData.education}</p>

        <h3>Experience</h3>
        <p dangerouslySetInnerHTML={{ __html: formatExperience(resumeData.experience) }} />
        
        <h3>Certifications</h3>
        <p>{resumeData.certifications}</p>

        <h3>Languages</h3>
        <p>{resumeData.languages}</p>
        {resumeData.projects && resumeData.projects.length > 0 && (
          <>
            <h3>Projects</h3>
            <div className="projects-list">
              {resumeData.projects.map((p, i) => (
                <div className="project-item" key={i}>
                  <strong>{p.title}</strong>
                  {p.link && (
                    <div><a href={p.link} target="_blank" rel="noreferrer">{p.link}</a></div>
                  )}
                  <p>{p.description}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <button onClick={downloadPDF}>Download PDF</button>
    </div>
  );
}

export default ResumePreview;

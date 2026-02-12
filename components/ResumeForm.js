import React from "react";

function ResumeForm({ resumeData, setResumeData }) {

  const handleChange = (e) => {
    setResumeData({
      ...resumeData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setResumeData({ ...resumeData, photo: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const addProject = () => {
    const projects = resumeData.projects ? [...resumeData.projects] : [];
    projects.push({ title: "", description: "", link: "" });
    setResumeData({ ...resumeData, projects });
  };

  const handleProjectChange = (index, field, value) => {
    const projects = resumeData.projects ? [...resumeData.projects] : [];
    projects[index] = { ...projects[index], [field]: value };
    setResumeData({ ...resumeData, projects });
  };

  const removeProject = (index) => {
    const projects = resumeData.projects ? [...resumeData.projects] : [];
    projects.splice(index, 1);
    setResumeData({ ...resumeData, projects });
  };

  return (
    <div className="form">
      <h2>Resume Details</h2>

      <input name="name" placeholder="Full Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="phone" placeholder="Phone" onChange={handleChange} />

      <textarea name="skills" placeholder="Skills" onChange={handleChange} />
      <textarea name="education" placeholder="Education" onChange={handleChange} />
      <textarea name="experience" placeholder="Experience" onChange={handleChange} />
      <textarea name="certifications" placeholder="Certifications" onChange={handleChange} />
      <textarea name="languages" placeholder="Languages (comma-separated)" onChange={handleChange} />
      
      <h3>Photo</h3>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <input name="photoURL" placeholder="Or paste photo URL" onChange={handleChange} />

      <h3>Projects</h3>
      {(resumeData.projects || []).map((p, idx) => (
        <div className="project-form" key={idx}>
          <input
            placeholder="Project Title"
            value={p.title}
            onChange={(e) => handleProjectChange(idx, "title", e.target.value)}
          />
          <input
            placeholder="Project Link (optional)"
            value={p.link}
            onChange={(e) => handleProjectChange(idx, "link", e.target.value)}
          />
          <textarea
            placeholder="Project Description"
            value={p.description}
            onChange={(e) => handleProjectChange(idx, "description", e.target.value)}
          />
          <button type="button" onClick={() => removeProject(idx)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={addProject}>Add Project</button>
    </div>
  );
}

export default ResumeForm;

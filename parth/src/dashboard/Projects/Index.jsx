import React, { useState } from 'react';

const Index = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'Portfolio Website',
      description: 'A personal portfolio website built using React and TailwindCSS.',
      techStack: 'React, TailwindCSS',
      link: 'https://myportfolio.com',
      logo: '/logoBlack.png',
    },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    title: '',
    description: '',
    techStack: '',
    link: '',
    logo: '',
  });

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddClick = () => {
    setFormData({ id: null, title: '', description: '', techStack: '', link: '', logo: '' });
    setEditMode(false);
    setIsFormOpen(true);
  };

  const handleEditClick = (project) => {
    setFormData(project);
    setEditMode(true);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (editMode) {
      setProjects(prev =>
        prev.map((proj) => (proj.id === formData.id ? formData : proj))
      );
    } else {
      setProjects(prev => [
        ...prev,
        { ...formData, id: Date.now() },
      ]);
    }

    setIsFormOpen(false);
  };

  const handleCopyLink = (link) => {
    navigator.clipboard.writeText(link);
    alert('Project link copied to clipboard!');
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Projects</h1>
        <button
          onClick={handleAddClick}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Project
        </button>
      </div>

      {projects.map((project) => (
        <div key={project.id} className="border p-4 rounded mb-4 shadow">
          <div className="flex items-center gap-4">
            {project.logo && (
              <img
                src={project.logo}
                alt="Project Logo"
                className="w-12 h-12 rounded"
              />
            )}
            <div>
              <h2 className="text-xl font-semibold">{project.title}</h2>
              <p className="text-gray-700">{project.description}</p>
              <p className="text-sm text-gray-600">Tech Stack: {project.techStack}</p>
              <a href={project.link} className="text-blue-500 underline" target="_blank" rel="noreferrer">
                View Project
              </a>
            </div>
          </div>

          <div className="mt-2 flex gap-2">
            <button
              onClick={() => handleEditClick(project)}
              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
            >
              Edit
            </button>
            <button
              onClick={() => handleCopyLink(project.link)}
              className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
            >
              Share
            </button>
          </div>
        </div>
      ))}

      {isFormOpen && (
        <form onSubmit={handleFormSubmit} className="bg-gray-100 p-4 rounded shadow mt-6">
          <h2 className="text-xl mb-4">{editMode ? 'Edit Project' : 'Add Project'}</h2>

          <input
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Project Title"
            required
            className="w-full mb-2 p-2 border rounded"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Project Description"
            required
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            name="techStack"
            value={formData.techStack}
            onChange={handleInputChange}
            placeholder="Tech Stack (e.g., React, Node.js)"
            required
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            name="link"
            value={formData.link}
            onChange={handleInputChange}
            placeholder="Project Link"
            required
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            name="logo"
            value={formData.logo}
            onChange={handleInputChange}
            placeholder="Logo Image URL"
            className="w-full mb-4 p-2 border rounded"
          />

          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {editMode ? 'Update' : 'Add'}
            </button>
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Index;

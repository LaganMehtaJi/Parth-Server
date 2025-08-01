import React, { useState } from 'react';
import {
  FiEdit2,
  FiTrash2,
  FiLink,
  FiPlus,
  FiX,
  FiCheck,
  FiExternalLink,
  FiShare2,
} from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import {
  addProject,
  updateProject,
  deleteProject,
  toggleFeatured,
} from '../../redux/ProjectsSlice';

const Index = () => {
  const dispatch = useDispatch();
  const { projects, copiedId } = useSelector((state) => state.projects);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    title: '',
    description: '',
    techStack: '',
    link: '',
    logo: '',
    featured: false,
    date: new Date().toISOString().split('T')[0],
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAddClick = () => {
    setFormData({
      id: null,
      title: '',
      description: '',
      techStack: '',
      link: '',
      logo: '',
      featured: false,
      date: new Date().toISOString().split('T')[0],
    });
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
      dispatch(updateProject(formData));
    } else {
      dispatch(addProject(formData));
    }
    setIsFormOpen(false);
  };

  const handleDeleteProject = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      dispatch(deleteProject(id));
    }
  };

  const handleCopyLink = (link, id) => {
    navigator.clipboard.writeText(link);
    alert('Link copied to clipboard!');
  };

  const handleShare = async (project) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: project.title,
          text: project.description,
          url: project.link,
        });
      } catch (err) {
        alert('Sharing failed.');
      }
    } else {
      alert('Share API not supported in this browser.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Projects</h1>
          <p className="text-gray-600">Manage and showcase your work</p>
        </div>
        <button
          onClick={handleAddClick}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          <FiPlus /> Add Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">No projects found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`border rounded-lg overflow-hidden shadow-md hover:shadow-lg ${
                project.featured ? 'border-2 border-yellow-400' : 'border-gray-200'
              }`}
            >
              <div className="p-5">
                <div className="flex items-start gap-4">
                  {project.logo ? (
                    <img
                      src={project.logo}
                      alt="logo"
                      className="w-14 h-14 object-contain"
                    />
                  ) : (
                    <div className="w-14 h-14 bg-gray-100 flex items-center justify-center">
                      <FiExternalLink />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h2 className="text-lg font-semibold">{project.title}</h2>
                      <button onClick={() => dispatch(toggleFeatured(project.id))}>
                        {project.featured ? '★' : '☆'}
                      </button>
                    </div>
                    <p className="text-sm text-gray-600">{project.description}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <FiExternalLink /> Visit
                  </a>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEditClick(project)}
                      title="Edit"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={() => handleCopyLink(project.link, project.id)}
                      title="Copy Link"
                    >
                      <FiLink />
                    </button>
                    <button
                      onClick={() => handleShare(project)}
                      title="Share"
                    >
                      <FiShare2 />
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      title="Delete"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-2 text-sm text-gray-500">
                {new Date(project.date).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}

      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{editMode ? 'Edit Project' : 'Add Project'}</h2>
              <button onClick={() => setIsFormOpen(false)}>
                <FiX size={20} />
              </button>
            </div>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <input
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded"
              />
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full p-2 border rounded"
              />
              <input
                name="techStack"
                placeholder="Tech Stack"
                value={formData.techStack}
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded"
              />
              <input
                name="link"
                placeholder="Project URL"
                value={formData.link}
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded"
              />
              <input
                name="logo"
                placeholder="Logo URL"
                value={formData.logo}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
              <input
                name="date"
                type="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded"
              />
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                />
                <label>Featured</label>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="border px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  {editMode ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;

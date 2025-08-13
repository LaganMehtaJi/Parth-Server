import React, { useState, useEffect } from 'react';
import {
  FiEdit2, FiTrash2, FiLink, FiPlus, FiX, FiCheck,
  FiExternalLink, FiShare2, FiStar
} from 'react-icons/fi';
import axios from 'axios';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    techStack: '',
    link: '',
    logo: '',
    featured: false,
    date: new Date().toISOString().split('T')[0],
  });
  const [copiedId, setCopiedId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [registrationNo, setRegistrationNo] = useState('');

  // Initialize registrationNo and fetch projects
  useEffect(() => {
    const registrationNo = localStorage.getItem('registrationNo');
    if (!registrationNo) {
      setError('Registration number not found in localStorage');
      return;
    }
    setRegistrationNo(registrationNo);
    fetchProjects(registrationNo);
  }, []);

  const fetchProjects = async (registrationNo) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/api/project/get/${registrationNo}`);
      setProjects(response.data);
    } catch (err) {
      setError('Failed to fetch projects');
      console.error('Error fetching projects:', err);
    } finally {
      setIsLoading(false);
    }
  };
 

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAddClick = () => {
    setFormData({
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
    setError(null);
  };

  const handleEditClick = (project) => {
    setFormData(project);
    setEditMode(true);
    setIsFormOpen(true);
    setError(null);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!registrationNo) {
      setError('Registration number not found');
      return;
    }

    setIsLoading(true);
    
    try {
      if (editMode) {
        // Update project
        const response = await axios.post(
          `http://localhost:3000/api/project/update/${registrationNo}/${formData._id}`,
          formData
        );
        setProjects(projects.map(p => p._id === formData._id ? response.data : p));
      } else {
        // Add new project
        const response = await axios.post(
          `http://localhost:3000/api/project/add/${registrationNo}`,
          formData
        );
        setProjects([...projects, response.data]);
      }
      setIsFormOpen(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save project');
      console.error('Error saving project:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    
    if (!registrationNo) {
      setError('Registration number not found');
      return;
    }

    setIsLoading(true);
    try {
      await axios.post(`http://localhost:3000/api/project/delete/${registrationNo}/${id}`);
      setProjects(projects.filter(project => project._id !== id));
    } catch (err) {
      setError('Failed to delete project');
      console.error('Error deleting project:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleFeatured = async (id) => {
    if (!registrationNo) {
      setError('Registration number not found');
      return;
    }

    setIsLoading(true);
    try {
      const project = projects.find(p => p._id === id);
      const updatedProject = { 
        ...project, 
        featured: !project.featured 
      };
      
      const response = await axios.post(
        `http://localhost:300/api/project/update/${registrationNo}/${id}`,
        updatedProject
      );
      
      setProjects(projects.map(p => p._id === id ? response.data : p));
    } catch (err) {
      setError('Failed to update project');
      console.error('Error updating project:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyLink = (link, id) => {
    navigator.clipboard.writeText(link);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleShare = async (project) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: project.title,
          text: project.description,
          url: project.link,
        });
      } else {
        await navigator.clipboard.writeText(project.link);
        setCopiedId(project._id);
        setTimeout(() => setCopiedId(null), 2000);
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  if (isLoading && projects.length === 0) {
    return (
      <div className="max-w-6xl mx-auto p-4 md:p-6 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Projects</h1>
          <p className="text-gray-600 mt-1">Showcase your best work and achievements</p>
        </div>
        <button
          onClick={handleAddClick}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg transition-all duration-200 hover:shadow-md"
          disabled={isLoading}
        >
          <FiPlus className="text-lg" /> Add Project
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {projects.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <FiPlus className="text-blue-600 text-2xl" />
          </div>
          <h3 className="text-lg font-medium text-gray-700">No projects yet</h3>
          <p className="text-gray-500 mb-4">Get started by adding your first project</p>
          <button
            onClick={handleAddClick}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            disabled={isLoading}
          >
            <FiPlus /> Add Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project._id}
              className={`relative rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border ${
                project.featured ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200 bg-white'
              }`}
            >
              {project.featured && (
                <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                  <FiStar className="text-xs" /> Featured
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-start gap-4">
                  {project.logo ? (
                    <img
                      src={project.logo}
                      alt="logo"
                      className="w-14 h-14 object-contain rounded-lg bg-white p-2 border border-gray-200"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/56?text=LOGO';
                      }}
                    />
                  ) : (
                    <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 border border-gray-200">
                      <FiExternalLink className="text-xl" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <h2 className="text-lg font-semibold text-gray-800 truncate">
                        {project.title}
                      </h2>
                      <button 
                        onClick={() => handleToggleFeatured(project._id)}
                        disabled={isLoading}
                        className={`p-1.5 rounded-full ${
                          project.featured ? 'text-yellow-500 hover:text-yellow-600' : 'text-gray-400 hover:text-gray-600'
                        }`}
                        aria-label={project.featured ? 'Unfeature project' : 'Feature project'}
                      >
                        <FiStar className={`text-lg ${project.featured ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {project.description}
                    </p>
                    
                    {project.techStack && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {project.techStack.split(',').map((tech, index) => (
                          <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-6">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 hover:underline text-sm font-medium"
                  >
                    <FiExternalLink className="text-sm" /> Visit Project
                  </a>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEditClick(project)}
                      disabled={isLoading}
                      className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                      aria-label="Edit project"
                    >
                      <FiEdit2 className="text-sm" />
                    </button>
                    <button
                      onClick={() => handleCopyLink(project.link, project._id)}
                      disabled={isLoading}
                      className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors relative"
                      aria-label="Copy link"
                    >
                      {copiedId === project._id ? (
                        <FiCheck className="text-sm text-green-500" />
                      ) : (
                        <FiLink className="text-sm" />
                      )}
                    </button>
                    <button
                      onClick={() => handleShare(project)}
                      disabled={isLoading}
                      className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                      aria-label="Share project"
                    >
                      <FiShare2 className="text-sm" />
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project._id)}
                      disabled={isLoading}
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                      aria-label="Delete project"
                    >
                      <FiTrash2 className="text-sm" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="px-6 py-3 bg-gray-50 text-xs text-gray-500 border-t border-gray-100">
                Added on {new Date(project.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {isFormOpen && (
        <div className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div 
            className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">
                {editMode ? 'Edit Project' : 'Add Project'}
              </h2>
              <button 
                onClick={() => setIsFormOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                aria-label="Close modal"
                disabled={isLoading}
              >
                <FiX className="text-xl" />
              </button>
            </div>
            
            <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
              {error && (
                <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Title*</label>
                <input
                  name="title"
                  placeholder="My Awesome Project"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:bg-gray-100"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
                <textarea
                  name="description"
                  placeholder="A brief description of your project..."
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  disabled={isLoading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:bg-gray-100"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tech Stack*</label>
                <input
                  name="techStack"
                  placeholder="React, Node.js, MongoDB"
                  value={formData.techStack}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:bg-gray-100"
                />
                <p className="text-xs text-gray-500 mt-1">Separate technologies with commas</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project URL*</label>
                <input
                  name="link"
                  placeholder="https://example.com"
                  value={formData.link}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:bg-gray-100"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Logo URL</label>
                <input
                  name="logo"
                  placeholder="https://example.com/logo.png"
                  value={formData.logo}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:bg-gray-100"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date*</label>
                  <input
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:bg-gray-100"
                  />
                </div>
                
                <div className="flex items-center justify-end">
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:bg-gray-100"
                    />
                  </div>
                  <label className="ml-2 text-sm text-gray-700">
                    Featured Project
                  </label>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  disabled={isLoading}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-32"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {editMode ? 'Updating...' : 'Adding...'}
                    </>
                  ) : (
                    editMode ? 'Update Project' : 'Add Project'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
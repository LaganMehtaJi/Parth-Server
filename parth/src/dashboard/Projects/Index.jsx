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
  FiStar,
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
  const { projects } = useSelector((state) => state.projects);

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
  const [copiedId, setCopiedId] = useState(null);

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
        setCopiedId(project.id);
        setTimeout(() => setCopiedId(null), 2000);
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

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
        >
          <FiPlus className="text-lg" /> Add Project
        </button>
      </div>

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
          >
            <FiPlus /> Add Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`relative rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border ${
                project.featured 
                  ? 'border-yellow-400 bg-yellow-50' 
                  : 'border-gray-200 bg-white'
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
                        onClick={() => dispatch(toggleFeatured(project.id))}
                        className={`p-1.5 rounded-full ${
                          project.featured 
                            ? 'text-yellow-500 hover:text-yellow-600' 
                            : 'text-gray-400 hover:text-gray-600'
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
                          <span 
                            key={index} 
                            className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                          >
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
                      className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                      aria-label="Edit project"
                    >
                      <FiEdit2 className="text-sm" />
                    </button>
                    <button
                      onClick={() => handleCopyLink(project.link, project.id)}
                      className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors relative"
                      aria-label="Copy link"
                    >
                      {copiedId === project.id ? (
                        <FiCheck className="text-sm text-green-500" />
                      ) : (
                        <FiLink className="text-sm" />
                      )}
                    </button>
                    <button
                      onClick={() => handleShare(project)}
                      className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                      aria-label="Share project"
                    >
                      <FiShare2 className="text-sm" />
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
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

      {/* Project Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
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
              >
                <FiX className="text-xl" />
              </button>
            </div>
            
            <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Title*</label>
                <input
                  name="title"
                  placeholder="My Awesome Project"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Logo URL</label>
                <input
                  name="logo"
                  placeholder="https://example.com/logo.png"
                  value={formData.logo}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                </div>
                
                <div className="flex items-center justify-end">
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
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
                  className="px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition-colors"
                >
                  {editMode ? 'Update Project' : 'Add Project'}
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
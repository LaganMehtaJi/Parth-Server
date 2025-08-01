import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCertificates,
  addCertificate,
  updateCertificate,
  deleteCertificate
} from "../../redux/CertificateSlice.js";
import { FiEdit2, FiTrash2, FiExternalLink, FiPlus } from "react-icons/fi";
import { FaCertificate } from "react-icons/fa";

const categoryColors = {
  Business: "bg-purple-100 text-purple-800",
  Technology: "bg-blue-100 text-blue-800",
  "Cloud Computing": "bg-orange-100 text-orange-800",
  Design: "bg-pink-100 text-pink-800",
  Marketing: "bg-green-100 text-green-800"
};

const categoryIcons = {
  Business: "💼",
  Technology: "💻",
  "Cloud Computing": "☁️",
  Design: "🎨",
  Marketing: "📈"
};

export default function Certificates() {
  const dispatch = useDispatch();
  const { list: certificates, status } = useSelector((state) => state.certificates);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    link: "",
    date: "",
    issuer: "",
    category: "Technology"
  });

  useEffect(() => {
    dispatch(fetchCertificates());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      dispatch(updateCertificate({ id: editingId, formData }));
    } else {
      dispatch(addCertificate(formData));
    }
    resetForm();
    setIsModalOpen(false);
  };

  const handleEdit = (cert) => {
    setFormData(cert);
    setEditingId(cert.id);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this certificate?")) {
      dispatch(deleteCertificate(id));
    }
  };

  const handleAdd = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      image: "",
      link: "",
      date: "",
      issuer: "",
      category: "Technology"
    });
    setEditingId(null);
  };

  // Loading skeleton
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              My <span className="text-blue-600">Professional</span> Certifications
            </h1>
            <div className="mt-8 flex justify-center gap-4">
              <div className="px-6 py-3 bg-gray-200 rounded-full animate-pulse h-12 w-40"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                <div className="h-48 bg-gray-200 animate-pulse"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
                  <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 p-4 rounded-full">
              <FaCertificate className="text-blue-600 text-4xl" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            My <span className="text-blue-600">Professional</span> Certifications
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Showcase your professional achievements and skills with verified certifications
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={handleAdd}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-300 flex items-center gap-2 hover:shadow-xl hover:-translate-y-1"
            >
              <FiPlus className="text-lg" />
              Add Certificate
            </button>
          </div>
        </div>

        {certificates.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <FaCertificate className="inline-block text-6xl" />
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">No certificates added yet</h3>
            <p className="text-gray-500 mb-6">Add your first certification to showcase your skills</p>
            <button
              onClick={handleAdd}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow transition-all duration-300"
            >
              Add Certificate
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transform transition duration-300 overflow-hidden border border-gray-100 relative group"
              >
                <div className={`absolute -right-1 top-4 w-32 py-1 text-center text-xs font-semibold rotate-45 shadow-sm ${categoryColors[cert.category] || 'bg-gray-100 text-gray-800'}`}>
                  {categoryIcons[cert.category] || '🏆'} {cert.category}
                </div>
                <div className="relative h-48 bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-center p-6">
                  {cert.image ? (
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="max-h-full max-w-full object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/300x200?text=Certificate+Image";
                      }}
                    />
                  ) : (
                    <div className="text-gray-300 text-6xl">
                      <FaCertificate />
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700 shadow-sm">
                    {cert.issuer}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-xl font-bold text-gray-900 leading-tight">{cert.title}</h2>
                    <span className="text-sm text-gray-500 whitespace-nowrap ml-2">{cert.date}</span>
                  </div>
                  <p className="text-gray-600 mb-5 line-clamp-3">{cert.description}</p>
                  <div className="flex justify-between items-center">
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300 hover:shadow-md"
                    >
                      <FiExternalLink className="mr-2" />
                      View
                    </a>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => handleEdit(cert)}
                        className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors hover:text-blue-600"
                        title="Edit"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={() => handleDelete(cert.id)}
                        className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-full transition-colors hover:text-red-700"
                        title="Delete"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
            <div 
              className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">
                  {editingId ? "Edit Certificate" : "Add Certificate"}
                </h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input 
                    type="text" 
                    name="title" 
                    value={formData.title} 
                    onChange={handleInputChange} 
                    placeholder="e.g. AWS Certified Solutions Architect" 
                    required 
                    className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea 
                    name="description" 
                    value={formData.description} 
                    onChange={handleInputChange} 
                    placeholder="Describe the certification and skills gained" 
                    required 
                    rows={3} 
                    className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input 
                    type="text" 
                    name="image" 
                    value={formData.image} 
                    onChange={handleInputChange} 
                    placeholder="https://example.com/certificate.jpg" 
                    required 
                    className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Verification Link</label>
                  <input 
                    type="text" 
                    name="link" 
                    value={formData.link} 
                    onChange={handleInputChange} 
                    placeholder="https://example.com/verify" 
                    required 
                    className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" 
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input 
                      type="text" 
                      name="date" 
                      value={formData.date} 
                      onChange={handleInputChange} 
                      placeholder="MM/YYYY" 
                      required 
                      className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Issuer</label>
                    <input 
                      type="text" 
                      name="issuer" 
                      value={formData.issuer} 
                      onChange={handleInputChange} 
                      placeholder="e.g. Amazon Web Services" 
                      required 
                      className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" 
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select 
                    name="category" 
                    value={formData.category} 
                    onChange={handleInputChange} 
                    className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  >
                    {Object.keys(categoryColors).map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)} 
                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm"
                  >
                    {editingId ? "Update Certificate" : "Add Certificate"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
import React, { useState, useEffect } from "react";
import axios from "axios";

// You can move this to a .env later
const API_BASE = "http://localhost:5000/student";

const categoryColors = {
  Business: "bg-purple-100 text-purple-800",
  Technology: "bg-blue-100 text-blue-800",
  "Cloud Computing": "bg-orange-100 text-orange-800",
  Design: "bg-pink-100 text-pink-800",
  Marketing: "bg-green-100 text-green-800"
};

export default function Certificates() {
  const [certificates, setCertificates] = useState([]);
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
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const response = await axios.get(`${API_BASE}/certificates`);
      setCertificates(response.data);
    } catch (error) {
      console.error("Failed to fetch certificates", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_BASE}/certificates/${editingId}`, formData);
      } else {
        await axios.post(`${API_BASE}/certificates`, formData);
      }
      fetchCertificates();
      resetForm();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving certificate", error);
    }
  };

  const handleEdit = (cert) => {
    setFormData(cert);
    setEditingId(cert.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}/certificates/${id}`);
      fetchCertificates();
    } catch (error) {
      console.error("Error deleting certificate", error);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            My <span className="text-blue-600">Professional</span> Certifications
          </h1>
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={handleAdd}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-300 flex items-center gap-2"
            >
              + Add Certificate
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transform transition duration-300 overflow-hidden border border-gray-100 relative group"
            >
              <div className={`absolute -right-1 top-4 w-32 py-1 text-center text-xs font-semibold rotate-45 shadow-sm ${categoryColors[cert.category] || 'bg-gray-100 text-gray-800'}`}>
                {cert.category}
              </div>
              <div className="relative h-48 bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-center p-6">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="max-h-full max-w-full object-contain rounded-lg"
                />
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
                    className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300"
                  >
                    View
                  </a>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => handleEdit(cert)}
                      className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
                      title="Edit"
                    >
                      Edit
                      
                    </button>
                    <button
                      onClick={() => handleDelete(cert.id)}
                      className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-full transition-colors"
                      title="Delete"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg">
              <h2 className="text-2xl font-semibold mb-4">{editingId ? "Edit Certificate" : "Add Certificate"}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="Title" required className="w-full border px-4 py-2 rounded-lg" />
                <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" required rows={3} className="w-full border px-4 py-2 rounded-lg" />
                <input type="text" name="image" value={formData.image} onChange={handleInputChange} placeholder="Image URL" required className="w-full border px-4 py-2 rounded-lg" />
                <input type="text" name="link" value={formData.link} onChange={handleInputChange} placeholder="Link" required className="w-full border px-4 py-2 rounded-lg" />
                <input type="text" name="date" value={formData.date} onChange={handleInputChange} placeholder="Date" required className="w-full border px-4 py-2 rounded-lg" />
                <input type="text" name="issuer" value={formData.issuer} onChange={handleInputChange} placeholder="Issuer" required className="w-full border px-4 py-2 rounded-lg" />
                <select name="category" value={formData.category} onChange={handleInputChange} className="w-full border px-4 py-2 rounded-lg">
                  {Object.keys(categoryColors).map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <div className="flex justify-end gap-4 pt-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Cancel</button>
                  <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
                    {editingId ? "Update" : "Add"}
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

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCalendarAlt, FaGlobe, FaHandsHelping, FaTrashAlt } from "react-icons/fa";

const API_BASE_URL = "http://localhost:5000/student/voluntary";

const categoryColors = {
  Health: "bg-red-100 text-red-800",
  Education: "bg-blue-100 text-blue-800",
  Environment: "bg-green-100 text-green-800",
  Community: "bg-purple-100 text-purple-800",
  "Disaster Relief": "bg-orange-100 text-orange-800"
};

export default function Voluntary() {
  const [voluntaryWork, setVoluntaryWork] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    link: "",
    date: "",
    organization: "",
    category: "Health"
  });

  // Fetch all data on mount
  useEffect(() => {
    fetchVoluntaryWork();
  }, []);

  const fetchVoluntaryWork = async () => {
    try {
      const res = await axios.get(API_BASE_URL);
      setVoluntaryWork(res.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      image: "",
      link: "",
      date: "",
      organization: "",
      category: "Health"
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_BASE_URL}/${editingId}`, formData);
      } else {
        await axios.post(API_BASE_URL, formData);
      }
      await fetchVoluntaryWork();
      resetForm();
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error saving data:", err);
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingId(item._id); // backend should return _id
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      await fetchVoluntaryWork();
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            My<span className="text-blue-600"> Voluntary</span> Work
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Impactful initiatives and service contributions I have made to society.
          </p>
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => {
                resetForm();
                setIsModalOpen(true);
              }}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md"
            >
              + Add Voluntary Work
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {voluntaryWork.map((work) => (
            <div
              key={work._id}
              className="bg-white shadow-xl rounded-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300 relative border border-gray-100 group"
            >
              <div
                className={`absolute top-4 right-4 px-3 py-1 text-xs rounded-full font-semibold shadow-sm ${categoryColors[work.category] || "bg-gray-100 text-gray-800"}`}
              >
                {work.category}
              </div>

              <div className="h-48 w-full overflow-hidden flex items-center justify-center bg-gray-100">
                <img src={work.image} alt={work.title} className="h-full object-cover" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {work.title}
                </h3>

                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <FaHandsHelping className="mr-2 text-blue-500" />
                  {work.organization}
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <FaCalendarAlt className="mr-2 text-gray-500" />
                  {work.date}
                </div>

                <p className="text-gray-600 mb-4 line-clamp-3">{work.description}</p>

                <div className="flex justify-between items-center">
                  <a
                    href={work.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 font-medium hover:underline"
                  >
                    <FaGlobe className="mr-2" /> Learn More
                  </a>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(work)}
                      className="text-sm text-gray-500 hover:text-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(work._id)}
                      className="text-sm text-red-500 hover:text-red-700"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-xl w-full max-w-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                  {editingId ? "Edit Voluntary Work" : "Add Voluntary Work"}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleInputChange} required className="w-full px-4 py-2 border rounded" />
                <input type="text" name="organization" placeholder="Organization" value={formData.organization} onChange={handleInputChange} required className="w-full px-4 py-2 border rounded" />
                <input type="text" name="date" placeholder="Date" value={formData.date} onChange={handleInputChange} required className="w-full px-4 py-2 border rounded" />
                <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleInputChange} className="w-full px-4 py-2 border rounded" />
                <input type="text" name="link" placeholder="Link" value={formData.link} onChange={handleInputChange} className="w-full px-4 py-2 border rounded" />
                <textarea name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} required className="w-full px-4 py-2 border rounded" />
                <select name="category" value={formData.category} onChange={handleInputChange} className="w-full px-4 py-2 border rounded">
                  <option value="Health">Health</option>
                  <option value="Education">Education</option>
                  <option value="Environment">Environment</option>
                  <option value="Community">Community</option>
                  <option value="Disaster Relief">Disaster Relief</option>
                </select>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                  {editingId ? "Update" : "Add"} Work
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

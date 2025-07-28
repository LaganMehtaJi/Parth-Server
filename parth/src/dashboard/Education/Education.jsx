import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Education() {
  const [education, setEducation] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    registrationNo: "",
    institution: "",
    degree: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
    grade: "",
    description: "",
    batchYear: ""
  });

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    try {
      const res = await axios.get("http://localhost:5000/student/education");
      setEducation(res.data);
    } catch (err) {
      console.error("Error fetching education:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      registrationNo: "",
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      grade: "",
      description: "",
      batchYear: ""
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/student/education/${editingId}`, formData);
      } else {
        await axios.post("http://localhost:5000/student/education", formData);
      }
      fetchEducation();
      setIsModalOpen(false);
      resetForm();
    } catch (err) {
      console.error("Error saving education:", err);
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingId(item._id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this education entry?")) return;
    try {
      await axios.delete(`http://localhost:5000/student/education/${id}`);
      fetchEducation();
    } catch (err) {
      console.error("Error deleting education:", err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-6">My <span className="text-blue-600">Education</span></h1>

      <div className="flex justify-center mb-6">
        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          + Add Education
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {education.map((item) => (
          <div key={item._id} className="p-4 bg-white rounded-lg shadow-md border border-gray-100 hover:scale-105 transition-transform">
            <h2 className="text-xl font-semibold">{item.degree}</h2>
            <p className="text-gray-600">{item.institution}</p>
            <p className="text-sm text-gray-500">{item.fieldOfStudy}</p>
            <p className="text-sm mt-1 text-gray-600">
              {item.startDate?.slice(0, 10)} to {item.endDate?.slice(0, 10)}
            </p>
            <p className="text-sm text-gray-600">Grade: {item.grade}</p>
            <p className="text-sm text-gray-500">Batch: {item.batchYear}</p>
            <p className="mt-2 text-sm text-gray-700">{item.description}</p>

            <div className="mt-4 flex gap-4">
              <button onClick={() => handleEdit(item)} className="text-blue-600 hover:underline text-sm">Edit</button>
              <button onClick={() => handleDelete(item._id)} className="text-red-600 hover:underline text-sm">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
            <h2 className="text-xl font-bold mb-4">{editingId ? "Edit Education" : "Add Education"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="registrationNo" placeholder="Registration No" value={formData.registrationNo} onChange={handleInputChange} required className="w-full border px-4 py-2 rounded" />
              <input type="text" name="institution" placeholder="Institution" value={formData.institution} onChange={handleInputChange} required className="w-full border px-4 py-2 rounded" />
              <input type="text" name="degree" placeholder="Degree" value={formData.degree} onChange={handleInputChange} required className="w-full border px-4 py-2 rounded" />
              <input type="text" name="fieldOfStudy" placeholder="Field of Study" value={formData.fieldOfStudy} onChange={handleInputChange} className="w-full border px-4 py-2 rounded" />
              <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} className="w-full border px-4 py-2 rounded" />
              <input type="date" name="endDate" value={formData.endDate} onChange={handleInputChange} className="w-full border px-4 py-2 rounded" />
              <input type="text" name="grade" placeholder="Grade" value={formData.grade} onChange={handleInputChange} className="w-full border px-4 py-2 rounded" />
              <input type="number" name="batchYear" placeholder="Batch Year" value={formData.batchYear} onChange={handleInputChange} className="w-full border px-4 py-2 rounded" />
              <textarea name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} rows="3" className="w-full border px-4 py-2 rounded" />
              <div className="flex justify-end gap-4 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">{editingId ? "Update" : "Add"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

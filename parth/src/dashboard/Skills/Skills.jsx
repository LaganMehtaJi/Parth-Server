import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    skill: "",
    proficiency: "",
    registrationNo: "",
  });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/skills");
      setSkills(res.data);
    } catch (err) {
      console.error("Error fetching skills:", err);
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
        await axios.put(`http://localhost:5000/student/skills/${editingId}`, formData);
      } else {
        await axios.post("http://localhost:5000/student/skills", formData);
      }
      await fetchSkills();
      resetForm();
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingId(item._id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this skill?")) return;
    try {
      await axios.delete(`http://localhost:5000/student/skills/${id}`);
      await fetchSkills();
    } catch (err) {
      console.error("Error deleting skill:", err);
    }
  };

  const resetForm = () => {
    setFormData({
      skill: "",
      proficiency: "",
      registrationNo: "",
    });
    setEditingId(null);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 text-center">
            My<span className="text-blue-600"> Skills</span>
          </h1>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => {
              resetForm();
              setIsModalOpen(true);
            }}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md"
          >
            + Add Skill
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-10">
          {skills.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-md p-4 relative border border-gray-100 group transform hover:scale-105 transition-transform duration-300"
            >
              <div className="mt-4">
                <h2 className="text-xl font-semibold">{item.skill}</h2>
                <p className="text-gray-700 mt-2">
                  Proficiency:{" "}
                  <span className="font-medium">{item.proficiency}</span>
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  Registration No: {item.registrationNo}
                </p>
              </div>

              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="text-blue-600 text-sm hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-red-600 text-sm hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              {editingId ? "Edit Skill" : "Add Skill"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-medium">Skill</label>
                <input
                  type="text"
                  name="skill"
                  value={formData.skill}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block font-medium">Proficiency</label>
                <select
                  name="proficiency"
                  value={formData.proficiency}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                >
                  <option value="">Select</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>

              <div>
                <label className="block font-medium">Registration No</label>
                <input
                  type="text"
                  name="registrationNo"
                  value={formData.registrationNo}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {editingId ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

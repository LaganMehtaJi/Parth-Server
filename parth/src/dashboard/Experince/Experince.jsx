import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchExperience,
  addExperience,
  updateExperience,
  deleteExperience,
} from "../../redux/ExperinceSlice";

export default function Experience() {
  const dispatch = useDispatch();
  const { list: experience } = useSelector((state) => state.experience);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    registrationNo: "",
    title: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  useEffect(() => {
    dispatch(fetchExperience());
  }, [dispatch]);

  const resetForm = () => {
    setFormData({
      registrationNo: "",
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    });
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      dispatch(updateExperience({ id: editingId, formData }));
    } else {
      dispatch(addExperience(formData));
    }
    resetForm();
    setIsModalOpen(false);
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingId(item._id);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this experience?")) {
      dispatch(deleteExperience(id));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 text-center">
        My <span className="text-blue-600">Internship</span> Experience
      </h1>

      <div className="flex justify-center mb-6">
        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          + Add Experience
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {experience.map((exp) => (
          <div
            key={exp._id}
            className="bg-white rounded-xl shadow-md p-5 border hover:shadow-lg transform hover:scale-105 transition-transform duration-300 relative"
          >
            <h2 className="text-xl font-semibold">{exp.title}</h2>
            <p className="text-gray-700 font-medium">{exp.company}</p>
            <p className="text-sm text-gray-500 italic">{exp.location}</p>
            <p className="text-sm text-gray-600">
              {new Date(exp.startDate).toLocaleDateString()} –{" "}
              {new Date(exp.endDate).toLocaleDateString()}
            </p>
            <p className="text-gray-700 text-sm mt-2">{exp.description}</p>
            <p className="text-gray-400 text-xs mt-2">
              Registration No: {exp.registrationNo}
            </p>

            <div className="absolute top-2 right-2 flex gap-2">
              <button
                onClick={() => handleEdit(exp)}
                className="text-blue-600 hover:underline text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(exp._id)}
                className="text-red-600 hover:underline text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-full max-w-lg shadow-lg relative">
            <h2 className="text-xl font-bold mb-4">
              {editingId ? "Edit Experience" : "Add Experience"}
            </h2>

            <form onSubmit={handleSubmit} className="grid gap-4">
              <input
                type="text"
                name="registrationNo"
                placeholder="Registration No"
                value={formData.registrationNo}
                onChange={(e) => setFormData({ ...formData, registrationNo: e.target.value })}
                className="border px-3 py-2 rounded"
                required
              />
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="border px-3 py-2 rounded"
                required
              />
              <input
                type="text"
                name="company"
                placeholder="Company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="border px-3 py-2 rounded"
              />
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="border px-3 py-2 rounded"
              />
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="border px-3 py-2 rounded"
              />
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="border px-3 py-2 rounded"
              />
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows="3"
                className="border px-3 py-2 rounded"
              />

              <div className="flex justify-end gap-4 mt-4">
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
                  {editingId ? "Update" : "+ Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

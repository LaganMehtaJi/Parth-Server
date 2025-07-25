import React, { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiPlus, FiX } from 'react-icons/fi';

export default function Certificate() {
  const [certificates, setCertificates] = useState(() => {
    try {
      const saved = localStorage.getItem('certificates');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Error loading certificates:", error);
      return [];
    }
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    description: "certificate of deleiote",
    imageUrl: "/maimtlogo.jpg"
  });

  useEffect(() => {
    localStorage.setItem('certificates', JSON.stringify(certificates));
  }, [certificates]);

  const handleAddClick = () => {
    setFormData({ id: null, description: "", imageUrl: "" });
    setIsEditMode(false);
    setIsFormOpen(true);
  };

  const handleEditClick = (cert) => {
    setFormData(cert);
    setIsEditMode(true);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this certificate?")) {
      setCertificates((prev) => prev.filter((cert) => cert.id !== id));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { description, imageUrl } = formData;
    if (!description.trim() || !imageUrl.trim()) {
      alert("Both fields are required.");
      return;
    }

    if (isEditMode) {
      setCertificates((prev) =>
        prev.map((item) => (item.id === formData.id ? formData : item))
      );
    } else {
      setCertificates((prev) => [...prev, { ...formData, id: Date.now() }]);
    }

    setIsFormOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Certificates</h1>
        <button
          onClick={handleAddClick}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          <FiPlus /> Add Certificate
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition-all"
          >
            {cert.imageUrl && (
              <img
                src={cert.imageUrl}
                alt="Certificate"
                className="w-full h-56 object-cover"
              />
            )}
            <div className="p-4">
              <p className="text-gray-700">{cert.description}</p>
              <div className="flex justify-end gap-2 mt-3">
                <button
                  onClick={() => handleEditClick(cert)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FiEdit2 />
                </button>
                <button
                  onClick={() => handleDelete(cert.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center border-b px-4 py-3">
              <h2 className="text-lg font-semibold">
                {isEditMode ? "Edit Certificate" : "Add Certificate"}
              </h2>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-gray-600 hover:text-black"
              >
                <FiX size={20} />
              </button>
            </div>
            <form onSubmit={handleFormSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Certificate Image URL *
                </label>
                <input
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com/certificate.jpg"
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="E.g. Completed XYZ program"
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {isEditMode ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

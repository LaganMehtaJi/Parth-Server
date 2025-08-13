import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiX,
} from "react-icons/fi";

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [registrationNo, setRegistrationNo] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize registrationNo and fetch skills
  useEffect(() => {
    const regNo = localStorage.getItem('registrationNo');
    if (!regNo) {
      setError('Registration number not found in localStorage');
      return;
    }
    setRegistrationNo(regNo);
    fetchSkills(regNo);
  }, []);

  const fetchSkills = async (regNo) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/api/skill/get/${regNo}`);
      setSkills(response.data);
    } catch (err) {
      setError('Failed to fetch skills');
      console.error('Error fetching skills:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const skillSchema = Yup.object().shape({
    skill: Yup.string().required("Skill name is required"),
    proficiency: Yup.string().required("Proficiency level is required"),
  });

  const formik = useFormik({
    initialValues: {
      skill: "",
      proficiency: "",
    },
    validationSchema: skillSchema,
    onSubmit: async (values, { resetForm }) => {
      if (!registrationNo) {
        setError('Registration number not found');
        return;
      }

      setIsLoading(true);
      try {
        const skillData = {
          ...values,
          registrationNo
        };

        if (editingId) {
          // Update skill
          const response = await axios.post(
            `http://localhost:3000/api/skill/update/${registrationNo}/${editingId}`,
            skillData
          );
          setSkills(skills.map(skill => 
            skill._id === editingId ? response.data : skill
          ));
        } else {
          // Add new skill
          const response = await axios.post(
            `http://localhost:3000/api/skill/add/${registrationNo}`,
            skillData
          );
          setSkills([...skills, response.data]);
        }
        resetForm();
        setIsModalOpen(false);
        setEditingId(null);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to save skill');
        console.error('Error submitting form:', err);
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleEdit = (item) => {
    formik.setValues({
      skill: item.skill,
      proficiency: item.proficiency,
    });
    setEditingId(item._id);
    setIsModalOpen(true);
    setError(null);
  };

  const handleDeleteClick = (id) => {
    setDeletingId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!registrationNo) {
      setError('Registration number not found');
      setIsDeleteModalOpen(false);
      return;
    }

    setIsLoading(true);
    try {
      await axios.post(`http://localhost:3000/api/skill/delete/${registrationNo}/${deletingId}`);
      setSkills(skills.filter(skill => skill._id !== deletingId));
    } catch (err) {
      setError('Failed to delete skill');
      console.error('Error deleting skill:', err);
    } finally {
      setIsLoading(false);
      setIsDeleteModalOpen(false);
      setDeletingId(null);
    }
  };

  const resetForm = () => {
    formik.resetForm();
    setEditingId(null);
    setError(null);
  };

  if (isLoading && skills.length === 0) {
    return (
      <div className="max-w-6xl mx-auto p-4 md:p-6 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 text-center">
          My<span className="text-blue-600"> Skills</span>
        </h1>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => {
              resetForm();
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md"
            disabled={isLoading}
          >
            <FiPlus /> Add Skill
          </button>
        </div>

        {skills.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 mt-10">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <FiPlus className="text-blue-600 text-2xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-700">No skills yet</h3>
            <p className="text-gray-500 mb-4">Get started by adding your first skill</p>
            <button
              onClick={() => {
                resetForm();
                setIsModalOpen(true);
              }}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              disabled={isLoading}
            >
              <FiPlus /> Add Skill
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            {skills.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow-md p-6 relative border border-gray-100 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="mt-4">
                  <h2 className="text-xl font-semibold">{item.skill}</h2>
                  <div className="mt-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">Proficiency:</span>
                      <span className="text-sm font-medium">{item.proficiency}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${
                          item.proficiency === 'Beginner' ? 'bg-blue-300' :
                          item.proficiency === 'Intermediate' ? 'bg-blue-400' :
                          item.proficiency === 'Advanced' ? 'bg-blue-500' : 'bg-blue-600'
                        }`}
                        style={{
                          width: 
                            item.proficiency === 'Beginner' ? '25%' :
                            item.proficiency === 'Intermediate' ? '50%' :
                            item.proficiency === 'Advanced' ? '75%' : '100%'
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    disabled={isLoading}
                    className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-colors"
                    aria-label="Edit skill"
                  >
                    <FiEdit2 />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(item._id)}
                    disabled={isLoading}
                    className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                    aria-label="Delete skill"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Skill Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div 
            className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">
                {editingId ? 'Edit Skill' : 'Add Skill'}
              </h2>
              <button 
                onClick={() => {
                  resetForm();
                  setIsModalOpen(false);
                }}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                aria-label="Close modal"
                disabled={isLoading}
              >
                <FiX className="text-xl" />
              </button>
            </div>
            
            <form onSubmit={formik.handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Skill*</label>
                <input
                  type="text"
                  name="skill"
                  value={formik.values.skill}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={isLoading}
                  className={`w-full px-4 py-2 border ${
                    formik.touched.skill && formik.errors.skill
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:bg-gray-100`}
                />
                {formik.touched.skill && formik.errors.skill ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.skill}
                  </div>
                ) : null}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Proficiency*</label>
                <select
                  name="proficiency"
                  value={formik.values.proficiency}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={isLoading}
                  className={`w-full px-4 py-2 border ${
                    formik.touched.proficiency && formik.errors.proficiency
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:bg-gray-100`}
                >
                  <option value="">Select proficiency</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
                {formik.touched.proficiency && formik.errors.proficiency ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.proficiency}
                  </div>
                ) : null}
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setIsModalOpen(false);
                  }}
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
                      {editingId ? 'Updating...' : 'Adding...'}
                    </>
                  ) : (
                    editingId ? 'Update Skill' : 'Add Skill'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div 
            className="bg-white rounded-xl shadow-xl w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">
                Confirm Deletion
              </h2>
              <button 
                onClick={() => setIsDeleteModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                aria-label="Close modal"
                disabled={isLoading}
              >
                <FiX className="text-xl" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <p className="text-gray-700">Are you sure you want to delete this skill? This action cannot be undone.</p>
              
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsDeleteModalOpen(false)}
                  disabled={isLoading}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isLoading}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-32"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Deleting...
                    </>
                  ) : (
                    'Delete Skill'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
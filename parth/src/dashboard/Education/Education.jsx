import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaGraduationCap, FaUniversity, FaCalendarAlt, FaEdit, FaTrash } from "react-icons/fa";
import { FiPlus, FiX } from "react-icons/fi";
import * as Yup from "yup";
import { useFormik } from "formik";

const API_BASE_URL = "http://localhost:3000/api/education";

export default function Education() {
  const [education, setEducation] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [registrationNo, setRegistrationNo] = useState("");

  // Initialize registrationNo and fetch education
  useEffect(() => {
    const regNo = localStorage.getItem('registrationNo');
    if (!regNo) {
      setError('Registration number not found in localStorage');
      return;
    }
    setRegistrationNo(regNo);
    fetchEducation(regNo);
  }, []);

  const fetchEducation = async (regNo) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/get/${regNo}`);
      setEducation(response.data);
    } catch (err) {
      setError('Failed to fetch education data');
      console.error('Error fetching education:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const validationSchema = Yup.object().shape({
    institution: Yup.string().required('Institution is required'),
    degree: Yup.string().required('Degree is required'),
    fieldOfStudy: Yup.string().required('Field of study is required'),
    startDate: Yup.string().required('Start date is required'),
    endDate: Yup.string().required('End date is required'),
    grade: Yup.string().required('Grade is required'),
    description: Yup.string().required('Description is required'),
    batchYear: Yup.string().required('Batch year is required')
  });

  const formik = useFormik({
    initialValues: {
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      grade: "",
      description: "",
      batchYear: ""
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      if (!registrationNo) {
        setError('Registration number not found');
        return;
      }

      setIsLoading(true);
      try {
        const educationData = {
          ...values,
          registrationNo
        };

        if (formik.values._id) {
          // Update education
          const response = await axios.post(
            `${API_BASE_URL}/update/${registrationNo}/${formik.values._id}`,
            educationData
          );
          setEducation(education.map(edu => 
            edu._id === formik.values._id ? response.data : edu
          ));
        } else {
          // Add new education
          const response = await axios.post(
            `${API_BASE_URL}/add/${registrationNo}`,
            educationData
          );
          setEducation([...education, response.data]);
        }
        resetForm();
        setIsModalOpen(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to save education data');
        console.error('Error saving education:', err);
      } finally {
        setIsLoading(false);
      }
    }
  });

  const handleEdit = (item) => {
    formik.setValues({
      ...item,
      _id: item._id
    });
    setIsModalOpen(true);
    setError(null);
  };

  const confirmDelete = async () => {
    if (!itemToDelete || !registrationNo) return;
    
    setIsLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/delete/${registrationNo}/${itemToDelete}`);
      setEducation(education.filter(edu => edu._id !== itemToDelete));
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    } catch (err) {
      setError('Failed to delete education entry');
      console.error('Error deleting education:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    formik.resetForm();
    setError(null);
  };

  if (isLoading && education.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            My<span className="text-blue-600"> Education</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            My academic journey and qualifications
          </p>
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => {
                resetForm();
                setIsModalOpen(true);
              }}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md"
              disabled={isLoading}
            >
              <FiPlus /> Add Education
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {education.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border-2 border-dashed border-gray-200">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <FaGraduationCap className="text-blue-600 text-2xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-700">No education entries yet</h3>
            <p className="text-gray-500 mb-4">Get started by adding your first education</p>
            <button
              onClick={() => {
                resetForm();
                setIsModalOpen(true);
              }}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              disabled={isLoading}
            >
              <FiPlus /> Add Education
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {education.map((item) => (
              <div
                key={item._id}
                className="bg-white shadow-xl rounded-2xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-300 relative border border-gray-100 p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <FaUniversity className="text-blue-600 text-xl" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {item.degree}
                    </h3>
                    <p className="text-gray-600 font-medium">{item.institution}</p>
                    <p className="text-sm text-gray-500">{item.fieldOfStudy}</p>
                    
                    <div className="flex items-center text-sm text-gray-500 mt-2">
                      <FaCalendarAlt className="mr-2" />
                      {new Date(item.startDate).toLocaleDateString()} - {item.endDate ? new Date(item.endDate).toLocaleDateString() : 'Present'}
                    </div>
                    
                    <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500">Grade:</span> {item.grade}
                      </div>
                      <div>
                        <span className="text-gray-500">Batch:</span> {item.batchYear}
                      </div>
                    </div>
                    
                    {item.description && (
                      <p className="mt-3 text-gray-600 text-sm">{item.description}</p>
                    )}
                  </div>
                </div>

                <div className="mt-4 flex justify-end gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    disabled={isLoading}
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                    aria-label="Edit education"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => {
                      setItemToDelete(item._id);
                      setIsDeleteModalOpen(true);
                    }}
                    disabled={isLoading}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                    aria-label="Delete education"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add/Edit Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div 
              className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">
                  {formik.values._id ? 'Edit Education' : 'Add Education'}
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
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Institution*</label>
                    <input
                      type="text"
                      name="institution"
                      value={formik.values.institution}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled={isLoading}
                      className={`w-full px-4 py-2 border ${
                        formik.touched.institution && formik.errors.institution
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:bg-gray-100`}
                    />
                    {formik.touched.institution && formik.errors.institution && (
                      <div className="text-red-500 text-sm mt-1">{formik.errors.institution}</div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Degree*</label>
                    <input
                      type="text"
                      name="degree"
                      value={formik.values.degree}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled={isLoading}
                      className={`w-full px-4 py-2 border ${
                        formik.touched.degree && formik.errors.degree
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:bg-gray-100`}
                    />
                    {formik.touched.degree && formik.errors.degree && (
                      <div className="text-red-500 text-sm mt-1">{formik.errors.degree}</div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Field of Study*</label>
                  <input
                    type="text"
                    name="fieldOfStudy"
                    value={formik.values.fieldOfStudy}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={isLoading}
                    className={`w-full px-4 py-2 border ${
                      formik.touched.fieldOfStudy && formik.errors.fieldOfStudy
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:bg-gray-100`}
                  />
                  {formik.touched.fieldOfStudy && formik.errors.fieldOfStudy && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.fieldOfStudy}</div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date*</label>
                    <input
                      type="date"
                      name="startDate"
                      value={formik.values.startDate}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled={isLoading}
                      className={`w-full px-4 py-2 border ${
                        formik.touched.startDate && formik.errors.startDate
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:bg-gray-100`}
                    />
                    {formik.touched.startDate && formik.errors.startDate && (
                      <div className="text-red-500 text-sm mt-1">{formik.errors.startDate}</div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date*</label>
                    <input
                      type="date"
                      name="endDate"
                      value={formik.values.endDate}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled={isLoading}
                      className={`w-full px-4 py-2 border ${
                        formik.touched.endDate && formik.errors.endDate
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:bg-gray-100`}
                    />
                    {formik.touched.endDate && formik.errors.endDate && (
                      <div className="text-red-500 text-sm mt-1">{formik.errors.endDate}</div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Grade*</label>
                    <input
                      type="text"
                      name="grade"
                      value={formik.values.grade}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled={isLoading}
                      className={`w-full px-4 py-2 border ${
                        formik.touched.grade && formik.errors.grade
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:bg-gray-100`}
                    />
                    {formik.touched.grade && formik.errors.grade && (
                      <div className="text-red-500 text-sm mt-1">{formik.errors.grade}</div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Batch Year*</label>
                    <input
                      type="text"
                      name="batchYear"
                      value={formik.values.batchYear}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled={isLoading}
                      className={`w-full px-4 py-2 border ${
                        formik.touched.batchYear && formik.errors.batchYear
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:bg-gray-100`}
                    />
                    {formik.touched.batchYear && formik.errors.batchYear && (
                      <div className="text-red-500 text-sm mt-1">{formik.errors.batchYear}</div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
                  <textarea
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={isLoading}
                    rows={3}
                    className={`w-full px-4 py-2 border ${
                      formik.touched.description && formik.errors.description
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:bg-gray-100`}
                  />
                  {formik.touched.description && formik.errors.description && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.description}</div>
                  )}
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
                    disabled={isLoading || !formik.isValid}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-32"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {formik.values._id ? 'Updating...' : 'Adding...'}
                      </>
                    ) : (
                      formik.values._id ? 'Update' : 'Add'
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
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Confirm Deletion</h2>
                <p className="text-gray-600 mb-6">Are you sure you want to delete this education entry? This action cannot be undone.</p>
                
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setIsDeleteModalOpen(false)}
                    disabled={isLoading}
                    className="px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    disabled={isLoading}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
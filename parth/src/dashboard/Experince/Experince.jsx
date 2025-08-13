import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt, FaTrashAlt, FaPlus, FaTimes } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import * as Yup from "yup";
import { useFormik } from "formik";

const API_BASE_URL = "http://localhost:3000/api/experience";

export default function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [registrationNo, setRegistrationNo] = useState("");

  // Initialize registrationNo and fetch experiences
  useEffect(() => {
    const regNo = localStorage.getItem('registrationNo');
    if (!regNo) {
      setError('Registration number not found in localStorage');
      return;
    }
    setRegistrationNo(regNo);
    fetchExperiences(regNo);
  }, []);

  const fetchExperiences = async (regNo) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/get/${regNo}`);
      setExperiences(response.data);
    } catch (err) {
      setError('Failed to fetch experiences');
      console.error('Error fetching experiences:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    company: Yup.string().required('Company is required'),
    location: Yup.string(),
    startDate: Yup.date().required('Start date is required'),
    endDate: Yup.date()
      .min(Yup.ref('startDate'), 'End date must be after start date'),
    description: Yup.string().required('Description is required')
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
      currentlyWorking: false
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      if (!registrationNo) {
        setError('Registration number not found');
        return;
      }

      setIsLoading(true);
      try {
        const experienceData = {
          ...values,
          registrationNo
        };

        let response;
        if (formik.values._id) {
          response = await axios.post(
            `${API_BASE_URL}/update/${registrationNo}/${formik.values._id}`,
            experienceData
          );
        } else {
          response = await axios.post(
            `${API_BASE_URL}/add/${registrationNo}`,
            experienceData
          );
        }

        await fetchExperiences(registrationNo);
        resetForm();
        setIsModalOpen(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to save experience');
        console.error('Error saving experience:', err);
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
      await fetchExperiences(registrationNo);
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    } catch (err) {
      setError('Failed to delete experience');
      console.error('Error deleting experience:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    formik.resetForm();
    setError(null);
  };

  if (isLoading && experiences.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 p-4 rounded-full">
              <FaBriefcase className="text-blue-600 text-4xl" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            My <span className="text-blue-600">Professional</span> Experience
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Showcase your work experience and professional journey
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
              <FaPlus /> Add Experience
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {experiences.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border-2 border-dashed border-gray-200">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <FaBriefcase className="text-blue-600 text-2xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-700">No experiences yet</h3>
            <p className="text-gray-500 mb-4">Get started by adding your first work experience</p>
            <button
              onClick={() => {
                resetForm();
                setIsModalOpen(true);
              }}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              disabled={isLoading}
            >
              <FaPlus /> Add Experience
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {experiences.map((exp) => (
              <div
                key={exp._id}
                className="bg-white shadow-xl rounded-2xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-300 relative border border-gray-100"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {exp.title}
                    </h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(exp)}
                        disabled={isLoading}
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                        aria-label="Edit experience"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={() => {
                          setItemToDelete(exp._id);
                          setIsDeleteModalOpen(true);
                        }}
                        disabled={isLoading}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                        aria-label="Delete experience"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-700 font-medium mb-2">
                    <FaBriefcase className="mr-2 text-blue-500" />
                    {exp.company}
                  </div>

                  {exp.location && (
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <FaMapMarkerAlt className="mr-2" />
                      {exp.location}
                    </div>
                  )}

                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <FaCalendarAlt className="mr-2" />
                    {new Date(exp.startDate).toLocaleDateString()} –{' '}
                    {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : 'Present'}
                  </div>

                  <p className="text-gray-600 mb-4">{exp.description}</p>

                  <div className="text-xs text-gray-400 mt-2">
                    Registration No: {exp.registrationNo}
                  </div>
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
                  {formik.values._id ? 'Edit Experience' : 'Add Experience'}
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
                  <FaTimes className="text-xl" />
                </button>
              </div>
              
              <form onSubmit={formik.handleSubmit} className="p-6 space-y-4">
                {error && (
                  <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title*</label>
                  <input
                    type="text"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={isLoading}
                    className={`w-full px-4 py-2 border ${
                      formik.touched.title && formik.errors.title
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:bg-gray-100`}
                    placeholder="Software Engineer"
                  />
                  {formik.touched.title && formik.errors.title && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.title}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company*</label>
                  <input
                    type="text"
                    name="company"
                    value={formik.values.company}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={isLoading}
                    className={`w-full px-4 py-2 border ${
                      formik.touched.company && formik.errors.company
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:bg-gray-100`}
                    placeholder="Google Inc."
                  />
                  {formik.touched.company && formik.errors.company && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.company}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formik.values.location}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={isLoading}
                    className={`w-full px-4 py-2 border ${
                      formik.touched.location && formik.errors.location
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:bg-gray-100`}
                    placeholder="Mountain View, CA"
                  />
                  {formik.touched.location && formik.errors.location && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.location}</div>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <input
                      type="date"
                      name="endDate"
                      value={formik.values.endDate}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled={isLoading || formik.values.currentlyWorking}
                      className={`w-full px-4 py-2 border ${
                        formik.touched.endDate && formik.errors.endDate
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:bg-gray-100`}
                    />
                    {formik.touched.endDate && formik.errors.endDate && (
                      <div className="text-red-500 text-sm mt-1">{formik.errors.endDate}</div>
                    )}
                    <div className="mt-2 flex items-center">
                      <input
                        type="checkbox"
                        name="currentlyWorking"
                        checked={formik.values.currentlyWorking}
                        onChange={(e) => {
                          formik.setFieldValue('currentlyWorking', e.target.checked);
                          if (e.target.checked) {
                            formik.setFieldValue('endDate', '');
                          }
                        }}
                        className="mr-2"
                      />
                      <label className="text-sm text-gray-700">I currently work here</label>
                    </div>
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
                    rows={4}
                    className={`w-full px-4 py-2 border ${
                      formik.touched.description && formik.errors.description
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:bg-gray-100`}
                    placeholder="Describe your responsibilities and achievements"
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
                <p className="text-gray-600 mb-6">Are you sure you want to delete this experience? This action cannot be undone.</p>
                
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
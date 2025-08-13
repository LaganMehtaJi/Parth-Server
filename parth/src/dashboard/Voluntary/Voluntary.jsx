import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCalendarAlt, FaGlobe, FaHandsHelping, FaTrashAlt, FaPlus, FaTimes } from "react-icons/fa";
import { FiEdit2, FiX } from "react-icons/fi";
import * as Yup from "yup";
import { useFormik } from "formik";

const API_BASE_URL = "http://localhost:3000/api/voluntary";

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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [registrationNo, setRegistrationNo] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  // Initialize registrationNo and fetch voluntary work
  useEffect(() => {
    const regNo = localStorage.getItem('registrationNo');
    if (!regNo) {
      setError('Registration number not found in localStorage');
      return;
    }
    setRegistrationNo(regNo);
    fetchVoluntaryWork(regNo);
  }, []);

  const fetchVoluntaryWork = async (regNo) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/get/${regNo}`);
      setVoluntaryWork(response.data);
    } catch (err) {
      setError('Failed to fetch voluntary work');
      console.error('Error fetching voluntary work:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    organization: Yup.string().required('Organization is required'),
    date: Yup.string().required('Date is required'),
    category: Yup.string().required('Category is required'),
    image: Yup.mixed()
      .required('Image is required')
      .test('fileType', 'Only JPG, PNG images are allowed', (value) => {
        if (!value) return false;
        if (typeof value === 'string') return true; // For existing images
        return ['image/jpeg', 'image/png'].includes(value.type);
      }),
    link: Yup.string().url('Must be a valid URL').nullable()
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      image: "",
      link: "",
      date: "",
      organization: "",
      category: "Health"
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      if (!registrationNo) {
        setError('Registration number not found');
        return;
      }

      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('description', values.description);
        formData.append('organization', values.organization);
        formData.append('date', values.date);
        formData.append('category', values.category);
        formData.append('link', values.link || '');
        formData.append('registrationNo', registrationNo);
        
        // Only append image if it's a file (not a string URL)
        if (values.image instanceof File) {
          formData.append('image', values.image);
        } else if (values.image) {
          formData.append('imageUrl', values.image);
        }

        let response;
        if (formik.values._id) {
          response = await axios.post(
            `${API_BASE_URL}/update/${registrationNo}/${formik.values._id}`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
          );
        } else {
          response = await axios.post(
            `${API_BASE_URL}/add/${registrationNo}`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
          );
        }

        await fetchVoluntaryWork(registrationNo);
        resetForm();
        setIsModalOpen(false);
        setImagePreview("");
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to save voluntary work');
        console.error('Error saving voluntary work:', err);
      } finally {
        setIsLoading(false);
      }
    }
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      formik.setFieldValue('image', file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleEdit = (item) => {
    formik.setValues({
      ...item,
      _id: item._id
    });
    if (item.image) {
      setImagePreview(item.image);
    }
    setIsModalOpen(true);
    setError(null);
  };

  const confirmDelete = async () => {
    if (!itemToDelete || !registrationNo) return;
    
    setIsLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/delete/${registrationNo}/${itemToDelete}`);
      await fetchVoluntaryWork(registrationNo);
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    } catch (err) {
      setError('Failed to delete voluntary work');
      console.error('Error deleting voluntary work:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    formik.resetForm();
    setImagePreview("");
    setError(null);
  };

  if (isLoading && voluntaryWork.length === 0) {
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
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md"
              disabled={isLoading}
            >
              <FaPlus /> Add Voluntary Work
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {voluntaryWork.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border-2 border-dashed border-gray-200">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <FaHandsHelping className="text-blue-600 text-2xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-700">No voluntary work yet</h3>
            <p className="text-gray-500 mb-4">Get started by adding your first voluntary work</p>
            <button
              onClick={() => {
                resetForm();
                setIsModalOpen(true);
              }}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              disabled={isLoading}
            >
              <FaPlus /> Add Voluntary Work
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {voluntaryWork.map((work) => (
              <div
                key={work._id}
                className="bg-white shadow-xl rounded-2xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-300 relative border border-gray-100"
              >
                <div
                  className={`absolute top-4 right-4 px-3 py-1 text-xs rounded-full font-semibold shadow-sm ${categoryColors[work.category] || "bg-gray-100 text-gray-800"}`}
                >
                  {work.category}
                </div>

                <div className="h-48 w-full overflow-hidden flex items-center justify-center bg-gray-100">
                  {work.image ? (
                    <img 
                      src={work.image} 
                      alt={work.title} 
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/400x225?text=Voluntary+Work';
                      }}
                    />
                  ) : (
                    <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-400">
                      <FaHandsHelping className="text-4xl" />
                    </div>
                  )}
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
                    {work.link && (
                      <a
                        href={work.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 font-medium hover:underline"
                      >
                        <FaGlobe className="mr-2" /> Learn More
                      </a>
                    )}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(work)}
                        disabled={isLoading}
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                        aria-label="Edit voluntary work"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={() => {
                          setItemToDelete(work._id);
                          setIsDeleteModalOpen(true);
                        }}
                        disabled={isLoading}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                        aria-label="Delete voluntary work"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
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
                  {formik.values._id ? 'Edit Voluntary Work' : 'Add Voluntary Work'}
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
                  />
                  {formik.touched.title && formik.errors.title && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.title}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Organization*</label>
                  <input
                    type="text"
                    name="organization"
                    value={formik.values.organization}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={isLoading}
                    className={`w-full px-4 py-2 border ${
                      formik.touched.organization && formik.errors.organization
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:bg-gray-100`}
                  />
                  {formik.touched.organization && formik.errors.organization && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.organization}</div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date*</label>
                    <input
                      type="date"
                      name="date"
                      value={formik.values.date}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled={isLoading}
                      className={`w-full px-4 py-2 border ${
                        formik.touched.date && formik.errors.date
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:bg-gray-100`}
                    />
                    {formik.touched.date && formik.errors.date && (
                      <div className="text-red-500 text-sm mt-1">{formik.errors.date}</div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
                    <select
                      name="category"
                      value={formik.values.category}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled={isLoading}
                      className={`w-full px-4 py-2 border ${
                        formik.touched.category && formik.errors.category
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:bg-gray-100`}
                    >
                      <option value="Health">Health</option>
                      <option value="Education">Education</option>
                      <option value="Environment">Environment</option>
                      <option value="Community">Community</option>
                      <option value="Disaster Relief">Disaster Relief</option>
                    </select>
                    {formik.touched.category && formik.errors.category && (
                      <div className="text-red-500 text-sm mt-1">{formik.errors.category}</div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Link (Optional)</label>
                  <input
                    type="url"
                    name="link"
                    value={formik.values.link}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={isLoading}
                    className={`w-full px-4 py-2 border ${
                      formik.touched.link && formik.errors.link
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:bg-gray-100`}
                    placeholder="https://example.com"
                  />
                  {formik.touched.link && formik.errors.link && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.link}</div>
                  )}
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
                  />
                  {formik.touched.description && formik.errors.description && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.description}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image* (JPG/PNG)
                  </label>
                  {imagePreview ? (
                    <div className="relative mb-4">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="h-48 w-full object-cover rounded-lg border border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview("");
                          formik.setFieldValue('image', '');
                        }}
                        className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
                        aria-label="Remove image"
                      >
                        <FaTimes className="text-red-500" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <FaPlus className="mb-3 text-gray-400 text-xl" />
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">JPG or PNG (MAX. 5MB)</p>
                        </div>
                        <input 
                          type="file" 
                          name="image"
                          accept="image/jpeg,image/png"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  )}
                  {formik.touched.image && formik.errors.image && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.image}</div>
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
                <p className="text-gray-600 mb-6">Are you sure you want to delete this voluntary work? This action cannot be undone.</p>
                
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
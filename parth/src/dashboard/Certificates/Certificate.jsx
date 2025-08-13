import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCertificate, FaCalendarAlt, FaGlobe, FaTrashAlt, FaPlus, FaTimes } from "react-icons/fa";
import { FiEdit2, FiExternalLink } from "react-icons/fi";
import * as Yup from "yup";
import { useFormik } from "formik";

const API_BASE_URL = "http://localhost:3000/api/certificate";

const categoryColors = {
  Business: "bg-purple-100 text-purple-800",
  Technology: "bg-blue-100 text-blue-800",
  "Cloud Computing": "bg-orange-100 text-orange-800",
  Design: "bg-pink-100 text-pink-800",
  Marketing: "bg-green-100 text-green-800"
};

const categoryIcons = {
  Business: "💼",
  Technology: "💻",
  "Cloud Computing": "☁️",
  Design: "🎨",
  Marketing: "📈"
};

export default function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [registrationNo, setRegistrationNo] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  // Initialize registrationNo and fetch certificates
  useEffect(() => {
    const regNo = localStorage.getItem('registrationNo');
    if (!regNo) {
      setError('Registration number not found in localStorage');
      return;
    }
    setRegistrationNo(regNo);
    fetchCertificates(regNo);
  }, []);

  const fetchCertificates = async (regNo) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/get/${regNo}`);
      setCertificates(response.data);
    } catch (err) {
      setError('Failed to fetch certificates');
      console.error('Error fetching certificates:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    issuer: Yup.string().required('Issuer is required'),
    date: Yup.string().required('Date is required'),
    category: Yup.string().required('Category is required'),
    image: Yup.mixed()
      .required('Image is required')
      .test('fileType', 'Only JPG, PNG images are allowed', (value) => {
        if (!value) return false;
        if (typeof value === 'string') return true; // For existing images
        return ['image/jpeg', 'image/png'].includes(value.type);
      }),
    link: Yup.string().url('Must be a valid URL').required('Verification link is required')
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      image: "",
      link: "",
      date: "",
      issuer: "",
      category: "Technology"
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
        formData.append('issuer', values.issuer);
        formData.append('date', values.date);
        formData.append('category', values.category);
        formData.append('link', values.link);
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

        await fetchCertificates(registrationNo);
        resetForm();
        setIsModalOpen(false);
        setImagePreview("");
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to save certificate');
        console.error('Error saving certificate:', err);
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
      await fetchCertificates(registrationNo);
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    } catch (err) {
      setError('Failed to delete certificate');
      console.error('Error deleting certificate:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    formik.resetForm();
    setImagePreview("");
    setError(null);
  };

  if (isLoading && certificates.length === 0) {
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
              <FaCertificate className="text-blue-600 text-4xl" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            My <span className="text-blue-600">Professional</span> Certifications
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Showcase your professional achievements and skills with verified certifications
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
              <FaPlus /> Add Certificate
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {certificates.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border-2 border-dashed border-gray-200">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <FaCertificate className="text-blue-600 text-2xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-700">No certificates yet</h3>
            <p className="text-gray-500 mb-4">Get started by adding your first certification</p>
            <button
              onClick={() => {
                resetForm();
                setIsModalOpen(true);
              }}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              disabled={isLoading}
            >
              <FaPlus /> Add Certificate
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map((cert) => (
              <div
                key={cert._id}
                className="bg-white shadow-xl rounded-2xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-300 relative border border-gray-100"
              >
                <div
                  className={`absolute top-4 right-4 px-3 py-1 text-xs rounded-full font-semibold shadow-sm ${categoryColors[cert.category] || "bg-gray-100 text-gray-800"}`}
                >
                  {categoryIcons[cert.category] || "🏆"} {cert.category}
                </div>

                <div className="h-48 w-full overflow-hidden flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50">
                  {cert.image ? (
                    <img 
                      src={cert.image} 
                      alt={cert.title} 
                      className="h-full w-full object-contain p-4"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/400x225?text=Certificate';
                      }}
                    />
                  ) : (
                    <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-400">
                      <FaCertificate className="text-4xl" />
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700 shadow-sm">
                    {cert.issuer}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {cert.title}
                    </h3>
                    <span className="text-sm text-gray-500 whitespace-nowrap ml-2">
                      {cert.date}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-3">{cert.description}</p>

                  <div className="flex justify-between items-center">
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors hover:shadow-md"
                    >
                      <FiExternalLink className="mr-2" /> Verify
                    </a>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(cert)}
                        disabled={isLoading}
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                        aria-label="Edit certificate"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={() => {
                          setItemToDelete(cert._id);
                          setIsDeleteModalOpen(true);
                        }}
                        disabled={isLoading}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                        aria-label="Delete certificate"
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
                  {formik.values._id ? 'Edit Certificate' : 'Add Certificate'}
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
                    placeholder="AWS Certified Solutions Architect"
                  />
                  {formik.touched.title && formik.errors.title && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.title}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Issuer*</label>
                  <input
                    type="text"
                    name="issuer"
                    value={formik.values.issuer}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={isLoading}
                    className={`w-full px-4 py-2 border ${
                      formik.touched.issuer && formik.errors.issuer
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:bg-gray-100`}
                    placeholder="Amazon Web Services"
                  />
                  {formik.touched.issuer && formik.errors.issuer && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.issuer}</div>
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
                      {Object.keys(categoryColors).map((category) => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                    {formik.touched.category && formik.errors.category && (
                      <div className="text-red-500 text-sm mt-1">{formik.errors.category}</div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Verification Link*</label>
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
                    placeholder="https://example.com/verify"
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
                    placeholder="Describe the certification and skills gained"
                  />
                  {formik.touched.description && formik.errors.description && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.description}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {formik.values._id ? "Certificate Image (Leave blank to keep current)" : "Certificate Image* (JPG/PNG)"}
                  </label>
                  {imagePreview ? (
                    <div className="relative mb-4">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="h-48 w-full object-contain rounded-lg border border-gray-300 bg-gray-50 p-4"
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
                <p className="text-gray-600 mb-6">Are you sure you want to delete this certificate? This action cannot be undone.</p>
                
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
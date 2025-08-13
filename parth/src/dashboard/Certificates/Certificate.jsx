import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCertificates,
  addCertificate,
  updateCertificate,
  deleteCertificate
} from "../../redux/CertificateSlice.js";
import { FiEdit2, FiTrash2, FiExternalLink, FiPlus, FiUpload } from "react-icons/fi";
import { FaCertificate } from "react-icons/fa";
import axios from "axios";

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
  const dispatch = useDispatch();
  const { list: certificates, status } = useSelector((state) => state.certificates);
  const [registrationNo, setRegistrationNo] = useState(""); // Assuming this comes from user auth or props
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    imagePreview: "",
    link: "",
    date: "",
    issuer: "",
    category: "Technology"
  });
  const [errors, setErrors] = useState({});
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (registrationNo) {
      dispatch(fetchCertificates(registrationNo));
    }
  }, [dispatch, registrationNo]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.link.trim()) newErrors.link = "Verification link is required";
    else if (!/^https?:\/\/.+\..+/.test(formData.link)) newErrors.link = "Invalid URL format";
    if (!formData.date.trim()) newErrors.date = "Date is required";
    if (!formData.issuer.trim()) newErrors.issuer = "Issuer is required";
    if (!editingId && !formData.image) newErrors.image = "Image is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type and size
      if (!file.type.match("image.*")) {
        setErrors(prev => ({ ...prev, image: "Only image files are allowed" }));
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB
        setErrors(prev => ({ ...prev, image: "File size should be less than 5MB" }));
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: file,
          imagePreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
      
      // Clear any previous image error
      if (errors.image) {
        setErrors(prev => ({ ...prev, image: "" }));
      }
    }
  };

  const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);
    
    try {
      const response = await axios.post("http://localhost:3000/api/certificate/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      return response.data.imageUrl;
    } catch (error) {
      console.error("Image upload failed:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsUploading(true);
    try {
      let imageUrl = formData.imagePreview;
      
      // If it's a new image (File object), upload it
      if (formData.image instanceof File) {
        imageUrl = await uploadImage(formData.image);
      }

      const certificateData = {
        ...formData,
        image: imageUrl,
        registrationNo // Include registration number for API
      };

      if (editingId) {
        await dispatch(updateCertificate({ 
          id: editingId, 
          formData: certificateData,
          registrationNo 
        }));
      } else {
        await dispatch(addCertificate({ 
          formData: certificateData,
          registrationNo 
        }));
      }
      
      resetForm();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Certificate operation failed:", error);
      setErrors(prev => ({ ...prev, form: "Operation failed. Please try again." }));
    } finally {
      setIsUploading(false);
    }
  };

  const handleEdit = (cert) => {
    setFormData({
      ...cert,
      image: null,
      imagePreview: cert.image
    });
    setEditingId(cert.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this certificate?")) {
      try {
        await dispatch(deleteCertificate({ id, registrationNo }));
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  const handleAdd = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      image: null,
      imagePreview: "",
      link: "",
      date: "",
      issuer: "",
      category: "Technology"
    });
    setEditingId(null);
    setErrors({});
  };

  // Loading skeleton
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              My <span className="text-blue-600">Professional</span> Certifications
            </h1>
            <div className="mt-8 flex justify-center gap-4">
              <div className="px-6 py-3 bg-gray-200 rounded-full animate-pulse h-12 w-40"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                <div className="h-48 bg-gray-200 animate-pulse"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
                  <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
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
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            My <span className="text-blue-600">Professional</span> Certifications
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Showcase your professional achievements and skills with verified certifications
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={handleAdd}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-300 flex items-center gap-2 hover:shadow-xl hover:-translate-y-1"
            >
              <FiPlus className="text-lg" />
              Add Certificate
            </button>
          </div>
        </div>

        {certificates.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <FaCertificate className="inline-block text-6xl" />
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">No certificates added yet</h3>
            <p className="text-gray-500 mb-6">Add your first certification to showcase your skills</p>
            <button
              onClick={handleAdd}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow transition-all duration-300"
            >
              Add Certificate
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transform transition duration-300 overflow-hidden border border-gray-100 relative group"
              >
                <div className={`absolute -right-1 top-4 w-32 py-1 text-center text-xs font-semibold rotate-45 shadow-sm ${categoryColors[cert.category] || 'bg-gray-100 text-gray-800'}`}>
                  {categoryIcons[cert.category] || '🏆'} {cert.category}
                </div>
                <div className="relative h-48 bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-center p-6">
                  {cert.image ? (
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="max-h-full max-w-full object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/300x200?text=Certificate+Image";
                      }}
                    />
                  ) : (
                    <div className="text-gray-300 text-6xl">
                      <FaCertificate />
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700 shadow-sm">
                    {cert.issuer}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-xl font-bold text-gray-900 leading-tight">{cert.title}</h2>
                    <span className="text-sm text-gray-500 whitespace-nowrap ml-2">{cert.date}</span>
                  </div>
                  <p className="text-gray-600 mb-5 line-clamp-3">{cert.description}</p>
                  <div className="flex justify-between items-center">
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300 hover:shadow-md"
                    >
                      <FiExternalLink className="mr-2" />
                      View
                    </a>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => handleEdit(cert)}
                        className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors hover:text-blue-600"
                        title="Edit"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={() => handleDelete(cert.id)}
                        className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-full transition-colors hover:text-red-700"
                        title="Delete"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
            <div 
              className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">
                  {editingId ? "Edit Certificate" : "Add Certificate"}
                </h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                {errors.form && (
                  <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                    {errors.form}
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                  <input 
                    type="text" 
                    name="title" 
                    value={formData.title} 
                    onChange={handleInputChange} 
                    placeholder="e.g. AWS Certified Solutions Architect" 
                    className={`w-full border ${errors.title ? 'border-red-500' : 'border-gray-300'} px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`} 
                  />
                  {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                  <textarea 
                    name="description" 
                    value={formData.description} 
                    onChange={handleInputChange} 
                    placeholder="Describe the certification and skills gained" 
                    rows={3} 
                    className={`w-full border ${errors.description ? 'border-red-500' : 'border-gray-300'} px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`} 
                  />
                  {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {editingId ? "Certificate Image (Leave blank to keep current)" : "Certificate Image *"}
                  </label>
                  <div className="flex items-center gap-4">
                    <label className="flex-1">
                      <div className={`border-2 border-dashed ${errors.image ? 'border-red-500' : 'border-gray-300'} rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition`}>
                        <div className="flex flex-col items-center justify-center">
                          <FiUpload className="text-gray-400 text-2xl mb-2" />
                          <p className="text-sm text-gray-600">
                            {formData.image ? formData.image.name : "Click to upload image"}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">PNG, JPG (Max 5MB)</p>
                        </div>
                        <input 
                          type="file" 
                          name="image" 
                          onChange={handleImageChange} 
                          accept="image/*"
                          className="hidden"
                        />
                      </div>
                    </label>
                    {formData.imagePreview && (
                      <div className="w-20 h-20 rounded border border-gray-200 overflow-hidden">
                        <img 
                          src={formData.imagePreview} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                  {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Verification Link *</label>
                  <input 
                    type="url" 
                    name="link" 
                    value={formData.link} 
                    onChange={handleInputChange} 
                    placeholder="https://example.com/verify" 
                    className={`w-full border ${errors.link ? 'border-red-500' : 'border-gray-300'} px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`} 
                  />
                  {errors.link && <p className="mt-1 text-sm text-red-600">{errors.link}</p>}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                    <input 
                      type="text" 
                      name="date" 
                      value={formData.date} 
                      onChange={handleInputChange} 
                      placeholder="MM/YYYY" 
                      className={`w-full border ${errors.date ? 'border-red-500' : 'border-gray-300'} px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`} 
                    />
                    {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Issuer *</label>
                    <input 
                      type="text" 
                      name="issuer" 
                      value={formData.issuer} 
                      onChange={handleInputChange} 
                      placeholder="e.g. Amazon Web Services" 
                      className={`w-full border ${errors.issuer ? 'border-red-500' : 'border-gray-300'} px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`} 
                    />
                    {errors.issuer && <p className="mt-1 text-sm text-red-600">{errors.issuer}</p>}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select 
                    name="category" 
                    value={formData.category} 
                    onChange={handleInputChange} 
                    className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  >
                    {Object.keys(categoryColors).map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)} 
                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                    disabled={isUploading}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm flex items-center justify-center min-w-32"
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      editingId ? "Update Certificate" : "Add Certificate"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
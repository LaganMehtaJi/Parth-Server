import React, { useState, useEffect } from "react";
import { BsPatchCheckFill } from "react-icons/bs";
import { FiPhone, FiEdit, FiTrash2, FiX } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { FaMapMarkerAlt } from "react-icons/fa";
import axios from "axios";

const StudentCard = ({ studentData, onUpdate, onDelete,refresh1 }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedStudent, setEditedStudent] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (studentData) {
      setEditedStudent({
        ...studentData,
        analyticsScore: studentData.analyticsScore || Math.floor(Math.random() * 100),
      });
      if (studentData.profilePic) {
        setPreviewImage(studentData.profilePic);
      }
    }
  }, [studentData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedStudent(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setEditedStudent(prev => ({ ...prev, [name]: checked }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      
      // Append all student data to formData
      Object.keys(editedStudent).forEach(key => {
        if (key !== 'profilePic') { // We'll handle profilePic separately
          formData.append(key, editedStudent[key]);
        }
      });
      
      // Append the image file if it exists
      if (profileImage) {
        formData.append('profilePic', profileImage);
      }
      
      const response = await axios.put(
        `http://localhost:3000/api/student/edit/${editedStudent._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        
      );
      refresh1();
      if (response.data.success) {
        onUpdate(response.data.student);
        setIsEditing(false);
        // Clear the file input after successful upload
        setProfileImage(null);
        refresh();
      } else {
        setError(response.data.message || "Failed to update student");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred while updating");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete  student?")) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/student/delete/${studentData._id}`
      );
      
      if (response.data.success) {
        onDelete(studentData._id);
        setIsModalOpen(false);
      } else {
        setError(response.data.message || "Failed to delete student");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred while deleting");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      // Reset to original data when canceling edit
      setEditedStudent({
        ...studentData,
        analyticsScore: studentData.analyticsScore || Math.floor(Math.random() * 100),
      });
      setPreviewImage(studentData.profilePic || "");
      setProfileImage(null);
      
    }
  };

  if (!studentData) return null;

  return (
    <>
      {/* Student Card */}
      <div 
        className="bg-white rounded-xl shadow-md overflow-hidden w-full transition-all duration-300 hover:shadow-lg border border-gray-200 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="relative h-40 bg-gradient-to-r from-blue-500 to-indigo-600">
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
            <img
              src={studentData.profilePic || `https://ui-avatars.com/api/?name=${studentData.name}&background=random`}
              alt={studentData.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
            />
            {studentData.verify && (
              <div className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-sm">
                <BsPatchCheckFill className="text-blue-500" />
              </div>
            )}
          </div>
        </div>

        <div className="pt-20 pb-6 px-6">
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">{studentData.name}</h2>
            <p className="text-sm text-gray-500 mt-1">
              {studentData.field} • Batch {studentData.batchYear} • Class {studentData.class || 'N/A'}
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Reg: {studentData.registrationNo} | Roll: {studentData.rollNo}
            </p>
          </div>

          <div className="space-y-3 mb-5">
            <div className="flex items-center gap-3">
              <HiOutlineMail className="text-gray-400" />
              <span className="text-sm text-gray-700 truncate">{studentData.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <FiPhone className="text-gray-400" />
              <span className="text-sm text-gray-700">{studentData.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-gray-400 text-sm" />
              <span className="text-sm text-gray-700 truncate">{studentData.address}</span>
            </div>
          </div>

          <div className="flex justify-center">
            <button 
              className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-md text-sm font-medium hover:bg-blue-100 transition"
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
                setIsEditing(true);
              }}
            >
              <FiEdit className="w-4 h-4" />
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Student Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-800">
                {isEditing ? "Edit Student" : "Student Details"}
              </h3>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setIsEditing(false);
                  setProfileImage(null);
                }}
                className="text-gray-400 hover:text-gray-500"
                disabled={isLoading}
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">
                  {error}
                </div>
              )}

              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <img
                    src={previewImage || `https://ui-avatars.com/api/?name=${editedStudent.name}&background=random`}
                    alt={editedStudent.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow-md mx-auto"
                  />
                  {isEditing && (
                    <div className="mt-3 space-y-2">
                      <div className="text-center">
                        <label className="cursor-pointer">
                          <span className="text-sm text-blue-600 hover:text-blue-800">
                            Change Photo
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                        </label>
                        {profileImage && (
                          <p className="text-xs text-gray-500 mt-1">
                            {profileImage.name}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <input
                          type="checkbox"
                          id="verify"
                          name="verify"
                          checked={editedStudent.verify || false}
                          onChange={handleCheckboxChange}
                          className="h-4 w-4 text-blue-600 rounded"
                        />
                        <label htmlFor="verify" className="text-sm text-gray-700">
                          Verified Student
                        </label>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        {isEditing ? "Name" : "Full Name"}
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="name"
                          value={editedStudent.name || ''}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md"
                          required
                        />
                      ) : (
                        <p className="text-gray-800">{editedStudent.name}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Email
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          name="email"
                          value={editedStudent.email || ''}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md"
                          required
                        />
                      ) : (
                        <p className="text-gray-800">{editedStudent.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Registration No
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="registrationNo"
                          value={editedStudent.registrationNo || ''}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md"
                          required
                        />
                      ) : (
                        <p className="text-gray-800">{editedStudent.registrationNo}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Roll No
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="rollNo"
                          value={editedStudent.rollNo || ''}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md"
                          required
                        />
                      ) : (
                        <p className="text-gray-800">{editedStudent.rollNo}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Phone
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          name="phone"
                          value={editedStudent.phone || ''}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md"
                          required
                        />
                      ) : (
                        <p className="text-gray-800">{editedStudent.phone}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Field of Study
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="field"
                          value={editedStudent.field || ''}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md"
                          required
                        />
                      ) : (
                        <p className="text-gray-800">{editedStudent.field}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Batch Year
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="batchYear"
                          value={editedStudent.batchYear || ''}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md"
                          required
                        />
                      ) : (
                        <p className="text-gray-800">{editedStudent.batchYear}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Class
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="class"
                          value={editedStudent.class || ''}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md"
                          placeholder="Enter class"
                        />
                      ) : (
                        <p className="text-gray-800">{editedStudent.class || 'Not provided'}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      Address
                    </label>
                    {isEditing ? (
                      <textarea
                        name="address"
                        value={editedStudent.address || ''}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        rows="3"
                        required
                      />
                    ) : (
                      <p className="text-gray-800">{editedStudent.address}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      Description
                    </label>
                    {isEditing ? (
                      <textarea
                        name="description"
                        value={editedStudent.description || ''}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        rows="3"
                        placeholder="Enter student description"
                      />
                    ) : (
                      <p className="text-gray-800">
                        {editedStudent.description || "No description provided"}
                      </p>
                    )}
                  </div>

                  {!isEditing && (
                    <div className="pt-2">
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Verification Status</h4>
                      <div className="flex items-center gap-2">
                        {editedStudent.verify ? (
                          <>
                            <BsPatchCheckFill className="text-blue-500" />
                            <span className="text-gray-800">Verified Student</span>
                          </>
                        ) : (
                          <span className="text-gray-800">Not Verified</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between pt-6">
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 disabled:opacity-50"
                  disabled={isLoading}
                >
                  <FiTrash2 className="w-4 h-4" />
                  Delete Student
                </button>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      setIsEditing(false);
                      setProfileImage(null);
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    disabled={isLoading}
                  >
                    Close
                  </button>
                  
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleEditToggle}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                        disabled={isLoading}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Saving...' : 'Save Changes'}
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleEditToggle}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                    >
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentCard;
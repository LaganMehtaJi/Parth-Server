import React, { useState, useEffect } from "react";
import axios from "axios";
import { BsPatchCheckFill, BsClockHistory } from "react-icons/bs";
import { FiDownload, FiExternalLink } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { RiDashboardLine } from "react-icons/ri";
import { FaRegFileAlt } from "react-icons/fa";

const StudentCardd = ({ studentId, onUpdateHistory, onSendMessage }) => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch student data from API
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`https://localhost:5000/students/${studentId}`);
        setStudent(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (studentId) {
      fetchStudentData();
    }
  }, [studentId]);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-md w-full max-w-xs p-6 flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-3 text-gray-600">Loading student data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-md w-full max-w-xs p-6">
        <div className="text-center text-red-500">
          <p>Error loading student: {error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="bg-white rounded-2xl shadow-md w-full max-w-xs p-6">
        <p className="text-center text-gray-500">No student data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md w-full max-w-xs hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-200">
      {/* Header with image and score */}
      <div className="relative">
        <div className="h-24 bg-gradient-to-r from-indigo-600 to-purple-700"></div>
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="relative">
            <img
              src={student.image || 'https://via.placeholder.com/150'}
              alt={student.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/150';
              }}
            />
            {student.isVerified && (
              <div className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-sm">
                <BsPatchCheckFill className="text-green-500 text-lg" title="Verified" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-14 pb-4 px-5">
        {/* Name, Roll No and Field */}
        <div className="text-center mb-3">
          <h2 className="text-lg font-semibold text-gray-800">{student.name}</h2>
          <p className="text-xs text-gray-500 font-medium mb-1">Roll No: {student.rollNo}</p>
          <p className="text-sm text-indigo-500 font-medium">{student.field}</p>
        </div>

        {/* Email */}
        <div className="flex items-center justify-center gap-2 mb-4 text-gray-600 text-sm">
          <HiOutlineMail className="text-gray-400" />
          <span className="truncate max-w-[180px]">{student.email}</span>
        </div>

        {/* Score with progress bar */}
        <div className="mb-5">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Analytics Score</span>
            <span className="font-semibold text-gray-700">{student.analyticsScore}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full"
              style={{ width: `${student.analyticsScore}%` }}
            ></div>
          </div>
        </div>

        {/* History Update Button */}
        <button
          onClick={onUpdateHistory}
          className="w-full mb-3 flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white py-2 rounded-lg text-sm font-medium hover:opacity-90 transition"
        >
          <BsClockHistory className="text-sm" />
          Update History
        </button>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <a
            href={student.portfolioLink || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 bg-indigo-50 text-indigo-700 py-2 rounded-lg text-sm font-medium hover:bg-indigo-100 transition"
          >
            <FiExternalLink className="text-sm" />
            Portfolio
          </a>
          <a
            href={student.dashboardLink || '#'}
            className="flex items-center justify-center gap-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
          >
            <RiDashboardLine className="text-sm" />
            Dashboard
          </a>
          <a
            href={student.resumeLink || '#'}
            target="_blank"
            className="flex items-center justify-center gap-1 bg-green-50 text-green-700 py-2 rounded-lg text-sm font-medium hover:bg-green-100 transition"
          >
            <FaRegFileAlt className="text-sm" />
            Resume
          </a>
          <button
            onClick={onSendMessage}
            className="bg-gradient-to-r from-rose-500 to-rose-600 text-white py-2 rounded-lg text-sm font-medium hover:opacity-90 transition"
          >
            Message
          </button>
        </div>

        {/* Download CV */}
        <div className="flex justify-center">
          <a
            href={student.resumeDownloadLink || '#'}
            download
            className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 hover:underline"
          >
            <FiDownload className="text-sm" />
            Download CV
          </a>
        </div>
      </div>
    </div>
  );
};

export default StudentCardd;
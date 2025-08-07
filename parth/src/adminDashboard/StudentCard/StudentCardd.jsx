import React from "react";
import { BsPatchCheckFill } from "react-icons/bs";
import { FiPhone } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { FaMapMarkerAlt } from "react-icons/fa";

const StudentCard = ({ studentData }) => {
  if (!studentData) return null;

  const student = {
    ...studentData,
    analyticsScore: Math.floor(Math.random() * 100),
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden w-full transition-all duration-300 hover:shadow-lg border border-gray-200">
      {/* Header */}
      <div className="relative h-40 bg-gradient-to-r from-blue-500 to-indigo-600">
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
          <img
            src={student.profilePic || `https://ui-avatars.com/api/?name=${student.name}&background=random`}
            alt={student.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
          />
          {student.verify && (
            <div className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-sm">
              <BsPatchCheckFill className="text-blue-500" />
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="pt-20 pb-6 px-6">
        <div className="text-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">{student.name}</h2>
          <p className="text-sm text-gray-500 mt-1">
            {student.field} • Batch {student.batchYear}
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Reg: {student.registrationNo} | Roll: {student.rollNo}
          </p>
        </div>

        <div className="space-y-3 mb-5">
          <div className="flex items-center gap-3">
            <HiOutlineMail className="text-gray-400" />
            <span className="text-sm text-gray-700 truncate">{student.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <FiPhone className="text-gray-400" />
            <span className="text-sm text-gray-700">{student.phone}</span>
          </div>
          <div className="flex items-center gap-3">
            <FaMapMarkerAlt className="text-gray-400 text-sm" />
            <span className="text-sm text-gray-700 truncate">{student.address}</span>
          </div>
        </div>

        {/* Score */}
        <div className="mb-5">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Performance Score</span>
            <span className="font-medium">{student.analyticsScore}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full"
              style={{ width: `${student.analyticsScore}%` }}
            ></div>
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button className="bg-blue-50 text-blue-600 py-2 rounded-md text-sm font-medium hover:bg-blue-100 transition">
            View Profile
          </button>
          <button className="bg-indigo-50 text-indigo-600 py-2 rounded-md text-sm font-medium hover:bg-indigo-100 transition">
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;

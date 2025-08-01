import React from "react";
import { BsPatchCheckFill, BsClockHistory } from "react-icons/bs";
import { FiDownload, FiExternalLink } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { RiDashboardLine } from "react-icons/ri";
import { FaRegFileAlt } from "react-icons/fa";

const StudentCardd = ({
  image,
  name,
  rollNo, // NEW PROP
  email,
  field,
  isVerified,
  analyticsScore,
  portfolioLink,
  dashboardLink,
  resumeLink,
  resumeDownloadLink,
  onUpdateHistory,
  onSendMessage,
}) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md w-full max-w-xs hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-200">
      {/* Header with image and score */}
      <div className="relative">
        <div className="h-24 bg-gradient-to-r from-indigo-600 to-purple-700"></div>
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="relative">
            <img
              src={image}
              alt={name}
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow"
            />
            {isVerified && (
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
          <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
          <p className="text-xs text-gray-500 font-medium mb-1">Roll No: {rollNo}</p> {/* NEW LINE */}
          <p className="text-sm text-indigo-500 font-medium">{field}</p>
        </div>

        {/* Email */}
        <div className="flex items-center justify-center gap-2 mb-4 text-gray-600 text-sm">
          <HiOutlineMail className="text-gray-400" />
          <span className="truncate max-w-[180px]">{email}</span>
        </div>

        {/* Score with progress bar */}
        <div className="mb-5">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Analytics Score</span>
            <span className="font-semibold text-gray-700">{analyticsScore}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full"
              style={{ width: `${analyticsScore}%` }}
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
            href={portfolioLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 bg-indigo-50 text-indigo-700 py-2 rounded-lg text-sm font-medium hover:bg-indigo-100 transition"
          >
            <FiExternalLink className="text-sm" />
            Portfolio
          </a>
          <a
            href={dashboardLink}
            className="flex items-center justify-center gap-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
          >
            <RiDashboardLine className="text-sm" />
            Dashboard
          </a>
          <a
            href={resumeLink}
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
            href={resumeDownloadLink}
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

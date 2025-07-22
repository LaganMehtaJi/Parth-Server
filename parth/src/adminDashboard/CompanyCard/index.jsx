import React, { useState } from "react";
import { AiOutlineDelete, AiOutlineClose } from "react-icons/ai";
import { FaPlus, FaRegEdit } from "react-icons/fa";
import { MdWorkOutline, MdOutlineAddCircleOutline } from "react-icons/md";
import { RiUserSearchLine } from "react-icons/ri";

const CompanyCard = ({
  logo,
  companyName,
  studentsApplied,
  onDeleteCompany,
  onDeleteJob,
  onAddJobSubmit,
  jobs = [],
}) => {
  const [showModal, setShowModal] = useState(false);
  const [jobData, setJobData] = useState({
    title: "",
    requirements: [""],
    responsibilities: [""],
    resources: [""],
  });

  const handleChangeArray = (key, index, value) => {
    const newArray = [...jobData[key]];
    newArray[index] = value;
    setJobData({ ...jobData, [key]: newArray });
  };

  const handleAddField = (key) => {
    setJobData({ ...jobData, [key]: [...jobData[key], ""] });
  };

  const handleRemoveField = (key, index) => {
    const newArray = jobData[key].filter((_, i) => i !== index);
    setJobData({ ...jobData, [key]: newArray });
  };

  const handleSubmit = () => {
    // Filter out empty fields before submitting
    const filteredData = {
      title: jobData.title,
      requirements: jobData.requirements.filter(item => item.trim() !== ""),
      responsibilities: jobData.responsibilities.filter(item => item.trim() !== ""),
      resources: jobData.resources.filter(item => item.trim() !== ""),
    };
    onAddJobSubmit(filteredData);
    setShowModal(false);
    setJobData({
      title: "",
      requirements: [""],
      responsibilities: [""],
      resources: [""],
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 w-full max-w-md hover:shadow-xl transition-shadow duration-200">
      {/* Company Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 flex items-center">
        <div className="bg-white p-2 rounded-lg shadow-sm mr-3">
          {logo ? (
            <img src={logo} alt={companyName} className="w-10 h-10 object-contain" />
          ) : (
            <MdWorkOutline className="text-blue-500 text-2xl" />
          )}
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-bold text-white">{companyName}</h2>
          <div className="flex items-center text-blue-100 text-sm">
            <RiUserSearchLine className="mr-1" />
            <span>{studentsApplied} {studentsApplied === 1 ? "student" : "students"} applied</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 border-b flex justify-between items-center">
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity shadow-sm"
        >
          <FaPlus size={14} /> Add Job
        </button>
        <button
          onClick={onDeleteCompany}
          className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity shadow-sm"
        >
          <AiOutlineDelete size={16} /> Delete
        </button>
      </div>

      {/* Jobs List */}
      <div className="p-4">
        {jobs.length > 0 ? (
          <>
            <h3 className="text-md font-semibold mb-3 text-gray-700 flex items-center">
              <MdWorkOutline className="mr-2 text-blue-500" /> Current Jobs ({jobs.length})
            </h3>
            <ul className="space-y-3">
              {jobs.map((job, idx) => (
                <li
                  key={idx}
                  className="border border-gray-200 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-150"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-gray-800">{job.title}</h4>
                      <div className="grid grid-cols-3 gap-2 mt-2 text-xs">
                        <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-center">
                          {job.requirements.length} Reqs
                        </span>
                        <span className="bg-purple-50 text-purple-700 px-2 py-1 rounded-full text-center">
                          {job.responsibilities.length} Tasks
                        </span>
                        <span className="bg-green-50 text-green-700 px-2 py-1 rounded-full text-center">
                          {job.resources.length} Resources
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => onDeleteJob(idx)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                      title="Delete Job"
                    >
                      <AiOutlineDelete size={18} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className="text-center py-6 text-gray-500">
            <MdWorkOutline className="mx-auto text-3xl text-gray-300 mb-2" />
            <p>No jobs posted yet</p>
            <button
              onClick={() => setShowModal(true)}
              className="mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Add your first job
            </button>
          </div>
        )}
      </div>

      {/* Add Job Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="border-b p-4 flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <MdWorkOutline className="mr-2 text-blue-500" /> Add New Job
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
              >
                <AiOutlineClose size={20} />
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1">
              {/* Job Title */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title*</label>
                <input
                  type="text"
                  value={jobData.title}
                  onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. Frontend Developer"
                  required
                />
              </div>

              {/* Dynamic Fields */}
              {["requirements", "responsibilities", "resources"].map((field) => (
                <div key={field} className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700 capitalize">
                      {field.replace(/s$/, "")} {jobData[field].length > 0 && `(${jobData[field].length})`}
                    </label>
                    <button
                      onClick={() => handleAddField(field)}
                      className="flex items-center text-xs text-blue-600 hover:text-blue-800"
                    >
                      <MdOutlineAddCircleOutline className="mr-1" /> Add
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    {jobData[field].map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => handleChangeArray(field, index, e.target.value)}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder={`Enter ${field.replace(/s$/, "")}...`}
                        />
                        {jobData[field].length > 1 && (
                          <button
                            onClick={() => handleRemoveField(field, index)}
                            className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50"
                          >
                            <AiOutlineClose size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Modal Footer */}
            <div className="border-t p-4 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!jobData.title.trim()}
                className={`px-6 py-2 rounded-lg text-white font-medium transition-colors ${
                  jobData.title.trim() 
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Add Job
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyCard;
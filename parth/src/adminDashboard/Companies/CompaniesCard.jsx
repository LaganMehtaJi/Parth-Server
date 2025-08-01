import React from 'react';
import { FiEdit2, FiTrash2, FiPlus, FiBriefcase, FiX } from 'react-icons/fi';

export default function CompanyCard({ company, onAddJob, onEdit, onDelete, onDeleteJob }) {
  return (
    <div className="relative bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100">
      {/* Card Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-1">{company.name}</h3>
          <p className="text-gray-600 text-sm">{company.description}</p>
        </div>
        <button
          onClick={onDelete}
          className="text-gray-400 hover:text-red-500 transition-colors p-1"
          aria-label="Delete company"
        >
          <FiTrash2 size={18} />
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={onEdit}
          className="flex items-center gap-1 bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <FiEdit2 size={14} />
          Edit
        </button>
        <button
          onClick={onAddJob}
          className="flex items-center gap-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <FiPlus size={14} />
          Add Job
        </button>
      </div>

      {/* Jobs Section */}
      {company.jobs?.length > 0 ? (
        <div className="mt-4">
          <div className="flex items-center gap-2 text-gray-700 mb-3">
            <FiBriefcase size={16} />
            <h4 className="text-sm font-semibold">Posted Jobs ({company.jobs.length})</h4>
          </div>
          <div className="space-y-3 max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {company.jobs.map((job) => (
              <div
                key={job.id}
                className="relative border border-gray-200 rounded-lg p-4 bg-gray-50 hover:bg-white transition-colors group"
              >
                <button
                  onClick={() => onDeleteJob(job.id)}
                  className="absolute top-2 right-2 text-gray-300 hover:text-red-500 transition-colors p-1"
                  aria-label="Delete job"
                >
                  <FiX size={16} />
                </button>
                <h5 className="font-medium text-gray-800">{job.title}</h5>
                <div className="mt-2 space-y-1">
                  {job.description && (
                    <p className="text-xs text-gray-600 line-clamp-2">
                      <span className="font-medium">Description:</span> {job.description}
                    </p>
                  )}
                  {job.requirements && (
                    <p className="text-xs text-gray-600 line-clamp-2">
                      <span className="font-medium">Requirements:</span> {job.requirements}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg text-center">
          <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
            <FiBriefcase size={16} />
            No jobs posted yet
          </p>
        </div>
      )}
    </div>
  );
}
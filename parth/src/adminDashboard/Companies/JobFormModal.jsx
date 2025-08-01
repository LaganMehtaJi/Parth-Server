import React, { useState } from 'react';
import { FiX, FiSave, FiBriefcase } from 'react-icons/fi';
import { addJobToCompany } from './Api';
import ErrorAlert from './ErrorAlert';

export default function JobFormModal({ onClose, company, onSave }) {
  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    requirements: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!jobData.title.trim()) return;

    setIsSubmitting(true);
    setError(null);
    try {
      const response = await addJobToCompany(company.id, jobData);
      onSave(response.data);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex justify-center items-center z-50 p-4">
      <div 
        className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <FiBriefcase className="text-indigo-600" size={20} />
            <h2 className="text-xl font-semibold text-gray-800">
              Add Job for {company.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
            aria-label="Close modal"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && <ErrorAlert error={error} />}

          <div className="space-y-1">
            <label htmlFor="job-title" className="block text-sm font-medium text-gray-700">
              Job Title *
            </label>
            <input
              id="job-title"
              name="title"
              type="text"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder="e.g. Software Engineer, Product Manager"
              value={jobData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="job-description" className="block text-sm font-medium text-gray-700">
              Description *
            </label>
            <textarea
              id="job-description"
              name="description"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition min-h-[100px]"
              placeholder="Detailed description of the job responsibilities..."
              value={jobData.description}
              onChange={handleChange}
              rows={3}
              required
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="job-requirements" className="block text-sm font-medium text-gray-700">
              Requirements *
            </label>
            <textarea
              id="job-requirements"
              name="requirements"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition min-h-[100px]"
              placeholder="Required skills, qualifications, and experience..."
              value={jobData.requirements}
              onChange={handleChange}
              rows={3}
              required
            />
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
              disabled={!jobData.title.trim() || isSubmitting}
            >
              <FiSave size={18} />
              {isSubmitting ? 'Saving...' : 'Save Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
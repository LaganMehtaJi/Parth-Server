import { useState } from "react";
import { FiX, FiSave, FiEdit2, FiPlus } from "react-icons/fi";
import { createCompany, updateCompany } from "./Api";
import ErrorAlert from "./ErrorAlert";

export default function CompanyFormModal({ onClose, company, setCompanies }) {
  const [name, setName] = useState(company?.name || '');
  const [description, setDescription] = useState(company?.description || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    setError(null);
    try {
      if (company) {
        // Update existing company
        const response = await updateCompany(company.id, { name, description });
        setCompanies(prev => 
          prev.map(c => c.id === company.id ? response.data : c)
        );
      } else {
        // Create new company
        const response = await createCompany({ name, description });
        setCompanies(prev => [...prev, response.data]);
      }
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
            {company ? (
              <FiEdit2 className="text-indigo-600" size={20} />
            ) : (
              <FiPlus className="text-indigo-600" size={20} />
            )}
            <h2 className="text-xl font-semibold text-gray-800">
              {company ? 'Edit Company' : 'Add New Company'}
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
            <label htmlFor="company-name" className="block text-sm font-medium text-gray-700">
              Company Name *
            </label>
            <input
              id="company-name"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder="e.g. Google, Amazon"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="company-description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="company-description"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition min-h-[100px]"
              placeholder="Brief description about the company..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
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
              disabled={!name.trim() || isSubmitting}
            >
              <FiSave size={18} />
              {isSubmitting ? 'Saving...' : company ? 'Update Company' : 'Add Company'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
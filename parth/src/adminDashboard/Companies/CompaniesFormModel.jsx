import { useState } from "react";
export default function CompanyFormModal({ onClose, company, setCompanies }) {
  const [name, setName] = useState(company?.name || '');
  const [description, setDescription] = useState(company?.description || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (company) {
      // Edit existing
      setCompanies((prev) =>
        prev.map((c) => (c.id === company.id ? { ...c, name, description } : c))
      );
    } else {
      // Add new
      setCompanies((prev) => [
        ...prev,
        { id: Date.now(), name, description },
      ]);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {company ? 'Edit Company' : 'Add Company'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full border border-gray-300 px-4 py-2 rounded"
            placeholder="Company Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            className="w-full border border-gray-300 px-4 py-2 rounded"
            placeholder="Company Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {company ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

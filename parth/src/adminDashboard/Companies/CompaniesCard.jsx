import React from 'react';

export default function CompanyCard({ company, onAddJob, onEdit }) {
  return (
    <div className="bg-white p-4 rounded shadow-md border">
      <h3 className="text-lg font-semibold">{company.name}</h3>
      <p className="text-sm text-gray-600">{company.description}</p>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => onAddJob(company)}
          className="bg-green-500 text-white px-3 py-1 rounded text-sm"
        >
          Add Job
        </button>
        <button
          onClick={onEdit}
          className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
        >
          Edit Jobs
        </button>
      </div>
    </div>
  );
}

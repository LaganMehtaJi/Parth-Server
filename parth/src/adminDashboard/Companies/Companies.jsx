import React, { useState } from 'react';
import CompanyCard from './CompaniesCard';
import CompanyFormModal from './CompaniesFormModel';
import JobFormModal from './JobFormModal';

export default function AdminDashboard() {
  const [companies, setCompanies] = useState([
    { id: 1, name: 'Google', description: 'Tech Giant' },
    { id: 2, name: 'Amazon', description: 'E-commerce leader' },
  ]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);

  const handleAddCompany = () => {
    setSelectedCompany(null);
    setIsCompanyModalOpen(true);
  };

  const handleEditCompany = (company) => {
    setSelectedCompany(company);
    setIsCompanyModalOpen(true);
  };

  const handleAddJob = (company) => {
    setSelectedCompany(company);
    setIsJobModalOpen(true);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white p-4 border-r shadow-sm">
        <h2 className="text-xl font-bold mb-4">Company Actions</h2>
        <button onClick={handleAddCompany} className="w-full bg-blue-500 text-white px-4 py-2 rounded mb-3">Add Company</button>
        <button className="w-full bg-yellow-500 text-white px-4 py-2 rounded mb-3">Edit Company</button>
        <button className="w-full bg-red-500 text-white px-4 py-2 rounded">Delete Company</button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-semibold mb-4">Companies</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {companies.map((company) => (
            <CompanyCard
              key={company.id}
              company={company}
              onAddJob={handleAddJob}
              onEdit={() => handleEditCompany(company)}
            />
          ))}
        </div>
      </div>

      {/* Modals */}
      {isCompanyModalOpen && (
        <CompanyFormModal
          onClose={() => setIsCompanyModalOpen(false)}
          company={selectedCompany}
          setCompanies={setCompanies}
        />
      )}
      {isJobModalOpen && (
        <JobFormModal
          onClose={() => setIsJobModalOpen(false)}
          company={selectedCompany}
        />
      )}
    </div>
  );
}

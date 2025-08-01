import React, { useState, useEffect } from 'react';
import { FiPlus, FiSearch, FiRefreshCw } from 'react-icons/fi';
import CompanyCard from './CompaniesCard';
import CompanyFormModal from './CompaniesFormModel';
import JobFormModal from './JobFormModal';
import ErrorAlert from './ErrorAlert';
import { fetchCompanies, deleteCompany } from './Api';

export default function AdminDashboard() {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchCompanies();
      setCompanies(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const handleDeleteCompany = async (id) => {
    if (window.confirm('Are you sure you want to delete this company?')) {
      try {
        await deleteCompany(id);
        setCompanies(prev => prev.filter(c => c.id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleSaveJob = (job) => {
    setCompanies(prevCompanies =>
      prevCompanies.map(c =>
        c.id === selectedCompany.id
          ? { ...c, jobs: [...(c.jobs || []), job] }
          : c
      )
    );
    setIsJobModalOpen(false);
  };

  const handleDeleteJob = async (companyId, jobId) => {
    try {
      await deleteJobFromCompany(companyId, jobId);
      setCompanies(prev =>
        prev.map(c =>
          c.id === companyId
            ? { ...c, jobs: c.jobs.filter(j => j.id !== jobId) }
            : c
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Company Management</h1>
            <p className="text-sm text-gray-500 mt-1">Manage companies and their job postings</p>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <button
              onClick={loadCompanies}
              className="flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-700 py-2 px-4 rounded-lg border border-gray-300 transition shadow-sm"
              disabled={isLoading}
            >
              <FiRefreshCw className={`${isLoading ? 'animate-spin' : ''}`} />
              {isLoading ? 'Refreshing...' : 'Refresh'}
            </button>
            <button
              onClick={handleAddCompany}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition shadow-sm"
            >
              <FiPlus />
              Add Company
            </button>
          </div>
        </div>

        {/* Search and Error */}
        {error && <ErrorAlert error={error} onDismiss={() => setError(null)} />}
        
        <div className="relative max-w-md mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search companies..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : filteredCompanies.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center border border-gray-100">
          <div className="text-gray-400 mb-4">
            <FiSearch className="mx-auto h-12 w-12" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">No companies found</h3>
          <p className="mt-2 text-sm text-gray-500">
            {searchTerm ? 'Try a different search term' : 'Add your first company to get started'}
          </p>
          <div className="mt-6">
            <button
              onClick={handleAddCompany}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <FiPlus className="-ml-1 mr-2 h-5 w-5" />
              Add Company
            </button>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredCompanies.map((company) => (
            <CompanyCard
              key={company.id}
              company={company}
              onAddJob={() => handleAddJob(company)}
              onEdit={() => handleEditCompany(company)}
              onDelete={() => handleDeleteCompany(company.id)}
              onDeleteJob={(jobId) => handleDeleteJob(company.id, jobId)}
            />
          ))}
        </div>
      )}

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
          onSave={handleSaveJob}
        />
      )}
    </div>
  );
}
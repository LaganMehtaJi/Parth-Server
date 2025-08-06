import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Listt = () => {
  const [companies, setCompanies] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCompanyId, setActiveCompanyId] = useState(null);
  const [activeStudentId, setActiveStudentId] = useState(null);
  const [newHistoryEntry, setNewHistoryEntry] = useState({
    companyId: '',
    roleId: '',
    round: '',
    status: 'pending',
    notes: ''
  });

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Replace these with your actual API endpoints
        const [companiesRes, studentsRes] = await Promise.all([
          axios.get('https://localhost:5000/companies'),
          axios.get('https://localhost:5000/students')
        ]);
        
        setCompanies(companiesRes.data);
        setStudents(studentsRes.data);
        
        // Set the first company as active if available
        if (companiesRes.data.length > 0) {
          setActiveCompanyId(companiesRes.data[0].id);
        }
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get active company and student
  const activeCompany = companies.find(c => c.id === activeCompanyId);
  const activeStudent = students.find(s => s.id === activeStudentId);

  // Add new history entry
  const addHistoryEntry = async () => {
    if (!activeStudentId || !newHistoryEntry.companyId || !newHistoryEntry.roleId) return;

    try {
      const company = companies.find(c => c.id === parseInt(newHistoryEntry.companyId));
      const role = company?.roles.find(r => r.id === parseInt(newHistoryEntry.roleId));
      const round = role?.rounds.find(r => r.number === parseInt(newHistoryEntry.round));

      const entry = {
        companyId: company.id,
        companyName: company.name,
        roleId: role.id,
        roleName: role.name,
        round: round?.number || role.currentRound,
        roundName: round?.name || `Round ${role.currentRound}`,
        status: newHistoryEntry.status,
        date: new Date().toISOString().split('T')[0],
        notes: newHistoryEntry.notes
      };

      // First update the UI optimistically
      const updatedStudents = students.map(student => {
        if (student.id === activeStudentId) {
          return {
            ...student,
            status: newHistoryEntry.status,
            history: [...student.history, entry]
          };
        }
        return student;
      });
      setStudents(updatedStudents);

      // Then send the update to the API
      await axios.post(`https://localhost:5000/students/${activeStudentId}/history`, entry);

      setNewHistoryEntry({
        companyId: '',
        roleId: '',
        round: '',
        status: 'pending',
        notes: ''
      });
    } catch (err) {
      console.error('Failed to add history entry:', err);
      // Revert the UI change if the API call fails
      setStudents(students);
    }
  };

  // Update student status directly
  const updateStudentStatus = async (studentId, newStatus) => {
    try {
      // First update the UI optimistically
      const updatedStudents = students.map(student => {
        if (student.id === studentId) {
          return {
            ...student,
            status: newStatus
          };
        }
        return student;
      });
      setStudents(updatedStudents);

      // Then send the update to the API
      await axios.patch(`https://localhost:5000/students/${studentId}`, {
        status: newStatus
      });
    } catch (err) {
      console.error('Failed to update student status:', err);
      // Revert the UI change if the API call fails
      setStudents(students);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading data...</p>
        </div>
      </div>
    );
  }

  

  if (companies.length === 0 || students.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left sidebar - Companies and Students */}
        <div className="lg:col-span-1 space-y-6">
          {/* Company Selection */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-3">Companies</h2>
            <div className="space-y-2">
              {companies.map(company => (
                <div
                  key={company.id}
                  className={`p-3 rounded cursor-pointer transition-colors ${
                    activeCompanyId === company.id
                      ? 'bg-blue-100 border-l-4 border-blue-500'
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveCompanyId(company.id)}
                >
                  {company.name}
                </div>
              ))}
            </div>
          </div>

          {/* Student List */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">Students</h3>
              <button
                onClick={() => setActiveStudentId(null)}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Clear Selection
              </button>
            </div>
           
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={() => activeStudentId && updateStudentStatus(activeStudentId, 'pending')}
                className="px-3 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full"
              >
                Pending
              </button>
              <button
                onClick={() => activeStudentId && updateStudentStatus(activeStudentId, 'shortlisted')}
                className="px-3 py-1 text-xs bg-cyan-100 text-cyan-800 rounded-full"
              >
                Shortlisted
              </button>
              <button
                onClick={() => activeStudentId && updateStudentStatus(activeStudentId, 'selected')}
                className="px-3 py-1 text-xs bg-green-100 text-green-800 rounded-full"
              >
                Selected
              </button>
              <button
                onClick={() => activeStudentId && updateStudentStatus(activeStudentId, 'rejected')}
                className="px-3 py-1 text-xs bg-red-100 text-red-800 rounded-full"
              >
                Rejected
              </button>
            </div>
            
            <div className="space-y-3">
              {students.map(student => (
                <div
                  key={student.id}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    activeStudentId === student.id
                      ? 'ring-2 ring-blue-500 bg-blue-50'
                      : 'hover:bg-gray-50'
                  } ${
                    student.status === 'pending' ? 'border-l-4 border-yellow-400' :
                    student.status === 'shortlisted' ? 'border-l-4 border-cyan-400' :
                    student.status === 'selected' ? 'border-l-4 border-green-400' :
                    'border-l-4 border-red-400'
                  }`}
                  onClick={() => setActiveStudentId(student.id)}
                >
                  <h4 className="font-medium">{student.name}</h4>
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>{student.field}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      student.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      student.status === 'shortlisted' ? 'bg-cyan-100 text-cyan-800' :
                      student.status === 'selected' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {student.status}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Last update: {student.history[student.history.length - 1]?.date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main content - Student History */}
        <div className="lg:col-span-3 space-y-6">
          {activeStudent ? (
            <>
              {/* Student Header */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">{activeStudent.name}</h2>
                    <div className="flex items-center mt-2 space-x-4">
                      <span className="text-gray-600">{activeStudent.field}</span>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        activeStudent.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        activeStudent.status === 'shortlisted' ? 'bg-cyan-100 text-cyan-800' :
                        activeStudent.status === 'selected' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {activeStudent.status}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <div className="text-sm text-gray-500">Total Applications</div>
                    <div className="text-xl font-semibold">{activeStudent.history.length}</div>
                  </div>
                </div>
              </div>

              {/* Add New History Entry */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Add New History Entry</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                    <select
                      value={newHistoryEntry.companyId}
                      onChange={(e) => setNewHistoryEntry({...newHistoryEntry, companyId: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Company</option>
                      {companies.map(company => (
                        <option key={company.id} value={company.id}>{company.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  {newHistoryEntry.companyId && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                      <select
                        value={newHistoryEntry.roleId}
                        onChange={(e) => setNewHistoryEntry({...newHistoryEntry, roleId: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select Role</option>
                        {companies
                          .find(c => c.id === parseInt(newHistoryEntry.companyId))
                          ?.roles.map(role => (
                            <option key={role.id} value={role.id}>{role.name}</option>
                          ))}
                      </select>
                    </div>
                  )}
                </div>

                {newHistoryEntry.roleId && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Round</label>
                        <select
                          value={newHistoryEntry.round}
                          onChange={(e) => setNewHistoryEntry({...newHistoryEntry, round: e.target.value})}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Current Round</option>
                          {companies
                            .find(c => c.id === parseInt(newHistoryEntry.companyId))
                            ?.roles.find(r => r.id === parseInt(newHistoryEntry.roleId))
                            ?.rounds.map(round => (
                              <option key={round.number} value={round.number}>
                                {round.number} - {round.name} ({round.date})
                              </option>
                            ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                          value={newHistoryEntry.status}
                          onChange={(e) => setNewHistoryEntry({...newHistoryEntry, status: e.target.value})}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="pending">Pending</option>
                          <option value="shortlisted">Shortlisted</option>
                          <option value="selected">Selected</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                      <textarea
                        value={newHistoryEntry.notes}
                        onChange={(e) => setNewHistoryEntry({...newHistoryEntry, notes: e.target.value})}
                        placeholder="Add any notes about this interaction"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        rows={3}
                      />
                    </div>
                    
                    <button
                      onClick={addHistoryEntry}
                      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Add History Entry
                    </button>
                  </>
                )}
              </div>

              {/* History Timeline */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Interaction History</h3>
                {activeStudent.history.length === 0 ? (
                  <p className="text-gray-500">No history recorded yet</p>
                ) : (
                  <div className="space-y-6">
                    {activeStudent.history
                      .sort((a, b) => new Date(b.date) - new Date(a.date))
                      .map((entry, index) => (
                        <div key={index} className="flex">
                          <div className="flex flex-col items-center mr-4">
                            <div className={`w-3 h-3 rounded-full mt-1 ${
                              entry.status === 'pending' ? 'bg-yellow-400' :
                              entry.status === 'shortlisted' ? 'bg-cyan-400' :
                              entry.status === 'selected' ? 'bg-green-400' :
                              'bg-red-400'
                            }`}></div>
                            {index !== activeStudent.history.length - 1 && (
                              <div className="w-px h-full bg-gray-300"></div>
                            )}
                          </div>
                          <div className={`pb-6 flex-1 ${
                            index !== activeStudent.history.length - 1 ? 'border-b border-gray-200' : ''
                          }`}>
                            <div className="flex flex-col sm:flex-row sm:justify-between">
                              <div>
                                <h4 className="font-medium">
                                  {entry.companyName} - {entry.roleName}
                                </h4>
                                <p className="text-sm text-gray-600 mt-1">
                                  <span className="font-medium">Round {entry.round}:</span> {entry.roundName}
                                </p>
                              </div>
                              <div className="mt-2 sm:mt-0">
                                <span className={`px-3 py-1 rounded-full text-xs ${
                                  entry.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                  entry.status === 'shortlisted' ? 'bg-cyan-100 text-cyan-800' :
                                  entry.status === 'selected' ? 'bg-green-100 text-green-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {entry.status}
                                </span>
                                <span className="ml-2 text-sm text-gray-500">{entry.date}</span>
                              </div>
                            </div>
                            {entry.notes && (
                              <div className="mt-3 p-3 bg-gray-50 rounded-md">
                                <p className="text-sm text-gray-700">{entry.notes}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="bg-white rounded-lg shadow p-6 flex items-center justify-center h-64">
              <div className="text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No student selected</h3>
                <p className="mt-1 text-gray-500">Select a student to view their history</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Listt;
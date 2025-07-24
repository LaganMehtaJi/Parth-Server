import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StudentHistory = () => {
  // Sample student data with empty history
  const [student, setStudent] = useState({
    id: 1,
    name: 'John Doe',
    field: 'Frontend Development',
    status: 'pending',
    history: []
  });

  const [newEntry, setNewEntry] = useState({
    company: '',
    position: '',
    round: '',
    status: 'pending',
    notes: ''
  });

  const [roundOptions] = useState([
    'Resume Screening',
    'Technical Screening',
    'Coding Challenge',
    'Technical Interview',
    'HR Interview',
    'Final Round'
  ]);

  // Notify when history changes
  const notify = (message, type = 'success') => {
    toast[type](message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const addHistoryEntry = () => {
    if (!newEntry.company || !newEntry.position || !newEntry.round) {
      notify('Please fill all required fields', 'error');
      return;
    }

    const entry = {
      id: Date.now(),
      company: newEntry.company,
      position: newEntry.position,
      round: newEntry.round,
      status: newEntry.status,
      date: new Date().toLocaleDateString(),
      notes: newEntry.notes
    };

    setStudent(prev => ({
      ...prev,
      status: newEntry.status,
      history: [entry, ...prev.history]
    }));

    setNewEntry({
      company: '',
      position: '',
      round: '',
      status: 'pending',
      notes: ''
    });

    notify('History entry added successfully!');
  };

  const deleteHistoryEntry = (id) => {
    setStudent(prev => ({
      ...prev,
      history: prev.history.filter(entry => entry.id !== id)
    }));
    notify('History entry deleted!', 'warning');
  };

  const updateHistoryEntry = (id, updatedData) => {
    setStudent(prev => ({
      ...prev,
      history: prev.history.map(entry => 
        entry.id === id ? { ...entry, ...updatedData } : entry
      )
    }));
    notify('History entry updated!');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <ToastContainer />
      <div className="max-w-4xl mx-auto">
        {/* Student Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{student.name}</h1>
              <p className="text-gray-600 mt-1">{student.field}</p>
            </div>
            <div className={`mt-4 sm:mt-0 px-4 py-2 rounded-full text-sm font-medium ${
              student.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
              student.status === 'shortlisted' ? 'bg-blue-100 text-blue-800' :
              student.status === 'selected' ? 'bg-green-100 text-green-800' :
              'bg-red-100 text-red-800'
            }`}>
              Current Status: {student.status}
            </div>
          </div>
        </div>

        {/* Add New History Entry */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New History Entry</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name*</label>
              <input
                type="text"
                value={newEntry.company}
                onChange={(e) => setNewEntry({...newEntry, company: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. Tech Corp"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Position*</label>
              <input
                type="text"
                value={newEntry.position}
                onChange={(e) => setNewEntry({...newEntry, position: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. Frontend Developer"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Round*</label>
              <select
                value={newEntry.round}
                onChange={(e) => setNewEntry({...newEntry, round: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Round</option>
                {roundOptions.map((round, index) => (
                  <option key={index} value={round}>{round}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={newEntry.status}
                onChange={(e) => setNewEntry({...newEntry, status: e.target.value})}
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
              value={newEntry.notes}
              onChange={(e) => setNewEntry({...newEntry, notes: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              rows={3}
              placeholder="Any additional notes..."
            />
          </div>

          <button
            onClick={addHistoryEntry}
            disabled={!newEntry.company || !newEntry.position || !newEntry.round}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add History Entry
          </button>
        </div>

        {/* History Timeline */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Application History</h2>
            <span className="text-sm text-gray-500">{student.history.length} entries</span>
          </div>

          {student.history.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No history entries yet. Add your first entry above.
            </div>
          ) : (
            <div className="space-y-4">
              {student.history.map((entry) => (
                <div key={entry.id} className="border-l-2 border-blue-200 pl-4 py-2 relative group">
                  <div className={`absolute -left-2.5 top-3 w-4 h-4 rounded-full ${
                    entry.status === 'pending' ? 'bg-yellow-400' :
                    entry.status === 'shortlisted' ? 'bg-blue-400' :
                    entry.status === 'selected' ? 'bg-green-400' :
                    'bg-red-400'
                  }`}></div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-800">{entry.company}</h3>
                        <p className="text-sm text-gray-600">{entry.position}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            const newStatus = prompt('Update status:', entry.status);
                            if (newStatus && ['pending', 'shortlisted', 'selected', 'rejected'].includes(newStatus)) {
                              updateHistoryEntry(entry.id, { status: newStatus });
                            }
                          }}
                          className="text-xs text-blue-600 hover:text-blue-800"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteHistoryEntry(entry.id)}
                          className="text-xs text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    
                    <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Round:</span> {entry.round}
                      </p>
                      <div className="flex items-center">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          entry.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          entry.status === 'shortlisted' ? 'bg-blue-100 text-blue-800' :
                          entry.status === 'selected' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {entry.status}
                        </span>
                        <span className="ml-2 text-sm text-gray-500">{entry.date}</span>
                      </div>
                    </div>
                    
                    {entry.notes && (
                      <div className="mt-2 p-2 bg-white rounded border border-gray-200">
                        <p className="text-sm text-gray-700">{entry.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentHistory;
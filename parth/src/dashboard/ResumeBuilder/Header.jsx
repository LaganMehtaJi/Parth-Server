import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TemplateSelector from './TemplateSelector';
import Template1 from './Template1'; // Default template

const Header = () => {
  const [SelectedTemplate, setSelectedTemplate] = useState(() => Template1);
  const [showSelector, setShowSelector] = useState(false);
  const [resumeData, setResumeData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/resume')
      .then(response => {
        setResumeData(response.data);
      })
      .catch(error => {
        console.error('Error fetching resume data:', error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Resume Builder</h1>
          <button
            onClick={() => setShowSelector(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
          >
            Choose Template
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          {resumeData ? (
            <SelectedTemplate data={resumeData} />
          ) : (
            <p>Loading resume data...</p>
          )}
        </div>
      </div>

      {showSelector && resumeData && (
        <TemplateSelector
          data={resumeData}
          onClose={() => setShowSelector(false)}
          onSelect={(Comp) => {
            setSelectedTemplate(() => Comp);
            setShowSelector(false);
          }}
        />
      )}
    </div>
  );
};

export default Header
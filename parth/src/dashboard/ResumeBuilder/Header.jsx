import React, { useState } from 'react';
import TemplateSelector from './TemplateSelector';
import Template1 from './Template1'; // Default template
import sampleData from './sampleData';

const Header = () => {
  const [SelectedTemplate, setSelectedTemplate] = useState(() => Template1);
  const [showSelector, setShowSelector] = useState(false);

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
          <SelectedTemplate data={sampleData} />
        </div>
      </div>

      {showSelector && (
        <TemplateSelector
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

export default Header;

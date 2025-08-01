import React, { useState } from 'react';
import Template1 from './Template1';
import Template2 from './Template2';
import Template3 from './Template3';

const templates = [
  { component: Template1, name: 'Classic', type: 'Headshot', color: 'white' },
  { component: Template2, name: 'Modern', type: 'Graphics', color: 'peach' },
  { component: Template3, name: 'Professional', type: 'Dark', color: 'blue' }
];

const TemplateSelector = ({ onClose, onSelect, data }) => {
  const [filters, setFilters] = useState({ type: '', color: '' });

  const filteredTemplates = templates.filter(
    t =>
      (!filters.type || t.type === filters.type) &&
      (!filters.color || t.color === filters.color)
  );

  const handleChange = (e) => {
    setFilters(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start z-50 pt-10 overflow-auto">
      <div className="bg-white rounded-lg p-6 max-w-6xl w-full shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Templates recommended for you</h2>
          <button className="text-xl" onClick={onClose}>×</button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <select name="type" onChange={handleChange} className="p-2 border rounded">
            <option value="">Filter by Type</option>
            <option value="Headshot">Headshot</option>
            <option value="Graphics">Graphics</option>
            <option value="Dark">Dark</option>
          </select>
          <select name="color" onChange={handleChange} className="p-2 border rounded">
            <option value="">Filter by Color</option>
            <option value="white">White</option>
            <option value="peach">Peach</option>
            <option value="blue">Blue</option>
          </select>
        </div>

        {/* Templates Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredTemplates.map(({ component: Comp, name }, i) => (
            <div
              key={i}
              onClick={() => onSelect(Comp)}
              className="cursor-pointer border hover:shadow-lg p-4 rounded-md bg-gray-50"
            >
              <Comp data={data} />
              <button className="mt-4 w-full bg-blue-600 text-white rounded py-1 hover:bg-blue-700 transition">
                Choose Template
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;

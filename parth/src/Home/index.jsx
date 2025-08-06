import React from 'react';
import Headerhome from './Headerhome';
import Profilesection from './Profilesection';
import JobSuggestions from './JobSuggestions';
import RightLinks from './RightsLinks';

export default function Index() {
  return (
    <div className="bg-gray-100 h-screen flex flex-col overflow-hidden">
      {/* Static Header */}
      <Headerhome />

      {/* Responsive 3-column layout */}
      <div className="flex flex-1 overflow-hidden px-4 mt-4 gap-6">
        {/* Left Sidebar - stays fixed */}
        <div className="w-full lg:max-w-xs">
          <Profilesection />
        </div>

        {/* Scrollable Middle Section */}
        <div className="w-full lg:flex-1 overflow-y-auto pr-2">
          <JobSuggestions />
        </div>

        {/* Right Sidebar - stays fixed */}
        <div className="w-full lg:max-w-xs">
          <RightLinks />
        </div>
      </div>
    </div>
  );
}

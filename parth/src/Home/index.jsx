import React from 'react';
import Headerhome from './Headerhome';
import Profilesection from './Profilesection';
import JobSuggestions from './JobSuggestions';
import RightLinks from './RightsLinks';

export default function Index() {
  // Assume header height ~64px (adjust as needed)
  const headerHeight = '56px';

  return (
    <div className="bg-gray-100 h-screen flex flex-col">
      {/* Header */}
      <Headerhome />

      {/* 3-column layout */}
      <div className="flex flex-1 px-4 mt-4 gap-6">
        
        {/* Left Sidebar - full height without scroll */}
        <div className="hidden lg:block lg:w-1/4">
          <div style={{ height: `calc(100vh - ${headerHeight})` }}>
            <Profilesection />
          </div>
        </div>

        {/* Middle Section - scrollable */}
        <div
          className="flex-1 overflow-y-auto pr-2"
          style={{ height: `calc(100vh - ${headerHeight})` }}
        >
          <JobSuggestions />
        </div>

        {/* Right Sidebar - full height without scroll */}
        <div className="hidden lg:block lg:w-1/4">
          <div style={{ height: `calc(100vh - ${headerHeight})` }}>
            <RightLinks />
          </div>
        </div>

      </div>
    </div>
  );
}

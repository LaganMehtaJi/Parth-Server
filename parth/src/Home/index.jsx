import React from 'react';
import Headerhome from './Headerhome';
import Profilesection from './Profilesection';
import JobSuggestions from './JobSuggestions';
import RightLinks from './RightsLinks';

export default function Index() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Static Header */}
      <Headerhome />

      {/* Responsive 3-column layout */}
      <div className="flex flex-col lg:flex-row gap-6 px-4 mt-4">
        
        {/* Left Sidebar - Profile Section */}
        <div className="w-full lg:max-w-xs">
          <Profilesection />
        </div>

        {/* Center - Job Suggestions */}
        <div className="w-full lg:flex-1">
          <JobSuggestions />
        </div>

        {/* Right Sidebar - Links */}
        <div className="w-full lg:max-w-xs">
          <RightLinks />
        </div>

      </div>
    </div>
  );
}

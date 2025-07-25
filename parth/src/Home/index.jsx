import React from 'react';
import Headerhome from './Headerhome';
import Profilesection from './Profilesection';
import JobSuggestions from './JobSuggestions';
import RightLinks from './RightsLinks';

export default function Index() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Headerhome />
      <div className="flex flex-col lg:flex-row gap-6 px-4 mt-4">
        
        {/* Left Sidebar - Profile Section (Sticky on lg only) */}
        <div className="w-full lg:max-w-xs lg:sticky lg:top-20 self-start">
          <Profilesection />
        </div>

        {/* Center - Job Suggestions */}
        <div className="w-full lg:flex-1 flex justify-center">
          <JobSuggestions />
        </div>

        {/* Right Sidebar - Links (Sticky on lg only) */}
        <div className="w-full lg:max-w-xs flex justify-center">
          <div className="w-full lg:sticky lg:top-20 self-start">
            <RightLinks />
          </div>
        </div>

      </div>
    </div>
  );
}

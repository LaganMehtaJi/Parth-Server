import React from 'react';
import Headerhome from './Headerhome';
import Profilesection from './Profilesection';
import JobSuggestions from './JobSuggestions';
import RightLinks from './RightsLinks';

export default function Index() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <Headerhome />

      {/* Main Content Grid */}
      <div className="flex flex-col md:flex-row justify-center gap-6 p-4">
        {/* Left: Profile Card */}
        <div className="w-full md:w-1/4 flex justify-center">
          <Profilesection />
        </div>

        {/* Center: Job Suggestions */}
  <div className="w-full md:w-2/4 flex justify-center">
    <JobSuggestions />
  </div>

  {/* Right: Links Card */}
  <div className="w-full md:w-1/4 flex justify-center">
    <RightLinks/>
  </div>
      </div>
      </div>
  );
}

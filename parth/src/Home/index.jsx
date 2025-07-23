import React from 'react';
import Headerhome from './Headerhome';
import Profilesection from './Profilesection';
import JobSuggestions from './JobSuggestions';
import RightLinks from './RightsLinks';

export default function Index() {
  return (
    
    <div className="bg-gray-100 min-h-screen">
      <Headerhome />
      <div className="flex gap-6 px-4 mt-4">
        <div className="w-full max-w-xs sticky top-20 self-start">
          <Profilesection />
        </div>
  <div className="w-full md:w-2/4 flex justify-center">
    <JobSuggestions />
  </div>
  <div className="w-full md:w-1/4 flex justify-center">
    <div className="w-full max-w-xs sticky top-20 self-start">
          <RightLinks />
        </div>
  </div>
      </div>
      </div>
  );
}

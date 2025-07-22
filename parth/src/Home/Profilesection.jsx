import React, { useState } from "react";
import { BsPatchCheckFill } from "react-icons/bs";

const profile = {
  name: "Chahat Sharma",
  title: "Student at MAIMT",
  location: "Jagadhri, Haryana, India",
  image: "/chahat.jpg",
  coverImage: "/maimt-background.jpg", 
  verified: true,
  field: "BCA || MCA",
  College: "MAIMT",
  skills: [
    { name: "JavaScript", endorsements: 12 },
    { name: "React.js", endorsements: 8 },
    { name: "Node.js", endorsements: 5 },
    { name: "Python", endorsements: 3 },
    { name: "MongoDB", endorsements: 2 }
  ],
  socialLinks: {
    github: "#",
    linkedin: "#",
    twitter: "#"
  }
};

const Profilesection = () => {
  const [showAllSkills, setShowAllSkills] = useState(false);

  return (
    <div className="w-full max-w-xs bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 transform transition-all duration-300 hover:shadow-xl">
      {/* Cover Photo */}
<div className="h-24 bg-gradient-to-r from-sky-400 to-blue-500 relative rounded-t-lg shadow-md">
<div className="h-24 flex items-center px-6 bg-blue">
  <img
    src="/maimtlogo.jpg"
    alt="MAIMT Logo"
    className="absolute inset-0 w-full h-full object-cover"
  />
</div>

</div>
      
      {/* Profile Photo and Basic Info */}
      <div className="px-4 pb-4 relative">
        <div className="flex justify-start -mt-12 mb-3 relative">
          <div className="relative group">
            <img
              src={profile.image}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>
        
        <div className="text-center">
         <div className="flex justify-left items-center">
  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
    {profile.name}
    {profile.verified && (
      <BsPatchCheckFill className="text-blue-500 w-4 h-4" title="Verified" />
    )}
  </h2>
</div>
          <p className="text-sm text-gray-600 mt-1 flex items-center justify-left">{profile.title}</p>
          <p className="text-sm text-gray-600 mt-1 flex items-center justify-left">{profile.field}</p>
          <p className="text-xs text-gray-500 mt-1 flex items-center justify-left">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            {profile.location}
          </p>
        
        </div>
      </div>
      
      {/* Divider */}
      <div className="border-t border-gray-200 mx-4"></div>
      
      {/* Skills Section */}
      <div className="px-4 py-3">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Skills</h3>
        <div className="space-y-2">
          {(showAllSkills ? profile.skills : profile.skills.slice(0, 3)).map((skill, index) => (
            <div key={index} className="flex justify-between items-center group">
              <span className="text-sm text-blue-600 hover:underline cursor-pointer">{skill.name}</span>
              <span className="text-xs text-gray-500">{skill.endorsements} endorsements</span>
            </div>
          ))}
        </div>
        {profile.skills.length > 3 && (
          <button 
            onClick={() => setShowAllSkills(!showAllSkills)}
            className="text-xs text-gray-500 hover:text-blue-600 mt-2 focus:outline-none"
          >
            {showAllSkills ? 'Show less' : `+${profile.skills.length - 3} more`}
          </button>
        )}
      </div>
      
      {/* Divider */}
      <div className="border-t border-gray-200 mx-4"></div>
      
      {/* Education Section */}
      <div className="px-4 py-3">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Streams</h3>
        <div className="flex items-start">
          <div className="bg-blue-100 rounded-full p-2 mr-3">
            <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-800">{profile.field}</h4>
            <p className="text-xs text-gray-600">{profile.university}</p>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="px-4 py-3 space-y-2">
        
        <button className="w-full rounded-full py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 border border-blue-300 transition-all duration-300">
          Message
        </button>
        
         {profile.verified ? (
    <div className="w-full rounded-full py-1.5 text-sm font-medium text-green-600 bg-green-100 border border-green-300 flex items-center justify-center">
      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
      Verification Done
    </div>
  ) : (
    <button className="w-full rounded-full py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-50 border border-gray-300 transition-all duration-300 flex items-center justify-center">
      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M5 8a1 1 0 011-1h2V5a1 1 0 112 0v2h2a1 1 0 110 2h-2v2a1 1 0 11-2 0v-2H6a1 1 0 01-1-1z"
          clipRule="evenodd"
        />
      </svg>
      Edit Your Profile
    </button>
  )}
      </div>
      
      {/* Social Links */}
      <div className="bg-gray-50 px-4 py-3 flex justify-center space-x-4">
        <a href={profile.socialLinks.linkedin} className="text-gray-600 hover:text-blue-700 transition-colors duration-300">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        </a>
        <a href={profile.socialLinks.github} className="text-gray-600 hover:text-gray-900 transition-colors duration-300">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
        <a href={profile.socialLinks.twitter} className="text-gray-600 hover:text-blue-400 transition-colors duration-300">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default Profilesection;
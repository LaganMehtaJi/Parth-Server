import React, { useState } from "react";
import { FaLinkedin } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";

const JobSuggestions = () => {
  const [jobs, setJobs] = useState([
    {
      title: "Frontend Developer",
      company: "TechCorp",
      location: "Remote",
      promoted: true,
      earlyApplicant: true,
      reviewing: true,
      easyApply: true,
       logo: "/images/creativestudio-logo.png", 
      description:
        "We are looking for a skilled Frontend Developer to build amazing web experiences.",
      responsibilities: [
        "Develop responsive web interfaces",
        "Collaborate with design and backend teams",
        "Write clean and maintainable code"
      ],
      requirements: ["2+ years of experience", "React.js, HTML, CSS, JavaScript"],
      resources: ["https://reactjs.org", "https://developer.mozilla.org"]
    },
    {
      title: "UI/UX Designer",
      company: "CreativeStudio",
      location: "Delhi, India",
      promoted: true,
      earlyApplicant: true,
      reviewing: false,
      easyApply: true,
    logo: "/images/creativestudio-logo.png", 
      description:
        "Join our design team to craft visually appealing and user-friendly products.",
      responsibilities: [
        "Create wireframes and prototypes",
        "Conduct user research",
        "Collaborate with developers"
      ],
      requirements: ["1+ years of UI/UX design", "Figma, Adobe XD"],
      resources: ["https://uxdesign.cc", "https://www.figma.com/resources/"]
    }, {
      title: "UI/UX Designer",
      company: "CreativeStudio",
      location: "Delhi, India",
      promoted: true,
      earlyApplicant: true,
      reviewing: false,
      easyApply: true,
      description:
        "Join our design team to craft visually appealing and user-friendly products.",
      responsibilities: [
        "Create wireframes and prototypes",
        "Conduct user research",
        "Collaborate with developers"
      ],
      requirements: ["1+ years of UI/UX design", "Figma, Adobe XD"],
      resources: ["https://uxdesign.cc", "https://www.figma.com/resources/"]
    },{
      title: "UI/UX Designer",
      company: "CreativeStudio",
      location: "Delhi, India",
      promoted: true,
      earlyApplicant: true,
      reviewing: false,
      easyApply: true,
    logo: "/images/creativestudio-logo.png", 
      description:
        "Join our design team to craft visually appealing and user-friendly products.",
      responsibilities: [
        "Create wireframes and prototypes",
        "Conduct user research",
        "Collaborate with developers"
      ],
      requirements: ["1+ years of UI/UX design", "Figma, Adobe XD"],
      resources: ["https://uxdesign.cc", "https://www.figma.com/resources/"]
    },
    {
      title: "UI/UX Designer",
      company: "CreativeStudio",
      location: "Delhi, India",
      promoted: true,
      earlyApplicant: true,
      reviewing: false,
      easyApply: true,
    logo: "/images/creativestudio-logo.png", 
      description:
        "Join our design team to craft visually appealing and user-friendly products.",
      responsibilities: [
        "Create wireframes and prototypes",
        "Conduct user research",
        "Collaborate with developers"
      ],
      requirements: ["1+ years of UI/UX design", "Figma, Adobe XD"],
      resources: ["https://uxdesign.cc", "https://www.figma.com/resources/"]
    }
  ]);

  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleShowMore = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="bg-white w-full max-w-2xl rounded-lg shadow-md p-5 border border-gray-200">
      <h1 className="font-semibold text-gray-800 text-lg mb-1">
        Top job picks for you
      </h1>
      <p className="text-xs text-gray-500 mb-4">
        Based on your profile, preferences, and activity like applies, searches, and saves
      </p>

      <div className="space-y-4">
        {jobs.map((job, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-md p-4 shadow-sm transition-all duration-300"
          >
            <h1 className="flex items-center gap-2 text-blue-700 font-medium text-lg hover:underline cursor-pointer">
  <img src="/Tech.png" alt="Company Logo" className="w-8 h-8 object-contain" />
  {job.title}
</h1>
            <p className="text-sm text-gray-700">{job.company}</p>
            <p className="text-xs text-gray-500">{job.location}</p>
            <p className="text-xs text-gray-500">{job.description}</p>


            <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-gray-600">
              {job.promoted && <span className="text-gray-500">Promoted</span>}
              {job.earlyApplicant && (
                <span className="text-green-600 font-medium">Be an early applicant</span>
              )}
              {job.reviewing && (
                <span className="text-green-600 font-medium flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Actively reviewing applicants
                </span>
              )}
            </div>

            {/* Show More Section */}
            {expandedIndex === index && (
              <div className="mt-3 text-sm text-gray-700 space-y-2">
                <p>
                  <strong>Description:</strong> {job.description}
                </p>
                <div>
                  <strong>Responsibilities:</strong>
                  <ul className="list-disc list-inside ml-3">
                    {job.responsibilities.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <strong>Requirements:</strong>
                  <ul className="list-disc list-inside ml-3">
                    {job.requirements.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <strong>Resources:</strong>
                  <ul className="list-disc list-inside ml-3 text-blue-600">
                    {job.resources.map((url, i) => (
                      <li key={i}>
                        <a href={url} target="_blank" rel="noopener noreferrer">
                          {url}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 mt-4">
              {job.easyApply && (
                <button className="flex items-center px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                     {/* <img src="/logoBlack.png" alt="Logo" className="w-4 h-4" /> */}
                   I'm Intersted
                </button>
              )}
              <button
                onClick={() => toggleShowMore(index)}
                className="text-sm text-gray-600 hover:underline"
              >
                {expandedIndex === index ? "Show Less" : "Show More"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {jobs.length > 0 && (
        <button className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition mt-4 font-medium">
          Show all <BsArrowRight className="ml-1" />
        </button>
      )}
    </div>
  );
};

export default JobSuggestions;

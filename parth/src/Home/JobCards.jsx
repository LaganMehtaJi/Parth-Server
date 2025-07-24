import React, { useState, useEffect } from 'react';
import { 
  FiBookmark, 
  FiClock, 
  FiZap, 
  FiCheckCircle, 
  FiSend, 
  FiSearch,
  FiChevronRight,
  FiMapPin,
  FiDollarSign,
  FiBriefcase,
  FiFilter,
  FiX
} from 'react-icons/fi';
import { BsThreeDotsVertical, BsStarFill, BsStar } from 'react-icons/bs';
import Headerhome from './Headerhome';

const JobCard = ({ job, onBookmark, isBookmarked }) => {
  const [expanded, setExpanded] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleBookmark = (e) => {
    e.stopPropagation();
    onBookmark(job.id);
  };

  return (
    <div 
      className={`relative border border-gray-200 rounded-xl p-5 mb-4 transition-all duration-200
        ${job.promoted ? 'border-l-4 border-l-blue-500 bg-blue-50/20' : 'bg-white'}
        ${expanded ? 'shadow-md' : 'hover:shadow-md'}
      `}
      onClick={toggleExpand}
    >
      {/* Promoted Ribbon */}
      {job.promoted && (
        <div className="absolute top-0 right-4 bg-blue-500 text-white text-xs px-3 py-1 rounded-b-lg">
          Featured
        </div>
      )}

      <div className="flex justify-between items-start">
        <div className="w-full">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-bold text-gray-800">{job.title}</h3>
          </div>
          
          <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
            <span className="flex items-center gap-1">
              <FiBriefcase size={14} /> {job.company}
            </span>
            <span className="flex items-center gap-1">
              <FiMapPin size={14} /> {job.location}
            </span>
            {job.salary && (
              <span className="flex items-center gap-1">
                <FiDollarSign size={14} /> {job.salary}
              </span>
            )}
          </div>

          <p className="text-sm text-gray-500 mb-3">{job.description}</p>
        </div>
        
        <button 
          className="text-gray-400 hover:text-yellow-400 ml-2"
          onClick={handleBookmark}
        >
          {isBookmarked ? (
            <BsStarFill className="text-yellow-400" />
          ) : (
            <BsStar />
          )}
        </button>
      </div>

      {/* Status Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        {job.earlyApplicant && (
          <span className="bg-green-50 text-green-600 text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <FiClock size={12} /> Early Applicant
          </span>
        )}
        {job.reviewing && (
          <span className="bg-purple-50 text-purple-600 text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <FiCheckCircle size={12} /> Reviewing
          </span>
        )}
        {job.easyApply && (
          <span className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <FiZap size={12} /> Easy Apply
          </span>
        )}
        {job.type && (
          <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
            {job.type}
          </span>
        )}
      </div>

      {/* Collapsible Content */}
      <div className={`overflow-hidden transition-all duration-300 ${expanded ? 'max-h-[1000px]' : 'max-h-0'}`}>
        {/* Responsibilities */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Responsibilities:</h4>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            {job.responsibilities.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Requirements */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Requirements:</h4>
          <div className="flex flex-wrap gap-2">
            {job.requirements.map((item, index) => (
              <span key={index} className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Benefits */}
        {job.benefits && job.benefits.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Benefits:</h4>
            <div className="flex flex-wrap gap-2">
              {job.benefits.map((item, index) => (
                <span key={index} className="bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full">
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Resources */}
        {job.resources && job.resources.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Resources:</h4>
            <div className="flex flex-wrap gap-2">
              {job.resources.map((resource, index) => (
                <a 
                  key={index} 
                  href={resource} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 text-xs px-3 py-1 rounded-full border border-blue-200 hover:bg-blue-50"
                >
                  {new URL(resource).hostname}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
        <div className="text-xs text-gray-500">
          Posted {job.postedDate || '2 days ago'}
        </div>
        <div className="flex gap-2">
          <button 
            className="text-gray-500 hover:text-gray-700 p-1 relative"
            onClick={(e) => {
              e.stopPropagation();
              setShowOptions(!showOptions);
            }}
          >
            <BsThreeDotsVertical />
            {showOptions && (
              <div className="absolute right-0 bottom-8 bg-white shadow-lg rounded-md p-2 w-40 z-10">
                <button className="w-full text-left px-2 py-1 text-sm hover:bg-gray-100 rounded">
                  Save Search
                </button>
                <button className="w-full text-left px-2 py-1 text-sm hover:bg-gray-100 rounded">
                  Share Job
                </button>
                <button className="w-full text-left px-2 py-1 text-sm hover:bg-gray-100 rounded text-red-500">
                  Report
                </button>
              </div>
            )}
          </button>
          <button 
  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
  onClick={(e) => e.stopPropagation()}
>
  <FiSend size={16} />
  Interested
</button>
        </div>
      </div>
    </div>
  );
};

const JobsCards = () => {
  const [jobs, setJobs] = useState([]);
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    jobType: '',
    location: '',
    experience: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Simulate API fetch
    const mockJobs = [
      {
        id: 1,
        title: "UI/UX Designer",
        company: "CreativeStudio",
        location: "Delhi, India",
        type: "Full-time",
        salary: "₹8L - ₹12L",
        promoted: true,
        earlyApplicant: true,
        reviewing: false,
        easyApply: true,
        description: "Join our design team to craft visually appealing and user-friendly products.",
        responsibilities: [
          "Create wireframes and prototypes",
          "Conduct user research",
          "Collaborate with developers"
        ],
        requirements: ["1+ years of UI/UX design", "Figma, Adobe XD", "User-centered design"],
        benefits: ["Flexible hours", "Health insurance", "Remote options"],
        resources: ["https://uxdesign.cc", "https://www.figma.com/resources/"],
        postedDate: "1 day ago"
      },
      {
        id: 2,
        title: "Frontend Developer (React)",
        company: "TechSolutions Inc",
        location: "Remote",
        type: "Full-time",
        salary: "₹10L - ₹15L",
        promoted: false,
        earlyApplicant: false,
        reviewing: true,
        easyApply: false,
        description: "Build responsive and performant web applications using modern frameworks.",
        responsibilities: [
          "Develop new user-facing features",
          "Optimize applications for speed",
          "Collaborate with backend developers"
        ],
        requirements: ["2+ years of React experience", "JavaScript, HTML/CSS", "REST APIs", "State management"],
        benefits: ["Stock options", "Unlimited PTO", "Learning budget"],
        resources: ["https://reactjs.org/docs", "https://developer.mozilla.org"],
        postedDate: "3 days ago"
      },
      {
        id: 3,
        title: "Product Manager",
        company: "InnovateCorp",
        location: "Bangalore, India",
        type: "Full-time",
        salary: "₹15L - ₹20L",
        promoted: true,
        earlyApplicant: false,
        reviewing: false,
        easyApply: true,
        description: "Lead product development from conception to launch.",
        responsibilities: [
          "Define product vision and strategy",
          "Prioritize feature development",
          "Analyze market trends"
        ],
        requirements: ["3+ years product management", "Agile methodologies", "Data analysis", "Roadmapping"],
        benefits: ["Bonus structure", "Conference budget", "Flexible work"],
        resources: [],
        postedDate: "1 week ago"
      },
      {
        id: 4,
        title: "Data Scientist",
        company: "AnalyticsPro",
        location: "Mumbai, India",
        type: "Contract",
        salary: "₹12L - ₹18L",
        promoted: false,
        earlyApplicant: true,
        reviewing: true,
        easyApply: false,
        description: "Extract insights from complex data sets to drive business decisions.",
        responsibilities: [
          "Develop machine learning models",
          "Clean and analyze data",
          "Present findings to stakeholders"
        ],
        requirements: ["Python/R", "SQL", "Machine learning frameworks", "Data visualization"],
        benefits: ["Project bonuses", "Remote work", "Cutting-edge tech"],
        resources: ["https://www.kaggle.com", "https://towardsdatascience.com"],
        postedDate: "5 days ago"
      },
      {
        id: 5,
        title: "DevOps Engineer",
        company: "CloudNative Systems",
        location: "Hybrid (Bangalore)",
        type: "Full-time",
        salary: "₹14L - ₹18L",
        promoted: true,
        earlyApplicant: false,
        reviewing: false,
        easyApply: true,
        description: "Implement and maintain our cloud infrastructure and CI/CD pipelines.",
        responsibilities: [
          "Manage AWS/GCP infrastructure",
          "Automate deployment processes",
          "Monitor system performance"
        ],
        requirements: ["3+ years DevOps", "Terraform/Kubernetes", "CI/CD pipelines", "Cloud security"],
        benefits: ["AWS certifications", "Home office setup", "Team retreats"],
        resources: ["https://cloud.google.com/learn", "https://aws.amazon.com/getting-started/"],
        postedDate: "2 days ago"
      },
      {
        id: 6,
        title: "Content Marketing Specialist",
        company: "GrowthHack Media",
        location: "Remote",
        type: "Part-time",
        salary: "₹6L - ₹8L",
        promoted: false,
        earlyApplicant: true,
        reviewing: false,
        easyApply: true,
        description: "Create compelling content that drives engagement and conversions.",
        responsibilities: [
          "Write blog posts and articles",
          "Develop social media content",
          "Analyze content performance"
        ],
        requirements: ["2+ years content creation", "SEO knowledge", "Copywriting", "CMS experience"],
        benefits: ["Flexible schedule", "Performance bonuses", "Creative freedom"],
        resources: ["https://contentmarketinginstitute.com", "https://ahrefs.com/blog/"],
        postedDate: "Just now"
      }
    ];
    setJobs(mockJobs);
  }, []);

  const toggleBookmark = (jobId) => {
    if (bookmarkedJobs.includes(jobId)) {
      setBookmarkedJobs(bookmarkedJobs.filter(id => id !== jobId));
    } else {
      setBookmarkedJobs([...bookmarkedJobs, jobId]);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({
      jobType: '',
      location: '',
      experience: ''
    });
  };

  const filteredJobs = jobs.filter(job => {
    // Search term filter
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Additional filters
    const matchesJobType = !filters.jobType || job.type === filters.jobType;
    const matchesLocation = !filters.location || job.location.toLowerCase().includes(filters.location.toLowerCase());
    const matchesExperience = !filters.experience || 
      (job.requirements.some(req => req.includes(filters.experience)));
    
    return matchesSearch && matchesJobType && matchesLocation && matchesExperience;
  });

  const jobTypes = [...new Set(jobs.map(job => job.type))];
  const locations = [...new Set(jobs.map(job => job.location))];

  return (
    <>
    <div className="bg-gray-100 min-h-screen">
      <Headerhome/>
      
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <span>Job Opportunities</span>
            <span className="bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded-full">
              {filteredJobs.length} positions
            </span>
          </h2>
          <p className="text-gray-500 text-sm">Find your dream job today</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FiFilter /> Filters
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium">Filter Jobs</h3>
            <button 
              className="text-gray-500 hover:text-gray-700"
              onClick={clearFilters}
            >
              Clear all
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
              <select
                name="jobType"
                value={filters.jobType}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">All Types</option>
                {jobTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <select
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">All Locations</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
              <select
                name="experience"
                value={filters.experience}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Any Experience</option>
                <option value="1+ years">1+ years</option>
                <option value="2+ years">2+ years</option>
                <option value="3+ years">3+ years</option>
                <option value="5+ years">5+ years</option>
              </select>
            </div>
          </div>
          
          {/* Active filters */}
          {(filters.jobType || filters.location || filters.experience) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {filters.jobType && (
                <span className="bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full flex items-center gap-1">
                  {filters.jobType}
                  <button 
                    onClick={() => setFilters({...filters, jobType: ''})}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FiX size={14} />
                  </button>
                </span>
              )}
              {filters.location && (
                <span className="bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full flex items-center gap-1">
                  {filters.location}
                  <button 
                    onClick={() => setFilters({...filters, location: ''})}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FiX size={14} />
                  </button>
                </span>
              )}
              {filters.experience && (
                <span className="bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full flex items-center gap-1">
                  {filters.experience}
                  <button 
                    onClick={() => setFilters({...filters, experience: ''})}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FiX size={14} />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button className={`px-4 py-2 font-medium ${!showFilters ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
          All Jobs
        </button>
        <button className={`px-4 py-2 font-medium ${bookmarkedJobs.length > 0 ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
          Saved Jobs ({bookmarkedJobs.length})
        </button>
      </div>

      {/* Job Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredJobs.length > 0 ? (
          filteredJobs.map(job => (
            <JobCard 
              key={job.id} 
              job={job} 
              onBookmark={toggleBookmark}
              isBookmarked={bookmarkedJobs.includes(job.id)}
            />
          ))
        ) : (
          <div className="col-span-2 p-8 text-center text-gray-500">
            <FiSearch className="mx-auto text-4xl text-gray-300 mb-3" />
            <p className="text-lg">No jobs match your criteria</p>
            <button 
              className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
              onClick={clearFilters}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* View More */}
      {filteredJobs.length > 0 && (
        <div className="mt-6 text-center">
          <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center gap-2 mx-auto">
            View more opportunities <FiChevronRight />
          </button>
        </div>
      )}
    </div>
    </div>
    </>
  );
};

export default JobsCards;
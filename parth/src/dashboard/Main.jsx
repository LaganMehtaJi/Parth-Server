import React, { useState, useEffect } from 'react';
import { FaBriefcase, FaCheckCircle, FaFileAlt, FaBell, FaUserTie, FaAws } from 'react-icons/fa';
import axios from 'axios';

const Card = ({ title, icon, children, isLoading }) => (
  <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 w-full">
    <div className="flex items-center mb-4">
      <div className="text-indigo-600 mr-3 text-xl">{icon}</div>
      <h2 className="font-semibold text-lg text-gray-800">{title}</h2>
    </div>
    {isLoading ? (
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    ) : (
      <div className="text-sm text-gray-600 space-y-3">{children}</div>
    )}
  </div>
);

const CircularProgress = ({ percentage }) => {
  return (
    <div className="relative w-16 h-16">
      <svg className="w-full h-full" viewBox="0 0 36 36">
        <path
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="#e0e7ff"
          strokeWidth="3"
        />
        <path
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="#4f46e5"
          strokeWidth="3"
          strokeDasharray={`${percentage}, 100`}
          style={{ transition: 'stroke-dasharray 0.6s ease 0s' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-sm font-medium text-indigo-700">
        {percentage}%
      </div>
    </div>
  );
};

const Main = () => {
  const [dashboardData, setDashboardData] = useState({
    appliedJobs: null,
    shortlisted: null,
    resumeStatus: null,
    notifications: null,
    portfolioStatus: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/dashboard');
        setDashboardData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error('Error fetching dashboard data:', err);
      }
    };

    fetchDashboardData();
  }, []);

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Error loading dashboard: {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {/* Applied Jobs */}
      <Card 
        title="Applied Jobs" 
        icon={<FaBriefcase />}
        isLoading={loading || !dashboardData.appliedJobs}
      >
        {dashboardData.appliedJobs && (
          <>
            <div className="flex items-center">
              <div className="text-3xl font-bold text-indigo-700 mr-3">
                {dashboardData.appliedJobs.count}
              </div>
              <div>Jobs Applied</div>
            </div>
            <div className="pt-3 border-t border-gray-100">
              <div className="font-medium">Latest Application</div>
              <div className="text-gray-500">
                {dashboardData.appliedJobs.latestApplication.position} at {dashboardData.appliedJobs.latestApplication.company}
              </div>
              <div className="flex items-center mt-1">
                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                  {dashboardData.appliedJobs.latestApplication.status}
                </span>
              </div>
            </div>
          </>
        )}
      </Card>

      {/* Shortlisted */}
      <Card 
        title="Shortlisted" 
        icon={<FaUserTie />}
        isLoading={loading || !dashboardData.shortlisted}
      >
        {dashboardData.shortlisted && (
          <div className="space-y-3">
            <div>
              <div className="font-medium">Total Shortlists</div>
              <div className="text-indigo-700 font-semibold">
                {dashboardData.shortlisted.totalShortlists} Companies
              </div>
            </div>
            <div>
              <div className="font-medium">Next Interview</div>
              <div className="text-gray-500">
                {dashboardData.shortlisted.nextInterview.company} - {dashboardData.shortlisted.nextInterview.date}
              </div>
            </div>
            <div>
              <div className="font-medium">Shortlisted Companies</div>
              <div className="flex flex-wrap gap-2 mt-1">
                {dashboardData.shortlisted.companies.map((company, index) => (
                  <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                    {company}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Resume Status */}
      <Card 
        title="Resume Status" 
        icon={<FaFileAlt />}
        isLoading={loading || !dashboardData.resumeStatus}
      >
        {dashboardData.resumeStatus && (
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div>
                <div className="font-medium">Last Updated</div>
                <div className="text-gray-500">{dashboardData.resumeStatus.lastUpdated}</div>
              </div>
              <div>
                <div className="font-medium">Format</div>
                <div className="text-gray-500">{dashboardData.resumeStatus.format}</div>
              </div>
              <div className="flex items-center">
                <div className="font-medium mr-2">AWS Verified</div>
                {dashboardData.resumeStatus.awsVerified ? (
                  <FaAws className="text-orange-500" />
                ) : (
                  <span className="text-red-500 text-xs">Not Verified</span>
                )}
              </div>
            </div>
            <CircularProgress percentage={dashboardData.resumeStatus.score} />
          </div>
        )}
      </Card>

      {/* Notifications */}
      <Card 
        title="Notifications" 
        icon={<FaBell />}
        isLoading={loading || !dashboardData.notifications}
      >
        {dashboardData.notifications && (
          <div className="space-y-4">
            {dashboardData.notifications.map(notification => (
              <div 
                key={notification.id} 
                className={`p-3 rounded-lg ${notification.read ? 'bg-gray-50' : 'bg-indigo-50 border-l-4 border-indigo-500'}`}
              >
                <div className={`font-medium ${notification.read ? 'text-gray-700' : 'text-indigo-700'}`}>
                  {notification.title}
                </div>
                <div className="text-xs text-gray-500 mt-1">{notification.time}</div>
              </div>
            ))}
            <button className="text-indigo-600 text-sm font-medium w-full text-center mt-2">
              View All Notifications
            </button>
          </div>
        )}
      </Card>

      {/* Portfolio Status */}
      <Card 
        title="Portfolio Status" 
        icon={<FaCheckCircle />}
        isLoading={loading || !dashboardData.portfolioStatus}
      >
        {dashboardData.portfolioStatus && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">Portfolio Score</div>
                <div className="text-gray-500">Based on completeness</div>
              </div>
              <CircularProgress percentage={dashboardData.portfolioStatus.score} />
            </div>
            <div>
              <div className="font-medium">Missing Sections</div>
              <div className="flex flex-wrap gap-2 mt-2">
                {dashboardData.portfolioStatus.missingSections.map((section, index) => (
                  <span key={index} className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                    {section}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="font-medium">TPO Feedback</div>
              <div className="text-gray-500 mt-1">"{dashboardData.portfolioStatus.feedback}"</div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Main;
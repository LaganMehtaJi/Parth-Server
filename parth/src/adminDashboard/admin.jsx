import React, { useState } from 'react';
import StudentCard from './StudentCard/index.jsx';
import CompanyCard from './CompanyCard/index.jsx';
import Comm from './Communications/index.jsx';
import Anayltics from "./Anayltics/index.jsx";
import ListComponent from "./List/index.jsx";
import { 
  FiHome, 
  FiUsers, 
  FiBriefcase, 
  FiMail, 
  FiFileText, 
  FiSettings,
  FiPlus,
  FiSearch,
  FiBell,
  FiUser,
  FiBarChart2,
  FiCheckCircle,
  FiEdit,
  FiTrash2,
  FiChevronDown,
  FiMenu,
  FiX,
  FiDownload,
  FiUpload,
  FiGrid,
  FiLink
} from 'react-icons/fi';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications] = useState(5);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black opacity-50 lg:hidden" 
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-0 w-64 transform bg-gray-900 text-white transition duration-300 ease-in-out lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center space-x-2 pl-6 font-bold text-3xl">
           
              <span className="text-blue-400">P.</span>
              <span className="text-green-400">A.</span>
              <span className="text-yellow-400">R.</span>
              <span className="text-red-400">T.</span>
              <span className="text-purple-400">H</span>
            
          </div>
          <button 
            className="p-1 rounded-md lg:hidden hover:bg-gray-800"
            onClick={() => setMobileMenuOpen(false)}
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          <NavItem 
            icon={<FiHome className="w-5 h-5" />} 
            text="Dashboard" 
            active={activeTab === 'dashboard'}
            onClick={() => {
              setActiveTab('dashboard');
              setMobileMenuOpen(false);
            }}
          />
          <NavItem 
            icon={<FiUsers className="w-5 h-5" />} 
            text="Students" 
            active={activeTab === 'students'}
            onClick={() => {
              setActiveTab('students');
              setMobileMenuOpen(false);
            }}
          />
          <NavItem 
            icon={<FiBriefcase className="w-5 h-5" />} 
            text="Companies" 
            active={activeTab === 'companies'}
            onClick={() => {
              setActiveTab('companies');
              setMobileMenuOpen(false);
            }}
          />
          <NavItem 
            icon={<FiMail className="w-5 h-5" />} 
            text="Communications" 
            active={activeTab === 'communications'}
            onClick={() => {
              setActiveTab('communications');
              setMobileMenuOpen(false);
            }}
          />
          <NavItem 
            icon={<FiBarChart2 className="w-5 h-5" />} 
            text="Analytics" 
            active={activeTab === 'analytics'}
            onClick={() => {
              setActiveTab('analytics');
              setMobileMenuOpen(false);
            }}
          />
          <NavItem 
            icon={<FiFileText className="w-5 h-5" />} 
            text="List" 
            active={activeTab === 'List'}
            onClick={() => {
              setActiveTab('List');
              setMobileMenuOpen(false);
            }}
          />
          <NavItem 
            icon={<FiFileText className="w-5 h-5" />} 
            text="Resume Templates" 
            active={activeTab === 'resume-templates'}
            onClick={() => {
              setActiveTab('resume-templates');
              setMobileMenuOpen(false);
            }}
          />
          <NavItem 
            icon={<FiLink className="w-5 h-5" />} 
            text="Portfolio Templates" 
            active={activeTab === 'portfolio-templates'}
            onClick={() => {
              setActiveTab('portfolio-templates');
              setMobileMenuOpen(false);
            }}
          />
          <NavItem 
            icon={<FiSettings className="w-5 h-5" />} 
            text="Settings" 
            active={activeTab === 'settings'}
            onClick={() => {
              setActiveTab('settings');
              setMobileMenuOpen(false);
            }}
          />
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full text-blue-800">
              <FiUser className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Admin User</h4>
              <p className="text-xs text-gray-400">admin@parth.edu</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navigation */}
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center space-x-4">
            <button 
              className="p-2 text-gray-500 rounded-md hover:bg-gray-100 lg:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <FiMenu className="w-5 h-5" />
            </button>
            <button 
              className="hidden p-2 text-gray-500 rounded-md hover:bg-gray-100 lg:block"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <FiMenu className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold text-gray-800 capitalize">
              {activeTab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </h2>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button className="relative p-2 text-gray-500 rounded-full hover:bg-gray-100">
              <FiBell className="w-5 h-5" />
              {notifications > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 flex items-center justify-center text-xs font-semibold text-white bg-red-500 rounded-full">
                  {notifications}
                </span>
              )}
            </button>

            <div className="relative">
              <button className="flex items-center space-x-2 focus:outline-none">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full text-blue-800">
                  <FiUser className="w-4 h-4" />
                </div>
                <span className="hidden text-sm font-medium text-gray-700 lg:inline-block">Admin</span>
                <FiChevronDown className="hidden w-4 h-4 text-gray-500 lg:block" />
              </button>
            </div>
          </div>
        </header>

        {/* Content area */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {activeTab === 'dashboard' && <DashboardHome />}
          {activeTab === 'students' && <StudentManagement />}
          {activeTab === 'companies' && <CompanyManagement />}
          {activeTab === 'communications' && <Communications />}
          {activeTab === 'analytics' && <Analytics />}
          {activeTab === 'List' && <List />}
          {activeTab === 'resume-templates' && <ResumeTemplates />}
          {activeTab === 'portfolio-templates' && <PortfolioTemplates />}
          {activeTab === 'settings' && <Settings />}
        </main>
      </div>
    </div>
  );
};

// Navigation Item Component
const NavItem = ({ icon, text, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-md transition-colors duration-200 ${
      active 
        ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md' 
        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
    }`}
  >
    <span className="mr-3">{icon}</span>
    <span>{text}</span>
  </button>
);

// Dashboard Components
const DashboardHome = () => (
  <div className="space-y-6">
    {/* Stats Cards */}
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <StatCard 
        title="Total Students" 
        value="1,245" 
        change="+12%"
        icon={<FiUsers className="w-6 h-6 text-blue-500" />}
        color="blue"
      />
      <StatCard 
        title="Registered Companies" 
        value="89" 
        change="+5%"
        icon={<FiBriefcase className="w-6 h-6 text-green-500" />}
        color="green"
      />
      <StatCard 
        title="Active Jobs" 
        value="156" 
        change="+23%"
        icon={<FiFileText className="w-6 h-6 text-purple-500" />}
        color="purple"
      />
      <StatCard 
        title="Placements" 
        value="432" 
        change="+8%"
        icon={<FiCheckCircle className="w-6 h-6 text-orange-500" />}
        color="orange"
      />
    </div>

    {/* Content Row */}
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Recent Activity */}
      <div className="p-6 bg-white rounded-lg shadow-sm lg:col-span-2">
        <h3 className="mb-4 text-lg font-semibold text-gray-800">Recent Activity</h3>
        <div className="space-y-4">
          <ActivityItem 
            action="New student registered" 
            time="2 mins ago" 
          />
          <ActivityItem 
            action="Company XYZ posted a new job" 
            time="15 mins ago" 
          />
          <ActivityItem 
            action="3 students placed at ABC Corp" 
            time="1 hour ago" 
          />
          <ActivityItem 
            action="System maintenance scheduled" 
            time="3 hours ago" 
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-800">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <ActionButton 
            icon={<FiPlus className="w-4 h-4 mr-2" />}
            text="Add Student"
            color="blue"
          />
          <ActionButton 
            icon={<FiPlus className="w-4 h-4 mr-2" />}
            text="Add Company"
            color="green"
          />
          <ActionButton 
            icon={<FiMail className="w-4 h-4 mr-2" />}
            text="Send Announcement"
            color="purple"
          />
          <ActionButton 
            icon={<FiFileText className="w-4 h-4 mr-2" />}
            text="Generate Report"
            color="orange"
          />
        </div>
      </div>
    </div>
  </div>
);

const StudentManagement = () => (
  <div className="p-6 bg-white rounded-lg shadow-sm">
    <div className="flex flex-col justify-between mb-6 space-y-4 md:flex-row md:items-center md:space-y-0">
      <h3 className="text-lg font-semibold text-gray-800">Student Management</h3>
      <div className="flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-3">
        <button className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          <FiPlus className="w-4 h-4 mr-2" />
          Add Student
        </button>
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search students..."
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <StudentCard
        image="https://randomuser.me/api/portraits/men/32.jpg"
        name="Rahul Sharma"
        rollNo="BCA21001"
        email="rahul.sharma@example.com"
        field="Full Stack Developer"
        isVerified={true}
        analyticsScore={88}
        portfolioLink="https://rahul-portfolio.com"
        dashboardLink="/dashboard/rahul"
        resumeLink="/resumes/rahul.pdf"
        resumeDownloadLink="/resumes/rahul.pdf"
      />
      {/* More StudentCards... */}
    </div>

    {/* Pagination */}
    <div className="flex items-center justify-between mt-6">
      <div className="text-sm text-gray-500">
        Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of <span className="font-medium">24</span> results
      </div>
      <div className="flex space-x-2">
        <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
          Previous
        </button>
        <button className="px-3 py-1 text-sm text-white bg-blue-600 border border-blue-600 rounded-md hover:bg-blue-700">
          1
        </button>
        <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
          2
        </button>
        <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
          Next
        </button>
      </div>
    </div>
  </div>
);

const CompanyManagement = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
    <CompanyCard
      logo="https://logo.clearbit.com/microsoft.com"
      companyName="Microsoft India"
      studentsApplied={120}
      onDeleteCompany={() => console.log("Deleted Microsoft")}
      onDeleteJob={(job) => console.log("Deleted Job from Microsoft:", job)}
      onAddJobSubmit={(job) => console.log("New Microsoft Job:", job)}
      jobs={[
        {
          title: "Frontend Developer",
          requirements: ["React", "Tailwind", "Git"],
          responsibilities: ["Build UI", "Collaborate with backend"],
          resources: ["Figma", "Codebase Access"],
        },
        {
          title: "Backend Engineer",
          requirements: ["Node.js", "MongoDB"],
          responsibilities: ["API Development", "Database Design"],
          resources: ["DB Server", "API Docs"],
        },
      ]}
    />
    {/* More CompanyCards... */}
  </div>
);

const ResumeTemplates = () => {
  const [categories] = useState(['All', 'Professional', 'Creative', 'Minimalist']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [templates] = useState([
    {
      id: 1,
      name: 'Modern Professional',
      category: 'Professional',
      downloads: 1245,
      thumbnail: 'https://via.placeholder.com/300x400/3b82f6/ffffff?text=Modern+Professional'
    },
    // More templates...
  ]);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    category: 'Professional',
    file: null
  });

  const handleUpload = (e) => {
    e.preventDefault();
    // Upload logic here
    setShowUploadModal(false);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex flex-col justify-between mb-6 space-y-4 md:flex-row md:items-center md:space-y-0">
        <h3 className="text-lg font-semibold text-gray-800">Resume Templates</h3>
        <button 
          onClick={() => setShowUploadModal(true)}
          className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          <FiUpload className="w-4 h-4 mr-2" />
          Upload Template
        </button>
      </div>

      <div className="mb-6 overflow-x-auto">
        <div className="flex space-x-2 pb-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map(template => (
          <div key={template.id} className="border rounded-lg overflow-hidden shadow-sm">
            <img src={template.thumbnail} alt={template.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h4 className="font-medium">{template.name}</h4>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm bg-gray-100 px-2 py-1 rounded-full">{template.category}</span>
                <span className="text-sm flex items-center">
                  <FiDownload className="mr-1" /> {template.downloads}
                </span>
              </div>
              <div className="mt-4 flex space-x-2">
                <button className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm">
                  Preview
                </button>
                <button className="bg-blue-50 text-blue-600 px-3 py-1 rounded-md text-sm">
                  Download
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Upload New Template</h3>
              <button onClick={() => setShowUploadModal(false)}>
                <FiX />
              </button>
            </div>
            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Template Name</label>
                <input 
                  type="text" 
                  className="w-full border rounded-md p-2 text-sm"
                  value={newTemplate.name}
                  onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select 
                  className="w-full border rounded-md p-2 text-sm"
                  value={newTemplate.category}
                  onChange={(e) => setNewTemplate({...newTemplate, category: e.target.value})}
                >
                  {categories.filter(c => c !== 'All').map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Template File</label>
                <div className="border-2 border-dashed rounded-md p-6 text-center">
                  <FiUpload className="mx-auto text-gray-400 text-2xl mb-2" />
                  <p className="text-sm text-gray-600">
                    <span className="text-blue-600">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 mt-1">PDF, DOCX up to 10MB</p>
                  <input 
                    type="file" 
                    className="hidden"
                    onChange={(e) => setNewTemplate({...newTemplate, file: e.target.files[0]})}
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button 
                  type="button" 
                  className="px-4 py-2 text-sm bg-gray-100 rounded-md"
                  onClick={() => setShowUploadModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const PortfolioTemplates = () => {
  // Similar implementation to ResumeTemplates with portfolio-specific data
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      {/* Similar structure to ResumeTemplates */}
    </div>
  );
};

const Communications = () => <Comm />;
const Analytics = () => <Anayltics />;
const List = () => <ListComponent />;
const Settings = () => <div>Settings Content</div>;

// Helper Components
const StatCard = ({ title, value, change, icon, color }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-800',
    green: 'bg-green-50 text-green-800',
    purple: 'bg-purple-50 text-purple-800',
    orange: 'bg-orange-50 text-orange-800',
  };

  return (
    <div className={`p-5 rounded-lg ${colorClasses[color]}`}>
      <div className="flex items-center">
        <div className="p-3 mr-4 rounded-full bg-opacity-30 bg-white">
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-2xl font-semibold">{value}</p>
          <p className={`text-xs ${change.includes('+') ? 'text-green-600' : 'text-red-600'}`}>
            {change} from last month
          </p>
        </div>
      </div>
    </div>
  );
};

const ActivityItem = ({ action, time }) => (
  <div className="flex">
    <div className="relative flex-shrink-0 mr-3">
      <div className="absolute top-1 left-1 w-2 h-2 bg-blue-500 rounded-full"></div>
      <div className="w-4 h-4 border-2 border-blue-500 rounded-full"></div>
    </div>
    <div>
      <p className="text-sm text-gray-800">{action}</p>
      <p className="text-xs text-gray-500">{time}</p>
    </div>
  </div>
);

const ActionButton = ({ icon, text, color }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-700 hover:bg-blue-100',
    green: 'bg-green-50 text-green-700 hover:bg-green-100',
    purple: 'bg-purple-50 text-purple-700 hover:bg-purple-100',
    orange: 'bg-orange-50 text-orange-700 hover:bg-orange-100',
  };

  return (
    <button className={`flex items-center justify-center px-3 py-2 text-sm font-medium rounded-md ${colorClasses[color]}`}>
      {icon}
      {text}
    </button>
  );
};

const StatusBadge = ({ status }) => {
  const statusClasses = {
    Verified: 'bg-green-100 text-green-800',
    Pending: 'bg-yellow-100 text-yellow-800',
    Rejected: 'bg-red-100 text-red-800',
  };

  return (
    <span className={`inline-flex px-2 py-1 text-xs font-semibold leading-4 rounded-full ${statusClasses[status]}`}>
      {status}
    </span>
  );
};

export default AdminDashboard;
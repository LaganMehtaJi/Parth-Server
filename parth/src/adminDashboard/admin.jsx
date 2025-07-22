import React, { useState } from 'react';
import StudentCard from './StudentCard/index.jsx';
import CompanyCard from './CompanyCard/index.jsx';
import Comm from './Communications/index.jsx';
import Anayltics from "./Anayltics/index.jsx";
import ListComponent from "./List/index.jsx";
import His from "./History/index.jsx";
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
  FiX
} from 'react-icons/fi';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications] = useState(5);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sample data
 

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
      <div className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-gray-900 text-white transition duration-300 ease-in-out lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold">PARTH</h1>
            <span className="px-2 py-1 text-xs font-semibold bg-blue-600 rounded-md">Admin</span>
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
            icon={<FiSettings className="w-5 h-5" />} 
            text="History" 
            active={activeTab === 'History'}
            onClick={() => {
              setActiveTab('History');
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
              <p className="text-xs text-gray-400">admin@placementpro.edu</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navigation */}
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
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
            <h2 className="text-xl font-semibold text-gray-800 capitalize">{activeTab}</h2>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
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
          {activeTab === 'History' && <History />}
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
        ? 'bg-blue-700 text-white' 
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

  <StudentCard
    image="https://randomuser.me/api/portraits/women/45.jpg"
    name="Sneha Patel"
    rollNo="BCA21002"
    email="sneha.patel@example.com"
    field="UI/UX Designer"
    isVerified={false}
    analyticsScore={72}
    portfolioLink="https://sneha-ux.com"
    dashboardLink="/dashboard/sneha"
    resumeLink="/resumes/sneha.pdf"
    resumeDownloadLink="/resumes/sneha.pdf"
  />

  <StudentCard
    image="https://randomuser.me/api/portraits/men/18.jpg"
    name="Amit Verma"
    rollNo="BCA21003"
    email="amit.verma@example.com"
    field="Backend Developer"
    isVerified={true}
    analyticsScore={91}
    portfolioLink="https://amit-backend.com"
    dashboardLink="/dashboard/amit"
    resumeLink="/resumes/amit.pdf"
    resumeDownloadLink="/resumes/amit.pdf"
  />

  <StudentCard
    image="https://randomuser.me/api/portraits/women/22.jpg"
    name="Priya Mehta"
    rollNo="BCA21004"
    email="priya.mehta@example.com"
    field="Data Scientist"
    isVerified={false}
    analyticsScore={79}
    portfolioLink="https://priyadata.com"
    dashboardLink="/dashboard/priya"
    resumeLink="/resumes/priya.pdf"
    resumeDownloadLink="/resumes/priya.pdf"
  />

  <StudentCard
    image="https://randomuser.me/api/portraits/men/57.jpg"
    name="Karan Singh"
    rollNo="BCA21005"
    email="karan.singh@example.com"
    field="DevOps Engineer"
    isVerified={true}
    analyticsScore={83}
    portfolioLink="https://karandevops.com"
    dashboardLink="/dashboard/karan"
    resumeLink="/resumes/karan.pdf"
    resumeDownloadLink="/resumes/karan.pdf"
  />

  <StudentCard
    image="https://randomuser.me/api/portraits/women/33.jpg"
    name="Anjali Thakur"
    rollNo="BCA21006"
    email="anjali.thakur@example.com"
    field="AI/ML Engineer"
    isVerified={true}
    analyticsScore={94}
    portfolioLink="https://anjali-ml.com"
    dashboardLink="/dashboard/anjali"
    resumeLink="/resumes/anjali.pdf"
    resumeDownloadLink="/resumes/anjali.pdf"
  />

  <StudentCard
    image="https://randomuser.me/api/portraits/men/29.jpg"
    name="Rohit Kumar"
    rollNo="BCA21007"
    email="rohit.kumar@example.com"
    field="Frontend Developer"
    isVerified={false}
    analyticsScore={68}
    portfolioLink="https://rohit-ui.com"
    dashboardLink="/dashboard/rohit"
    resumeLink="/resumes/rohit.pdf"
    resumeDownloadLink="/resumes/rohit.pdf"
  />

  <StudentCard
    image="https://randomuser.me/api/portraits/women/10.jpg"
    name="Divya Kapoor"
    rollNo="BCA21008"
    email="divya.kapoor@example.com"
    field="Business Analyst"
    isVerified={true}
    analyticsScore={76}
    portfolioLink="https://divyaba.com"
    dashboardLink="/dashboard/divya"
    resumeLink="/resumes/divya.pdf"
    resumeDownloadLink="/resumes/divya.pdf"
  />

  <StudentCard
    image="https://randomuser.me/api/portraits/men/65.jpg"
    name="Nikhil Joshi"
    rollNo="BCA21009"
    email="nikhil.joshi@example.com"
    field="Cybersecurity Analyst"
    isVerified={false}
    analyticsScore={70}
    portfolioLink="https://nikhilcyber.com"
    dashboardLink="/dashboard/nikhil"
    resumeLink="/resumes/nikhil.pdf"
    resumeDownloadLink="/resumes/nikhil.pdf"
  />

  <StudentCard
    image="https://randomuser.me/api/portraits/women/55.jpg"
    name="Isha Malhotra"
    rollNo="BCA21010"
    email="isha.malhotra@example.com"
    field="Cloud Engineer"
    isVerified={true}
    analyticsScore={85}
    portfolioLink="https://ishacloud.com"
    dashboardLink="/dashboard/isha"
    resumeLink="/resumes/isha.pdf"
    resumeDownloadLink="/resumes/isha.pdf"
  />

</div>

    {/* Student Table */}
  


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

const CompanyManagement = () => (
  <>
  <div  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">

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

    <CompanyCard
      logo="https://logo.clearbit.com/google.com"
      companyName="Google"
      studentsApplied={200}
      onDeleteCompany={() => console.log("Deleted Google")}
      onDeleteJob={(job) => console.log("Deleted Job from Google:", job)}
      onAddJobSubmit={(job) => console.log("New Google Job:", job)}
      jobs={[
        {
          title: "AI Researcher",
          requirements: ["Python", "TensorFlow", "ML Theory"],
          responsibilities: ["Train models", "Research"],
          resources: ["TPUs", "Datasets"],
        },
      ]}
    />

    <CompanyCard
      logo="https://logo.clearbit.com/amazon.com"
      companyName="Amazon"
      studentsApplied={150}
      onDeleteCompany={() => console.log("Deleted Amazon")}
      onDeleteJob={(job) => console.log("Deleted Job from Amazon:", job)}
      onAddJobSubmit={(job) => console.log("New Amazon Job:", job)}
      jobs={[
        {
          title: "SDE-1",
          requirements: ["Java", "DSA", "AWS"],
          responsibilities: ["Service development", "Code reviews"],
          resources: ["Internal Tools", "Codebase"],
        },
        {
          title: "DevOps Engineer",
          requirements: ["CI/CD", "Docker", "Kubernetes"],
          responsibilities: ["Deploy pipelines", "Infrastructure monitoring"],
          resources: ["Jenkins", "Grafana"],
        },
      ]}
    />

    <CompanyCard
      logo="https://logo.clearbit.com/apple.com"
      companyName="Apple"
      studentsApplied={95}
      onDeleteCompany={() => console.log("Deleted Apple")}
      onDeleteJob={(job) => console.log("Deleted Job from Apple:", job)}
      onAddJobSubmit={(job) => console.log("New Apple Job:", job)}
      jobs={[
        {
          title: "iOS Engineer",
          requirements: ["Swift", "UIKit"],
          responsibilities: ["App development", "Testing"],
          resources: ["Xcode", "TestFlight"],
        },
      ]}
    />

    <CompanyCard
      logo="https://logo.clearbit.com/meta.com"
      companyName="Meta"
      studentsApplied={180}
      onDeleteCompany={() => console.log("Deleted Meta")}
      onDeleteJob={(job) => console.log("Deleted Job from Meta:", job)}
      onAddJobSubmit={(job) => console.log("New Meta Job:", job)}
      jobs={[
        {
          title: "AR/VR Developer",
          requirements: ["Unity", "C#", "Oculus SDK"],
          responsibilities: ["Build VR apps", "Integrate APIs"],
          resources: ["Unity Hub", "Oculus Dev Tools"],
        },
      ]}
    />

    <CompanyCard
      logo="https://logo.clearbit.com/tesla.com"
      companyName="Tesla"
      studentsApplied={60}
      onDeleteCompany={() => console.log("Deleted Tesla")}
      onDeleteJob={(job) => console.log("Deleted Job from Tesla:", job)}
      onAddJobSubmit={(job) => console.log("New Tesla Job:", job)}
      jobs={[
        {
          title: "Embedded Systems Engineer",
          requirements: ["C/C++", "RTOS"],
          responsibilities: ["Develop firmware", "Test systems"],
          resources: ["Hardware lab", "Simulators"],
        },
      ]}
    />

    <CompanyCard
      logo="https://logo.clearbit.com/netflix.com"
      companyName="Netflix"
      studentsApplied={88}
      onDeleteCompany={() => console.log("Deleted Netflix")}
      onDeleteJob={(job) => console.log("Deleted Job from Netflix:", job)}
      onAddJobSubmit={(job) => console.log("New Netflix Job:", job)}
      jobs={[
        {
          title: "Streaming Platform Engineer",
          requirements: ["Golang", "Distributed Systems"],
          responsibilities: ["Maintain low-latency streaming", "Scale infra"],
          resources: ["Edge Servers", "Grafana"],
        },
      ]}
    />

    <CompanyCard
      logo="https://logo.clearbit.com/intel.com"
      companyName="Intel"
      studentsApplied={70}
      onDeleteCompany={() => console.log("Deleted Intel")}
      onDeleteJob={(job) => console.log("Deleted Job from Intel:", job)}
      onAddJobSubmit={(job) => console.log("New Intel Job:", job)}
      jobs={[
        {
          title: "Chip Design Engineer",
          requirements: ["Verilog", "VHDL"],
          responsibilities: ["Design chips", "Simulate designs"],
          resources: ["Cadence", "EDA Tools"],
        },
      ]}
    />

    <CompanyCard
      logo="https://logo.clearbit.com/salesforce.com"
      companyName="Salesforce"
      studentsApplied={112}
      onDeleteCompany={() => console.log("Deleted Salesforce")}
      onDeleteJob={(job) => console.log("Deleted Job from Salesforce:", job)}
      onAddJobSubmit={(job) => console.log("New Salesforce Job:", job)}
      jobs={[
        {
          title: "CRM Developer",
          requirements: ["Apex", "Lightning", "SOQL"],
          responsibilities: ["Build CRM solutions", "Client integrations"],
          resources: ["Salesforce Sandbox", "Trailhead"],
        },
      ]}
    />

    <CompanyCard
      logo="https://logo.clearbit.com/adobe.com"
      companyName="Adobe"
      studentsApplied={134}
      onDeleteCompany={() => console.log("Deleted Adobe")}
      onDeleteJob={(job) => console.log("Deleted Job from Adobe:", job)}
      onAddJobSubmit={(job) => console.log("New Adobe Job:", job)}
      jobs={[
        {
          title: "UI/UX Designer",
          requirements: ["Adobe XD", "Figma"],
          responsibilities: ["Create mockups", "Design user flows"],
          resources: ["Design System", "Prototypes"],
        },
      ]}
    />
    </div>
  </>
);

const Communications = () => 
<Comm/>
;
const Analytics = () => <><Anayltics/></>;
const List = () => <ListComponent/>;
const History = () => <His/>;

export default AdminDashboard;
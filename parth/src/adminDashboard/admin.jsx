import React, { useState } from 'react';
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
  const students = [
    { id: 1, name: 'John Doe', email: 'john@example.com', department: 'Computer Science', status: 'Verified' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', department: 'Electrical', status: 'Pending' },
    { id: 3, name: 'Alex Johnson', email: 'alex@example.com', department: 'Mechanical', status: 'Verified' },
    { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', department: 'Civil', status: 'Rejected' },
  ];

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
            text="Reports" 
            active={activeTab === 'reports'}
            onClick={() => {
              setActiveTab('reports');
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
          {activeTab === 'students' && <StudentManagement students={students} />}
          {activeTab === 'companies' && <CompanyManagement />}
          {activeTab === 'communications' && <Communications />}
          {activeTab === 'analytics' && <Analytics />}
          {activeTab === 'reports' && <Reports />}
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

const StudentManagement = ({ students }) => (
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

    {/* Student Table */}
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              ID
            </th>
            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Email
            </th>
            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Department
            </th>
            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {students.map((student) => (
            <tr key={student.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {student.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{student.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {student.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {student.department}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <StatusBadge status={student.status} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                  <button className="p-1 text-blue-600 rounded-md hover:bg-blue-50">
                    <FiEdit className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-green-600 rounded-md hover:bg-green-50">
                    <FiCheckCircle className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-red-600 rounded-md hover:bg-red-50">
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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

const CompanyManagement = () => <div>Company Management Content</div>;
const Communications = () => <div>Communications Content</div>;
const Analytics = () => <div>Analytics Content</div>;
const Reports = () => <div>Reports Content</div>;
const Settings = () => <div>Settings Content</div>;

export default AdminDashboard;
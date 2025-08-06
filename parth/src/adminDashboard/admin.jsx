import React, { useState,useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BeatLoader } from 'react-spinners';
import axios from "axios";
import { useFormik } from 'formik';
import * as Yup from 'yup';
// import { BeatLoader } from 'react-spinners';


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
  FiLink,
  FiExternalLink,
  FiCheck
} from 'react-icons/fi';
import Lottie from 'react-lottie';
import animationData from './loading-animation.json';
import Companies from './Companies/Companies';
import Comunication from './Comunication';
import AnalyticsDashboard from './Anayltics/Anaytics';
import Listt from './List/Listt';
import StudentCardd from './StudentCard/StudentCardd';

// Placeholder components - replace these with your actual components
const StudentCard = () => <StudentCardd/>;
const CompanyCard = () => <Companies/>;
const Comm = () => <Comunication/>;
const Anayltics = () => <AnalyticsDashboard/>;
const ListComponent = () => <Listt/>;
const His = () => <div>History</div>;

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
            active={activeTab === 'list'}
            onClick={() => {
              setActiveTab('list');
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
          {/* <NavItem 
            icon={<FiSettings className="w-5 h-5" />} 
            text="History" 
            active={activeTab === 'History'}
            onClick={() => {
              setActiveTab('History');
              setMobileMenuOpen(false);
            }}
          /> */}
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
          {activeTab === 'list' && <List />}
          {activeTab === 'resume-templates' && <ResumeTemplates />}
          {activeTab === 'portfolio-templates' && <PortfolioTemplates />}
          {/* {activeTab === 'History' && <History />} */}
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
const StudentManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState();
   const [activeTab, setActiveTab] = useState('manual');
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      registrationNo: '',
      rollNo: '',
      name: '',
      email: '',
      phone: '',
      field: '',
      batchYear: '',
      profilePic: '',
      address: '',
      verify: false,
    },
    validationSchema: Yup.object({
      
      registrationNo: Yup.string().required('Registration No is required'),
      rollNo: Yup.string().required('Roll No is required'),
      name: Yup.string().max(50, 'Full Name must be at most 50 characters').required('Full Name is required'),
      email: Yup.string().email('Invalid email format').required('Email is required'),
      phone: Yup.string().required('Phone number is required'),
      field: Yup.string(),
      batchYear: Yup.string().matches(/^\d{4}$/, 'Batch Year must be exactly 4 digits'),
      profilePic: Yup.string().url('Must be a valid URL'),
      address: Yup.string().required('Address is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
      try {
        const res = await axios.post('http://localhost:3000/api/student/send', values);
        toast.success('Student added successfully!');
        resetForm();
        setIsModalOpen(false);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Error adding student');
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleFileUpload = (e) => {
    axios.post("http://localhost:3000/api/auth/admin/upload-excel").then((res)=>{
     console.log(res.data);

    }).catch((error)=>{
      console.log(error);
    })
    toast.info('Excel upload not implemented yet.');
  };

  return (
    <div className="relative p-6 bg-white rounded-lg shadow-sm">
      <ToastContainer />
      
      <div className="flex flex-col justify-between mb-6 space-y-4 md:flex-row md:items-center md:space-y-0">
        <h3 className="text-lg font-semibold text-gray-800">Student Management</h3>
        <div className="flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? <BeatLoader size={8} color="#ffffff" /> : (
              <>
                <FiPlus className="w-4 h-4 mr-2" />
                Add Student
              </>
            )}
          </button>
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search students..."
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none"
              disabled={isLoading}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        <StudentCard />
      </div>

      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-500">
          Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of <span className="font-medium">24</span> results
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">Previous</button>
          <button className="px-3 py-1 text-sm text-white bg-blue-600 border border-blue-600 rounded-md hover:bg-blue-700">1</button>
          <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">2</button>
          <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">Next</button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-800">
                {activeTab === 'manual' ? 'Add New Student' : 'Import Students'}
              </h3>
              <button
                onClick={() => !isLoading && setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
                disabled={isLoading}
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <div className="p-4">
              <div className="flex border-b mb-4">
                <button
                  className={`px-4 py-2 font-medium ${activeTab === 'manual' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('manual')}
                >
                  Manual Entry
                </button>
                <button
                  className={`px-4 py-2 font-medium ${activeTab === 'excel' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('excel')}
                >
                  Import Excel
                </button>
              </div>

              {activeTab === 'manual' ? (
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {[
                      { name: 'registrationNo', label: 'Registration No', placeholder: 'REG2025001' },
                      { name: 'rollNo', label: 'Roll No', placeholder: 'R001' },
                      { name: 'name', label: 'Full Name', placeholder: 'Lagan Mehta' },
                      { name: 'email', label: 'Email', placeholder: 'lagan@example.com', type: 'email' },
                      { name: 'phone', label: 'Phone', placeholder: '9876543210' },
                      { name: 'field', label: 'Field', placeholder: 'Web Developer' },
                      { name: 'batchYear', label: 'Batch Year', placeholder: '2025' },
                      { name: 'profilePic', label: 'Profile Picture URL', placeholder: 'https://example.com/profile.jpg' },
                      { name: 'address', label: 'Address', placeholder: 'Yamunanagar, Haryana' },
                    ].map(({ name, label, placeholder, type = 'text' }) => (
                      <div key={name}>
                        <label className="block text-sm font-medium text-gray-700">{label}</label>
                        <input
                          type={type}
                          name={name}
                          value={formik.values[name]}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                          placeholder={placeholder}
                        />
                        {formik.touched[name] && formik.errors[name] && (
                          <p className="text-sm text-red-500">{formik.errors[name]}</p>
                        )}
                      </div>
                    ))}

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="verify"
                        checked={formik.values.verify}
                        onChange={formik.handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label className="ml-2 block text-sm text-gray-700">Verified Student</label>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                      disabled={isLoading}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 flex items-center justify-center min-w-[100px]"
                      disabled={isLoading}
                    >
                      {isLoading ? <BeatLoader size={8} color="#fff" /> : 'Add Student'}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="mt-4 text-center">
                  <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                  <h4 className="mt-2 text-sm font-medium text-gray-700">Upload Excel File</h4>
                  <p className="mt-1 text-xs text-gray-500">Supports .xlsx, .xls, or .csv file formats</p>
                  <div className="mt-4">
                    <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                      <input type="file" onChange={handleFileUpload} className="sr-only" />
                      Select File
                    </label>
                  </div>
                  <div className="mt-4 text-sm text-gray-500 flex items-center justify-center">
                    <FiDownload className="mr-2" />
                    <a href="#" className="text-blue-600 hover:text-blue-500">Download sample Excel template</a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


const CompanyManagement = () => (
  // <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
    <CompanyCard />
  // </div>
);

const ResumeTemplates = () => {
  const [categories] = useState(['All', 'Professional', 'Creative', 'Minimalist', 'Technical']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('idle');
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    category: 'Professional',
    file: null,
    previewImage: null
  });

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  // Fetch templates from API
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://localhost:5000/templates'); // Replace with your API endpoint
        setTemplates(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewTemplate({
          ...newTemplate,
          file,
          previewImage: e.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!newTemplate.file) return;
    
    setUploadStatus('uploading');
    
    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('name', newTemplate.name);
      formData.append('category', newTemplate.category);
      formData.append('file', newTemplate.file);
      
      // Upload to API
      const response = await axios.post('https://localhost:5000/templates', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Add the new template to the list
      setTemplates([...templates, response.data]);
      setUploadStatus('success');
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setShowUploadModal(false);
        setUploadStatus('idle');
        setNewTemplate({
          name: '',
          category: 'Professional',
          file: null,
          previewImage: null
        });
      }, 3000);
    } catch (err) {
      console.error('Upload failed:', err);
      setUploadStatus('error');
      setTimeout(() => setUploadStatus('idle'), 3000);
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading templates...</p>
        </div>
      </div>
    );
  }

  

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex flex-col justify-between mb-6 space-y-4 md:flex-row md:items-center md:space-y-0">
        <h2 className="text-2xl font-bold text-gray-800">Resume Templates</h2>
        <button 
          onClick={() => setShowUploadModal(true)}
          className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
        >
          <FiUpload className="w-4 h-4 mr-2" />
          Add New Template
        </button>
      </div>

      <div className="mb-6 overflow-x-auto">
        <div className="flex space-x-2 pb-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {templates.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No templates found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {templates
            .filter(template => selectedCategory === 'All' || template.category === selectedCategory)
            .map(template => (
              <div key={template.id} className="overflow-hidden transition-all duration-200 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg group">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={template.thumbnail} 
                    alt={template.name}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2 px-2 py-1 text-xs font-bold text-white bg-blue-600 rounded-full">
                    Score: {template.score}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{template.name}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                      {template.category}
                    </span>
                    <div className="flex items-center text-sm text-gray-500">
                      <FiDownload className="w-4 h-4 mr-1" />
                      {template.downloads.toLocaleString()}
                    </div>
                  </div>
                  <div className="flex mt-4 space-x-2">
                    <a 
                      href={template.previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center flex-1 px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                    >
                      <FiExternalLink className="w-4 h-4 mr-1" />
                      Preview
                    </a>
                    <a 
                      href={template.downloadUrl}
                      className="flex items-center justify-center flex-1 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100"
                    >
                      <FiDownload className="w-4 h-4 mr-1" />
                      Download
                    </a>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-medium text-gray-800">
                {uploadStatus === 'idle' && 'Upload New Template'}
                {uploadStatus === 'uploading' && 'Testing Your Template'}
                {uploadStatus === 'success' && 'Upload Successful!'}
                {uploadStatus === 'error' && 'Upload Failed'}
              </h3>
              {uploadStatus === 'idle' && (
                <button 
                  onClick={() => setShowUploadModal(false)}
                  className="p-1 text-gray-400 rounded-md hover:bg-gray-100 hover:text-gray-500"
                >
                  <FiX className="w-5 h-5" />
                </button>
              )}
            </div>
            
            {uploadStatus === 'idle' && (
              <form onSubmit={handleUpload} className="p-4 space-y-4">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Template Name</label>
                  <input
                    type="text"
                    value={newTemplate.name}
                    onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Category</label>
                  <select
                    value={newTemplate.category}
                    onChange={(e) => setNewTemplate({...newTemplate, category: e.target.value})}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    {categories.filter(c => c !== 'All').map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Template File</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      {newTemplate.previewImage ? (
                        <img 
                          src={newTemplate.previewImage} 
                          alt="Preview" 
                          className="mx-auto h-32 object-contain"
                        />
                      ) : (
                        <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                      )}
                      <div className="flex text-sm text-gray-600">
                        <label className="relative font-medium text-blue-600 bg-white rounded-md cursor-pointer hover:text-blue-500">
                          <span>Upload a file</span>
                          <input 
                            type="file" 
                            className="sr-only"
                            onChange={handleFileChange}
                            accept=".pdf,.docx,.zip"
                            required
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PDF, DOCX or ZIP up to 10MB</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Upload & Test
                  </button>
                </div>
              </form>
            )}

            {uploadStatus === 'uploading' && (
              <div className="p-8 text-center">
                <Lottie 
                  options={defaultOptions}
                  height={150}
                  width={150}
                />
                <h4 className="text-lg font-medium text-gray-800 mb-2">Testing Your Template</h4>
                <p className="text-gray-600">Our system is analyzing your template for quality and compatibility...</p>
              </div>
            )}

            {uploadStatus === 'success' && (
              <div className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
                    <FiCheck className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <h4 className="text-lg font-medium text-gray-800 mb-2">Template Approved!</h4>
                <p className="text-gray-600 mb-4">
                  Your template scored <span className="font-bold text-green-600">80+</span> in our quality tests!
                </p>
                <p className="text-sm text-gray-500">
                  Congratulations! Your template has been added to our collection.
                </p>
              </div>
            )}

            {uploadStatus === 'error' && (
              <div className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full">
                    <FiX className="w-8 h-8 text-red-600" />
                  </div>
                </div>
                <h4 className="text-lg font-medium text-gray-800 mb-2">Upload Failed</h4>
                <p className="text-gray-600 mb-4">
                  There was an error processing your template.
                </p>
                <button
                  onClick={() => setUploadStatus('idle')}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};


const PortfolioTemplates = () => {
  const [categories] = useState(['All', 'Professional', 'Creative', 'Minimalist', 'Technical']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch templates from API
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await axios.get('https://localhost:5000/portfolio-templates'); 
        setTemplates(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  if (loading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading portfolio templates...</p>
        </div>
      </div>
    );
  }

  

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex flex-col justify-between mb-6 space-y-4 md:flex-row md:items-center md:space-y-0">
        <h2 className="text-2xl font-bold text-gray-800">Portfolio Templates</h2>
        <button className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">
          <FiUpload className="w-4 h-4 mr-2" />
          Add New Template
        </button>
      </div>

      <div className="mb-6 overflow-x-auto">
        <div className="flex space-x-2 pb-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {templates.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No portfolio templates found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {templates
            .filter(template => selectedCategory === 'All' || template.category === selectedCategory)
            .map(template => (
              <div key={template.id} className="overflow-hidden transition-all duration-200 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg group">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={template.thumbnail} 
                    alt={template.name}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = 'https://via.placeholder.com/300x400?text=Template+Image';
                    }}
                  />
                  <div className="absolute top-2 right-2 px-2 py-1 text-xs font-bold text-white bg-blue-600 rounded-full">
                    Score: {template.score}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{template.name}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                      {template.category}
                    </span>
                    <div className="flex items-center text-sm text-gray-500">
                      <FiDownload className="w-4 h-4 mr-1" />
                      {template.downloads.toLocaleString()}
                    </div>
                  </div>
                  <div className="flex mt-4 space-x-2">
                    <a 
                      href={template.previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center flex-1 px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                    >
                      <FiExternalLink className="w-4 h-4 mr-1" />
                      Preview
                    </a>
                    <a 
                      href={template.downloadUrl}
                      className="flex items-center justify-center flex-1 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100"
                    >
                      <FiDownload className="w-4 h-4 mr-1" />
                      Download
                    </a>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};


const Communications = () => <Comm />;
const Analytics = () => <Anayltics />;
const List = () => <ListComponent />;
const History = () => <His />;

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

export default AdminDashboard;
import React, { useState, useEffect } from 'react';
import { FaLinkedin, FaGithub, FaTwitter, FaKey, FaEye, FaEyeSlash, FaEnvelope, FaSave } from 'react-icons/fa';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StudentSettings = () => {
  const [settings, setSettings] = useState({
    linkedin: '',
    github: '',
    twitter: '',
    portfolio: '',
    email: '',
    emailPassword: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registrationNo, setRegistrationNo] = useState("");

  // Get registrationNo from localStorage
  useEffect(() => {
    const regNo = localStorage.getItem('registrationNo');
    if (regNo) {
      setRegistrationNo(regNo);
    }
  }, []);

  // Fetch settings when registrationNo changes
  useEffect(() => {
    if (!registrationNo) return;

    const fetchSettings = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:3000/api/update/settings/${registrationNo}`);
        setSettings(response.data);
        console.log(response.data);
      } catch (error) {
        toast.error('Failed to load settings', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSettings();
  }, [registrationNo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Update all settings
      await axios.post(`http://localhost:3000/api/update/linkedin/${registrationNo}`, { linkedin: settings.linkedin });
      await axios.post(`http://localhost:3000/api/update/github/${registrationNo}`, { github: settings.github });
      await axios.post(`http://localhost:3000/api/update/twitter/${registrationNo}`, { twitter: settings.twitter });
      await axios.post(`http://localhost:3000/api/update/portfolio/${registrationNo}`, { portfolio: settings.portfolio });
      await axios.post(`http://localhost:3000/api/update/email/${registrationNo}`, { 
        email: settings.email,
        emailPassword: settings.emailPassword 
      });
      
      toast.success('Settings updated successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      toast.error('Failed to update settings', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const maskedPassword = settings.emailPassword ? '•'.repeat(8) : '';

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 px-6 py-4 text-white">
            <div className="flex items-center">
              <FaKey className="h-6 w-6 mr-2" />
              <div>
                <h2 className="text-xl font-bold">Student Settings</h2>
                <p className="text-blue-100">Update your profile information</p>
              </div>
            </div>
          </div>
          
          {/* Form */}
          <div className="px-6 py-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Social Media Section */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2 mb-4">
                  Social Media Links
                </h3>
                
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {/* LinkedIn */}
                  <div>
                    <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 flex items-center">
                      <FaLinkedin className="mr-2 text-blue-700" />
                      LinkedIn URL
                    </label>
                    <div className="mt-1">
                      <input
                        type="url"
                        id="linkedin"
                        name="linkedin"
                        value={settings.linkedin}
                        onChange={handleChange}
                        placeholder="https://linkedin.com/in/yourprofile"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                      />
                    </div>
                  </div>
                  
                  {/* GitHub */}
                  <div>
                    <label htmlFor="github" className="block text-sm font-medium text-gray-700 flex items-center">
                      <FaGithub className="mr-2 text-gray-800" />
                      GitHub URL
                    </label>
                    <div className="mt-1">
                      <input
                        type="url"
                        id="github"
                        name="github"
                        value={settings.github}
                        onChange={handleChange}
                        placeholder="https://github.com/yourusername"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                      />
                    </div>
                  </div>
                  
                  {/* Twitter */}
                  <div>
                    <label htmlFor="twitter" className="block text-sm font-medium text-gray-700 flex items-center">
                      <FaTwitter className="mr-2 text-blue-400" />
                      Twitter URL
                    </label>
                    <div className="mt-1">
                      <input
                        type="url"
                        id="twitter"
                        name="twitter"
                        value={settings.twitter}
                        onChange={handleChange}
                        placeholder="https://twitter.com/yourhandle"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                      />
                    </div>
                  </div>
                  
                  {/* Portfolio */}
                  <div>
                    <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700">
                      Portfolio Website
                    </label>
                    <div className="mt-1">
                      <input
                        type="url"
                        id="portfolio"
                        name="portfolio"
                        value={settings.portfolio}
                        onChange={handleChange}
                        placeholder="https://yourportfolio.com"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Email Credentials Section */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2 mb-4 flex items-center">
                  <FaEnvelope className="mr-2 text-gray-600" />
                  Email Credentials
                </h3>
                
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <div className="mt-1">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={settings.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                      />
                    </div>
                  </div>
                  
                  {/* Password */}
                  <div>
                    <label htmlFor="emailPassword" className="block text-sm font-medium text-gray-700">
                      Email Password
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="emailPassword"
                        name="emailPassword"
                        value={showPassword ? settings.emailPassword : maskedPassword}
                        onChange={handleChange}
                        placeholder="Enter password"
                        className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border pr-10"
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showPassword ? (
                          <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                        ) : (
                          <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                        )}
                      </button>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Password is masked for security
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    <>
                      <FaSave className="-ml-1 mr-2 h-5 w-5" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSettings;
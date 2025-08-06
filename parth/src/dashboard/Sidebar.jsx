import React, { useState, useEffect } from "react";
import { FiMenu, FiX, FiHome, FiFileText, FiBriefcase, FiAward, FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import { FaProjectDiagram, FaCertificate, FaHandsHelping } from "react-icons/fa";
import { MdWork, MdSchool } from "react-icons/md";
import { RiDashboardFill } from "react-icons/ri";
import logo from '../assets/ParthLogo.jpg';
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setOpen(false);
    };

    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMobile && open && !e.target.closest('aside') && !e.target.closest('button')) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, open]);

  const navItems = [
    { name: "Dashboard", path: '/', icon: <RiDashboardFill size={20} /> },
    { name: "Resume Builder", path: '/dashboard/resumeBuilder', icon: <FiFileText size={20} /> },
    { name: "Portfolio Builder", path: '/dashboard/portfolio', icon: <FiUser size={20} /> },
    { name: "Job Updates", path: '/dashboard/job', icon: <FiBriefcase size={20} /> },
    { name: "Projects", path: '/dashboard/projects', icon: <FaProjectDiagram size={20} /> },
    { name: "Certificates", path: '/dashboard/certificates', icon: <FaCertificate size={20} /> },
    { name: "Volunteering", path: '/dashboard/voluntaring', icon: <FaHandsHelping size={20} /> },
    { name: "Experience", path: '/dashboard/experience', icon: <MdWork size={20} /> },
    { name: "Skills", path: '/dashboard/skill', icon: <FiAward size={20} /> },
    { name: "Education", path: '/dashboard/education', icon: <MdSchool size={20} /> },
    { name: "Settings", path: '/dashboard/setting', icon: <FiSettings size={20} /> },
    { name: "Log Out", path: '/dashboard/logout', icon: <FiLogOut size={20} /> }
  ];

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 z-50 bg-white w-full h-16 flex items-center px-4 shadow-md">
        <button 
          onClick={() => setOpen(!open)}
          className="p-2 focus:outline-none text-gray-700 hover:text-indigo-600 transition-colors"
          aria-label="Toggle menu"
        >
          {open ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
        </button>
      
      </div>
      {/* Overlay */}
      {open && isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${open ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 transform transition-transform duration-300 ease-in-out 
          bg-gradient-to-b from-[#0d2c54] to-[#1a4b8c] text-white w-64 min-h-screen 
          fixed md:static z-40 shadow-xl`}
      >


        {/* Navigation Items */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center p-3 rounded-lg transition-all duration-200 
                ${location.pathname === item.path ? 
                  'bg-blue-700 text-white shadow-md' : 
                  'hover:bg-blue-600 hover:bg-opacity-50 text-blue-100'}`}
              onClick={() => isMobile && setOpen(false)}
            >
              <span className="mr-3 opacity-80">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* User Profile (optional) */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-blue-700 bg-blue-800 bg-opacity-50">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
              <FiUser size={18} />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">Student Name</p>
              <p className="text-xs text-blue-200">Computer Science</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
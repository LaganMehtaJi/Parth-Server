import React, { useState, useRef, useEffect } from 'react';
import {
  AiFillHome,
  AiOutlineTeam,
  AiFillBell,
  AiOutlineMessage,
  AiOutlineSearch,
} from 'react-icons/ai';
import { MdWork } from 'react-icons/md';

const LinkedInHeader = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navItems = [
    { label: 'Home', icon: <AiFillHome size={24} />, active: true },
    { label: 'Network', icon: <AiOutlineTeam size={24} /> },
    { label: 'Jobs', icon: <MdWork size={24} /> },
    { label: 'Messaging', icon: <AiOutlineMessage size={24} /> },
    { label: 'Notifications', icon: <AiFillBell size={24} /> },
  ];

  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-white shadow">
      {/* Left section */}
      <div className="flex items-center space-x-4 w-1/2">
        <img src="/logoBlack.png" alt="Logo" className="w-8 h-8" />
        <span style={{fontWeight: 'bold' }}>Parth</span>
        <div className="relative hidden md:block flex-1 max-w-md">
          <AiOutlineSearch className="absolute top-2.5 left-3 text-gray-500" />
          <input
            type="text"
            placeholder="Search"
            className="pl-10 pr-4 py-1.5 w-65 rounded-full bg-gray-100 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Right section */}
      <div className="ml-auto flex items-center space-x-6 w-auto">
        {/* Navigation icons */}
        <nav className="flex space-x-4">
          {navItems.map(({ label, icon, badge, active }) => (
            <button
              key={label}
              className={`relative flex flex-col items-center p-2 rounded-md hover:bg-gray-100 transition-colors ${
                active ? 'font-medium text-black' : 'font-normal text-gray-600'
              }`}
              aria-label={label}
            >
              <div className="relative">
                {icon}
                {badge && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {badge}
                  </span>
                )}
              </div>
              <span className="text-xs mt-1">{label}</span>
              {active && (
                <div className="absolute bottom-0 w-4/5 h-0.5 bg-black"></div>
              )}
            </button>
          ))}
        </nav>

        {/* Profile dropdown */}
        <div className="relative" ref={dropdownRef}>
          <div
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <img
              src="https://via.placeholder.com/30"
              alt="Profile"
              className="w-8 h-8 rounded-full border"
            />
            <span className="text-sm hidden md:inline">Me</span>
          </div>

          {/* Dropdown menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-md z-50">
              <a
                href="#profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                View Portfolio
              </a>
              <a
                href="#settings"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                View Resume
              </a>
              <a
                href="#logout"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Sign Out
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default LinkedInHeader;

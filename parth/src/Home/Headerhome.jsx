import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  AiFillHome,
  AiFillBell,
  AiOutlineMessage,
  AiOutlineSearch,
} from 'react-icons/ai';
import { MdWork } from 'react-icons/md';
import { MdEmail } from 'react-icons/md';

const Headerhome = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('Home');
  const dropdownRef = useRef(null);

  const navItems = [
    { label: 'Home', icon: <AiFillHome size={24} />, path: '/home' },
    { label: 'Email', icon: <MdEmail size={24} />, path: '/email' },
    { label: 'Jobs', icon: <MdWork size={24} />, path: '/jobs' },
    { label: 'Messaging', icon: <AiOutlineMessage size={24} />, path: '/messaging' },
    { label: 'Notifications', icon: <AiFillBell size={24} />, path: '/notifications' },
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
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Left section - Logo and search */}
          <div className="flex items-center space-x-2 md:space-x-4 flex-1">
            {/* Logo */}
            <Link to="/home" className="flex items-center">
              <img 
                src="/logoBlack.png" 
                alt="Logo" 
                className="w-8 h-8" 
              />
              <span className="ml-1 font-bold hidden sm:inline">PARTH</span>
            </Link>

            {/* Search - Desktop */}
            <div className="relative hidden md:flex items-center flex-1 max-w-md">
              <AiOutlineSearch className="absolute left-3 text-gray-500" />
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-1.5 w-full rounded-md bg-gray-100 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Search - Mobile toggle */}
            <button 
              className="md:hidden p-2 rounded-full hover:bg-gray-100"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <AiOutlineSearch size={20} />
            </button>
          </div>

          {/* Mobile search bar - appears when searchOpen is true */}
          {searchOpen && (
            <div className="absolute top-14 left-0 right-0 bg-white p-2 shadow-md md:hidden">
              <div className="relative flex items-center">
                <AiOutlineSearch className="absolute left-3 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-10 pr-4 py-2 w-full rounded-md bg-gray-100 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
                <button 
                  className="ml-2 text-gray-500"
                  onClick={() => setSearchOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Right section - Navigation and profile */}
          <div className="flex items-center">
            {/* Navigation icons */}
            <nav className="flex space-x-1 sm:space-x-2 md:space-x-4">
              {navItems.map(({ label, icon, path }) => (
                <Link
                  to={path}
                  key={label}
                  className={`relative flex flex-col items-center p-2 rounded-md hover:bg-gray-100 transition-colors ${
                    activeNav === label ? 'font-medium text-black' : 'font-normal text-gray-600'
                  }`}
                  aria-label={label}
                  onClick={() => setActiveNav(label)}
                >
                  <div className="relative">
                    {icon}
                  </div>
                  <span className="text-xs mt-1 hidden sm:inline">{label}</span>
                  {activeNav === label && (
                    <div className="absolute bottom-0 w-4/5 h-0.5 bg-black hidden sm:block"></div>
                  )}
                </Link>
              ))}
            </nav>

            {/* Profile dropdown */}
            <div className="relative ml-2" ref={dropdownRef}>
              <div
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-1 cursor-pointer p-1 rounded-md hover:bg-gray-100"
              >
                <img
                  src="chahat.jpg"
                  alt="Profile"
                  className="w-8 h-8 rounded-full border"
                />
                <span className="text-sm hidden lg:inline">Me</span>
              </div>

              {/* Dropdown menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-md z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    View Portfolio
                  </Link>
                  <Link
                    to="/resume"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    View Resume
                  </Link>
                  <Link
                    to="/logout"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Sign Out
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Headerhome;
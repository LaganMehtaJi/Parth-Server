import React from "react";
import logo from '../assets/ParthLogo.jpg';
import { FiSearch, FiBell, FiUser, FiMenu } from "react-icons/fi";

const Header = ({ toggleSidebar }) => {
  return (
    <header className="bg-white shadow-md px-2 py-2 flex items-center justify-between sticky top-0 z-50 h-14 md:h-14 lg:h-14">
      
      
      <div className="md:hidden mr-2">
        <FiMenu
          onClick={toggleSidebar}
          className="text-3xl cursor-pointer text-gray-800"
        />
      </div>

    
      <div className="flex items-center gap-2 flex-shrink-0">
        <img src={logo} alt="Parth" className="h-10 w-10 object-contain" />
        <h1 className="text-3xl font-bold pt-6">PARTH</h1>
      </div>

      
      <div className="flex-1 px-4 hidden md:block">
        <div className="relative max-w-md mx-auto">
          <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500 text-lg" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-1.5 border border-gray-300 rounded-full focus:outline-none"
          />
        </div>
      </div>

    
      <div className="flex items-center gap-4">
        <FiBell className="text-2xl text-gray-700" />
        <FiUser className="text-2xl text-gray-700" />
      </div>
    </header>
  );
};

export default Header;

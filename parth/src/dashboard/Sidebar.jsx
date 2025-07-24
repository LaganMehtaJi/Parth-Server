import React, { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import logo from '../assets/ParthLogo.jpg'
import { Link } from "react-router-dom";
import { link } from "framer-motion/client";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);


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

  return (
    <>
      <div className="md:hidden fixed top-0 left-0 z-50 bg-white w-full h-16 flex items-center px-4 shadow-md">
  <button 
    onClick={() => setOpen(!open)}
    className="p-2 focus:outline-none"
    aria-label="Toggle menu"
  >
    {open ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
  </button>
  <div className="flex items-center gap-2 flex-shrink-0">
         <img src={logo} alt="Parth" className="h-8 w-auto" />

          <h1 className="text-2xl font-bold pt-8">PARTH</h1>
</div>
</div>


    
      {open && isMobile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30" />
      )}

      <aside
        className={`${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transform transition-transform duration-300 ease-in-out bg-[#0d2c54] text-white w-64 min-h-screen p-6 space-y-4 fixed md:static z-40`}
      >
        {[
          { name:"Dashboard" ,path:'/d'} ,
          {name:"Resume Builder",path:'/Resumebuilder'},
          {name:"Portfolio Builder",path:'/Portfolio'},
          {name:"Interviews",path:'/interviews'},
          {name:"Projects",path:'/projects'},
          {name:"Resources",path:'/resources'},
          { name:"Settings",path:'/settings'},
          {name:"Help and Support",path:'/help'},
          {name:"Log Out",path:'/logout'}
        ].map((item) => (
          <div
            key={item}
            className="hover:bg-blue-900 cursor-pointer p-2 rounded transition-colors duration-200"
          >
            {
              <LinK to=></LinK>
              
             
            }
          </div>
        ))}
      </aside>
    </>
  );
};

export default Sidebar;
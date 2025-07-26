import React, { useState } from 'react';
import { motion } from 'framer-motion';


// import 'swiper/css';
// import 'swiper/css/pagination';



import {
  FiUser, FiBriefcase, FiFileText, FiDownload,
  FiLogIn, FiLogOut, FiEdit,
  FiMail, FiLayers, FiCheckCircle, FiArrowDown
} from 'react-icons/fi';
import Footer from './Footer';
import Marquee from './Marquee';
import HowItStarts from './HowItStarts';
import Services from './Services';
import OurTeam from './OurTeam';
import Parth from './WhatisParth';
import Tagline from './Tagline';

const ParthPlacement = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState(null);

  


  // Sample data
  

  const features = [
    { icon: <FiEdit />, title: "Edit Profile", desc: "Update profile information as you grow" },
    { icon: <FiDownload />, title: "Download Resumes", desc: "Multiple format options available" },
    { icon: <FiCheckCircle />, title: "Verify Profiles", desc: "List authentic candidates " },
    { icon: <FiMail />, title: "Job Alerts", desc: "Get notified about new opportunities" },
  ];

  

  const handleLogin = (role) => {
    setUser({ name: 'Demo User', role });
    setIsLoginOpen(false);
  };

  const scrollTo = (section) => {
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(section);
  };

  return (
    <>
      <div className='w-full h-screen bg-cover bg-center'>
        <div className='px-6'>
          <div className='justify-center'>
            {/* Gradient Navbar (Fixed) */}
            
            <nav className='sticky top-0 z-50 bg-white shadow-lg px-6 py-3 h-20 mt-4 w-full'>

              <div className="max-w-7xl mx-auto px-10 h-full flex items-center justify-between gap-16">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-2 cursor-pointer"
                  onClick={() => scrollTo('hero')}
                >
                  <img src="/images/logo.png" alt="Logo" className='h-8 w-auto md:h-12 lg:h-16' />
                  <span className="text-2xl font-sans text-violet-950 tracking-wide ">PARTH</span>
                </motion.div>

                <div className="hidden md:flex gap-8 text-violet-900 font-medium">
                  {['Services', 'Features', 'Why Parth?', 'Our Team'].map((item) => (
                    <motion.button
                      key={item}
                      whileHover={{ y: -2 }}
                      className={`capitalize ${activeSection === item ? 'font-bold border-b-2 border-white' : ''}`}
                      onClick={() => scrollTo(item)}
                    >
                      {item}
                    </motion.button>
                  ))}
                </div>

                <div className="relative">
                  {user ? (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center space-x-2 cursor-pointer"
                      onClick={() => setUser(null)}
                    >
                      <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center text-blue-600">
                        <FiUser />
                      </div>
                      <span>Logout</span>
                    </motion.div>
                  ) : (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => setIsLoginOpen(!isLoginOpen)}
                        className="flex items-center px-5 py-2 bg-black rounded-full text-white font-medium shadow-sm"
                      >
                        Login
                      </motion.button>

                      {isLoginOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg text-gray-800"
                        >
                          {['Student', 'Admin', 'Recruiter'].map((role) => (
                            <motion.button
                              key={role}
                              whileHover={{ x: 5 }}
                              className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                              onClick={() => handleLogin(role.toLowerCase())}
                            >
                              <FiUser className="mr-2" /> {role}
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </nav>


            {/* Hero Section */}
             {/*Tag line*/}
            <Tagline/>
            {/* Services Section */}
              <Services/>
            {/*How it startS? */}
             <HowItStarts/>
             {/* PARTH*/}
            <Parth/>
  
            {/* Team members section */}
             <OurTeam/>
            {/*Marquee*/}
            <Marquee/>

            
            {/*Footer */}

            <Footer/>
          </div>
        </div>
      </div>
    </>
  );
};

export default ParthPlacement;
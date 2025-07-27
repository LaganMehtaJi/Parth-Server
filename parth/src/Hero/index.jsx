import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

import {
  FiUser, FiBriefcase, FiFileText, FiDownload,
  FiLogIn, FiLogOut, FiEdit,
  FiMail, FiLayers, FiCheckCircle, FiArrowDown,
  FiMenu, FiX // Import icons for hamburger menu
} from 'react-icons/fi';
import Footer from './Footer';
import Marquee from './Marquee';
import HowItStarts from './GetStarted';
import Services from './Services';
import OurTeam from './OurTeam';
import Parth from './WhatisParth';
import Tagline from './Tagline';

const ParthPlacement = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

  const handleLogin = (role) => {
    setUser({ name: 'Demo User', role });
    setIsLoginOpen(false);
    setIsMobileMenuOpen(false); // Close mobile menu on login
  };

  const scrollTo = (section) => {
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(section);
    setIsMobileMenuOpen(false); // Close mobile menu when a section is clicked
  };

  return (
    <>
      <div className='w-full h-screen bg-cover bg-center'>
        <div className='px-6'>
          {/* Gradient Navbar (Fixed) */}
          <nav className='sticky top-0 z-50 bg-white shadow-2xl px-6 py-3 h-20 mt-4 w-full rounded-4xl'>
            <div className="max-w-7xl mx-auto px-10 flex items-center justify-between gap-16">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => scrollTo('hero')}
              >
                {/* Fixed Logo: Added 'h-10' for small screens */}
                <img src="/images/logo.png" alt="Logo" className='w-auto h-10 md:h-12 lg:h-16' />
                <span className="text-2xl font-sans text-violet-950 tracking-wide ">PARTH</span>
              </motion.div>

              {/* Desktop Menu */}
              <div className="hidden md:flex gap-8 text-violet-900 font-medium">
                {['Our Services', 'Get started', 'About Parth', 'Our Team'].map((item) => (
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

              {/* Login/Logout Button for Desktop */}
              <div className="hidden md:block relative">
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

              {/* Mobile Menu Button (Hamburger) */}
              <div className="md:hidden flex items-center">
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                  {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
              </div>
            </div>

            {/* Mobile Menu Content */}
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="md:hidden absolute top-20 left-0 w-full bg-white shadow-lg py-4 text-center"
              >
                <div className="flex flex-col gap-4 text-violet-900 font-medium">
                  {['Our Services', 'Get started', 'About Parth', 'Our Team'].map((item) => (
                    <motion.button
                      key={item}
                      whileHover={{ x: 5 }}
                      className={`capitalize py-2 ${activeSection === item ? 'font-bold border-l-4 border-violet-600 pl-4' : ''}`}
                      onClick={() => scrollTo(item)}
                    >
                      {item}
                    </motion.button>
                  ))}
                </div>
                {/* Mobile Login/Logout */}
                <div className="mt-4 px-4">
                  {user ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      onClick={() => setUser(null)}
                      className="w-full flex items-center justify-center px-5 py-2 bg-red-500 rounded-full text-white font-medium shadow-sm"
                    >
                      <FiLogOut className="mr-2" /> Logout
                    </motion.button>
                  ) : (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        onClick={() => setIsLoginOpen(!isLoginOpen)}
                        className="w-full flex items-center justify-center px-5 py-2 bg-black rounded-full text-white font-medium shadow-sm"
                      >
                        <FiLogIn className="mr-2" /> Login
                      </motion.button>

                      {isLoginOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 bg-white rounded-md shadow-lg text-gray-800"
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
              </motion.div>
            )}
          </nav>

          {/* Hero Section */}
          <Tagline />

          {/* Services Section */}
          <section id="Our Services">
            <Services />
          </section>

          {/* Get Started */}
          <section id="Get started">
            <HowItStarts />
          </section>

          {/* PARTH*/}
          <section id="About Parth">
            <Parth />
          </section>

          {/* Team members section */}
          <section id="Our Team">
            <OurTeam />
          </section>

          {/*Marquee*/}
          <Marquee />

          {/*Footer */}
          <Footer />
        </div>
      </div>
    </>
  );
};

export default ParthPlacement;
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import {
  FiUser, FiLogIn, FiArrowDown
} from 'react-icons/fi';
import Footer from './Footer';
import Marquee from './Marquee';
import HowItStarts from './HowItStarts';
import Services from './Services';
import OurTeam from './OurTeam';
import Parth from './WhatisParth';

const ParthPlacement = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('hero');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'Services', label: 'Services' },
    { id: 'Features', label: 'Features' },
    { id: 'Why-Parth', label: 'About Parth' },
    { id: 'Our-Team', label: 'Our Team' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);

      // Bookmark-style section detection
      const scrollPosition = window.scrollY + 150;
      
      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = (role) => {
    setUser({ name: 'Demo User', role });
    setIsLoginOpen(false);
    
    // Navigate to the corresponding route based on role
    switch(role.toLowerCase()) {
      case 'student':
        navigate('/student');
        break;
      case 'recruiter':
        navigate('/recruiter');
        break;
      case 'admin':
        navigate('/admin');
        break;
      default:
        navigate('/');
    }
  };

  const scrollTo = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    }
  };

  return (
    <>
      <div className='w-full bg-cover bg-center'>
        {/* Bookmark Navigation Bar */}
        <motion.nav 
          className={`fixed top-0 z-50 w-full px-6 py-3 ${scrolled ? 'bg-white shadow-lg' : 'bg-white/90 backdrop-blur-sm'}`}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between gap-16">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => scrollTo('hero')}
            >
              <img src="/images/logo.png" alt="Logo" className='h-8 w-auto md:h-12 lg:h-16' />
              <motion.span 
                className="text-2xl font-sans text-violet-950 tracking-wide"
                whileHover={{ color: '#7c3aed' }}
              >
                PARTH
              </motion.span>
            </motion.div>

            <div className="hidden md:flex gap-2">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ 
                    y: -2,
                    color: '#7c3aed'
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative px-4 py-2 rounded-full ${activeSection === item.id ? 
                    'bg-violet-100 text-violet-700 font-semibold' : 
                    'text-violet-900 hover:bg-violet-50'}`}
                  onClick={() => scrollTo(item.id)}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.span 
                      className="absolute -bottom-1 left-1/2 w-4 h-1 bg-violet-600 rounded-full"
                      style={{ x: '-50%' }}
                      layoutId="navBookmark"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
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
                  <div className="h-8 w-8 rounded-full bg-violet-100 flex items-center justify-center text-violet-600">
                    <FiUser />
                  </div>
                  <span className="text-violet-900">Logout</span>
                </motion.div>
              ) : (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsLoginOpen(!isLoginOpen)}
                    className="flex items-center px-5 py-2 bg-violet-600 rounded-full text-white font-medium shadow-sm hover:bg-violet-700 transition-colors"
                  >
                    <FiLogIn className="mr-2" /> Login
                  </motion.button>

                  <AnimatePresence>
                    {isLoginOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg text-gray-800 z-50 overflow-hidden"
                      >
                        {['Student', 'Admin', 'Recruiter'].map((role) => (
                          <motion.button
                            key={role}
                            whileHover={{ 
                              x: 5,
                              backgroundColor: '#f3f4f6'
                            }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full text-left px-4 py-2 flex items-center transition-colors"
                            onClick={() => handleLogin(role.toLowerCase())}
                          >
                            <FiUser className="mr-2 text-violet-600" /> 
                            <span className="text-violet-900">{role}</span>
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </div>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <section
          id="hero"
          className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center bg-gradient-to-r from-indigo-50 via-violet-200 to-indigo-50"
        >
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-center px-4 sm:px-6 max-w-4xl mx-auto">
                <motion.span
                  className="
                    bg-gradient-to-b 
                    from-indigo-900 via-violet-600 to-blue-900
                    bg-clip-text text-transparent 
                    font-bold text-5xl sm:text-2xl md:text-4xl lg:text-7xl
                    leading-tight md:leading-snug
                    tracking-tight
                    drop-shadow-md
                    animate-gradient-shift
                    bg-[length:200%_200%]
                  "
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                >
                  PARTH, a solution for all your requirements.
                </motion.span>
              </h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <br />
                Verify Profiles | Build Resumes | Host Portfolios | Sort Candidates<br />
                and much more....
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap justify-center gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-black text-white text-xl rounded-sm shadow-lg hover:bg-violet-700 transition-colors"
                  onClick={() => navigate('/student')} // Default to student signup
                >
                  Get Started
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-white text-black text-xl rounded-sm shadow-lg border border-gray-300 hover:bg-gray-100 transition-colors"
                  onClick={() => scrollTo('Services')}
                >
                  Learn More
                </motion.button>
              </motion.div>

              <motion.div
                className="mt-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  onClick={() => scrollTo('Services')}
                  className="cursor-pointer"
                >
                  <FiArrowDown className="mx-auto text-3xl text-violet-600" />
                  <p className="mt-2 text-violet-700">Scroll to explore</p>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Other Sections */}
        <section id="Services">
        <Services />
        </section>
        <section id="Features">
        <HowItStarts  />
        </section>
        <section id="Why-Parth">
        <Parth  />
        </section>
        <section id="Our-Team">
        <OurTeam  />
        </section>
        <Marquee />
        <Footer />
      </div>
    </>
  );
};

export default ParthPlacement;
import React from 'react';
import { motion } from 'framer-motion';

const ProfessionalParth = () => {
  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
        </svg>
      ),
      title: "Verified Profiles",
      description: "Authenticated student and recruiter profiles"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      title: "Smart Resume Builder",
      description: "AI-powered resume optimization"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      title: "Digital Portfolios",
      description: "Showcase student work professionally"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      ),
      title: "Personalized Alerts",
      description: "Custom job recommendations"
    }
  ];

  // Enhanced letter animation with white text
  const letterAnimation = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.8
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }),
    hover: {
      y: -10,
      scale: 1.1,
      color: '#e2e8f0', // lighter white on hover
      transition: { 
        duration: 0.3,
        type: "spring",
        stiffness: 300
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-violet-600 opacity-95"></div>
        <div className="absolute inset-0 opacity-10 pattern-dots pattern-white pattern-size-4"></div>
        
        <div className="container mx-auto px-6 py-24 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-bold text-white mb-6"
              initial="hidden"
              animate="visible"
            >
              <span className="inline-flex">
                {['P', 'A', 'R', 'T', 'H'].map((letter, index) => (
                  <motion.span
                    key={index}
                    custom={index}
                    variants={letterAnimation}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    className="inline-block mx-2 cursor-default text-white"
                    style={{
                      textShadow: '0 4px 10px rgba(0,0,0,0.3)',
                      transformOrigin: 'bottom center'
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto"
            >
              The next-generation <span className="font-semibold text-white">campus placement ecosystem</span> inspired by Arjuna's precision
            </motion.p>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-16 -mt-16 relative z-20">
        {/* About Card */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl shadow-lg p-8 mb-16 border border-gray-100"
        >
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                <span className="bg-gradient-to-r from-indigo-500 to-violet-600 bg-clip-text text-transparent">
                  What is PARTH?
                </span>
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                PARTH is an <span className="font-semibold text-indigo-600">AI-powered placement platform</span> designed to revolutionize campus recruitment through innovative technology and data-driven insights.
              </p>
              
              <div className="bg-indigo-50 p-6 rounded-lg border-l-4 border-indigo-400 mb-6">
                <h3 className="text-xl font-semibold text-indigo-700 mb-3">P-Placement A-Assistant R-Recruitment T-Training H-Hiring</h3>
                <p className="text-gray-700">
                  Inspired by Arjuna's legendary focus from the Mahabharata, PARTH empowers students and recruiters with precision tools for career success.
                </p>
              </div>
            </div>

            <div className="md:w-1/2">
              <div className="bg-gradient-to-br from-indigo-50 to-violet-50 p-6 rounded-lg h-full border border-gray-100">
                <h3 className="text-2xl font-bold text-indigo-700 mb-6">Our Mission</h3>
                <blockquote className="text-lg italic text-gray-700 mb-6 border-l-4 border-indigo-300 pl-4 py-2">
                  "To transform campus placements through technology that benefits both students and recruiters with unprecedented efficiency."
                </blockquote>
                <div className="flex items-start gap-4">
                  <div className="bg-indigo-500 p-3 rounded-full flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <p className="text-gray-600">
                    Developed under the guidance of <span className="font-semibold text-indigo-600">Dr. Narinder Rana</span>, Director of MAIMT, PARTH represents our commitment to excellence in career development.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, staggerChildren: 0.1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all"
            >
              <div className="bg-indigo-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4 text-indigo-500">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonial */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-indigo-500 to-violet-600 rounded-xl shadow-lg p-8 md:p-10 text-white relative overflow-hidden"
        >
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-white rounded-full opacity-10"></div>
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-white rounded-full opacity-10"></div>
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/3 flex justify-center">
                <div className="bg-white/10 p-1 rounded-full">
                  <div className="bg-white/5 border border-white/10 p-1 rounded-full">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-white/10 to-white/20 border border-white/20 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:w-2/3">
                <h3 className="text-2xl font-bold mb-4">Director's Vision</h3>
                <blockquote className="text-xl italic mb-6">
                  "PARTH represents our commitment to excellence - combining cutting-edge technology with ancient wisdom principles to create a platform that transforms placement experiences with the precision of Arjuna's arrows."
                </blockquote>
                <div>
                  <p className="font-semibold">Dr. Narinder Rana</p>
                  <p className="text-indigo-100">Director, MAIMT</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default ProfessionalParth;
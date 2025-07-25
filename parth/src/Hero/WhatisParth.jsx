import React from 'react';
import { motion } from 'framer-motion';

const Parth = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-indigo-50 via-violet-200 to-indigo-50">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen flex flex-col justify-center container mx-auto bg-white shadow-lg overflow-hidden p-4 md:p-8 lg:p-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-b 
        from-indigo-900 via-violet-600 to-blue-900 bg-clip-text text-transparent">
          What is PARTH?
        </h2>

        <div className="relative flex-grow text-lg md:text-xl py-8 px-6 md:px-8 bg-white/80 backdrop-blur-sm rounded-lg">
          <div className="absolute inset-0 bg-[url('/images/maimt-logo.png')] bg-no-repeat bg-center opacity-10"></div>
          
          <motion.div 
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative h-full flex flex-col justify-center"
          >
            <div className='flex justify-center font-semibold text-xl mb-6 text-indigo-800'>
              <div className="text-center">
                <span className="block text-2xl font-bold mb-2">PARTH</span>
                <span className="block">Placement Assistant for</span>
                <span className="block">Recruitment Training & Hiring</span>
              </div>
            </div>
            
            <div className="space-y-4 text-gray-700">
              <p className="text-justify">
                The name PARTH draws inspiration from the legendary warrior Arjuna from the epic Mahabharat, known for his unwavering focus, resilience, and dedication to his karma.
              </p>
              
              <p className="text-justify">
                Just as Arjuna overcame adversity with determination and righteous action, every stakeholder in the MAIMT family is encouraged to embody the same spirit.
                Built to address every hassle in the placement lifecycle, PARTH empowers students and recruiters alike by providing:
              </p>
              
              <ul className="list-disc pl-6 space-y-2">
                <li>Verified profiles</li>
                <li>Smart resume building tools</li>
                <li>Hosted portfolios</li>
                <li>Personalized job alerts</li>
              </ul>
              
              <p className="text-justify">
                Under the esteemed guidance of Director Sir Dr. Narinder Rana, our team united not just as developers and designers, but with a shared mission: to reimagine how placement is managed across the academic landscape.
              </p>
              
              <p className="text-justify font-medium text-indigo-700">
                This project isn't just about technology—it's about purpose. It's about empowering the MAIMT community to approach recruitment and hiring with the clarity and focus of Arjuna through the support of a platform designed to make excellence achievable.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Parth;
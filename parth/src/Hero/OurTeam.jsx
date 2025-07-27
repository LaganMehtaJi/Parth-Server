import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const OurTeam = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  return (
    <div className="w-full bg-gradient-to-b from-indigo-50 to-violet-100 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Team Image Section */}
          <div className="relative rounded-xl overflow-hidden shadow-2xl mb-8 group">
            {/* Replace with your actual team image */}
            <img 
              src="/images/Team-Demo.png" 
              alt="PARTH Development Team"
              className="w-full h-auto object-cover aspect-video"
            />
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 to-violet-800/30"></div>
            
            {/* Optional team title */}
            <motion.div 
              className="absolute bottom-8 left-8"
              initial={{ y: 20, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-3xl md:text-4xl font-bold text-white">The PARTH Team</h3>
              <p className="text-violet-100 text-lg mt-1">Building the future of campus recruitment</p>
            </motion.div>
          </div>

          {/* Quote Section */}
          <motion.div
            className="bg-white/90 backdrop-blur-sm rounded-lg p-8 md:p-12 shadow-md relative overflow-hidden"
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
          >
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-indigo-200/20 blur-xl"></div>
            <div className="absolute -bottom-5 -left-5 w-20 h-20 rounded-full bg-violet-200/20 blur-xl"></div>
            
            {/* Quote content */}
            <div className="relative z-10">
              <svg 
                className="w-12 h-12 text-indigo-300 mb-4" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
              </svg>
              
              <blockquote className="text-2xl md:text-3xl font-medium text-gray-800 leading-relaxed">
                "Coming together is a beginning, staying together is progress, and working together is success. 
                Our team embodies the spirit of PARTH - focused, determined, and committed to transforming 
                campus recruitment just as Arjuna was unwavering in his purpose."
              </blockquote>
              
              <div className="mt-6">
                <p className="text-lg font-semibold text-indigo-900">Team Parth</p>
                <p className="text-violet-700"> MAIMT</p>
              </div>
            </div>
          </motion.div>

          {/* Optional team stats or highlights */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
          >
            {[
             
              { value: "1000+", label: "Students Impacted" },
              { value: "24/7", label: "Dedication" },
              { value: "1 Vision", label: "Transform Recruitment" }
            ].map((item, index) => (
              <div key={index} className="bg-white/80 p-4 rounded-lg text-center shadow-sm border border-gray-100">
                <p className="text-3xl font-bold text-indigo-900">{item.value}</p>
                <p className="text-gray-600 mt-1">{item.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default OurTeam;
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Parth = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: false
  });

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-50 to-violet-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeIn}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative bg-white/90 backdrop-blur-md rounded-xl shadow-lg overflow-hidden p-8 md:p-10">
            {/* Background watermark */}
            <div className="absolute inset-0 bg-[url('/images/maimt-logo.png')] bg-no-repeat bg-center opacity-5 pointer-events-none"></div>

            {/* Header */}
            <div className="text-center mb-10">
              <motion.h2 
                className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-b 
    from-indigo-900 via-violet-900 to-blue-900  bg-clip-text text-transparent"
                initial={{ opacity: 0, y: -20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <span className="bg-gradient-to-b from-indigo-900 via-violet-900 to-blue-900 bg-clip-text text-transparent">
    What is PARTH?
  </span>
              </motion.h2>
              
              
              {/* Acronym */}
              <div className="flex justify-center mb-10">
                <div className="text-center md:text-left space-y-2">
                  <motion.div 
                    className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-900 to-blue-800 bg-clip-text text-transparent"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.4, staggerChildren: 0.1 }}
                  >
                    <p className="leading-tight">P: Placement</p>
                    <p className="leading-tight">A: Assistant for</p>
                    <p className="leading-tight">R: Recruitment</p>
                    <p className="leading-tight">T: Training and</p>
                    <p className="leading-tight">H: Hiring</p>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="relative space-y-6 text-gray-800">
              <motion.p 
                className="text-lg leading-relaxed"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.6 }}
              >
                The name PARTH draws inspiration from the legendary warrior Arjuna from the epic Mahabharat, known for his unwavering focus, resilience, and dedication to his karma.
              </motion.p>

              <motion.p 
                className="text-lg leading-relaxed"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.7 }}
              >
                Just as Arjuna overcame adversity with determination and righteous action, every stakeholder in the MAIMT family is encouraged to embody the same spirit. Built to address every hassle in the placement lifecycle, PARTH empowers students and recruiters alike by providing:
              </motion.p>

              <motion.ul 
                className="list-disc pl-6 space-y-3 text-lg"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 }}
              >
                <li className="font-medium text-indigo-900">Verified profiles with academic validation</li>
                <li className="font-medium text-indigo-900">AI-powered resume building tools</li>
                <li className="font-medium text-indigo-900">Professional portfolio hosting</li>
                <li className="font-medium text-indigo-900">Personalized job matching and alerts</li>
                <li className="font-medium text-indigo-900">Streamlined recruitment process</li>
              </motion.ul>

              <motion.p 
                className="text-lg leading-relaxed"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.9 }}
              >
                Under the esteemed guidance of Director Sir Dr. Narinder Rana, our team united not just as developers and designers, but with a shared mission: to reimagine how placement is managed across the academic landscape.
              </motion.p>

              <motion.div 
                className="bg-indigo-50/50 border-l-4 border-violet-600 p-6 rounded-r-lg"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 1.0 }}
              >
                <p className="text-lg font-semibold text-violet-900 italic">
                  "This project isn't just about technology—it's about purpose. It's about empowering the MAIMT community to approach recruitment and hiring with the clarity and focus of Arjuna through the support of a platform designed to make excellence achievable."
                </p>
              </motion.div>
            </div>

            {/* Decorative elements */}
            <motion.div
              className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-violet-200/30 blur-xl"
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ delay: 1.2, duration: 1 }}
            />
            <motion.div
              className="absolute -top-10 -left-10 w-24 h-24 rounded-full bg-indigo-200/30 blur-xl"
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ delay: 1.4, duration: 1 }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Parth;
import React from 'react';
import { motion } from 'framer-motion';

const PARTH = 'PARTH';

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const bounceLetter = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      bounce: 0.8,
      duration: 0.6,
    },
  },
};

const Parth = () => {
  return (
    <div className="mx-auto px-4 py-12 bg-gradient-to-r from-indigo-50 via-violet-200 to-indigo-50">
      <div className="container mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center bg-gradient-to-b 
        from-indigo-900 via-violet-600 to-blue-900 bg-clip-text text-transparent">
          What is
        </h2>

        {/* Animated Bouncy Letters */}
        <motion.div
          className="flex justify-center gap-2 mt-4"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {PARTH.split('').map((char, i) => (
            <motion.span
              key={i}
              variants={bounceLetter}
              className="text-6xl font-extrabold text-indigo-700 inline-block"
            >
              {char}
            </motion.span>
          ))}
        </motion.div>
        <p>Blessed with an opportunity to work on live project that was meant to solve all the hassles revolving around the whole placement process PARTH stands for 
            P-Placement A-Assisstant for R-Recruitment T-Training H-Hiring. The word is inspired from Mahabharat's Arjuna who overcame all the turmoils and did his KARMA.
            Similar to him the members associated with MAIMT family are expected to work under the guidance of 

        </p>
      </div>
    </div>
  );
};

export default Parth;

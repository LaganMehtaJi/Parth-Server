import React from 'react';
import { motion } from 'framer-motion';

const PARTH = 'PARTH';


const Parth = () => {
  return (
    <div className="mx-auto px-4 py-12 bg-gradient-to-r from-indigo-50 via-violet-200 to-indigo-50">
      <div className="container mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center bg-gradient-to-b 
        from-indigo-900 via-violet-600 to-blue-900 bg-clip-text text-transparent">
          What is PARTH?
        </h2>


        <p className=" text-xl py-8 px-8 ">
          It stands for
          P-Placement A-Assisstant for R-Recruitment T-Training H-Hiring.<br/>
          The name PARTH draws inspiration from the legendary warrior Arjuna from the epic Mahabharat, known for his unwavering focus, resilience, and dedication to his karma.
          Just as Arjuna overcame adversity with determination and righteous action, every stakeholder in the MAIMT family is encouraged to embody the same spirit.
          Built to address every hassle in the placement lifecycle, PARTH empowers students and recruiters alike by providing:<br></br>

          -Verified profiles.<br></br>

          -Smart resume building tools.<br></br>

          -Hosted portfolios.<br></br>

          -Personalized job alerts.<br></br>
          Under the esteemed guidance of Director Sir Dr. Narinder Rana, our team united not just as developers and designers, but with a shared mission: to reimagine how placement is managed across the academic landscape.

          This project isn't just about technology—it's about purpose. It's about empowering the MAIMT community to approach recruitment and hiring with the clarity and focus of Arjuna through the support of a platform designed to make excellence achievable.
        </p>
      </div>
    </div>
  );
};

export default Parth;

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';



const letters = [
  "P:Placement",
   "A:Assistant for", 
   "R:Recruitment",
    "T:Training &",
     "H:Hiring"];
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.9, // Delay between each letter
    }
  }
}
const letterAnim = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}



const Parth = () => {
  const { ref, inView } = useInView({
    // triggerOnce: true, // animates only once
    threshold: 0.30,     // percentage of element visible to trigger
  });

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-indigo-50 via-violet-200 to-indigo-50">
      <motion.div
        ref={ref}
        initial={{ y: 50, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 1, ease: 'easeOut' }}

      >
        <div className="relative flex-grow text-lg md:text-xl py-8 px-6 md:px-8 bg-white/80 backdrop-blur-sm rounded-lg">

          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-b 
        from-indigo-900 via-violet-600 to-blue-900 bg-clip-text text-transparent">
            What is PARTH?
          </h2>


          <div className="absolute inset-0 bg-[url('/images/maimt-logo.png')] bg-no-repeat bg-center opacity-10"></div>


          <div className='flex justify-center font-semibold text-xl mb-6'>
            <div className="text-center">
              <motion.div
                className="flex justify-center mb-4 text-4xl font-bold bg-gradient-to-b 
    from-indigo-900 via-violet-600 to-blue-900 bg-clip-text text-transparent"
                variants={container}
                initial="hidden"
                animate={inView?"visible":"hidden"}
                
              >

                {letters.map((char, index) => (
                  <motion.span key={index} variants={letterAnim} className="mx-1">
                    {char}
                  </motion.span>
                ))}
              </motion.div>
              
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

        </div>
      </motion.div>
    </div>
  );
};

export default Parth;
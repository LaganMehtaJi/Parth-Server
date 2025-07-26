import React from 'react';
import { motion } from 'framer-motion';
import {useInView} from 'react-intersection-observer';


export default function OurTeam() {
  const { ref, inView } = useInView({
    // triggerOnce: true, // animates only once
    threshold: 0.30,     // percentage of element visible to trigger
  });
  
  return (

    <> 

        <div className=" px-4 py-12 bg-gradient-to-r from-indigo-50 via-violet-200 to-rose-10 ">
          <motion.div
                     ref={ref}
                     initial={{ y: 50, opacity: 0 }}
                     animate={inView ? { y: 0, opacity: 1 } : {}}
                     transition={{ duration: 1, ease: 'easeOut' }}
                     
                   >  
        <div className="relative flex-grow text-lg md:text-xl py-8 px-6 md:px-8 bg-white/80 backdrop-blur-sm rounded-lg">
        <div className="text-3xl md:text-4xl font-bold mb-4 text-center m-8  bg-gradient-to-b 
    from-indigo-900 via-violet-900 to-blue-900  bg-clip-text text-transparent">Our Team</div>
      <div className="w-50 h-1 bg-gradient-to-br from-cyan-100 via-violet-200 to-cyan-100 mx-auto mb-12  border-gray-400"></div>
      <img src="/images/aryan.png" alt="Front" className="rounded-xl" />
      
      </div>
      </motion.div>
      </div>
      </>
  )
     
  
}
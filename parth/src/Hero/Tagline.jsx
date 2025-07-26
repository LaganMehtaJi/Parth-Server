import React from 'react'
import { motion } from 'framer-motion';
import {useInView} from 'react-intersection-observer';

const Tagline = () => {
const { ref, inView } = useInView({
        // triggerOnce: true, // animates only once
        threshold: 0.30,     // percentage of element visible to trigger
      });
  return (
<>
    <div>
         <motion.div
              ref={ref}
              initial={{ y: 50, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, ease: 'easeOut' }}
          
            >                      
      <section
              id="hero"
              className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center bg-gradient-to-r from-indigo-50 via-violet-200 to-indig-50"
            >
              <div className="max-w-6xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >

           
                  <h1 className="text-center px-4 sm:px-6 max-w-4xl mx-auto">
                    <span className="
    bg-gradient-to-b 
    from-indigo-900 via-violet-600 to-blue-900
    bg-clip-text text-transparent 
    font-bold text-5xl sm:text-2xl md:text-4xl lg:text-7xl
    leading-tight md:leading-snug
    tracking-tight
    drop-shadow-md
    animate-gradient-shift
    bg-[length:200%_200%]
  ">
                      PARTH,a solution for all your requirements.

                    </span>
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10">
                    <br></br>
                    Verify Profiles | Build Resumes | Host Portfolios | Sort Candidates<br></br>
                    and much more....

                  </p>

                  <div className="flex flex-wrap justify-center gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-3 bg-black text-white text-xl rounded-sm shadow-lg"

                    >
                      Get Started
                    </motion.button>


                  </div>
                </motion.div>

               </div>
            </section>
    </motion.div>
   </div>
   </>
  )
}

export default Tagline
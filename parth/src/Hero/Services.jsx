import React from 'react'
import { motion } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import {useInView} from 'react-intersection-observer';
import {
  FiUser, FiFileText, FiDownload,
  FiEdit, FiMail, FiCheckCircle
} from 'react-icons/fi';

const services = [
  {
    id: 1,
    title: "Resume Builder",
    desc: "Design impactful, recruiter-ready resumes with customizable templates and guided suggestions tailored to your industry.",
   
  },
  {
    id: 2,
    title: "Portfolio Hosting",
    desc: "Host and showcase your work with a stunning, personalized portfolio page — perfect for developers, designers, and creatives.",
   
  },
   {
    id: 3,
    title: "Verify Profiles",
    desc: "Boost credibility with profile verification — enabling companies to identify authentic, high-quality candidates faster.",
 
  },
  {
    id: 4,
    title: "Job Alerts",
    desc: "Stay ahead with personalized job alerts sent directly to your inbox, matched to your skills and preferences.",
    
  }
];


const Services = () => {
   const { ref, inView } = useInView({
    // triggerOnce: true, // animates only once
    threshold: 0.30,     // percentage of element visible to trigger
  });
  return (
    <>
      <div className=" mx-auto px-4 py-12 bg-gradient-to-r from-indigo-50 via-violet-200 to-indig-50">
        <motion.div
      ref={ref}
      initial={{ y: 50, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 1, ease: 'easeOut' }}
      
    >                      
      <div className=" container mx-auto bg-white shadow-lg rounded-lg overflow-hidden">

      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center m-8  bg-gradient-to-b 
    from-indigo-900 via-violet-600 to-blue-900  bg-clip-text text-transparent">Our Services</h2>
      <div className="w-50 h-1 bg-gradient-to-br from-cyan-100 via-violet-200 to-cyan-100 mx-auto mb-12"></div>
      
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Left Column - Animation */}
        <div className="w-full md:w-1/2 flex justify-center -mt-35">
            <DotLottieReact
                src="https://lottie.host/b06a2ca9-a41f-4fe4-9ccc-789becde8e0f/gM3IdWQT9D.lottie"
                loop
                autoplay style={{ height: '800px', width: '1200px' }}/>
        </div>
        
        {/* Right Column - Steps */}
        <div className="w-full md:w-1/2 space-y-8">
          {services.map((item) => (
            <div 
              key={item.id} 
              className="group relative flex items-start gap-6 p-6 rounded-lg transition-all duration-300 hover:bg-white hover:shadow-lg cursor-pointer border border-gray-100"
            >
              {/* Step Number Circle */}
              <div
                className={`
                  z-10 flex-shrink-0
                  w-14 h-14 rounded-full
                  flex items-center justify-center
                  font-bold text-xl
                  bg-purple-100 
                  group-hover:bg-purple-900 group-hover:text-white
                  transition-all duration-300 ease-in-out
                  transform group-hover:scale-110
                  shadow-md group-hover:shadow-lg
                `}
              >
                {item.id}
              </div>
              
              {/* Step Content */}
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-purple-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 group-hover:text-gray-700 text-l">
                  {item.desc}
                </p>
              </div>
            </div>
            
          ))}
          
        </div>
        
      </div>
      
    </div>
    </motion.div> 
  </div>
    </>
  )
}




    



export default Services;

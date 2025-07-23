import React from 'react'

import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const steps = [
  {
    id: 1,
    title: 'Log In',
    description: 'Step into a personalized experience where your profile becomes your portfolio.',
  },
  {
    id: 2,
    title: 'Edit Your Profile',
    description: "Set the tone of your professional identity—update your skills, achievements, and story as you grow.",
  },
  {
    id: 3,
    title: 'Build a Resume',
    description: 'Use elegant, pre-designed templates to craft resumes that catch attention.',
  },
  {
    id: 4,
    title: 'Host Your Portfolio',
    description: 'Add credibility to your profile and stand out as an authentic candidate.'
  },
  {
    id:5,
    title:'You are ready to go!',
    description:'You are all set to use this platform.'
  }
];

const HowItStarts = () => {
  return (
    <div className=" mx-auto px-4 py-12 bg-gradient-to-r from-indigo-50 via-violet-200 to-rose-10">
      <div class="container mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center m-8">How it starts?</h2>
      <div className="w-50 h-1 bg-gradient-to-br from-cyan-100 via-violet-200 to-cyan-100 mx-auto mb-12  border-gray-400"></div>
      
      <div className="flex flex-col md:flex-row items-center gap-8 ">
        {/* Left Column - Steps */}
        <div className="w-full md:w-1/2 space-y-8">
          {steps.map((item) => (
            <div 
              key={item.id} 
              className="group relative flex items-start gap-6 p-4 rounded-lg transition-all duration-300 hover:bg-gray-50 hover:shadow-md cursor-pointer"
            >
              {/* Step Number Circle */}
              
              <div
                className={`
                  z-10 flex-shrink-0
                  w-12 h-12 rounded-full
                  flex items-center justify-center
                  font-bold text-lg
                  bg-purple-100 text-purple-900
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
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-purple-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-xl group-hover:text-gray-800">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Right Column - Image/Animation */}
        <div className="w-full md:w-1/2 flex justify-center">
       
           <DotLottieReact
      src="https://lottie.host/de2dbcf8-f33d-4b5c-acb8-ba8953aee356/wPuT3sblZw.lottie"
      loop
      autoplay style={{ height: '600px', width: '1000px' }}
    />
        </div>
      </div>
      </div>
    </div>
  )
}

export default HowItStarts
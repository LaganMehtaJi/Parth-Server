import React from 'react';
import { motion } from 'framer-motion';
const Team = [
  { id: 1, name: "JAGRITI GABA", image: "/images/aryan.png", role: "CEO & Founder" },
  { id: 2, name: "Lagan Mehta", image: "/images/aryan.png", role: "Marketing Director" },
  { id: 3, name: "PANKAJ", image: "/images/aryan.png", role: "Tech Lead" },
  { id: 4, name: "CHAHAT SHARMA", image: "/images/aryan.png", role: "Design Head" }
];

export default function OurTeam() {
  return (
    // <section className="w-full bg-gray-50">
    <motion.div 
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
      <h2 className="text-4xl font-bold py-16 text-center bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
        Our Team
      </h2>
      </motion.div>
      )
      {/* {/* <div className="snap-y snap-mandatory h-screen w-full overflow-y-scroll scroll-smooth">
        {Team.map(member => (
          <div 
            key={member.id} 
            className="snap-start h-screen w-full flex items-center justify-center bg-gray-50"
          >
            <div className="max-w-md w-full mx-auto">
              <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center space-y-4">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">{member.name}</h3>
                <p className="text-indigo-600 font-medium">{member.role}</p>
              </div>
            </div>
          </div>
        ))} */}
      {/* </div>
    </section> */}
  
}
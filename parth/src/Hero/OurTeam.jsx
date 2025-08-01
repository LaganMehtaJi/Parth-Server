import React from 'react';
import { motion } from 'framer-motion';

const Team = [
  { 
    id: 1, 
    name: "JAGRITI GABA", 
    image: "./Jagriti.jpg", 
    role: "UI Developer",
    contributions: [
      "Designed hero page using React",
      "Implemented key feature components",
      "Collaborated within agile teams",
      "Participated in design reviews"
    ]
  },
  { 
    id: 2, 
    name: "LAGAN MEHTA", 
    image: "./LaganMehta.png", 
    role: "Scrum Master & Team Lead",
    contributions: [
      "Managed 15 Agile sprints",
      "Architected major features",
      "Designed database structure",
      "Led team coordination"
    ]
  },
  { 
    id: 3, 
    name: "PANKAJ", 
    image: "./Pankaj.jpeg", 
    role: "Full Stack Developer",
    contributions: [
      "Developed database architecture",
      "Implemented backend logic",
      "Collaborated on frontend components",
      "Optimized performance"
    ]
  },
  { 
    id: 4, 
    name: "CHAHAT SHARMA", 
    image: "./Chahat_Hero.JPG", 
    role: "UI/UX Specialist",
    contributions: [
      "Created home/dashboard designs",
      "Implemented React frontend logic",
      "Designed interactive components",
      "Ensured responsive layouts"
    ]
  },
  // { 
  //   id: 5, 
  //   name: "MEHAK", 
  //   image: "/images/mehak.jpg", 
  //   role: "UI/UX Designer",
  //   contributions: [
  //     "Designed all Figma prototypes",
  //     "Created visual style guide",
  //     "Defined user flows",
  //     "Ensured design consistency"
  //   ]
  // }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const memberVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.17, 0.67, 0.83, 0.67]
    }
  },
  hover: {
    y: -5,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

export default function OurTeam() {
  return (
    <section className="w-full bg-gradient-to-br from-indigo-50 to-violet-50 py-20 px-4">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto"
      >
        <motion.div
          initial={{ y: -20 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold py-4 bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            The PARTH Development Team
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-4">
            MAIMT students revolutionizing campus placements through technology
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8"
        >
          {Team.map((member) => (
            <motion.div
              key={member.id}
              variants={memberVariants}
              whileHover="hover"
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all"
            >
              <div className="relative h-64">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center"
                >
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full  "
                    />
                  </div>
                </motion.div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-xl font-bold text-white">{member.name}</h3>
                  <p className="text-indigo-200">{member.role}</p>
                </div>
              </div>
              
              <div className="p-6">
                <h4 className="text-sm font-semibold text-indigo-600 mb-2">CONTRIBUTIONS</h4>
                <ul className="space-y-2">
                  {member.contributions.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-4 w-4 text-indigo-500 mt-1 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-indigo-100 to-violet-100 rounded-xl p-8 max-w-6xl mx-auto border border-indigo-200"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/3 flex justify-center">
              <img src="https://image-static.collegedunia.com/public/college_data/images/logos/1451364998maimtlogopng40.png" alt="notfound" />
            </div>
            <div className="md:w-2/3">
              <h3 className="text-2xl font-bold text-indigo-800 mb-4">Student Innovation at Its Best</h3>
              <p className="text-gray-700 mb-4">
                This talented team of MAIMT students has built PARTH from scratch, combining technical skills with creative problem-solving to transform campus placements.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">React</span>
                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">Agile</span>
                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">Database</span>
                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">UI/UX</span>
                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">Figma</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
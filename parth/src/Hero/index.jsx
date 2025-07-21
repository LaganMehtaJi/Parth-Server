import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiUser, FiBriefcase, FiFileText, FiDownload,
  FiLogIn, FiLogOut, FiEdit, FiHome, FiAward,
  FiMail, FiLayers, FiCheckCircle, FiArrowDown
} from 'react-icons/fi';

const ParthPlacement = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState(null);



  // Sample data
  const services = [
    { icon: <FiFileText />, title: "Resume Builder", desc: "Create professional resumes with our templates", color: "bg-blue-100", textColor: "text-blue-600" },
    { icon: <FiBriefcase />, title: "Job Portal", desc: "Apply to jobs from top companies", color: "bg-purple-100", textColor: "text-purple-600" },
    { icon: <FiUser />, title: "Portfolio Hosting", desc: "Showcase your projects beautifully", color: "bg-green-100", textColor: "text-green-600" },
  ];

  const features = [
    { icon: <FiEdit />, title: "Edit Profile", desc: "Update your personal information anytime" },
    { icon: <FiDownload />, title: "Download Resume", desc: "Multiple format options available" },
    { icon: <FiCheckCircle />, title: "Track Applications", desc: "Monitor your job application status" },
    { icon: <FiMail />, title: "Job Alerts", desc: "Get notified about new opportunities" },
  ];

  const handleLogin = (role) => {
    setUser({ name: 'Demo User', role });
    setIsLoginOpen(false);
  };

  const scrollTo = (section) => {
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(section);
  };

  return (
    <div className='justify-center'>
      {/* Gradient Navbar (Fixed) */}

      <div className="max-w-7xl mx-auto px-6 py-4 justify-center">
        <div className="flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => scrollTo('hero')}
          >
            <img src="/images/logo.png" alt="Logo" class='h-8 w-auto md:h-12 lg:h-16' />
            <span className="text-xl font-serif text-violet-950 ">PARTH</span>
          </motion.div>

          <div className="hidden md:flex space-x-8">
            {['services', 'features', 'templates', 'contact'].map((item) => (
              <motion.button
                key={item}
                whileHover={{ y: -2 }}
                className={`capitalize ${activeSection === item ? 'font-bold border-b-2 border-white' : ''}`}
                onClick={() => scrollTo(item)}
              >
                {item}
              </motion.button>
            ))}
          </div>

          <div className="relative">
            {user ? (
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => setUser(null)}
              >
                <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center text-blue-600">
                  <FiUser />
                </div>
                <span>Logout</span>
              </motion.div>
            ) : (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setIsLoginOpen(!isLoginOpen)}
                  className="flex items-center px-4 py-2 bg-black bg-opacity-20 rounded-lg text-white"
                >
                  Login
                </motion.button>

                {isLoginOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg text-gray-800"
                  >
                    {['Student', 'Admin', 'Recruiter'].map((role) => (
                      <motion.button
                        key={role}
                        whileHover={{ x: 5 }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                        onClick={() => handleLogin(role.toLowerCase())}
                      >
                        <FiUser className="mr-2" /> {role}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </>
            )}
          </div>
        </div>
      </div>


      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center bg-gradient-to-br from-cyan-100 via-violet-200 to-cyan-100"
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className=" bg-violet-950 bg-clip-text text-transparent font-bold text-[80px],center">
                PARTH
                a solution to all your requirements.
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
                className="px-8 py-3 bg-black text-white rounded-sm shadow-lg"
              // onClick={() => scrollTo('services')}
              >
                Get Started
              </motion.button>


            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-20"
          >
            <motion.button
              onClick={() => scrollTo('services')}
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="flex flex-col items-center text-gray-600"
            >
              <span>Scroll Down</span>
              <FiArrowDown className="mt-2 text-2xl" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className={`p-8 rounded-xl shadow-md hover:shadow-lg transition-all ${service.color}`}
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 ${service.textColor} text-2xl`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Features</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                <div className="text-blue-600 text-2xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resume Templates Section */}
      <section id="templates" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Resume Templates</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {['Professional', 'Creative', 'Minimalist'].map((template, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <div className={`h-48 ${index === 0 ? 'bg-blue-500' : index === 1 ? 'bg-purple-500' : 'bg-green-500'} flex items-center justify-center`}>
                  <FiFileText className="text-white text-5xl" />
                </div>
                <div className="p-6 bg-white">
                  <h3 className="text-xl font-bold mb-2">{template} Template</h3>
                  <div className="flex space-x-3 mt-4">
                    <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg">
                      Preview
                    </button>
                    <button className="flex-1 border border-blue-600 text-blue-600 py-2 rounded-lg flex items-center justify-center">
                      <FiDownload className="mr-2" /> Download
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      {[
        'images/company1.png',
        'images/company2.png',
        'images/company3.png',
        'images/company4.png'
      ].map((item)=>(
       <>WORK TO BE DONE </>
      ))

    }
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <FiBriefcase className="mr-2" /> Parth Placement
            </h3>
            <p className="text-gray-400">
              Your complete career solution platform for students and recruiters.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'Services', 'Features', 'Templates'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollTo(item.toLowerCase())}
                    className="text-gray-400 hover:text-white"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Help Center</li>
              <li>Contact Us</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Newsletter</h4>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-l-lg text-gray-800 flex-grow"
              />

            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Parth Placement. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ParthPlacement;
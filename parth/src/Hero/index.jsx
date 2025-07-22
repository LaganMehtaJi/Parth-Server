import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';


import {
  FiUser, FiBriefcase, FiFileText, FiDownload,
  FiLogIn, FiLogOut, FiEdit,
  FiMail, FiLayers, FiCheckCircle, FiArrowDown
} from 'react-icons/fi';
import Footer from './Footer';
import Marquee from './Marquee';
import HowItStarts from './HowItStarts';

const ParthPlacement = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState(null);

  


  // Sample data
  const services = [
    { icon: <FiFileText />, title: "Resume Builder", desc: "Create professional resumes with our templates", color: "bg-blue-100", textColor: "text-blue-400" },

    { icon: <FiUser />, title: "Portfolio Hosting", desc: "Showcase your projects beautifully", color: "bg-green-100", textColor: "text-green-600" },
    { icon: <FiEdit />, title: "Edit Profile", desc: "Update profile information as you grow" },
    { icon: <FiDownload />, title: "Download Resumes", desc: "Multiple format options available" },
    { icon: <FiCheckCircle />, title: "Verify Profiles", desc: "List authentic candidates " },
    { icon: <FiMail />, title: "Job Alerts", desc: "Get notified about new opportunities" }
  ];

  const features = [
    { icon: <FiEdit />, title: "Edit Profile", desc: "Update profile information as you grow" },
    { icon: <FiDownload />, title: "Download Resumes", desc: "Multiple format options available" },
    { icon: <FiCheckCircle />, title: "Verify Profiles", desc: "List authentic candidates " },
    { icon: <FiMail />, title: "Job Alerts", desc: "Get notified about new opportunities" },
  ];

  const Team = [
    {
      name: "Aryan",
      desc: "Acharya Pankaj orchestrated success in their webinar funnel growth with Adymize's magic touch",
      image: "images/aryan.png",
      badge: "30% MORE UPSALES & 50% MORE PROFIT"
    },
    {
      name: "Ananya Sharma",
      desc: "Adymize helped scale my personal brand with optimized content funnels.",
      image: "images/aryan.png",
      badge: "BRAND GROWTH 2X"
    },
    {
      name: "Dr. Rajat Mehra",
      desc: "Our online appointments increased by 3x after partnering with Adymize.",
      image: "images/aryan.png",
      badge: "3X ONLINE BOOKINGS"
    }
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
    <>
      <div className='w-full h-screen'>
        <div className='px-6'>
          <div className='justify-center'>
            {/* Gradient Navbar (Fixed) */}

            <nav className='sticky top-0 z-50 bg-white shadow-lg px-6 py-3 h-20 mt-4 w-full'>

              <div className="max-w-7xl mx-auto px-10 h-full flex items-center justify-between gap-16">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-2 cursor-pointer"
                  onClick={() => scrollTo('hero')}
                >
                  <img src="/images/logo.png" alt="Logo" className='h-8 w-auto md:h-12 lg:h-16' />
                  <span className="text-2xl font-sans text-violet-950 tracking-wide ">PARTH</span>
                </motion.div>

                <div className="hidden md:flex gap-8 text-violet-900 font-medium">
                  {['Services', 'Features', 'Why Parth?', 'Our Team'].map((item) => (
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
                        className="flex items-center px-5 py-2 bg-black rounded-full text-white font-medium shadow-sm"
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
            </nav>


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

                  {/*Tag line*/}
                  <h1 className="text-center px-4 sm:px-6 max-w-4xl mx-auto">
                    <span className="
    bg-gradient-to-r 
    from-indigo-700 via-violet-500 to-purple-600
    bg-clip-text text-transparent 
    font-bold font-sans
    text-5xl sm:text-6xl md:text-7xl lg:text-8xl
    leading-tight md:leading-snug
    tracking-tight
    drop-shadow-md
    animate-gradient-shift
    bg-[length:200%_200%]
  ">
                      PARTH,a solution for all your requirements<span className="hidden sm:inline"> — </span><br className="sm:hidden" />

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
                  <div className="w-50 h-1  bg-gradient-to-br from-cyan-100 via-violet-200 to-cyan-100 mx-auto"></div>
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
            {/*How it start? */}
             <HowItStarts/>
            

            {/* Team members section */}
            <section className="py-12">
              {/* Centered Heading Section */}
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Team</h2>
                <div className="w-50 h-1 bg-gradient-to-br from-cyan-100 via-violet-200 to-cyan-100 mx-auto"></div>


                {/* Swiper Container */}
                <div className="w-full py-10 bg-gray-50">
                  <Swiper
                    modules={[Pagination, Autoplay]}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 5000 }}
                    loop={true}
                    spaceBetween={30}
                    slidesPerView={1}
                    className="max-w-6xl mx-auto"
                  >
                    {Team.map((item, i) => (
                      <SwiperSlide key={i}>
                        <div className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-2xl overflow-hidden p-6 md:p-10">
                          {/* Left Image */}
                          <div className="w-full md:w-1/2 mb-6 md:mb-0 flex justify-center">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="max-h-[300px] object-contain"
                            />
                          </div>

                          {/* Right Text */}
                          <div className="w-full md:w-1/2 text-center md:text-left">
                            <div className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded mb-4 uppercase tracking-wider">
                              {item.badge}
                            </div>
                            <p className="text-2xl font-semibold text-gray-900 mb-3">{item.desc}</p>
                            <p className="text-gray-700 font-medium">{item.name}</p>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </section>
            {/*Marquee*/}
            <Marquee/>

            
            {/*Footer */}

            <Footer/>
          </div>
        </div>
      </div>
    </>
  );
};

export default ParthPlacement;
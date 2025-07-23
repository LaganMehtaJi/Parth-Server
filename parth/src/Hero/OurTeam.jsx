import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
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


const OurTeam = () => {
    return (
           <div class="container mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <section >
                {/* Centered Heading Section */}
                
                    {/* Swiper Container */}
                    <div className=" bg-gradient-to-r from-indigo-50 via-violet-200 to-indigo-50">
                       <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Our Team</h2>
                    <div className="w-50 h-1 bg-gradient-to-br from-cyan-100 via-violet-200 to-cyan-100 mx-auto"></div>
                    
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
                
            </section>
        </div>
    )
}

export default OurTeam

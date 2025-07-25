import React from 'react'
const images1 = [
    'images/company1.png',
    'images/company2.png',
    'images/company3.png',
    'images/company4.png',
    'images/company5.png',
    'images/company6.png',
    'images/company7.png',
    'images/company8.png',
    'images/company9.png',
    'images/company10.png',
  ]
  const images2 = [
    'images/company11.png',
    'images/company12.png',
    'images/company13.png',
    'images/company14.png',
    'images/company15.png',
    'images/company16.png',
    'images/company17.png',
    'images/company18.png',
    'images/company19.png',
    'images/company20.png',
  ]



const Marquee = () => {
  return (
    <>
    <div className="space-y-8 py-8 ">
              {/* First Marquee - Top Section */}
              <div className="relative overflow-hidden w-full group">
                <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10" />
                <div className="animate-marquee flex gap-8 items-center w-full">
                  {Array(1).fill(images1).flat().map((item, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 h-32 w-32 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                      <img
                        src={item}
                        alt="Marquee item"
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
                <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10" />
              </div>

              {/* Second Marquee - Top Section */}
              <div className="relative overflow-hidden w-full group">
                <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10" />
                <div className="animate-marquee-reverse flex gap-8 items-center w-full">
                  {Array(8).fill(images2).flat().map((item, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 h-32 w-32 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                      <img
                        src={item}
                        alt="Marquee item"
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
                <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10" />
              </div>

            </div>

    </>
  )
}

export default Marquee
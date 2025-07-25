import React from 'react'
import { FiLinkedin, FiInstagram, FiTwitter } from 'react-icons/fi';

const Footer = () => {
  return (
    <>
    {/* Footer */}
            <footer className="bg-gradient-to-b from-violet-50 to-white py-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Logo and Social Section */}
                <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
                  {/* Branding */}
                  <div className="flex items-center space-x-4">
                    <img
                      src="/images/logo.png"
                      alt="Parth Placement"
                      className="h-12 md:h-16 transition-transform hover:scale-105 duration-300"
                    />
                    <span className="text-2xl md:text-3xl font-sans font-bold tracking-wide">
                      PARTH
                    </span>
                  </div>

                  {/* Social Links */}
                  <div className="flex space-x-6">
                    <a
                      href="https://linkedin.com"
                      aria-label="LinkedIn"
                      className="text-gray-600 hover:text-violet-900 transition-colors duration-300"
                    >
                      <FiLinkedin size={28} />
                    </a>
                    <a
                      href="https://instagram.com"
                      aria-label="Instagram"
                      className="text-gray-600 hover:text-violet-900 transition-colors duration-300"
                    >
                      <FiInstagram size={28} />
                    </a>
                    <a
                      href="https://twitter.com"
                      aria-label="Twitter"
                      className="text-gray-600 hover:text-violet-900 transition-colors duration-300"
                    >
                      <FiTwitter size={28} />
                    </a>
                  </div>
                </div>

                {/* Divider */}
                <div className="my-8 border-t border-violet-200"></div>

                {/* Copyright and Links */}
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                  <p className="text-sm text-gray-700">
                    © {new Date().getFullYear()} Parth Placement. All rights reserved.
                  </p>
                  <div className="flex space-x-6">
                    <a
                      href="/privacy-policy"
                      className="text-sm text-gray-600 hover:text-violet-900 transition-colors duration-300"
                    >
                      Privacy Policy
                    </a>
                    <a
                      href="/terms"
                      className="text-sm text-gray-600 hover:text-violet-900 transition-colors duration-300"
                    >
                      Terms of Service
                    </a>
                    <a
                      href="/contact"
                      className="text-sm text-gray-600 hover:text-violet-900 transition-colors duration-300"
                    >
                      Contact Us
                    </a>
                  </div>
                </div>
              </div>
            </footer>
    </>
  )
}

export default Footer
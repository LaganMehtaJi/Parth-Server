import React from 'react'
import { motion } from "framer-motion";


export default function Docs() {
  return (
    <div>
      {/* Documentation Section */}
<motion.section
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
  className="bg-white rounded-xl shadow-lg p-8 mb-16 border border-gray-100"
>
  <div className="flex flex-col md:flex-row gap-8">
    {/* Left side - Documentation Info */}
    <div className="md:w-2/3">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        <span className="bg-gradient-to-r from-indigo-500 to-violet-600 bg-clip-text text-transparent">
          Project Documentation
        </span>
      </h2>
      <p className="text-gray-600 mb-6 leading-relaxed">
        This section contains the complete documentation for the PARTH platform, 
        including setup instructions, architecture overview, and contribution guidelines.
      </p>

      <div className="bg-indigo-50 p-6 rounded-lg border-l-4 border-indigo-400 mb-6">
        <h3 className="text-xl font-semibold text-indigo-700 mb-3">Features Covered</h3>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Installation and environment setup</li>
          <li>Project architecture and folder structure</li>
          <li>API documentation and integration steps</li>
          <li>Student can directly Contribute to this</li>
          <li>Guidelines for contributing to the repository</li>
        </ul>
      </div>

      {/* GitHub Link */}
      <a
        href="https://github.com/LaganMehtaJi/Parth-Server"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-violet-600 text-white px-5 py-3 rounded-lg shadow hover:shadow-lg transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.263.82-.583 0-.288-.01-1.05-.015-2.06-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.084 1.84 1.238 1.84 1.238 1.07 1.835 2.807 1.305 3.492.997.107-.775.418-1.305.762-1.605-2.665-.304-5.466-1.335-5.466-5.932 0-1.31.467-2.382 1.236-3.222-.124-.304-.536-1.527.116-3.183 0 0 1.008-.323 3.3 1.23a11.5 11.5 0 013.003-.404c1.018.005 2.043.138 3.003.404 2.29-1.553 3.297-1.23 3.297-1.23.654 1.656.242 2.879.118 3.183.77.84 1.236 1.912 1.236 3.222 0 4.61-2.804 5.625-5.475 5.922.43.37.823 1.102.823 2.222 0 1.605-.014 2.898-.014 3.293 0 .322.217.7.825.58C20.565 22.296 24 17.796 24 12.5 24 5.87 18.63.5 12 .5z" />
        </svg>
        View on GitHub
      </a>
    </div>

    {/* Right side - Illustration / Icon */}
    <div className="md:w-1/3 flex justify-center items-center">
      <div className="bg-gradient-to-br from-indigo-50 to-violet-50 p-6 rounded-lg border border-gray-100">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 20h9" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 20h0a2 2 0 01-2-2V6a2 2 0 012-2h0m12 0h0a2 2 0 012 2v6m-4 0H8m0 0v6m0-6h8" />
        </svg>
      </div>
    </div>
  </div>
</motion.section>

    </div>
  )
}

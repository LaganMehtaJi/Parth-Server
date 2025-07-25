import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white border-t shadow-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        
        
        <div className="text-gray-700 font-semibold text-center md:text-left">
          © {new Date().getFullYear()} PARTH — All rights reserved
        </div>


        <div className="flex gap-4 text-sm text-gray-600">
          <a href="#" className="hover:text-black transition">Privacy Policy</a>
          <a href="#" className="hover:text-black transition">Terms of Service</a>
          <a href="#" className="hover:text-black transition">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

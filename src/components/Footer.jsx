import React from "react";
import { FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className=" text-gray-100 shadow-2xl py-6 mt-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Section 1: Logo and Description */}
          <div>
            <h2 className="text-xl font-bold">QuantumByte &trade;</h2>
            <p className="text-gray-300 mt-2 text-sm">
              Explore insightful articles and stay updated with the latest trends.
            </p>
          </div>

          {/* Section 2: Shortcut Links */}
         
          {/* Section 3: Social Media Links */}
          <div>
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="flex space-x-4 mt-3">
              <a href="https://www.facebook.com/share/1AqY8TSRA1/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-white transition">
                <FaFacebook size={24} />
              </a>
              <a href="https://www.linkedin.com/in/yasir-hamid-3a961925b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="text-blue-800 hover:text-white transition">
                <FaLinkedin size={24} />
              </a>
              <a href="https://github.com/Yasirahm" target="_blank" rel="noopener noreferrer" className="text-black hover:text-white transition">
                <FaGithub size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t border-gray-700 mt-6 pt-4 text-center text-gray-100 text-sm">
          © {new Date().getFullYear()} QuantumByte. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

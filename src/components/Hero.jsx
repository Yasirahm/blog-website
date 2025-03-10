import React from 'react'
import { Link } from "react-router-dom";
import { FaAtom, FaBars, FaTimes } from "react-icons/fa";


const Hero = () => {
  return (
    <div>
         <section className="flex flex-col md:flex-row items-center justify-between px-6 py-16 max-w-7xl mx-auto">
        {/* Left Content */}
        <div className="md:w-1/2">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Welcome to <span className="text-blue-400">QuantumByte</span>
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            We specialize in Web Development, UI/UX Design, and Tech Solutions.
            Elevate your online presence with our modern and powerful solutions.
          </p>
          <a
            href="https://www.linkedin.com/in/yasir-hamid-3a961925b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg text-lg transition">
              Get Started
            </button>
          </a>
        </div>

        {/* Right: Physics/Blog Logo */}
        <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
          <FaAtom className="text-blue-400 w-40 h-40 md:w-56 md:h-56" />
        </div>
      </section>
    </div>
  )
}

export default Hero
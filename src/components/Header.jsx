import React, { useState } from "react";
import { FaAtom, FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Function to scroll smoothly to a section
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false); // Close menu on mobile after clicking a link
    }
  };

  return (
    <header className="relative w-full bg-gray-900 text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="text-2xl font-extrabold tracking-wide text-blue-400">
          QuantumByte
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-lg">
          <li>
            <button onClick={() => scrollToSection("home")} className="hover:text-blue-400 transition">
              Home
            </button>
          </li>
          <li>
            <button onClick={() => scrollToSection("productlist")} className="hover:text-blue-400 transition">
              Blogs
            </button>
          </li>
          <li>
            <button onClick={() => scrollToSection("contact")} className="hover:text-blue-400 transition">
              Contact
            </button>
          </li>
        </ul>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-gray-800 text-center py-4">
          <ul className="space-y-4 text-lg">
            <li>
              <button onClick={() => scrollToSection("home")} className="block w-full">
                Home
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection("productlist")} className="block w-full">
                Blogs
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection("contact")} className="block w-full">
                Contact
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;

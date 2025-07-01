import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'; // Use NavLink for active styling
import { Camera, Search, Utensils, Info, Smile, Menu, X } from 'lucide-react'; // Import Menu and X icons

const Header = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage mobile menu open/close

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-white shadow-md py-4">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center relative">
        {/* Logo/Brand Name */}
        <NavLink to="/" className="flex items-center space-x-3">
          {/* Using a placeholder image for reliability. You can replace with your actual logo. */}
          <img src="https://placehold.co/32x32/00BFFF/FFFFFF?text=AI" alt="FoodSnap AI Logo" className="h-8 w-8 rounded-full" />
          <span className="text-2xl font-bold text-gray-900">FoodSnap AI</span>
        </NavLink>

        {/* Mobile Menu Button (visible on small screens, hidden on medium and up) */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500"
            aria-controls="mobile-menu"
            aria-expanded={isOpen ? "true" : "false"}
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? (
              <X className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Desktop Navigation Links (hidden on small screens, visible on medium and up) */}
        <ul className="hidden md:flex items-center space-x-6">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-gray-600 hover:text-emerald-600 transition-colors duration-200 font-medium ${
                  isActive ? 'text-emerald-600 border-b-2 border-emerald-600 pb-1' : ''
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/analyze-food" // Corrected: Removed comment from inside the string
              className={({ isActive }) =>
                `text-gray-600 hover:text-emerald-600 transition-colors duration-200 font-medium flex items-center ${
                  isActive ? 'text-emerald-600 border-b-2 border-emerald-600 pb-1' : ''
                }`
              }
            >
              <Camera className="h-4 w-4 mr-1" /> Analyze Food
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/food-search" // Corrected: Removed comment from inside the string
              className={({ isActive }) =>
                `text-gray-600 hover:text-emerald-600 transition-colors duration-200 font-medium flex items-center ${
                  isActive ? 'text-emerald-600 border-b-2 border-emerald-600 pb-1' : ''
                }`
              }
            >
              <Search className="h-4 w-4 mr-1" /> Search Food
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/diet-plan"
              className={({ isActive }) =>
                `text-gray-600 hover:text-emerald-600 transition-colors duration-200 font-medium flex items-center ${
                  isActive ? 'text-emerald-600 border-b-2 border-emerald-600 pb-1' : ''
                }`
              }
            >
              <Utensils className="h-4 w-4 mr-1" /> Diet Plan
            </NavLink>
          </li>
          {/* Health Check Link */}
          <li>
            <NavLink
              to="/health-check"
              className={({ isActive }) =>
                `text-gray-600 hover:text-emerald-600 transition-colors duration-200 font-medium flex items-center ${
                  isActive ? 'text-emerald-600 border-b-2 border-emerald-600 pb-1' : ''
                }`
              }
            >
              <Smile className="h-4 w-4 mr-1" /> Health Check
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-gray-600 hover:text-emerald-600 transition-colors duration-200 font-medium flex items-center ${
                  isActive ? 'text-emerald-600 border-b-2 border-emerald-600 pb-1' : ''
                }`
              }
            >
              <Info className="h-4 w-4 mr-1" /> About
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Mobile Menu Panel (toggles visibility based on isOpen state) */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)} // Close menu on click
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-emerald-600 transition-colors duration-200 ${
                isActive ? 'bg-gray-100 text-emerald-600' : ''
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/analyze-food"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-emerald-600 transition-colors duration-200 flex items-center ${
                isActive ? 'bg-gray-100 text-emerald-600' : ''
              }`
            }
          >
            <Camera className="h-4 w-4 mr-2" /> Analyze Food
          </NavLink>
          <NavLink
            to="/food-search"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-emerald-600 transition-colors duration-200 flex items-center ${
                isActive ? 'bg-gray-100 text-emerald-600' : ''
              }`
            }
          >
            <Search className="h-4 w-4 mr-2" /> Search Food
          </NavLink>
          <NavLink
            to="/diet-plan"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-emerald-600 transition-colors duration-200 flex items-center ${
                isActive ? 'bg-gray-100 text-emerald-600' : ''
              }`
            }
          >
            <Utensils className="h-4 w-4 mr-2" /> Diet Plan
          </NavLink>
          <NavLink
            to="/health-check"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-emerald-600 transition-colors duration-200 flex items-center ${
                isActive ? 'bg-gray-100 text-emerald-600' : ''
              }`
            }
          >
            <Smile className="h-4 w-4 mr-2" /> Health Check
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-emerald-600 transition-colors duration-200 flex items-center ${
                isActive ? 'bg-gray-100 text-emerald-600' : ''
              }`
            }
          >
            <Info className="h-4 w-4 mr-2" /> About
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;

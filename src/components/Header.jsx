import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Camera, Search, Utensils, Info, Smile, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md py-4">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 flex-shrink-0"> {/* Added flex-shrink-0 */}
          <img src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&fit=crop" alt="FoodSnap AI Logo" className="h-8 w-8 rounded-full" />
          <span className="text-xl sm:text-2xl font-bold text-gray-900 whitespace-nowrap">FoodSnap AI</span> {/* Adjusted font size for smaller screens */}
        </Link>

        {/* Mobile Menu Button (Hamburger) */}
        <div className="md:hidden ml-auto"> {/* md:hidden ensures it appears on mobile. ml-auto pushes it to the right */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-600 hover:text-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-md"
            aria-label="Toggle navigation"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center space-x-4 lg:space-x-6"> {/* Adjusted space-x, added lg:space-x */}
          <li>
            <Link to="/" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 font-medium whitespace-nowrap">Home</Link>
          </li>
          <li>
            <Link to="/analyze" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 font-medium flex items-center whitespace-nowrap">
              <Camera className="h-4 w-4 mr-1" /> Analyze Food
            </Link>
          </li>
          <li>
            <Link to="/search" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 font-medium flex items-center whitespace-nowrap">
              <Search className="h-4 w-4 mr-1" /> Search Food
            </Link>
          </li>
          <li>
            <Link to="/diet-plan" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 font-medium flex items-center whitespace-nowrap">
              <Utensils className="h-4 w-4 mr-1" /> Diet Plan
            </Link>
          </li>
          <li>
            <Link to="/health-check" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 font-medium flex items-center whitespace-nowrap">
              <Smile className="h-4 w-4 mr-1" /> Health Check
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 font-medium flex items-center whitespace-nowrap">
              <Info className="h-4 w-4 mr-1" /> About
            </Link>
          </li>
        </ul>
      </nav>

      {/* Mobile Menu (Conditional Rendering) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg py-4 border-t border-gray-200"> {/* Added border-t for visual separation */}
          <ul className="flex flex-col items-center space-y-4">
            <li>
              <Link to="/" className="text-gray-700 hover:text-emerald-600 transition-colors duration-200 font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/analyze" className="text-gray-700 hover:text-emerald-600 transition-colors duration-200 font-medium flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
                <Camera className="h-4 w-4 mr-1" /> Analyze Food
              </Link>
            </li>
            <li>
              <Link to="/search" className="text-gray-700 hover:text-emerald-600 transition-colors duration-200 font-medium flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
                <Search className="h-4 w-4 mr-1" /> Search Food
              </Link>
            </li>
            <li>
              <Link to="/diet-plan" className="text-gray-700 hover:text-emerald-600 transition-colors duration-200 font-medium flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
                <Utensils className="h-4 w-4 mr-1" /> Diet Plan
              </Link>
            </li>
            <li>
              <Link to="/health-check" className="text-gray-700 hover:text-emerald-600 transition-colors duration-200 font-medium flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
                <Smile className="h-4 w-4 mr-1" /> Health Check
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-700 hover:text-emerald-600 transition-colors duration-200 font-medium flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
                <Info className="h-4 w-4 mr-1" /> About
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
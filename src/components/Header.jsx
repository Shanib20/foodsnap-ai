// src/components/Header.jsx (Example - modify your actual file)

import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Search, Utensils, Info, Smile } from 'lucide-react'; // Import Smile icon

const Header = () => {
  return (
    <header className="bg-white shadow-md py-4">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3">
          <img src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&fit=crop" alt="FoodSnap AI Logo" className="h-8 w-8 rounded-full" />
          <span className="text-2xl font-bold text-gray-900">FoodSnap AI</span>
        </Link>

        <ul className="flex items-center space-x-6">
          <li>
            <Link to="/" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 font-medium">
              Home
            </Link>
          </li>
          <li>
            <Link to="/analyze" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 font-medium flex items-center">
              <Camera className="h-4 w-4 mr-1" /> Analyze Food
            </Link>
          </li>
          <li>
            <Link to="/search" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 font-medium flex items-center">
              <Search className="h-4 w-4 mr-1" /> Search Food
            </Link>
          </li>
          <li>
            <Link to="/diet-plan" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 font-medium flex items-center">
              <Utensils className="h-4 w-4 mr-1" /> Diet Plan
            </Link>
          </li>
          {/* NEW: Health Check Link */}
          <li>
            <Link to="/health-check" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 font-medium flex items-center">
              <Smile className="h-4 w-4 mr-1" /> Health Check
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 font-medium flex items-center">
              <Info className="h-4 w-4 mr-1" /> About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

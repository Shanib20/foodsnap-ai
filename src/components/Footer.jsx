import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Heart, Shield, Zap } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-br from-emerald-500 to-blue-600 p-2 rounded-xl">
                <Camera className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">FoodSnap AI</h3>
                <p className="text-sm text-gray-400">Smart Nutrition Tracking</p>
              </div>
            </div>
            
            <p className="text-gray-400 mb-4 max-w-md">
              Revolutionizing nutrition tracking with AI-powered food analysis. 
              Make healthier choices with instant nutritional insights from your food photos.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Heart className="h-4 w-4 text-red-400" />
                <span>Made with care</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-400 hover:text-emerald-400 transition-colors">
                Home
              </Link>
              <Link to="/analyze" className="block text-gray-400 hover:text-emerald-400 transition-colors">
                Analyze Food
              </Link>
              <Link to="/search" className="block text-gray-400 hover:text-emerald-400 transition-colors">
                Search Foods
              </Link>
              <Link to="/diet-plan" className="block text-gray-400 hover:text-emerald-400 transition-colors">
                Diet Plans
              </Link>
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-semibold mb-4">Features</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-yellow-400" />
                <span className="text-sm text-gray-400">Instant Analysis</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-green-400" />
                <span className="text-sm text-gray-400">Privacy First</span>
              </div>
              <div className="flex items-center space-x-2">
                <Camera className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-gray-400">AI Powered</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 FoodSnap AI. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">
              Terms of Service
            </a>
            <Link to="/about" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">
              About
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
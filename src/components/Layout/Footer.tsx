import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 shadow-md mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <Shield className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <span className="text-lg font-bold text-gray-900 dark:text-white">Passcore</span>
          </div>
          
          <div className="flex space-x-6 text-sm text-gray-600 dark:text-gray-400">
            <Link to="/terms" className="hover:text-indigo-600 dark:hover:text-indigo-400">
              Terms of Service
            </Link>
            <Link to="/privacy" className="hover:text-indigo-600 dark:hover:text-indigo-400">
              Privacy Policy
            </Link>
            <Link to="/contact" className="hover:text-indigo-600 dark:hover:text-indigo-400">
              Contact
            </Link>
          </div>
          
          <div className="text-sm text-gray-500 dark:text-gray-400">
            © {currentYear} Passcore. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, User, LogOut, Settings, X } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../ui/Button';

export const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  const navLinkClass = (path: string) => `
    px-3 py-2 rounded-md text-sm font-medium transition-colors
    ${isActivePath(path)
      ? 'bg-indigo-700 text-white'
      : 'text-indigo-100 hover:bg-indigo-500 hover:text-white'
    }
  `;

  return (
    <header className="bg-indigo-600">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-white" />
              <span className="text-xl font-bold text-white">Passcore</span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1 ml-8">
              <Link to="/about" className={navLinkClass('/about')}>About</Link>
              <Link to="/pricing" className={navLinkClass('/pricing')}>Pricing</Link>
              <Link to="/support" className={navLinkClass('/support')}>Support</Link>
              {isAuthenticated && (
                <Link to="/dashboard" className={navLinkClass('/dashboard')}>Dashboard</Link>
              )}
            </nav>
          </div>
          
          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-white hover:text-indigo-100 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <User className="h-5 w-5" />
                  <span>{user?.email}</span>
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu">
                      <Link
                        to="/settings"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="text-white hover:text-indigo-100">
                    Sign in
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="text-indigo-600 hover:bg-indigo-50 border border-transparent hover:border-white">
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-indigo-100 hover:bg-indigo-500 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-2 pb-3 pt-2 border-t border-indigo-500">
            <div className="flex flex-col space-y-1">
              <Link 
                to="/about" 
                className={navLinkClass('/about')}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/pricing" 
                className={navLinkClass('/pricing')}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link 
                to="/support" 
                className={navLinkClass('/support')}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Support
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className={navLinkClass('/dashboard')}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/settings" 
                    className={navLinkClass('/settings')}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center text-left text-indigo-100 hover:bg-indigo-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className={navLinkClass('/login')}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign in
                  </Link>
                  <Link 
                    to="/register" 
                    className={navLinkClass('/register')}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
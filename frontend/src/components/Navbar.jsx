import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl">📰</span>
            <span className="font-bold text-xl">HN Stories</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="bg-white text-hn-orange px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors font-medium">
              Home
            </Link>
            {user && (
              <Link to="/bookmarks" className=" bg-white text-hn-orange px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors font-medium">
                Bookmarks
              </Link>
            )}
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm">👋 {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-white text-hn-orange px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors font-medium cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="bg-white text-hn-orange px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-hn-orange px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <Link
              to="/"
              className="block bg-white text-hn-orange px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            {user && (
              <Link
                to="/bookmarks"
                className="block bg-white text-hn-orange px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Bookmarks
              </Link>
            )}
            {user ? (
              <>
                <div className=" text-sm py-2">👋 {user.name}</div>
                <button
                  onClick={handleLogout}
                  className="w-full bg-white text-hn-orange px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="space-y-2">
                <Link
                  to="/login"
                  className="block bg-white text-hn-orange px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block bg-white text-hn-orange px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors font-medium text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
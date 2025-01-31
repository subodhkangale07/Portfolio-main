import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Github, Linkedin, Mail, Menu, X } from 'lucide-react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.mobile-menu-container')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  const navLinks = [
    { name: 'home', path: '/' },
    { name: 'education', path: '/education' },
    { name: 'skills', path: '/skills' },
    { name: 'experience', path: '/experience' },
    { name: 'projects', path: '/projects' },
    { name: 'open-source', path: '/open-source' },
    { name: 'coding', path: '/coding' },
    { name: 'resume', path: '/resume' },
    { name: 'contact', path: '/contact' }
  ];
  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 
      ${scrolled ? 'bg-black/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'}
      ${scrolled ? 'py-2' : 'py-4'}`}>
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex justify-between items-center">
          {/* Animated Logo */}
          <h1 className="text-2xl lg:text-3xl font-bold relative group">
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
                           bg-clip-text text-transparent animate-gradient-x
                           hover:animate-pulse cursor-pointer">
              Subodh.dev
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r 
                           from-blue-500 via-purple-500 to-pink-500 
                           group-hover:w-full transition-all duration-300" />
          </h1>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors mobile-menu-container"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex gap-6 overflow-x-auto no-scrollbar">
            {navLinks.map(({ name, path }) => (
              <Link
                key={name}
                to={path}
                className={`relative px-2 py-1 transition-all duration-300 
                  hover:text-blue-400 group whitespace-nowrap
                  ${location.pathname === path ? 'text-blue-500' : 'text-white'}`}
              >
                <span className="capitalize">{name}</span>
                <span className={`absolute bottom-0 left-0 w-full h-0.5 
                  bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 
                  group-hover:scale-x-100 transition-transform duration-300
                  ${location.pathname === path ? 'scale-x-100' : ''}`} />
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`lg:hidden fixed inset-x-0 bg-black/95 backdrop-blur-lg transition-all duration-300 mobile-menu-container
            ${isMenuOpen ? 'top-[60px] opacity-100 visible' : 'top-[-100%] opacity-0 invisible'}`}
        >
          <div className="container mx-auto px-4 py-4">
            {/* Mobile Navigation Links */}
            <div className="flex flex-col space-y-4">
              {navLinks.map(({ name, path }) => (
                <Link
                  key={name}
                  to={path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-2 rounded-lg transition-colors
                    hover:bg-gray-800 
                    ${location.pathname === path ? 'text-blue-500' : 'text-white'}`}
                >
                  <span className="capitalize">{name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
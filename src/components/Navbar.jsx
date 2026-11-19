import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Waves, Menu, X, ArrowRight, User, LogOut, Compass, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/#' + sectionId);
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#030b1a]/90 backdrop-blur-md border-b border-cyan-500/20 py-3.5 shadow-xl shadow-cyan-950/20'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 group text-white hover:text-cyan-300 transition-colors"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-sky-500 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/25 group-hover:shadow-cyan-400/40 transition-shadow">
            <div className="w-full h-full bg-[#051329] rounded-[10px] flex items-center justify-center">
              <Waves className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight font-['Outfit',sans-serif]">
              Float<span className="text-cyan-400">Chat</span>
            </span>
            <span className="text-[10px] font-medium tracking-widest uppercase text-cyan-200/70 -mt-1">
              Ocean Intelligence
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <Link
            to="/"
            className="hover:text-cyan-400 transition-colors relative py-1"
          >
            Home
          </Link>
          <button
            onClick={() => handleNavClick('features')}
            className="hover:text-cyan-400 transition-colors py-1 cursor-pointer"
          >
            Features
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className="hover:text-cyan-400 transition-colors py-1 cursor-pointer"
          >
            About
          </button>
          <button
            onClick={() => handleNavClick('mission')}
            className="hover:text-cyan-400 transition-colors py-1 cursor-pointer"
          >
            Our Mission
          </button>
          <button
            onClick={() => handleNavClick('how-it-works')}
            className="hover:text-cyan-400 transition-colors py-1 cursor-pointer"
          >
            Workflow
          </button>
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-900/60 transition-colors text-xs font-medium"
              >
                <Compass className="w-3.5 h-3.5 text-cyan-400" />
                <span>Ocean Console</span>
              </Link>
              <div className="flex items-center gap-2 pl-2 border-l border-slate-700">
                <span className="text-xs text-slate-300 font-medium">
                  {user?.name?.split(' ')[0] || 'Researcher'}
                </span>
                <button
                  onClick={logout}
                  title="Sign out"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-slate-300 hover:text-white px-3 py-2 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-semibold rounded-xl group bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all active:scale-95"
              >
                <span className="relative px-4 py-2 transition-all ease-out bg-[#071731] rounded-[10px] group-hover:bg-transparent text-white flex items-center gap-2">
                  <span>Get Started</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#051329]/95 backdrop-blur-xl border-b border-cyan-500/20 px-6 pt-4 pb-6 mt-3 space-y-4">
          <div className="flex flex-col space-y-3 text-base font-medium text-slate-200">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-cyan-400"
            >
              Home
            </Link>
            <button
              onClick={() => handleNavClick('features')}
              className="text-left py-1 hover:text-cyan-400"
            >
              Features
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="text-left py-1 hover:text-cyan-400"
            >
              About
            </button>
            <button
              onClick={() => handleNavClick('mission')}
              className="text-left py-1 hover:text-cyan-400"
            >
              Our Mission
            </button>
            <button
              onClick={() => handleNavClick('how-it-works')}
              className="text-left py-1 hover:text-cyan-400"
            >
              Workflow
            </button>
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-sm font-medium"
                >
                  <Compass className="w-4 h-4" />
                  <span>Go to Ocean Console ({user?.name})</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-slate-800/80 text-rose-400 text-sm font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-lg border border-slate-700 text-slate-200 font-medium text-sm"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium text-sm shadow-lg shadow-cyan-500/20"
                >
                  Get Started Free
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

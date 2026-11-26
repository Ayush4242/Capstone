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
      setScrolled(window.scrollY > 15);
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
          ? 'bg-[#020617]/95 backdrop-blur-2xl border-b border-cyan-500/15 py-4 shadow-2xl shadow-black/60'
          : 'bg-[#020617]/90 backdrop-blur-xl border-b border-cyan-500/10 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 group text-white transition-all shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5 shadow-md shadow-cyan-500/25">
            <div className="w-full h-full bg-[#020617] rounded-[10px] flex items-center justify-center">
              <Waves className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-black tracking-wider uppercase font-['Outfit',sans-serif] text-white">
              Float<span className="text-cyan-400">Chat</span>
            </span>
          </div>
        </Link>

        {/* Clean, Spacious Navigation Links matching user's concept */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-slate-300">
          <Link
            to="/explorer"
            className="hover:text-cyan-400 text-cyan-300 transition-colors py-1 flex items-center gap-1.5"
          >
            <span>Data Explorer</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          </Link>
          <button
            onClick={() => handleNavClick('argo-simulator')}
            className="hover:text-cyan-400 transition-colors py-1 cursor-pointer"
          >
            ARGO Observations
          </button>
          <button
            onClick={() => handleNavClick('features')}
            className="hover:text-cyan-400 transition-colors py-1 cursor-pointer"
          >
            Marine Ecosystems
          </button>
          <button
            onClick={() => handleNavClick('features')}
            className="hover:text-cyan-400 transition-colors py-1 cursor-pointer"
          >
            Climate Impacts
          </button>
          <button
            onClick={() => handleNavClick('mission')}
            className="hover:text-cyan-400 transition-colors py-1 cursor-pointer"
          >
            Mission
          </button>
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-5 shrink-0">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 hover:border-cyan-300 text-xs font-semibold transition-all hover:scale-105"
              >
                <Compass className="w-4 h-4 text-cyan-400" />
                <span>Console</span>
              </Link>
              <button
                onClick={logout}
                title="Sign out"
                className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="text-xs font-semibold text-slate-300 hover:text-white transition-colors tracking-wider uppercase py-2"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="relative inline-flex items-center justify-center p-[1px] overflow-hidden rounded-xl font-bold text-xs text-white group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-teal-400 to-blue-600 rounded-xl" />
                <span className="relative px-5 py-2.5 transition-all ease-out bg-[#020617] rounded-[11px] group-hover:bg-opacity-0 flex items-center gap-2">
                  <span>Get Started</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl text-slate-300 hover:text-white bg-slate-900 border border-slate-800"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#020617]/98 backdrop-blur-2xl border-b border-cyan-500/20 px-6 pt-5 pb-7 mt-3 space-y-5">
          <div className="flex flex-col space-y-3.5 text-sm font-semibold uppercase tracking-wider text-slate-200">
            <Link
              to="/explorer"
              onClick={() => setMobileMenuOpen(false)}
              className="text-left py-1 text-cyan-300 font-bold"
            >
              Data Explorer (Interactive Map)
            </Link>
            <button
              onClick={() => handleNavClick('argo-simulator')}
              className="text-left py-1 hover:text-cyan-400"
            >
              ARGO Observations
            </button>
            <button
              onClick={() => handleNavClick('features')}
              className="text-left py-1 hover:text-cyan-400"
            >
              Marine Ecosystems
            </button>
            <button
              onClick={() => handleNavClick('features')}
              className="text-left py-1 hover:text-cyan-400"
            >
              Climate Impacts
            </button>
            <button
              onClick={() => handleNavClick('mission')}
              className="text-left py-1 hover:text-cyan-400"
            >
              Mission
            </button>
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-bold text-xs"
              >
                Go to Ocean Console
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 rounded-xl border border-slate-700 text-slate-200 font-bold text-xs"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-lg shadow-cyan-500/30"
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

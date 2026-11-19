import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Waves, Menu, X, ArrowRight, User, LogOut, Compass, Sparkles, Activity, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
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
          ? 'bg-[#020617]/85 backdrop-blur-xl border-b border-cyan-500/15 py-3 shadow-2xl shadow-cyan-950/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-3.5 group text-white transition-all"
        >
          <div className="relative">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-400 opacity-60 blur-md group-hover:opacity-100 transition duration-500" />
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#0f172a] via-[#020617] to-[#042f2e] border border-cyan-400/40 flex items-center justify-center shadow-lg">
              <Waves className="w-5 h-5 text-cyan-300 group-hover:rotate-6 transition-transform duration-300" />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold tracking-tight font-['Outfit',sans-serif] text-white">
                Float<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-sky-400">Chat</span>
              </span>
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 font-semibold tracking-wider">
                v1.2
              </span>
            </div>
            <span className="text-[10px] font-medium tracking-widest uppercase text-slate-400 -mt-0.5">
              AI Ocean Intelligence
            </span>
          </div>
        </Link>

        {/* Global Live Ticker (Desktop) */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/60 border border-slate-800 text-[11px] font-mono text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-400">GLOBAL ARGO TELEMETRY:</span>
          <span className="text-cyan-300 font-bold">3,942 ACTIVE PROFILES</span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <Link
            to="/"
            className="hover:text-cyan-300 transition-colors py-1 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]"
          >
            Home
          </Link>
          <button
            onClick={() => handleNavClick('features')}
            className="hover:text-cyan-300 transition-colors py-1 cursor-pointer hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]"
          >
            Capabilities
          </button>
          <button
            onClick={() => handleNavClick('argo-telemetry')}
            className="hover:text-cyan-300 transition-colors py-1 cursor-pointer hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]"
          >
            ARGO Float Simulator
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className="hover:text-cyan-300 transition-colors py-1 cursor-pointer hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]"
          >
            About
          </button>
          <button
            onClick={() => handleNavClick('mission')}
            className="hover:text-cyan-300 transition-colors py-1 cursor-pointer hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]"
          >
            Mission
          </button>
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link
                to="/dashboard"
                className="relative group flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-950/80 to-blue-950/80 border border-cyan-400/40 text-cyan-300 hover:border-cyan-300 text-xs font-semibold shadow-lg shadow-cyan-950/50 transition-all hover:scale-105"
              >
                <Compass className="w-4 h-4 text-cyan-400 group-hover:rotate-45 transition-transform" />
                <span>Ocean Console</span>
              </Link>
              <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
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
                className="text-xs font-semibold text-slate-300 hover:text-white px-3.5 py-2 transition-colors tracking-wide"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="relative inline-flex items-center justify-center p-[1px] overflow-hidden rounded-xl font-semibold text-xs text-white group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-teal-400 to-indigo-500 rounded-xl group-hover:opacity-90 transition-opacity" />
                <span className="relative px-4 py-2 transition-all ease-out bg-[#020617] rounded-[11px] group-hover:bg-opacity-0 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400 group-hover:text-white transition-colors" />
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
            className="p-2 rounded-xl text-slate-300 hover:text-white bg-slate-900/60 border border-slate-800"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#020617]/95 backdrop-blur-2xl border-b border-cyan-500/20 px-6 pt-4 pb-6 mt-3 space-y-4">
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
              Capabilities
            </button>
            <button
              onClick={() => handleNavClick('argo-telemetry')}
              className="text-left py-1 hover:text-cyan-400"
            >
              ARGO Float Simulator
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
              Mission
            </button>
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-sm font-semibold"
                >
                  <Compass className="w-4 h-4" />
                  <span>Go to Ocean Console ({user?.name})</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-800/80 text-rose-400 text-sm font-medium"
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
                  className="w-full text-center py-2.5 rounded-xl border border-slate-700 text-slate-200 font-semibold text-sm"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-400 to-indigo-600 text-white font-semibold text-sm shadow-lg shadow-cyan-500/30"
                >
                  Create Researcher Account
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

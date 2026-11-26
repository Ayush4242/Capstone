import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight, User, LogOut, Compass } from 'lucide-react';
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
          ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200 py-3.5 shadow-sm'
          : 'bg-white/90 backdrop-blur-md border-b border-slate-100 py-4.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 group transition-opacity"
        >
          <img src="/logo.jpg" alt="FloatChat" className="w-9 h-9 rounded-lg object-cover shadow-sm group-hover:scale-105 transition-transform" />
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold tracking-tight font-['Outfit',sans-serif] text-slate-900">
              FloatChat
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-slate-600">
          <Link
            to="/explorer"
            className="text-slate-900 hover:text-sky-600 transition-colors py-1 flex items-center gap-1.5"
          >
            <span>Data Explorer</span>
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
          </Link>
          <button
            onClick={() => handleNavClick('argo-simulator')}
            className="hover:text-slate-900 transition-colors py-1 cursor-pointer"
          >
            ARGO Observations
          </button>
          <button
            onClick={() => handleNavClick('features')}
            className="hover:text-slate-900 transition-colors py-1 cursor-pointer"
          >
            Marine Ecosystems
          </button>
          <button
            onClick={() => handleNavClick('features')}
            className="hover:text-slate-900 transition-colors py-1 cursor-pointer"
          >
            Climate Impacts
          </button>
          <button
            onClick={() => handleNavClick('mission')}
            className="hover:text-slate-900 transition-colors py-1 cursor-pointer"
          >
            Mission
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 hover:bg-slate-200 text-xs font-semibold transition-all"
              >
                <Compass className="w-4 h-4 text-sky-600" />
                <span>Console</span>
              </Link>
              <button
                onClick={logout}
                title="Sign out"
                className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors tracking-wider uppercase py-2"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="inline-flex items-center justify-center px-4 py-2 rounded-lg font-semibold text-xs text-white bg-slate-900 hover:bg-slate-800 shadow-sm transition-colors gap-1.5"
              >
                <span>Get Started</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 hover:text-slate-900 bg-slate-100"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 pt-4 pb-6 mt-3 space-y-4">
          <div className="flex flex-col space-y-3 text-sm font-semibold uppercase tracking-wider text-slate-700">
            <Link
              to="/explorer"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-sky-600 font-bold"
            >
              Data Explorer (Interactive Map)
            </Link>
            <button
              onClick={() => handleNavClick('argo-simulator')}
              className="text-left py-1 hover:text-slate-900"
            >
              ARGO Observations
            </button>
            <button
              onClick={() => handleNavClick('features')}
              className="text-left py-1 hover:text-slate-900"
            >
              Marine Ecosystems
            </button>
            <button
              onClick={() => handleNavClick('features')}
              className="text-left py-1 hover:text-slate-900"
            >
              Climate Impacts
            </button>
            <button
              onClick={() => handleNavClick('mission')}
              className="text-left py-1 hover:text-slate-900"
            >
              Mission
            </button>
          </div>

          <div className="pt-4 border-t border-slate-200 flex flex-col gap-2.5">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 font-bold text-xs"
              >
                Go to Ocean Console
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-lg border border-slate-300 text-slate-800 font-bold text-xs"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-lg bg-slate-900 text-white font-bold text-xs shadow-sm"
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

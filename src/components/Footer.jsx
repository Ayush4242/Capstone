import React from 'react';
import { Link } from 'react-router-dom';
import { Waves, Globe2, ExternalLink, ShieldAlert, Heart, Mail, Compass } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#020814] text-slate-400 border-t border-cyan-500/15 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Column 1: Brand & Tagline */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 text-white">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 p-0.5 shadow-md shadow-cyan-500/20">
                <div className="w-full h-full bg-[#051329] rounded-[10px] flex items-center justify-center">
                  <Waves className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight font-['Outfit',sans-serif]">
                Float<span className="text-cyan-400">Chat</span>
              </span>
            </Link>
            <p className="text-sm text-slate-300 max-w-sm leading-relaxed">
              Bridging the gap between global ocean science and everyone. FloatChat leverages real-world ARGO observation floats and intelligent conversational AI to democratize climate and oceanographic discoveries.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="px-3 py-1.5 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-xs text-cyan-300 font-mono">
                ARGO Global Observation Partner
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 font-['Outfit',sans-serif]">
              Platform Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-cyan-400 transition-colors">Home Overview</Link>
              </li>
              <li>
                <a href="#features" className="hover:text-cyan-400 transition-colors">Core Features</a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-cyan-400 transition-colors">How It Works</a>
              </li>
              <li>
                <a href="#about" className="hover:text-cyan-400 transition-colors">About FloatChat</a>
              </li>
              <li>
                <a href="#mission" className="hover:text-cyan-400 transition-colors">Our Mission</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Analytical Capabilities */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 font-['Outfit',sans-serif]">
              Analytical Modules
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-cyan-300 transition-colors cursor-pointer">AI Ocean Assistant</li>
              <li className="hover:text-cyan-300 transition-colors cursor-pointer">Interactive ARGO Explorer</li>
              <li className="hover:text-cyan-300 transition-colors cursor-pointer">Ocean Time Machine</li>
              <li className="hover:text-cyan-300 transition-colors cursor-pointer">Oxygen Depletion Analysis</li>
              <li className="hover:text-cyan-300 transition-colors cursor-pointer">Ocean–Monsoon Analyzer</li>
              <li className="hover:text-cyan-300 transition-colors cursor-pointer">Ocean Anomaly Detection</li>
            </ul>
          </div>

          {/* Column 4: Official Scientific Data Sources */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 font-['Outfit',sans-serif]">
              Scientific Data Sources
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>ARGO Global Float Program</span>
              </li>
              <li className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>NOAA Ocean Service</span>
              </li>
              <li className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>OBIS Biodiversity System</span>
              </li>
              <li className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>NASA Earth Observation</span>
              </li>
              <li className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>INCOIS (Govt. of India)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {currentYear} FloatChat Research Initiative. Built for planetary climate intelligence.</p>
          <div className="flex items-center gap-6">
            <span className="text-slate-400">Standardized ARGO NetCDF & In-situ telemetry</span>
            <span className="text-cyan-500/40">•</span>
            <Link to="/login" className="hover:text-cyan-400 transition-colors">Researcher Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

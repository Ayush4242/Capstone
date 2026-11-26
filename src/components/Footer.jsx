import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 text-slate-600 border-t border-slate-200 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-200">
          {/* Column 1: Brand & Tagline */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 text-slate-900">
              <img src="/logo.jpg" alt="FloatChat" className="w-9 h-9 rounded-lg object-cover shadow-sm" />
              <span className="text-xl font-bold tracking-tight font-['Outfit',sans-serif]">
                FloatChat
              </span>
            </Link>
            <p className="text-sm text-slate-600 max-w-sm leading-relaxed">
              Bridging the gap between global ocean science and everyone. FloatChat leverages real-world ARGO observation floats and intelligent conversational AI to democratize climate and oceanographic discoveries.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="px-3 py-1 rounded-md bg-white border border-slate-200 text-xs text-slate-700 font-mono shadow-xs">
                ARGO Global Observation Partner
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 font-['Outfit',sans-serif]">
              Platform Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-slate-900 transition-colors">Home Overview</Link>
              </li>
              <li>
                <Link to="/explorer" className="hover:text-slate-900 transition-colors font-medium text-sky-600">Data Explorer (Map)</Link>
              </li>
              <li>
                <a href="#argo-simulator" className="hover:text-slate-900 transition-colors">ARGO Profiling Cycle</a>
              </li>
              <li>
                <a href="#about" className="hover:text-slate-900 transition-colors">About FloatChat</a>
              </li>
              <li>
                <a href="#mission" className="hover:text-slate-900 transition-colors">Our Mission</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Analytical Capabilities */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 font-['Outfit',sans-serif]">
              Analytical Modules
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-slate-900 transition-colors cursor-pointer">Interactive ARGO Explorer</li>
              <li className="hover:text-slate-900 transition-colors cursor-pointer">CTD Depth Sounding</li>
              <li className="hover:text-slate-900 transition-colors cursor-pointer">Ocean Time Machine</li>
              <li className="hover:text-slate-900 transition-colors cursor-pointer">Oxygen Depletion Analysis</li>
              <li className="hover:text-slate-900 transition-colors cursor-pointer">Ocean–Monsoon Analyzer</li>
              <li className="hover:text-slate-900 transition-colors cursor-pointer">Ocean Anomaly Detection</li>
            </ul>
          </div>

          {/* Column 4: Official Scientific Data Sources */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 font-['Outfit',sans-serif]">
              Scientific Data Sources
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-1.5 hover:text-slate-900 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                <span>ARGO Global Float Program</span>
              </li>
              <li className="flex items-center gap-1.5 hover:text-slate-900 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                <span>NOAA Ocean Service</span>
              </li>
              <li className="flex items-center gap-1.5 hover:text-slate-900 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                <span>OBIS Biodiversity System</span>
              </li>
              <li className="flex items-center gap-1.5 hover:text-slate-900 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                <span>NASA Earth Observation</span>
              </li>
              <li className="flex items-center gap-1.5 hover:text-slate-900 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                <span>INCOIS (Govt. of India)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} FloatChat Research Initiative. Built for planetary climate intelligence.</p>
          <div className="flex items-center gap-6">
            <span>Standardized ARGO NetCDF-4 In-situ telemetry</span>
            <span>•</span>
            <Link to="/login" className="hover:text-slate-900 transition-colors font-medium">Researcher Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

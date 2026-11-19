import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Compass,
  Activity,
  Database,
  Waves,
  Sparkles,
  MapPin,
  Gauge,
  Radio,
  Satellite,
  ChevronRight,
  Terminal,
  Cpu,
  Layers,
  ShieldAlert,
} from 'lucide-react';

export default function Hero() {
  const [selectedBasin, setSelectedBasin] = useState('argo');

  const scrollToFeatures = () => {
    const el = document.getElementById('features');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Image: High-Definition Ocean ARGO Float & Marine Life */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/hero-ocean-argo.jpg')`,
        }}
      >
        {/* Layered Gradient Overlays for Guaranteed Text Legibility & Depth */}
        {/* Top bar vignette for navbar contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/90 via-[#020617]/40 to-[#020617]" />
        {/* Left side soft darkening for headline readability while keeping right-side float & whales visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/95 via-[#020617]/65 to-transparent sm:w-3/4" />
        {/* Bottom smooth fade to merge into the next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#020617] to-transparent" />
      </div>

      {/* Floating telemetry HUD elements across the screen */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Heading, Subtitle & Primary CTAs */}
        <div className="lg:col-span-7 text-left space-y-6 pt-4">
          {/* Top Live Status Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-950/80 border border-cyan-400/40 text-cyan-300 text-xs sm:text-sm font-medium backdrop-blur-xl shadow-lg shadow-black/50">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400" />
            </span>
            <span className="font-semibold text-white tracking-wide uppercase font-mono text-[11px]">
              ARGO Float Array Active
            </span>
            <span className="text-slate-400 hidden sm:inline">•</span>
            <span className="text-cyan-200 text-xs hidden sm:inline">Global CTD Telemetry Online</span>
          </div>

          {/* Main Hero Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.05] font-['Outfit',sans-serif] uppercase drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
            Explore Our Oceans. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-300 to-sky-400">
              Understand Our Planet.
            </span>
          </h1>

          {/* Subheading */}
          <p className="max-w-xl text-base sm:text-lg text-slate-200/95 leading-relaxed font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            An AI-Powered Oceanographic Data Discovery Platform — Translating ARGO Observations, Marine Ecosystem Health, and Climate Dynamics to Protect Our Living Seas.
          </p>

          {/* Depth Callout & Telemetry Snippet */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-cyan-300/90 py-1">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950/70 border border-cyan-500/20 backdrop-blur-md">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              <span>Depth: 0m to 2,000m</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950/70 border border-cyan-500/20 backdrop-blur-md">
              <Radio className="w-3.5 h-3.5 text-teal-400" />
              <span>ARGO Float Deployment #4902183</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <Link
              to="/signup"
              className="w-full sm:w-auto relative group inline-flex items-center justify-center p-0.5 rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/40 transition-transform active:scale-95"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-500 rounded-2xl group-hover:opacity-100 transition-opacity" />
              <span className="relative w-full sm:w-auto px-8 py-4 rounded-[14px] bg-[#020617] group-hover:bg-opacity-0 text-white font-bold text-sm flex items-center justify-center gap-2.5 transition-all">
                <span>Start Exploring</span>
                <ArrowRight className="w-4 h-4 text-cyan-300 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </span>
            </Link>

            <button
              onClick={scrollToFeatures}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-sm font-semibold text-slate-100 bg-slate-950/80 hover:bg-slate-900 border border-slate-700/80 hover:border-cyan-400/60 backdrop-blur-xl transition-all duration-300 shadow-xl shadow-black/60"
            >
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>Discover FloatChat</span>
            </button>
          </div>
        </div>

        {/* Right Column: High-tech Scientific Glass HUD Overlay */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Real-time Telemetry Glass Card */}
          <div className="p-5 sm:p-6 rounded-3xl bg-[#030917]/80 border border-cyan-400/30 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] text-left relative overflow-hidden">
            {/* Top Bar */}
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-cyan-500/20 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                <span className="font-mono text-cyan-300 font-bold uppercase tracking-wider">
                  Global Marine Health Monitoring
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">Real-Time</span>
            </div>

            {/* Metric Tiles */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-cyan-500/15">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span>Surface Water Temp</span>
                  <Gauge className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <div className="text-xl font-black text-white font-mono">
                  28.64 <span className="text-xs text-cyan-300 font-sans">°C</span>
                </div>
                <div className="text-[10px] text-teal-300 font-mono mt-0.5">+0.4°C baseline anomaly</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-cyan-500/15">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span>Practical Salinity</span>
                  <Waves className="w-3.5 h-3.5 text-sky-400" />
                </div>
                <div className="text-xl font-black text-white font-mono">
                  35.18 <span className="text-xs text-sky-300 font-sans">PSU</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">Equatorial halocline</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-cyan-500/15">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span>Profile Depth</span>
                  <Activity className="w-3.5 h-3.5 text-indigo-400" />
                </div>
                <div className="text-xl font-black text-white font-mono">
                  2,000 <span className="text-xs text-indigo-300 font-sans">m</span>
                </div>
                <div className="text-[10px] text-indigo-300 font-mono mt-0.5">Bathypelagic threshold</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-cyan-500/15">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span>Dissolved Oxygen</span>
                  <Database className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div className="text-xl font-black text-white font-mono">
                  4.82 <span className="text-xs text-emerald-300 font-sans">ml/L</span>
                </div>
                <div className="text-[10px] text-emerald-400 font-mono mt-0.5">Marine sanctuary safe</div>
              </div>
            </div>

            {/* Interactive AI Query simulation pill */}
            <div className="p-3 rounded-xl bg-slate-950/90 border border-cyan-500/25 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 truncate">
                <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="font-mono text-cyan-200 truncate">
                  "Analyze salinity anomalies in float #4902183"
                </span>
              </div>
              <Link
                to="/signup"
                className="text-cyan-400 hover:text-cyan-300 font-semibold shrink-0 ml-2"
              >
                Try AI ➔
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Activity, Radio, Sparkles } from 'lucide-react';

export default function Hero() {
  const scrollToFeatures = () => {
    const el = document.getElementById('features');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[96vh] flex items-center justify-between pt-36 pb-28 px-6 sm:px-12 lg:px-16 overflow-hidden">
      {/* Background Image: High-Definition Ocean ARGO Float & Marine Life */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-[1.09] origin-bottom"
        style={{
          backgroundImage: `url('/hero-ocean-argo.jpg')`,
        }}
      >
        {/* Crisp left scrim to ensure HTML typography has zero visual clash while leaving the ARGO float and dolphins clear */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#030b17] via-[#030b17]/95 via-35% to-transparent lg:w-3/5" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030b17]/80 via-transparent to-[#030b17]/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col justify-between min-h-[75vh]">
        {/* Top telemetry status pill */}
        <div className="flex items-center justify-between w-full">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-950/80 border border-cyan-400/30 text-cyan-300 text-xs font-mono backdrop-blur-xl">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
            </span>
            <span className="font-semibold text-white uppercase tracking-wider">
              ARGO Array Online:
            </span>
            <span className="text-cyan-200">3,942 Autonomous Floats Active</span>
          </div>

          {/* Top Right Floating Metric Pill (Does not block float or whales) */}
          <div className="hidden md:flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#020617]/70 border border-cyan-500/25 backdrop-blur-xl text-xs font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white font-medium">Global Marine Health Monitoring</span>
          </div>
        </div>

        {/* Center-Left: Cinematic Typography with Generous Breathing Room */}
        <div className="max-w-2xl text-left space-y-7 my-auto pt-8">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.05] font-['Outfit',sans-serif] uppercase drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
            Explore Our Oceans. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-300 to-sky-400">
              Understand Our Planet.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            An AI-Powered Oceanographic Data Discovery Platform — Translating ARGO Observations, Marine Ecosystem Health, and Climate Dynamics to Protect Our Living Seas.
          </p>

          {/* Clean Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <Link
              to="/signup"
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-cyan-400 via-teal-300 to-sky-400 hover:opacity-95 shadow-2xl shadow-cyan-500/40 transition-all flex items-center justify-center gap-2"
            >
              <span>Start Exploring</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={scrollToFeatures}
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-200 bg-[#020617]/80 hover:bg-[#020617] border border-cyan-500/30 hover:border-cyan-400 backdrop-blur-xl transition-all shadow-xl"
            >
              Discover FloatChat
            </button>
          </div>
        </div>

        {/* Bottom Bar: Telemetry Horizon Tags */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-cyan-300 pt-8">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-950/80 border border-cyan-500/20 backdrop-blur-md">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>Depth: 0m to 2,000m</span>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-950/80 border border-cyan-500/20 backdrop-blur-md">
            <Radio className="w-3.5 h-3.5 text-teal-400" />
            <span>ARGO Float Deployment #4902183</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-950/80 border border-cyan-500/20 backdrop-blur-md text-slate-400">
            <span>Calibrated In-situ CTD Telemetry</span>
          </div>
        </div>
      </div>
    </section>
  );
}

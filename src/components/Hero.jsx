import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Activity, Database, Waves, ShieldCheck, Sparkles, MapPin, Gauge } from 'lucide-react';

export default function Hero() {
  const scrollToFeatures = () => {
    const el = document.getElementById('features');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Ocean Image with Multi-layer Gradient Overlays */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transform duration-1000 ease-out"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=2400&q=80')`,
        }}
      >
        {/* Deep blue ocean gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020b18]/90 via-[#03122b]/80 to-[#020b18] mix-blend-multiply" />
        <div className="absolute inset-0 bg-radial from-cyan-600/15 via-transparent to-[#020b18]/95" />
        <div className="absolute inset-0 bg-depth-grid opacity-30" />
      </div>

      {/* Floating Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none animate-pulse-subtle" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-blue-600/15 rounded-full blur-[120px] pointer-events-none animate-pulse-subtle" style={{ animationDelay: '3s' }} />

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-400/30 text-cyan-300 text-xs sm:text-sm font-medium mb-8 backdrop-blur-md shadow-lg shadow-cyan-950/50 hover:border-cyan-400/60 transition-colors">
          <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="flex h-2 w-2 rounded-full bg-cyan-400 -ml-4" />
          <span className="font-semibold text-cyan-200">Global ARGO Array Active:</span>
          <span className="text-slate-300">Over 3,900 autonomous floats reporting live</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] font-['Outfit',sans-serif] mb-6">
          Explore Our Oceans. <br />
          <span className="text-gradient-ocean">Understand Our Planet.</span>
        </h1>

        {/* Subheading */}
        <p className="max-w-3xl text-lg sm:text-xl text-slate-300 leading-relaxed font-normal mb-10">
          An AI-powered platform that transforms complex oceanographic data into meaningful insights. 
          Explore ocean conditions, visualize ARGO observations, and discover how our oceans are changing.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-14">
          <Link
            to="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-400/40 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            <span>Start Exploring</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <button
            onClick={scrollToFeatures}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold text-slate-200 bg-[#071937]/80 hover:bg-[#0c244d] border border-cyan-500/30 hover:border-cyan-400/60 backdrop-blur-md transition-all duration-200"
          >
            <Compass className="w-4 h-4 text-cyan-400" />
            <span>Discover FloatChat</span>
          </button>
        </div>

        {/* Real-time Telemetry Showcase Card */}
        <div className="w-full max-w-4xl rounded-2xl p-4 sm:p-5 bg-[#06152d]/80 border border-cyan-500/20 backdrop-blur-xl shadow-2xl shadow-cyan-950/50">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-cyan-500/15 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-cyan-300 uppercase tracking-wider font-semibold">ARGO Float WMO #2902634 Live Profile</span>
            </div>
            <span className="hidden sm:inline font-mono text-slate-400">Indian Ocean Basin [12.4°S, 75.8°E]</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-left">
            <div className="bg-[#040e1f]/80 p-3 rounded-xl border border-cyan-500/10">
              <div className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5 mb-1">
                <Gauge className="w-3.5 h-3.5 text-cyan-400" />
                <span>Surface Temp</span>
              </div>
              <div className="text-lg sm:text-xl font-bold text-white font-mono">
                28.64 <span className="text-xs text-cyan-300 font-sans">°C</span>
              </div>
              <div className="text-[10px] text-emerald-400 mt-0.5">+0.4°C seasonal baseline</div>
            </div>

            <div className="bg-[#040e1f]/80 p-3 rounded-xl border border-cyan-500/10">
              <div className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5 mb-1">
                <Waves className="w-3.5 h-3.5 text-sky-400" />
                <span>Salinity (PSU)</span>
              </div>
              <div className="text-lg sm:text-xl font-bold text-white font-mono">
                35.18 <span className="text-xs text-sky-300 font-sans">PSU</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">High salinity core at 150m</div>
            </div>

            <div className="bg-[#040e1f]/80 p-3 rounded-xl border border-cyan-500/10">
              <div className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5 mb-1">
                <Activity className="w-3.5 h-3.5 text-teal-400" />
                <span>Profile Depth</span>
              </div>
              <div className="text-lg sm:text-xl font-bold text-white font-mono">
                2,000 <span className="text-xs text-teal-300 font-sans">meters</span>
              </div>
              <div className="text-[10px] text-cyan-400 mt-0.5">Full bathypelagic cycle</div>
            </div>

            <div className="bg-[#040e1f]/80 p-3 rounded-xl border border-cyan-500/10">
              <div className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5 mb-1">
                <Database className="w-3.5 h-3.5 text-blue-400" />
                <span>Dissolved Oxygen</span>
              </div>
              <div className="text-lg sm:text-xl font-bold text-white font-mono">
                4.82 <span className="text-xs text-blue-300 font-sans">mg/L</span>
              </div>
              <div className="text-[10px] text-emerald-400 mt-0.5">Healthy oxygen zone</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

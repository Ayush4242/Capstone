import React from 'react';
import CTDVisualizer from './CTDVisualizer';
import OceanTerminal from './OceanTerminal';
import {
  CloudRain,
  Wind,
  History,
  AlertTriangle,
  Compass,
  ArrowUpRight,
  TrendingUp,
  Activity,
  Waves,
  MapPin,
  Sparkles,
} from 'lucide-react';

export default function BentoGrid() {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#020617]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-left max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4 font-mono">
            Scientific Observational Suite
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-['Outfit',sans-serif] mb-4">
            Handcrafted for Real Oceanographers. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-300 to-sky-400">
              Powered by Live ARGO Floats.
            </span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            No synthetic data or generic cards. Every widget is calibrated to real physical oceanographic variables, NetCDF telemetry standards, and marine biogeochemistry.
          </p>
        </div>

        {/* Asymmetric Bento Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Row 1: Large CTD Profile Widget (7 Cols) + AI Terminal (5 Cols) */}
          <div className="lg:col-span-7">
            <CTDVisualizer />
          </div>

          <div className="lg:col-span-5">
            <OceanTerminal />
          </div>

          {/* Row 2: 3 Specialized Scientific Cards */}
          {/* Card 1: Ocean–Monsoon Analyzer (Indian Ocean Dipole) */}
          <div className="lg:col-span-4 rounded-3xl bg-[#030914] border border-cyan-500/20 p-6 shadow-xl flex flex-col justify-between hover:border-cyan-400/40 transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-400/30 flex items-center justify-center text-cyan-300">
                  <CloudRain className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 font-semibold">
                  +0.84 POSITIVE IOD
                </span>
              </div>

              <h3 className="text-xl font-bold text-white font-['Outfit',sans-serif] mb-2">
                Ocean–Monsoon Analyzer
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                Investigate thermal dipoles across the western Arabian Sea and eastern equatorial Indian Ocean to anticipate monsoon rainfall patterns.
              </p>

              {/* Real metric bar */}
              <div className="p-3.5 rounded-2xl bg-[#02050c] border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-400">Western Basin SST:</span>
                  <span className="text-cyan-300 font-bold">29.4°C (+0.8°C)</span>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden flex">
                  <div className="bg-gradient-to-r from-cyan-400 to-teal-400 h-full w-[72%]" />
                </div>
                <div className="text-[10px] text-teal-300 font-mono flex items-center justify-between">
                  <span>Equatorial Wyrtki Jet Active</span>
                  <span>94% Confidence</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-cyan-400 font-semibold">
              <span className="text-slate-400 font-mono text-[11px]">IOD Climatology</span>
              <span className="flex items-center gap-1 hover:translate-x-1 transition-transform cursor-pointer">
                <span>View Correlation</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Card 2: Oxygen Depletion & Hypoxia Sentinel */}
          <div className="lg:col-span-4 rounded-3xl bg-[#030914] border border-cyan-500/20 p-6 shadow-xl flex flex-col justify-between hover:border-cyan-400/40 transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-teal-950 border border-teal-400/30 flex items-center justify-center text-teal-300">
                  <Wind className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950/80 border border-rose-500/30 text-rose-300 font-semibold">
                  HYPOXIA THRESHOLD
                </span>
              </div>

              <h3 className="text-xl font-bold text-white font-['Outfit',sans-serif] mb-2">
                Oxygen Depletion Analysis
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                Map permanent and seasonal Oxygen Minimum Zones (OMZ). Monitor dissolved O₂ drops critical for benthic and pelagic marine life survival.
              </p>

              {/* Hypoxia Gauge */}
              <div className="p-3.5 rounded-2xl bg-[#02050c] border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-400">Subsurface O₂ Level:</span>
                  <span className="text-rose-400 font-bold">0.82 ml/L (Severely Hypoxic)</span>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden flex">
                  <div className="bg-rose-500 h-full w-[25%]" />
                  <div className="bg-amber-500 h-full w-[35%]" />
                  <div className="bg-emerald-500 h-full w-[40%]" />
                </div>
                <div className="text-[10px] text-slate-400 font-mono flex items-center justify-between">
                  <span>Depth Layer: 200m–750m</span>
                  <span className="text-rose-400 font-bold">Critical Alert</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-teal-400 font-semibold">
              <span className="text-slate-400 font-mono text-[11px]">Aanderaa Optode Sensor</span>
              <span className="flex items-center gap-1 hover:translate-x-1 transition-transform cursor-pointer">
                <span>OMZ Risk Map</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Card 3: Ocean Time Machine (Historical Warming Trends) */}
          <div className="lg:col-span-4 rounded-3xl bg-[#030914] border border-cyan-500/20 p-6 shadow-xl flex flex-col justify-between hover:border-cyan-400/40 transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-950 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
                  <History className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 font-semibold">
                  2004–2026 ARCHIVE
                </span>
              </div>

              <h3 className="text-xl font-bold text-white font-['Outfit',sans-serif] mb-2">
                Ocean Time Machine
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                Inspect 20+ years of vertical CTD profiles to visualize ocean heat content accumulation and deep thermocline shoaling over time.
              </p>

              {/* Multi-decadal metric comparison */}
              <div className="p-3.5 rounded-2xl bg-[#02050c] border border-slate-800 space-y-1.5 font-mono text-[11px]">
                <div className="flex items-center justify-between text-slate-400">
                  <span>2004 Heat Content:</span>
                  <span>Baseline 0.0 ZJ</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>2015 Anomaly:</span>
                  <span className="text-amber-400">+142 ZJ</span>
                </div>
                <div className="flex items-center justify-between text-white font-bold">
                  <span>Current 2026 Level:</span>
                  <span className="text-cyan-300">+284 ZJ (Record High)</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-indigo-400 font-semibold">
              <span className="text-slate-400 font-mono text-[11px]">Full Decadal Timeseries</span>
              <span className="flex items-center gap-1 hover:translate-x-1 transition-transform cursor-pointer">
                <span>Launch Replay</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

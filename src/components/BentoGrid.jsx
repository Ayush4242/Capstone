import React from 'react';
import CTDVisualizer from './CTDVisualizer';
import OceanTerminal from './OceanTerminal';
import {
  CloudRain,
  Wind,
  History,
  ArrowUpRight,
} from 'lucide-react';

export default function BentoGrid() {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-white text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-left max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold uppercase tracking-wider mb-4 font-mono shadow-xs">
            Scientific Observational Suite
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-['Outfit',sans-serif] mb-4">
            Engineered for Oceanographers. <br />
            <span className="text-sky-600">
              Powered by Live ARGO Floats.
            </span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
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
          {/* Card 1: Ocean–Monsoon Analyzer */}
          <div className="lg:col-span-4 rounded-2xl bg-white border border-slate-200 p-6 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
                  <CloudRain className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-700 font-semibold">
                  +0.84 POSITIVE IOD
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 font-['Outfit',sans-serif] mb-2">
                Ocean–Monsoon Analyzer
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                Investigate thermal dipoles across the western Arabian Sea and eastern equatorial Indian Ocean to anticipate monsoon rainfall patterns.
              </p>

              {/* Real metric bar */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-500">Western Basin SST:</span>
                  <span className="text-slate-900 font-bold">29.4°C (+0.8°C)</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden flex">
                  <div className="bg-sky-500 h-full w-[72%]" />
                </div>
                <div className="text-[10px] text-slate-600 font-mono flex items-center justify-between">
                  <span>Equatorial Wyrtki Jet Active</span>
                  <span>94% Confidence</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-sky-600 font-semibold">
              <span className="text-slate-500 font-mono text-[11px]">IOD Climatology</span>
              <span className="flex items-center gap-1 hover:translate-x-0.5 transition-transform cursor-pointer">
                <span>View Correlation</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Card 2: Oxygen Depletion & Hypoxia Sentinel */}
          <div className="lg:col-span-4 rounded-2xl bg-white border border-slate-200 p-6 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
                  <Wind className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-50 border border-rose-200 text-rose-700 font-semibold">
                  HYPOXIA THRESHOLD
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 font-['Outfit',sans-serif] mb-2">
                Oxygen Depletion Analysis
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                Map permanent and seasonal Oxygen Minimum Zones (OMZ). Monitor dissolved O₂ drops critical for benthic and pelagic marine life survival.
              </p>

              {/* Hypoxia Gauge */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-500">Subsurface O₂ Level:</span>
                  <span className="text-rose-600 font-bold">0.82 ml/L (Hypoxic)</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden flex">
                  <div className="bg-rose-500 h-full w-[25%]" />
                  <div className="bg-amber-400 h-full w-[35%]" />
                  <div className="bg-emerald-500 h-full w-[40%]" />
                </div>
                <div className="text-[10px] text-slate-500 font-mono flex items-center justify-between">
                  <span>Layer: 200m–750m</span>
                  <span className="text-rose-600 font-medium">Critical Alert</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-sky-600 font-semibold">
              <span className="text-slate-500 font-mono text-[11px]">Aanderaa Optode</span>
              <span className="flex items-center gap-1 hover:translate-x-0.5 transition-transform cursor-pointer">
                <span>OMZ Risk Map</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Card 3: Ocean Time Machine */}
          <div className="lg:col-span-4 rounded-2xl bg-white border border-slate-200 p-6 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
                  <History className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700 font-semibold">
                  2004–2026 ARCHIVE
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 font-['Outfit',sans-serif] mb-2">
                Ocean Time Machine
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                Inspect 20+ years of vertical CTD profiles to visualize ocean heat content accumulation and deep thermocline shoaling over time.
              </p>

              {/* Multi-decadal metric comparison */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 font-mono text-[11px]">
                <div className="flex items-center justify-between text-slate-500">
                  <span>2004 Heat Content:</span>
                  <span>Baseline 0.0 ZJ</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>2015 Anomaly:</span>
                  <span className="text-amber-600">+142 ZJ</span>
                </div>
                <div className="flex items-center justify-between text-slate-900 font-bold">
                  <span>Current 2026 Level:</span>
                  <span className="text-sky-700">+284 ZJ</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-sky-600 font-semibold">
              <span className="text-slate-500 font-mono text-[11px]">Full Decadal Archive</span>
              <span className="flex items-center gap-1 hover:translate-x-0.5 transition-transform cursor-pointer">
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

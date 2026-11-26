import React, { useState } from 'react';
import {
  X,
  Compass,
  Gauge,
  Waves,
  Droplets,
  Calendar,
  MapPin,
  Activity,
  Layers,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export default function FloatDetailsPanel({
  float,
  isOpen,
  onClose,
  onViewChartsSection,
}) {
  if (!isOpen || !float) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-[1000] w-full max-w-md bg-[#020617]/98 backdrop-blur-2xl border-l border-cyan-500/30 shadow-2xl p-6 sm:p-7 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
      <div className="space-y-6">
        {/* Panel Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-white font-mono">
                  {float.id}
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 font-semibold">
                  ACTIVE
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                {float.platform} • WMO #{float.wmo}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
            title="Close details drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Float Overview */}
        <div className="space-y-2.5">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block">
            Position & Telemetry Metadata
          </span>
          <div className="p-4 rounded-2xl bg-[#030914] border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>Coordinates:</span>
              </span>
              <span className="font-mono text-white font-semibold">
                {float.lat.toFixed(2)}°N, {float.lng.toFixed(2)}°E
              </span>
            </div>

            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-teal-400" />
                <span>Last Observation:</span>
              </span>
              <span className="font-mono text-cyan-200">
                {float.lastObservationDate}
              </span>
            </div>

            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-indigo-400" />
                <span>Profiling Cycle:</span>
              </span>
              <span className="font-mono text-white">
                Cycle #{float.cycleNumber} (10-Day Interval)
              </span>
            </div>

            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>QC Validation:</span>
              </span>
              <span className="text-emerald-300 font-mono text-[11px]">
                {float.qcFlag}
              </span>
            </div>
          </div>
        </div>

        {/* Latest Measurements Grid */}
        <div className="space-y-2.5">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block">
            Latest Surface & Core Measurements
          </span>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-[#030914] border border-cyan-500/15">
              <div className="text-[10px] font-mono text-slate-400 flex items-center justify-between mb-1">
                <span>Surface Temp</span>
                <Gauge className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <div className="text-xl font-black text-white font-mono">
                {float.surfaceTemp}°C
              </div>
              <span className="text-[10px] text-teal-300 font-mono">In-situ CTD</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#030914] border border-cyan-500/15">
              <div className="text-[10px] font-mono text-slate-400 flex items-center justify-between mb-1">
                <span>Practical Salinity</span>
                <Waves className="w-3.5 h-3.5 text-sky-400" />
              </div>
              <div className="text-xl font-black text-white font-mono">
                {float.surfaceSalinity} <span className="text-xs font-sans text-slate-400">PSU</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Conductivity Cell</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#030914] border border-cyan-500/15">
              <div className="text-[10px] font-mono text-slate-400 flex items-center justify-between mb-1">
                <span>Maximum Depth</span>
                <Activity className="w-3.5 h-3.5 text-indigo-400" />
              </div>
              <div className="text-xl font-black text-white font-mono">
                {float.maxDepth} <span className="text-xs font-sans text-slate-400">meters</span>
              </div>
              <span className="text-[10px] text-indigo-300 font-mono">Bathypelagic</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#030914] border border-cyan-500/15">
              <div className="text-[10px] font-mono text-slate-400 flex items-center justify-between mb-1">
                <span>Dissolved O₂</span>
                <Droplets className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div className="text-xl font-black text-white font-mono">
                {float.dissolvedOxygen || '--'} <span className="text-xs font-sans text-slate-400">ml/L</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono">Aanderaa Optode</span>
            </div>
          </div>
        </div>

        {/* Scientific Summary */}
        <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/25 space-y-1">
          <span className="text-[11px] font-mono text-cyan-300 font-bold uppercase tracking-wider block">
            Oceanographic Note
          </span>
          <p className="text-xs text-slate-300 leading-relaxed">
            {float.summary}
          </p>
        </div>

        {/* Historical Trajectory Coordinates Table */}
        {float.trajectory && float.trajectory.length > 0 && (
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block">
              10-Day Drift Trajectory ({float.trajectory.length} fixes)
            </span>
            <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
              {float.trajectory.map((t, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] font-mono"
                >
                  <span className="text-slate-400">Cycle #{t.cycle} ({t.date})</span>
                  <span className="text-cyan-300 font-semibold">{t.lat.toFixed(2)}°N, {t.lng.toFixed(2)}°E</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Drawer Action Footer */}
      <div className="pt-6 border-t border-slate-800 space-y-2">
        <button
          onClick={() => {
            onClose();
            if (onViewChartsSection) onViewChartsSection();
          }}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all"
        >
          <span>Visualize Full Depth Profile</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

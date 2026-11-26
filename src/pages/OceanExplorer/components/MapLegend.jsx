import React from 'react';
import { Layers, Info, HelpCircle } from 'lucide-react';

export default function MapLegend({ visualizationMode, onOpenInfoModal }) {
  return (
    <div className="p-3.5 rounded-2xl bg-[#020617]/90 backdrop-blur-xl border border-cyan-500/25 shadow-2xl text-xs space-y-2.5 max-w-xs">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span>Map Legend</span>
        </span>
        <button
          onClick={onOpenInfoModal}
          className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 text-[10px] font-mono cursor-pointer"
          title="Learn what ARGO profiling floats are"
        >
          <HelpCircle className="w-3 h-3" />
          <span>What is ARGO?</span>
        </button>
      </div>

      {/* Mode-specific Legend */}
      {visualizationMode === 'locations' && (
        <div className="space-y-1.5 text-[11px] text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-cyan-400 border border-white/50 shadow-[0_0_8px_#22d3ee] shrink-0" />
            <span>Available ARGO Profiling Float</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-amber-400 border border-white/80 shadow-[0_0_10px_#f59e0b] shrink-0 animate-pulse" />
            <span className="font-semibold text-amber-300">Currently Selected Float</span>
          </div>
          <div className="flex items-center gap-2 pt-1 text-[10px] text-slate-400">
            <span className="w-5 h-0.5 border-t border-dashed border-cyan-400 shrink-0" />
            <span>10-Day Subsurface Trajectory</span>
          </div>
        </div>
      )}

      {visualizationMode === 'temperature' && (
        <div className="space-y-1.5 text-[11px]">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
            Sea Surface Temp (°C)
          </span>
          <div className="h-2 w-full rounded-full bg-gradient-to-r from-sky-400 via-teal-400 via-amber-400 to-rose-500 shadow-inner" />
          <div className="flex justify-between text-[10px] font-mono text-slate-400">
            <span>&lt; 5°C Polar</span>
            <span>15°C</span>
            <span>&gt; 28°C Tropical</span>
          </div>
        </div>
      )}

      {visualizationMode === 'salinity' && (
        <div className="space-y-1.5 text-[11px]">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
            Practical Salinity (PSU)
          </span>
          <div className="h-2 w-full rounded-full bg-gradient-to-r from-cyan-300 via-blue-500 to-indigo-600 shadow-inner" />
          <div className="flex justify-between text-[10px] font-mono text-slate-400">
            <span>&lt; 33 River plume</span>
            <span>35.0 Standard</span>
            <span>&gt; 36.5 Evaporative</span>
          </div>
        </div>
      )}

      {visualizationMode === 'oxygen' && (
        <div className="space-y-1.5 text-[11px]">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
            Dissolved Oxygen (ml/L)
          </span>
          <div className="h-2 w-full rounded-full bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-400 shadow-inner" />
          <div className="flex justify-between text-[10px] font-mono text-slate-400">
            <span className="text-rose-400 font-semibold">&lt; 1.4 Hypoxic</span>
            <span>3.5 Moderate</span>
            <span className="text-emerald-400 font-semibold">&gt; 5.5 High</span>
          </div>
        </div>
      )}
    </div>
  );
}

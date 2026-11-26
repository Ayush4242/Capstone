import React from 'react';
import { Layers, HelpCircle } from 'lucide-react';

export default function MapLegend({ visualizationMode, onOpenInfoModal }) {
  return (
    <div className="p-3 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-md text-xs space-y-2 max-w-xs text-slate-800">
      <div className="flex items-center justify-between gap-4 pb-1.5 border-b border-slate-100">
        <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
          <Layers className="w-3 h-3 text-slate-500" />
          <span>Map Legend</span>
        </span>
        <button
          onClick={onOpenInfoModal}
          className="text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1 text-[10px] font-mono cursor-pointer"
          title="Learn what ARGO profiling floats are"
        >
          <HelpCircle className="w-3 h-3" />
          <span>What is ARGO?</span>
        </button>
      </div>

      {/* Mode-specific Legend */}
      {visualizationMode === 'locations' && (
        <div className="space-y-1.5 text-[11px] text-slate-700">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-sky-500 border border-white shrink-0" />
            <span>Active Profiling Float</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-amber-500 border border-white shrink-0" />
            <span className="font-medium text-amber-800">Selected Float</span>
          </div>
          <div className="flex items-center gap-2 pt-0.5 text-[10px] text-slate-500">
            <span className="w-4 h-0.5 border-t border-dashed border-sky-500 shrink-0" />
            <span>10-Day Drift Trajectory</span>
          </div>
        </div>
      )}

      {visualizationMode === 'temperature' && (
        <div className="space-y-1.5 text-[11px]">
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
            Sea Surface Temp (°C)
          </span>
          <div className="h-1.5 w-full rounded-full bg-gradient-to-r from-sky-400 via-teal-400 via-amber-400 to-rose-500" />
          <div className="flex justify-between text-[10px] font-mono text-slate-500">
            <span>&lt; 5°C</span>
            <span>15°C</span>
            <span>&gt; 28°C</span>
          </div>
        </div>
      )}

      {visualizationMode === 'salinity' && (
        <div className="space-y-1.5 text-[11px]">
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
            Practical Salinity (PSU)
          </span>
          <div className="h-1.5 w-full rounded-full bg-gradient-to-r from-cyan-300 via-blue-500 to-indigo-600" />
          <div className="flex justify-between text-[10px] font-mono text-slate-500">
            <span>&lt; 33 PSU</span>
            <span>35.0</span>
            <span>&gt; 36.5 PSU</span>
          </div>
        </div>
      )}

      {visualizationMode === 'oxygen' && (
        <div className="space-y-1.5 text-[11px]">
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
            Dissolved Oxygen (ml/L)
          </span>
          <div className="h-1.5 w-full rounded-full bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-400" />
          <div className="flex justify-between text-[10px] font-mono text-slate-500">
            <span className="text-rose-600">&lt; 1.4 (Hypoxia)</span>
            <span>3.5</span>
            <span className="text-emerald-700">&gt; 5.5</span>
          </div>
        </div>
      )}
    </div>
  );
}

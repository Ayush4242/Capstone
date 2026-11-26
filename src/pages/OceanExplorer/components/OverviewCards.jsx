import React from 'react';
import { Compass, Globe2, Activity, Gauge, Waves, Droplets, Info } from 'lucide-react';

export default function OverviewCards({ statistics }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Card 1: Available ARGO Floats */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#030914] border border-cyan-500/20 shadow-lg relative overflow-hidden flex flex-col justify-between">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-medium">
            Active ARGO Floats
          </span>
          <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Compass className="w-4 h-4" />
          </div>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
            {statistics.totalFloats}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-teal-300 font-mono mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Autonomous profilers in view</span>
          </div>
        </div>
      </div>

      {/* Card 2: Ocean Regions Explored */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#030914] border border-cyan-500/20 shadow-lg relative overflow-hidden flex flex-col justify-between">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-medium">
            Ocean Basins Monitored
          </span>
          <div className="w-8 h-8 rounded-lg bg-blue-950/80 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Globe2 className="w-4 h-4" />
          </div>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
            {statistics.uniqueRegions} <span className="text-xs font-sans text-slate-400 font-normal">Basins</span>
          </div>
          <div className="text-[11px] text-slate-400 font-mono mt-1">
            Global coverage across coordinates
          </div>
        </div>
      </div>

      {/* Card 3: Available Ocean Observations */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#030914] border border-cyan-500/20 shadow-lg relative overflow-hidden flex flex-col justify-between">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-medium">
            CTD Profile Points
          </span>
          <div className="w-8 h-8 rounded-lg bg-indigo-950/80 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Activity className="w-4 h-4" />
          </div>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
            {statistics.totalObservations}
          </div>
          <div className="text-[11px] text-cyan-300 font-mono mt-1">
            0m to 2,000m discrete levels
          </div>
        </div>
      </div>

      {/* Card 4: Selected Region's Latest Measurements */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#030914] border border-cyan-500/20 shadow-lg relative overflow-hidden flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-medium truncate max-w-[170px]">
            {statistics.selectedRegionName}
          </span>
          <div className="w-8 h-8 rounded-lg bg-teal-950/80 border border-teal-500/30 flex items-center justify-center text-teal-400">
            <Gauge className="w-4 h-4" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 text-left pt-1">
          <div>
            <span className="text-[10px] font-mono text-slate-400 block">SST</span>
            <span className="text-base font-bold text-cyan-300 font-mono">{statistics.avgTemp}°C</span>
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 block">Salinity</span>
            <span className="text-base font-bold text-sky-300 font-mono">{statistics.avgSalinity}</span>
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 block">Dissolved O₂</span>
            <span className="text-base font-bold text-emerald-300 font-mono">{statistics.avgOxygen}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

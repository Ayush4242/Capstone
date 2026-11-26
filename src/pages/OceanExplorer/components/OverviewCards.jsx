import React from 'react';
import { Compass, Globe2, Activity, Gauge } from 'lucide-react';

export default function OverviewCards({ statistics }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Card 1: Available ARGO Floats */}
      <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-medium">
            Active Floats in View
          </span>
          <Compass className="w-4 h-4 text-slate-400" />
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono tracking-tight tabular-nums">
            {statistics.totalFloats}
          </div>
          <div className="text-[11px] text-slate-600 font-mono mt-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Autonomous CTD profilers reporting</span>
          </div>
        </div>
      </div>

      {/* Card 2: Ocean Regions Explored */}
      <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-medium">
            Basins Monitored
          </span>
          <Globe2 className="w-4 h-4 text-slate-400" />
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono tracking-tight tabular-nums">
            {statistics.uniqueRegions} <span className="text-xs font-sans text-slate-500 font-normal">Basins</span>
          </div>
          <div className="text-[11px] text-slate-600 font-mono mt-1">
            Global ocean observation sectors
          </div>
        </div>
      </div>

      {/* Card 3: Available Ocean Observations */}
      <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-medium">
            Depth Soundings
          </span>
          <Activity className="w-4 h-4 text-slate-400" />
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono tracking-tight tabular-nums">
            {statistics.totalObservations}
          </div>
          <div className="text-[11px] text-slate-600 font-mono mt-1">
            Standard 0m–2000m discrete levels
          </div>
        </div>
      </div>

      {/* Card 4: Selected Region's Latest Measurements */}
      <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-medium truncate max-w-[170px]">
            {statistics.selectedRegionName}
          </span>
          <Gauge className="w-4 h-4 text-slate-400" />
        </div>
        <div className="grid grid-cols-3 gap-2 text-left pt-1 font-mono">
          <div>
            <span className="text-[10px] text-slate-400 block">SST</span>
            <span className="text-base font-bold text-slate-900">{statistics.avgTemp}°C</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block">Salinity</span>
            <span className="text-base font-bold text-slate-900">{statistics.avgSalinity}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block">O₂ (ml/L)</span>
            <span className="text-base font-bold text-slate-900">{statistics.avgOxygen}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

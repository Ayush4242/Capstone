import React from 'react';
import { Compass, Globe2, Activity, Gauge } from 'lucide-react';

export default function OverviewCards({ statistics }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Card 1: Available ARGO Floats */}
      <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Active Floats in View
          </span>
          <Compass className="w-4 h-4 text-sky-600" />
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-['Outfit',sans-serif] tracking-tight tabular-nums">
            {statistics.totalFloats}
          </div>
          <div className="text-xs text-slate-600 mt-1.5 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Active ARGO profilers reporting</span>
          </div>
        </div>
      </div>

      {/* Card 2: Ocean Regions Explored */}
      <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Ocean Regions
          </span>
          <Globe2 className="w-4 h-4 text-sky-600" />
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-['Outfit',sans-serif] tracking-tight tabular-nums">
            {statistics.uniqueRegions} <span className="text-sm font-sans text-slate-500 font-normal">Basins</span>
          </div>
          <div className="text-xs text-slate-600 mt-1.5">
            Major global ocean sectors
          </div>
        </div>
      </div>

      {/* Card 3: Available Ocean Observations */}
      <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Depth Readings
          </span>
          <Activity className="w-4 h-4 text-sky-600" />
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-['Outfit',sans-serif] tracking-tight tabular-nums">
            {statistics.totalObservations}
          </div>
          <div className="text-xs text-slate-600 mt-1.5">
            Recorded from 0m to 2,000m
          </div>
        </div>
      </div>

      {/* Card 4: Selected Region's Latest Measurements */}
      <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 truncate max-w-[180px]">
            {statistics.selectedRegionName}
          </span>
          <Gauge className="w-4 h-4 text-sky-600" />
        </div>
        <div className="grid grid-cols-3 gap-2 text-left pt-1">
          <div>
            <span className="text-xs text-slate-500 block">Temp</span>
            <span className="text-lg font-bold text-slate-900 font-['Outfit',sans-serif] tabular-nums">{statistics.avgTemp}°C</span>
          </div>
          <div>
            <span className="text-xs text-slate-500 block">Salinity</span>
            <span className="text-lg font-bold text-slate-900 font-['Outfit',sans-serif] tabular-nums">{statistics.avgSalinity}</span>
          </div>
          <div>
            <span className="text-xs text-slate-500 block">Oxygen</span>
            <span className="text-lg font-bold text-slate-900 font-['Outfit',sans-serif] tabular-nums">{statistics.avgOxygen}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

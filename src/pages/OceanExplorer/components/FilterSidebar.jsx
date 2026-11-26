import React from 'react';
import { Filter, RotateCcw, Calendar, CheckSquare, Search, ShieldCheck } from 'lucide-react';
import { OCEAN_REGIONS } from '../data/regionsData';

export default function FilterSidebar({
  filters,
  setFilters,
  onResetFilters,
  totalResults,
}) {
  const handleRegionChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      region: e.target.value,
    }));
  };

  const handleInputChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleParameterToggle = (param) => {
    setFilters((prev) => ({
      ...prev,
      parameters: {
        ...prev.parameters,
        [param]: !prev.parameters[param],
      },
    }));
  };

  return (
    <div className="rounded-3xl bg-[#030914] border border-cyan-500/20 p-5 sm:p-6 shadow-xl space-y-5 text-xs text-slate-300">
      {/* Filter Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-slate-800">
        <div className="flex items-center gap-2 text-white font-bold font-['Outfit',sans-serif] text-sm">
          <Filter className="w-4 h-4 text-cyan-400" />
          <span>Scientific Filters</span>
        </div>
        <span className="font-mono text-[10px] text-cyan-300 px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30">
          {totalResults} floats in view
        </span>
      </div>

      {/* 1. Ocean Basin Selector */}
      <div className="space-y-1.5">
        <label className="text-slate-400 font-mono text-[11px] block font-medium">
          Ocean Basin
        </label>
        <select
          value={filters.region}
          onChange={handleRegionChange}
          className="w-full px-3 py-2 rounded-xl bg-[#020611] border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-cyan-400 transition-colors"
        >
          <option value="all">All Global Basins</option>
          {OCEAN_REGIONS.slice(1).map((reg) => (
            <option key={reg.id} value={reg.id}>
              {reg.name}
            </option>
          ))}
        </select>
      </div>

      {/* 2. Float Identifier Search */}
      <div className="space-y-1.5">
        <label className="text-slate-400 font-mono text-[11px] block font-medium">
          WMO Float Identifier
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="e.g. 2902634 or WMO-4902183"
            value={filters.floatIdQuery}
            onChange={(e) => handleInputChange('floatIdQuery', e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-[#020611] border border-slate-800 text-white placeholder-slate-500 text-xs font-mono focus:outline-none focus:border-cyan-400 transition-colors"
          />
        </div>
      </div>

      {/* 3. Date Range */}
      <div className="space-y-1.5">
        <label className="text-slate-400 font-mono text-[11px] block font-medium">
          Observation Date Range
        </label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="text-[10px] text-slate-500 block mb-0.5">From</span>
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => handleInputChange('startDate', e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg bg-[#020611] border border-slate-800 text-slate-200 text-[11px] font-mono focus:outline-none focus:border-cyan-400"
            />
          </div>
          <div>
            <span className="text-[10px] text-slate-500 block mb-0.5">To</span>
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => handleInputChange('endDate', e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg bg-[#020611] border border-slate-800 text-slate-200 text-[11px] font-mono focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>
      </div>

      {/* 4. Minimum Profile Depth (dbar/m) */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-slate-400 font-mono text-[11px]">
          <span>Min Recorded Depth</span>
          <span className="text-cyan-300 font-bold">{filters.minDepth}m</span>
        </div>
        <input
          type="range"
          min="0"
          max="2000"
          step="100"
          value={filters.minDepth}
          onChange={(e) => handleInputChange('minDepth', parseInt(e.target.value, 10))}
          className="w-full accent-cyan-400 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] font-mono text-slate-500">
          <span>0m</span>
          <span>1,000m</span>
          <span>2,000m</span>
        </div>
      </div>

      {/* 5. Parameter Selection */}
      <div className="space-y-2">
        <span className="text-slate-400 font-mono text-[11px] block font-medium">
          Physical Parameters Included
        </span>
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white">
            <input
              type="checkbox"
              checked={filters.parameters.temperature}
              onChange={() => handleParameterToggle('temperature')}
              className="rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-0"
            />
            <span>Temperature Profile (°C)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white">
            <input
              type="checkbox"
              checked={filters.parameters.salinity}
              onChange={() => handleParameterToggle('salinity')}
              className="rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-0"
            />
            <span>Practical Salinity (PSU)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white">
            <input
              type="checkbox"
              checked={filters.parameters.oxygen}
              onChange={() => handleParameterToggle('oxygen')}
              className="rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-0"
            />
            <span>Dissolved Oxygen (ml/L)</span>
          </label>
        </div>
      </div>

      {/* 6. Data Quality Control Filter */}
      <div className="space-y-1.5">
        <label className="text-slate-400 font-mono text-[11px] block font-medium">
          Data Quality Threshold
        </label>
        <select
          value={filters.qualityFilter}
          onChange={(e) => handleInputChange('qualityFilter', e.target.value)}
          className="w-full px-3 py-2 rounded-xl bg-[#020611] border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-cyan-400"
        >
          <option value="all">All QC Stages (Level 1 & 2)</option>
          <option value="level1">Level 1 - Calibrated & Validated Only</option>
        </select>
      </div>

      {/* Reset Filter Button */}
      <div className="pt-2">
        <button
          onClick={onResetFilters}
          className="w-full py-2.5 rounded-xl border border-slate-800 hover:border-cyan-500/40 bg-slate-950 hover:bg-slate-900 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Filters</span>
        </button>
      </div>
    </div>
  );
}

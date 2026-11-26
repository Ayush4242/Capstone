import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';
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
    <div className="rounded-2xl bg-[#0c1017] border border-white/[0.08] p-5 shadow-sm space-y-4 text-xs text-slate-300">
      {/* Filter Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-2 text-white font-semibold text-sm">
          <Filter className="w-4 h-4 text-slate-400" />
          <span>Filters</span>
        </div>
        <span className="font-mono text-[10px] text-slate-400 px-2 py-0.5 rounded bg-slate-900 border border-white/[0.06]">
          {totalResults} matching
        </span>
      </div>

      {/* 1. Ocean Basin Selector */}
      <div className="space-y-1">
        <label className="text-slate-400 font-mono text-[11px] block">
          Ocean Basin
        </label>
        <select
          value={filters.region}
          onChange={handleRegionChange}
          className="w-full px-3 py-1.5 rounded-lg bg-[#07090e] border border-white/[0.1] text-slate-200 text-xs font-mono focus:outline-none focus:border-slate-400 transition-colors"
        >
          <option value="all">All Global Basins</option>
          {OCEAN_REGIONS.slice(1).map((reg) => (
            <option key={reg.id} value={reg.id}>
              {reg.name}
            </option>
          ))}
        </select>
      </div>

      {/* 2. Float ID Query */}
      <div className="space-y-1">
        <label className="text-slate-400 font-mono text-[11px] block">
          WMO Float Identifier
        </label>
        <input
          type="text"
          placeholder="e.g. 2902634 or WMO-4902183"
          value={filters.floatIdQuery}
          onChange={(e) => handleInputChange('floatIdQuery', e.target.value)}
          className="w-full px-3 py-1.5 rounded-lg bg-[#07090e] border border-white/[0.1] text-slate-200 placeholder-slate-600 text-xs font-mono focus:outline-none focus:border-slate-400"
        />
      </div>

      {/* 3. Observation Date Range */}
      <div className="space-y-1">
        <label className="text-slate-400 font-mono text-[11px] block">
          Date Range
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) => handleInputChange('startDate', e.target.value)}
            className="w-full px-2 py-1 rounded-md bg-[#07090e] border border-white/[0.1] text-slate-300 text-[11px] font-mono focus:outline-none focus:border-slate-400"
          />
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) => handleInputChange('endDate', e.target.value)}
            className="w-full px-2 py-1 rounded-md bg-[#07090e] border border-white/[0.1] text-slate-300 text-[11px] font-mono focus:outline-none focus:border-slate-400"
          />
        </div>
      </div>

      {/* 4. Minimum Profile Depth */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-slate-400 font-mono text-[11px]">
          <span>Min Depth</span>
          <span className="text-slate-200 font-medium">{filters.minDepth}m</span>
        </div>
        <input
          type="range"
          min="0"
          max="2000"
          step="100"
          value={filters.minDepth}
          onChange={(e) => handleInputChange('minDepth', parseInt(e.target.value, 10))}
          className="w-full accent-slate-300 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] font-mono text-slate-500">
          <span>0m</span>
          <span>1,000m</span>
          <span>2,000m</span>
        </div>
      </div>

      {/* 5. Parameter Selection */}
      <div className="space-y-1.5">
        <span className="text-slate-400 font-mono text-[11px] block">
          Parameters Included
        </span>
        <div className="space-y-1">
          <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white">
            <input
              type="checkbox"
              checked={filters.parameters.temperature}
              onChange={() => handleParameterToggle('temperature')}
              className="rounded border-slate-700 bg-slate-900 text-sky-500 focus:ring-0"
            />
            <span>Temperature Profile (°C)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white">
            <input
              type="checkbox"
              checked={filters.parameters.salinity}
              onChange={() => handleParameterToggle('salinity')}
              className="rounded border-slate-700 bg-slate-900 text-sky-500 focus:ring-0"
            />
            <span>Practical Salinity (PSU)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white">
            <input
              type="checkbox"
              checked={filters.parameters.oxygen}
              onChange={() => handleParameterToggle('oxygen')}
              className="rounded border-slate-700 bg-slate-900 text-sky-500 focus:ring-0"
            />
            <span>Dissolved Oxygen (ml/L)</span>
          </label>
        </div>
      </div>

      {/* 6. Quality Filter */}
      <div className="space-y-1">
        <label className="text-slate-400 font-mono text-[11px] block">
          Quality Control
        </label>
        <select
          value={filters.qualityFilter}
          onChange={(e) => handleInputChange('qualityFilter', e.target.value)}
          className="w-full px-3 py-1.5 rounded-lg bg-[#07090e] border border-white/[0.1] text-slate-200 text-xs font-mono focus:outline-none focus:border-slate-400"
        >
          <option value="all">All QC Stages (Level 1 & 2)</option>
          <option value="level1">Level 1 - Calibrated & Validated Only</option>
        </select>
      </div>

      {/* Reset Filter Button */}
      <div className="pt-2">
        <button
          onClick={onResetFilters}
          className="w-full py-2 rounded-lg border border-white/[0.08] hover:border-white/20 bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-medium flex items-center justify-center gap-2 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Filters</span>
        </button>
      </div>
    </div>
  );
}

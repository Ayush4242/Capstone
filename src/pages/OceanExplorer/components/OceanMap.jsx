import React, { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import MapLegend from './MapLegend';
import {
  RotateCcw,
  Search,
  Maximize2,
  Compass,
  X,
  Layers,
  Thermometer,
  Waves,
  Droplets,
  HelpCircle,
  Eye,
} from 'lucide-react';
import { OCEAN_REGIONS } from '../data/regionsData';

// Map Recenter Controller Sub-component
function MapRecenter({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center && zoom) {
      map.flyTo(center, zoom, { duration: 1.2 });
    }
  }, [center, zoom, map]);
  return null;
}

// Marker Color Generator based on active visualization mode
function getMarkerColor(float, mode, isSelected) {
  if (isSelected) return '#f59e0b'; // Radiant amber/orange for selected

  if (mode === 'temperature') {
    const t = float.surfaceTemp;
    if (t < 5) return '#38bdf8'; // Arctic/Antarctic blue
    if (t < 18) return '#14b8a6'; // Temperate teal
    if (t < 26) return '#f59e0b'; // Warm amber
    return '#ef4444'; // Tropical hot red
  }

  if (mode === 'salinity') {
    const s = float.surfaceSalinity;
    if (s < 34.0) return '#67e8f9'; // Low salinity plume
    if (s < 35.8) return '#0ea5e9'; // Typical ocean water
    return '#818cf8'; // High evaporation salinity
  }

  if (mode === 'oxygen') {
    const o = float.dissolvedOxygen;
    if (!o || o < 2.0) return '#f43f5e'; // Hypoxic danger
    if (o < 5.0) return '#38bdf8'; // Moderate
    return '#10b981'; // Saturated oxygen
  }

  return '#06b6d4'; // Default cyan
}

// Custom Leaflet DivIcon Maker
function createFloatIcon(float, mode, isSelected) {
  const color = getMarkerColor(float, mode, isSelected);
  const size = isSelected ? 28 : 20;

  const html = `
    <div style="position: relative; width: ${size}px; height: ${size}px; display: flex; align-items: center; justify-content: center;">
      ${
        isSelected
          ? `<div style="position: absolute; inset: -6px; border-radius: 9999px; background-color: ${color}; opacity: 0.4; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>`
          : ''
      }
      <div style="
        width: ${size}px; 
        height: ${size}px; 
        border-radius: 9999px; 
        background: ${color}; 
        border: 2px solid #ffffff; 
        box-shadow: 0 0 12px ${color}, inset 0 1px 2px rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="width: 5px; height: 5px; border-radius: 9999px; background: #ffffff;"></div>
      </div>
    </div>
  `;

  return L.divIcon({
    className: 'custom-argo-marker',
    html,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  });
}

export default function OceanMap({
  floats,
  selectedFloat,
  onSelectFloat,
  visualizationMode,
  setVisualizationMode,
  selectedRegion,
  onSelectRegion,
  mapCenter,
  mapZoom,
  onResetGlobalView,
  onOpenInfoModal,
}) {
  const [showWelcome, setShowWelcome] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle Search Input (Region name or coordinate lat, lng)
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // Check if coordinates entered: e.g. "16.5, 64.5"
    const coordMatch = searchQuery.match(/^(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)$/);
    if (coordMatch) {
      const lat = parseFloat(coordMatch[1]);
      const lng = parseFloat(coordMatch[3]);
      onSelectRegion('custom');
      // Pan to coords
      // (handled through custom search state if needed)
      return;
    }

    // Search matched ocean region
    const matched = OCEAN_REGIONS.find(
      (r) =>
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.label.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (matched) {
      onSelectRegion(matched.id);
      setSearchQuery('');
    }
  };

  // Trajectory points for the currently selected float
  const trajectoryPositions = useMemo(() => {
    if (!selectedFloat || !selectedFloat.trajectory) return [];
    return selectedFloat.trajectory.map((p) => [p.lat, p.lng]);
  }, [selectedFloat]);

  return (
    <div className="relative w-full h-[620px] rounded-3xl overflow-hidden border border-cyan-500/25 shadow-2xl bg-[#020617] flex flex-col">
      {/* Top Map Control Bar */}
      <div className="absolute top-4 left-4 right-4 z-[400] flex flex-col md:flex-row items-center justify-between gap-3 pointer-events-none">
        {/* Left: Region Search & Quick Shortcuts */}
        <div className="flex flex-wrap items-center gap-2 pointer-events-auto w-full md:w-auto">
          <form onSubmit={handleSearch} className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-cyan-400">
              <Search className="w-3.5 h-3.5" />
            </div>
            <input
              type="text"
              placeholder="Search region or coords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#020617]/90 border border-cyan-500/30 text-white placeholder-slate-400 text-xs font-mono backdrop-blur-xl focus:outline-none focus:border-cyan-300 shadow-xl"
            />
          </form>

          {/* Quick Region Shortcuts */}
          <div className="hidden sm:flex items-center gap-1 p-1 rounded-xl bg-[#020617]/90 border border-cyan-500/20 backdrop-blur-xl shadow-xl">
            {OCEAN_REGIONS.slice(1, 5).map((reg) => (
              <button
                key={reg.id}
                onClick={() => onSelectRegion(reg.id)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all ${
                  selectedRegion.id === reg.id
                    ? 'bg-cyan-500 text-black font-bold shadow-md shadow-cyan-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {reg.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Layer Mode Selector & Reset Control */}
        <div className="flex items-center gap-2 pointer-events-auto self-end md:self-auto">
          {/* Layer Selector */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-[#020617]/90 border border-cyan-500/25 backdrop-blur-xl shadow-xl text-xs">
            <button
              onClick={() => setVisualizationMode('locations')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                visualizationMode === 'locations'
                  ? 'bg-cyan-500 text-black font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Show standard ARGO float markers"
            >
              Float Locations
            </button>
            <button
              onClick={() => setVisualizationMode('temperature')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                visualizationMode === 'temperature'
                  ? 'bg-cyan-500 text-black font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Color-code floats by Sea Surface Temperature"
            >
              Temperature
            </button>
            <button
              onClick={() => setVisualizationMode('salinity')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                visualizationMode === 'salinity'
                  ? 'bg-cyan-500 text-black font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Color-code floats by Practical Salinity"
            >
              Salinity
            </button>
            <button
              onClick={() => setVisualizationMode('oxygen')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                visualizationMode === 'oxygen'
                  ? 'bg-cyan-500 text-black font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Color-code floats by Dissolved Oxygen"
            >
              Dissolved O₂
            </button>
          </div>

          {/* Reset Global View Button */}
          <button
            onClick={onResetGlobalView}
            className="p-2 rounded-xl bg-[#020617]/90 border border-cyan-500/25 text-slate-300 hover:text-white hover:border-cyan-400 backdrop-blur-xl shadow-xl transition-all"
            title="Reset to global world view"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Dismissible First-Time User Welcome Overlay */}
      {showWelcome && (
        <div className="absolute top-18 left-4 right-4 sm:left-auto sm:right-4 z-[400] max-w-sm p-3.5 rounded-2xl bg-[#030914]/95 backdrop-blur-xl border border-cyan-400/40 shadow-2xl text-xs space-y-1.5 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-cyan-300 font-bold flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span>Interactive Ocean Map Guide</span>
            </span>
            <button
              onClick={() => setShowWelcome(false)}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            Select any float marker to explore its real vertical ocean depth profile, or search regions above.
          </p>
        </div>
      )}

      {/* Leaflet Interactive Map Container */}
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        minZoom={2}
        maxZoom={12}
        scrollWheelZoom={true}
        className="w-full h-full z-0"
        style={{ background: '#020617' }}
      >
        <MapRecenter center={mapCenter} zoom={mapZoom} />

        {/* High-Contrast Scientific Dark Ocean Tiles */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://argo.ucsd.edu/">ARGO GDAC</a>'
          subdomains="abcd"
          maxZoom={19}
        />

        {/* Selected Float Trajectory Polyline */}
        {trajectoryPositions.length > 1 && (
          <Polyline
            positions={trajectoryPositions}
            pathOptions={{
              color: '#22d3ee',
              weight: 2.5,
              dashArray: '5, 5',
              opacity: 0.85,
            }}
          />
        )}

        {/* ARGO Float Markers */}
        {floats.map((float) => {
          const isSelected = selectedFloat && selectedFloat.id === float.id;
          const icon = createFloatIcon(float, visualizationMode, isSelected);

          return (
            <Marker
              key={float.id}
              position={[float.lat, float.lng]}
              icon={icon}
              eventHandlers={{
                click: () => onSelectFloat(float.id),
              }}
            >
              {/* Informative Hover Tooltip */}
              <Tooltip direction="top" offset={[0, -12]} opacity={1}>
                <div className="p-2 rounded-xl bg-[#020617] border border-cyan-500/40 text-slate-100 text-xs shadow-xl space-y-1 font-mono">
                  <div className="flex items-center justify-between gap-3 font-bold text-cyan-300">
                    <span>{float.id}</span>
                    <span className="text-[10px] text-teal-400 font-sans">{float.platform}</span>
                  </div>
                  <div className="text-[11px] text-slate-300 font-sans">
                    Region: <span className="text-white font-medium">{float.region}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[10px] pt-0.5 border-t border-slate-800">
                    <span>Temp: {float.surfaceTemp}°C</span>
                    <span>Sal: {float.surfaceSalinity} PSU</span>
                  </div>
                  <div className="text-[9px] text-slate-400">
                    Last update: {float.lastObservationDate}
                  </div>
                </div>
              </Tooltip>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Bottom Map Legend */}
      <div className="absolute bottom-4 left-4 z-[400]">
        <MapLegend
          visualizationMode={visualizationMode}
          onOpenInfoModal={onOpenInfoModal}
        />
      </div>

      {/* Bottom Right Selected Coordinates Badge */}
      <div className="absolute bottom-4 right-4 z-[400] px-3 py-1.5 rounded-xl bg-[#020617]/90 border border-cyan-500/20 backdrop-blur-xl text-[11px] font-mono text-slate-300 shadow-xl hidden sm:flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
        <span>Selected Region: {selectedRegion.label}</span>
      </div>
    </div>
  );
}

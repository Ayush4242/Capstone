import React, { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import MapLegend from './MapLegend';
import {
  RotateCcw,
  Search,
  Compass,
  X,
  Layers,
  HelpCircle,
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
  if (isSelected) return '#f59e0b'; // Crisp amber for selected

  if (mode === 'temperature') {
    const t = float.surfaceTemp;
    if (t < 5) return '#38bdf8'; // Polar blue
    if (t < 18) return '#14b8a6'; // Temperate teal
    if (t < 26) return '#f59e0b'; // Warm amber
    return '#ef4444'; // Hot red
  }

  if (mode === 'salinity') {
    const s = float.surfaceSalinity;
    if (s < 34.0) return '#38bdf8'; // Fresh
    if (s < 35.8) return '#0284c7'; // Standard
    return '#6366f1'; // High salinity
  }

  if (mode === 'oxygen') {
    const o = float.dissolvedOxygen;
    if (!o || o < 2.0) return '#f43f5e'; // Hypoxic
    if (o < 5.0) return '#38bdf8'; // Moderate
    return '#10b981'; // Well-oxygenated
  }

  return '#0ea5e9'; // Clean sky blue
}

// Custom Leaflet DivIcon Maker (Minimalist, Precision Engineering)
function createFloatIcon(float, mode, isSelected) {
  const color = getMarkerColor(float, mode, isSelected);
  const size = isSelected ? 22 : 16;

  const html = `
    <div style="position: relative; width: ${size}px; height: ${size}px; display: flex; align-items: center; justify-content: center;">
      <div style="
        width: ${size}px; 
        height: ${size}px; 
        border-radius: 9999px; 
        background: ${color}; 
        border: 2px solid #ffffff; 
        box-shadow: 0 2px 6px rgba(0,0,0,0.6);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="width: 4px; height: 4px; border-radius: 9999px; background: #ffffff;"></div>
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
  const [activeBasemap, setActiveBasemap] = useState('ocean'); // 'ocean' | 'satellite' | 'osm'

  const basemapConfigs = {
    ocean: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}',
      referenceUrl: 'https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Reference/MapServer/tile/{z}/{y}/{x}',
      attribution: '&copy; Esri, GEBCO, NOAA',
      maxZoom: 13,
    },
    satellite: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: '&copy; Esri, Maxar, Earthstar',
      maxZoom: 18,
    },
    osm: {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; OpenStreetMap',
      maxZoom: 19,
    },
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

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

  const trajectoryPositions = useMemo(() => {
    if (!selectedFloat || !selectedFloat.trajectory) return [];
    return selectedFloat.trajectory.map((p) => [p.lat, p.lng]);
  }, [selectedFloat]);

  return (
    <div className="relative w-full h-[620px] rounded-2xl overflow-hidden border border-white/[0.08] shadow-lg bg-[#07090e] flex flex-col">
      {/* Top Map Control Bar */}
      <div className="absolute top-3 left-3 right-3 z-[400] flex flex-col md:flex-row items-center justify-between gap-2.5 pointer-events-none">
        {/* Left: Search & Quick Region Shortcuts */}
        <div className="flex flex-wrap items-center gap-2 pointer-events-auto w-full md:w-auto">
          <form onSubmit={handleSearch} className="relative w-full sm:w-60">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-3.5 h-3.5" />
            </div>
            <input
              type="text"
              placeholder="Search ocean region..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-[#0c1017]/95 border border-white/[0.1] text-white placeholder-slate-500 text-xs font-mono backdrop-blur-md focus:outline-none focus:border-slate-400 shadow-sm"
            />
          </form>

          {/* Quick Region Shortcuts */}
          <div className="hidden sm:flex items-center gap-1 p-1 rounded-lg bg-[#0c1017]/95 border border-white/[0.08] backdrop-blur-md shadow-sm">
            {OCEAN_REGIONS.slice(1, 5).map((reg) => (
              <button
                key={reg.id}
                onClick={() => onSelectRegion(reg.id)}
                className={`px-2 py-1 rounded-md text-[11px] font-mono transition-colors ${
                  selectedRegion.id === reg.id
                    ? 'bg-slate-800 text-white font-medium border border-white/10'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {reg.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Layer Mode Selector & Basemap Switcher */}
        <div className="flex items-center gap-2 pointer-events-auto self-end md:self-auto">
          {/* Layer Selector */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-[#0c1017]/95 border border-white/[0.08] backdrop-blur-md shadow-sm text-xs">
            <button
              onClick={() => setVisualizationMode('locations')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                visualizationMode === 'locations'
                  ? 'bg-slate-800 text-white border border-white/10'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Locations
            </button>
            <button
              onClick={() => setVisualizationMode('temperature')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                visualizationMode === 'temperature'
                  ? 'bg-slate-800 text-white border border-white/10'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Temperature
            </button>
            <button
              onClick={() => setVisualizationMode('salinity')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                visualizationMode === 'salinity'
                  ? 'bg-slate-800 text-white border border-white/10'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Salinity
            </button>
            <button
              onClick={() => setVisualizationMode('oxygen')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                visualizationMode === 'oxygen'
                  ? 'bg-slate-800 text-white border border-white/10'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Oxygen
            </button>
          </div>

          {/* Basemap Switcher */}
          <div className="hidden sm:flex items-center gap-1 p-1 rounded-lg bg-[#0c1017]/95 border border-white/[0.08] backdrop-blur-md shadow-sm text-xs">
            <button
              onClick={() => setActiveBasemap('ocean')}
              className={`px-2 py-1 rounded-md font-mono text-[11px] transition-colors ${
                activeBasemap === 'ocean'
                  ? 'bg-slate-800 text-white font-medium border border-white/10'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Ocean Base
            </button>
            <button
              onClick={() => setActiveBasemap('satellite')}
              className={`px-2 py-1 rounded-md font-mono text-[11px] transition-colors ${
                activeBasemap === 'satellite'
                  ? 'bg-slate-800 text-white font-medium border border-white/10'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Satellite
            </button>
            <button
              onClick={() => setActiveBasemap('osm')}
              className={`px-2 py-1 rounded-md font-mono text-[11px] transition-colors ${
                activeBasemap === 'osm'
                  ? 'bg-slate-800 text-white font-medium border border-white/10'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              OSM
            </button>
          </div>

          {/* Reset Global View Button */}
          <button
            onClick={onResetGlobalView}
            className="p-1.5 rounded-lg bg-[#0c1017]/95 border border-white/[0.08] text-slate-400 hover:text-white backdrop-blur-md shadow-sm transition-colors"
            title="Reset to global world view"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Dismissible First-Time User Guide */}
      {showWelcome && (
        <div className="absolute top-16 left-3 right-3 sm:left-auto sm:right-3 z-[400] max-w-sm p-3 rounded-xl bg-[#0c1017]/95 backdrop-blur-md border border-white/[0.1] shadow-lg text-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="font-mono text-slate-200 font-medium flex items-center gap-1.5 text-[11px]">
              <Compass className="w-3.5 h-3.5 text-sky-400" />
              <span>Interactive Ocean Map Guide</span>
            </span>
            <button
              onClick={() => setShowWelcome(false)}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            Select any float marker to inspect real vertical CTD depth profiles, or search regions above.
          </p>
        </div>
      )}

      {/* Leaflet Interactive Map */}
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        minZoom={2}
        maxZoom={12}
        scrollWheelZoom={true}
        className="w-full h-full z-0"
        style={{ background: '#07090e' }}
      >
        <MapRecenter center={mapCenter} zoom={mapZoom} />

        <TileLayer
          key={activeBasemap}
          url={basemapConfigs[activeBasemap].url}
          attribution={basemapConfigs[activeBasemap].attribution}
          maxZoom={basemapConfigs[activeBasemap].maxZoom}
        />
        {activeBasemap === 'ocean' && (
          <TileLayer
            key="ocean-reference"
            url={basemapConfigs.ocean.referenceUrl}
            attribution=""
            maxZoom={13}
          />
        )}

        {/* Selected Float Trajectory Line */}
        {trajectoryPositions.length > 1 && (
          <Polyline
            positions={trajectoryPositions}
            pathOptions={{
              color: '#38bdf8',
              weight: 2,
              dashArray: '4, 4',
              opacity: 0.85,
            }}
          />
        )}

        {/* Float Markers */}
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
              <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                <div className="p-2 rounded-lg bg-[#0c1017] border border-white/10 text-slate-200 text-xs shadow-md space-y-1 font-mono">
                  <div className="flex items-center justify-between gap-3 font-bold text-white">
                    <span>{float.id}</span>
                    <span className="text-[10px] text-slate-400 font-sans">{float.platform}</span>
                  </div>
                  <div className="text-[11px] text-slate-300 font-sans">
                    {float.region}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[10px] pt-0.5 border-t border-white/[0.08] text-slate-400">
                    <span>Temp: {float.surfaceTemp}°C</span>
                    <span>Sal: {float.surfaceSalinity} PSU</span>
                  </div>
                </div>
              </Tooltip>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Bottom Map Legend */}
      <div className="absolute bottom-3 left-3 z-[400]">
        <MapLegend
          visualizationMode={visualizationMode}
          onOpenInfoModal={onOpenInfoModal}
        />
      </div>

      {/* Bottom Right Region Indicator */}
      <div className="absolute bottom-3 right-3 z-[400] px-2.5 py-1 rounded-md bg-[#0c1017]/95 border border-white/[0.08] text-[11px] font-mono text-slate-400 hidden sm:flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
        <span>Region: {selectedRegion.label}</span>
      </div>
    </div>
  );
}

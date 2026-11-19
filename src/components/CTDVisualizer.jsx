import React, { useState } from 'react';
import { Activity, Gauge, Waves, Droplets, Info } from 'lucide-react';

export default function CTDVisualizer() {
  const [selectedDepth, setSelectedDepth] = useState(200);

  // Calibrated vertical profile points (Depth in meters, Temp in °C, Salinity in PSU, Oxygen in ml/L)
  const profilePoints = [
    { depth: 0, temp: 28.6, salinity: 35.2, o2: 4.8, layer: 'Mixed Surface Layer (Epipelagic)' },
    { depth: 100, temp: 26.2, salinity: 35.5, o2: 4.5, layer: 'Subsurface Salinity Maximum' },
    { depth: 200, temp: 19.4, salinity: 35.1, o2: 3.1, layer: 'Upper Thermocline Boundary' },
    { depth: 500, temp: 11.2, salinity: 34.8, o2: 1.4, layer: 'Oxygen Minimum Zone (OMZ)' },
    { depth: 1000, temp: 6.8, salinity: 34.7, o2: 2.2, layer: 'Isobaric Parking Depth' },
    { depth: 1500, temp: 3.9, salinity: 34.7, o2: 3.5, layer: 'Lower Mesopelagic' },
    { depth: 2000, temp: 2.4, salinity: 34.8, o2: 4.1, layer: 'Bathypelagic Floor Calibration' },
  ];

  const current = profilePoints.find((p) => p.depth === selectedDepth) || profilePoints[2];

  // SVG dimensions for depth curve (width 260, height 280)
  // X axis: temperature 0°C (left) to 30°C (right)
  // Y axis: depth 0m (top) to 2000m (bottom)
  const getX = (t) => 25 + (t / 30) * 210;
  const getY = (d) => 20 + (d / 2000) * 240;

  const pathD = profilePoints.reduce((acc, curr, idx) => {
    const x = getX(curr.temp);
    const y = getY(curr.depth);
    return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
  }, '');

  return (
    <div className="rounded-3xl bg-[#030914] border border-cyan-500/20 p-6 sm:p-7 shadow-2xl relative overflow-hidden flex flex-col justify-between">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-cyan-500/15">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <h3 className="text-white font-bold text-base font-['Outfit',sans-serif] tracking-tight">
              CTD Vertical Profile Analyzer
            </h3>
          </div>
          <p className="text-[11px] text-slate-400 font-mono mt-0.5">
            Sensor: Sea-Bird SBE-41CP • WMO #4902183 Telemetry
          </p>
        </div>
        <span className="text-[10px] font-mono font-semibold px-2 py-1 rounded bg-cyan-950/90 border border-cyan-400/30 text-cyan-300">
          RT-QC VERIFIED
        </span>
      </div>

      {/* Main Body: SVG Graph + Depth Slider + Telemetry Readouts */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* SVG Depth-Temperature Sounding Chart */}
        <div className="md:col-span-6 bg-[#02060e] p-3 rounded-2xl border border-slate-800 relative">
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1 px-1">
            <span>TEMP CURVE (°C)</span>
            <span className="text-cyan-400">DEPTH (m)</span>
          </div>

          <svg viewBox="0 0 260 280" className="w-full h-56 overflow-visible">
            {/* Grid Lines */}
            <line x1="25" y1="20" x2="250" y2="20" stroke="#1e293b" strokeDasharray="2,2" />
            <line x1="25" y1="80" x2="250" y2="80" stroke="#1e293b" strokeDasharray="2,2" />
            <line x1="25" y1="140" x2="250" y2="140" stroke="#1e293b" strokeDasharray="2,2" />
            <line x1="25" y1="200" x2="250" y2="200" stroke="#1e293b" strokeDasharray="2,2" />
            <line x1="25" y1="260" x2="250" y2="260" stroke="#1e293b" strokeDasharray="2,2" />

            {/* Depth Labels on Y Axis */}
            <text x="2" y="24" fill="#64748b" fontSize="8" fontFamily="monospace">0m</text>
            <text x="2" y="84" fill="#64748b" fontSize="8" fontFamily="monospace">500m</text>
            <text x="2" y="144" fill="#64748b" fontSize="8" fontFamily="monospace">1000m</text>
            <text x="2" y="204" fill="#64748b" fontSize="8" fontFamily="monospace">1500m</text>
            <text x="2" y="264" fill="#64748b" fontSize="8" fontFamily="monospace">2000m</text>

            {/* Continuous Temperature Profile Curve */}
            <path
              d={pathD}
              fill="none"
              stroke="#06b6d4"
              strokeWidth="3"
              strokeLinecap="round"
              className="drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]"
            />

            {/* Interactive Selected Depth Horizon Line */}
            <line
              x1="25"
              y1={getY(current.depth)}
              x2="250"
              y2={getY(current.depth)}
              stroke="#22d3ee"
              strokeWidth="1.5"
              strokeDasharray="4,4"
            />

            {/* Interactive Node Point */}
            <circle
              cx={getX(current.temp)}
              cy={getY(current.depth)}
              r="6"
              fill="#22d3ee"
              stroke="#ffffff"
              strokeWidth="2"
              className="animate-pulse shadow-lg"
            />
          </svg>

          <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mt-1 px-1">
            <span>0°C</span>
            <span>15°C</span>
            <span>30°C</span>
          </div>
        </div>

        {/* Right: Live Interactive Sensor Readouts */}
        <div className="md:col-span-6 space-y-3">
          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-cyan-500/15">
            <div className="text-[11px] font-mono text-cyan-300 font-bold uppercase mb-1">
              Active Oceanographic Layer
            </div>
            <div className="text-sm font-semibold text-white">
              {current.layer}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 block">Temperature</span>
              <span className="text-lg font-black text-cyan-300 font-mono">{current.temp}°C</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 block">Salinity (PSU)</span>
              <span className="text-lg font-black text-teal-300 font-mono">{current.salinity}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 block">Target Depth</span>
              <span className="text-lg font-black text-white font-mono">{current.depth}m</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 block">Dissolved O₂</span>
              <span className="text-lg font-black text-emerald-300 font-mono">{current.o2} ml/L</span>
            </div>
          </div>

          {/* Quick Depth Selectors */}
          <div className="pt-2">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1.5">
              Select Vertical Horizon:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[0, 100, 200, 500, 1000, 2000].map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDepth(d)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all ${
                    selectedDepth === d
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/40'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {d}m
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

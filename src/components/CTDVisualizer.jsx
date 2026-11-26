import React, { useState } from 'react';

export default function CTDVisualizer() {
  const [selectedDepth, setSelectedDepth] = useState(200);

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

  const getX = (t) => 25 + (t / 30) * 210;
  const getY = (d) => 20 + (d / 2000) * 240;

  const pathD = profilePoints.reduce((acc, curr, idx) => {
    const x = getX(curr.temp);
    const y = getY(curr.depth);
    return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
  }, '');

  return (
    <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm flex flex-col justify-between text-slate-900">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900 font-['Outfit',sans-serif]">
              CTD Vertical Profile Analyzer
            </h3>
          </div>
          <p className="text-[11px] text-slate-500 font-mono mt-0.5">
            Sensor: Sea-Bird SBE-41CP • WMO #4902183 Telemetry
          </p>
        </div>
        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700">
          RT-QC VERIFIED
        </span>
      </div>

      {/* Main Body */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        {/* SVG Chart on Light Canvas */}
        <div className="md:col-span-6 bg-slate-50 p-3 rounded-xl border border-slate-200 relative">
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mb-1 px-1">
            <span>TEMP (°C)</span>
            <span className="text-slate-700">DEPTH (m)</span>
          </div>

          <svg viewBox="0 0 260 280" className="w-full h-52 overflow-visible">
            {/* Grid Lines */}
            <line x1="25" y1="20" x2="250" y2="20" stroke="#e2e8f0" strokeDasharray="2,2" />
            <line x1="25" y1="80" x2="250" y2="80" stroke="#e2e8f0" strokeDasharray="2,2" />
            <line x1="25" y1="140" x2="250" y2="140" stroke="#e2e8f0" strokeDasharray="2,2" />
            <line x1="25" y1="200" x2="250" y2="200" stroke="#e2e8f0" strokeDasharray="2,2" />
            <line x1="25" y1="260" x2="250" y2="260" stroke="#e2e8f0" strokeDasharray="2,2" />

            {/* Depth Labels on Y Axis */}
            <text x="2" y="24" fill="#94a3b8" fontSize="8" fontFamily="monospace">0m</text>
            <text x="2" y="84" fill="#94a3b8" fontSize="8" fontFamily="monospace">500m</text>
            <text x="2" y="144" fill="#94a3b8" fontSize="8" fontFamily="monospace">1000m</text>
            <text x="2" y="204" fill="#94a3b8" fontSize="8" fontFamily="monospace">1500m</text>
            <text x="2" y="264" fill="#94a3b8" fontSize="8" fontFamily="monospace">2000m</text>

            {/* Temperature Curve */}
            <path
              d={pathD}
              fill="none"
              stroke="#0284c7"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Selected Depth Horizon Line */}
            <line
              x1="25"
              y1={getY(current.depth)}
              x2="250"
              y2={getY(current.depth)}
              stroke="#0f172a"
              strokeWidth="1.5"
              strokeDasharray="4,4"
            />

            {/* Node Point */}
            <circle
              cx={getX(current.temp)}
              cy={getY(current.depth)}
              r="5"
              fill="#0284c7"
              stroke="#ffffff"
              strokeWidth="2"
            />
          </svg>

          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mt-1 px-1">
            <span>0°C</span>
            <span>15°C</span>
            <span>30°C</span>
          </div>
        </div>

        {/* Right: Sensor Readouts */}
        <div className="md:col-span-6 space-y-2.5">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <div className="text-[10px] font-mono text-slate-500 font-bold uppercase mb-0.5">
              Active Oceanographic Layer
            </div>
            <div className="text-xs font-semibold text-slate-900">
              {current.layer}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-mono text-slate-500 block">Temperature</span>
              <span className="text-base font-bold text-slate-900 font-mono">{current.temp}°C</span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-mono text-slate-500 block">Salinity (PSU)</span>
              <span className="text-base font-bold text-slate-900 font-mono">{current.salinity}</span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-mono text-slate-500 block">Target Depth</span>
              <span className="text-base font-bold text-slate-900 font-mono">{current.depth}m</span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-mono text-slate-500 block">Dissolved O₂</span>
              <span className="text-base font-bold text-slate-900 font-mono">{current.o2} ml/L</span>
            </div>
          </div>

          {/* Quick Depth Selectors */}
          <div className="pt-1">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-1">
              Select Vertical Horizon:
            </span>
            <div className="flex flex-wrap gap-1">
              {[0, 100, 200, 500, 1000, 2000].map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDepth(d)}
                  className={`px-2 py-0.5 rounded-md text-[11px] font-mono transition-colors ${
                    selectedDepth === d
                      ? 'bg-slate-900 text-white font-medium'
                      : 'bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900'
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

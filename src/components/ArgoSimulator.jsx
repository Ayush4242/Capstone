import React, { useState } from 'react';
import { Waves, ArrowDown, ArrowUp, Radio, Satellite, ShieldCheck, Thermometer, Droplets, Info } from 'lucide-react';

export default function ArgoSimulator() {
  const [activeStage, setActiveStage] = useState(3); // Default to stage 3 (ascent)

  const stages = [
    {
      id: 0,
      title: '01. Surface Deployment & GPS Fix',
      depth: '0 meters',
      action: 'Satellite Uplink & Mission Configuration',
      desc: 'Float establishes bi-directional satellite communication via Iridium, obtains GPS fix, checks battery, and initializes internal hydraulic bladders.',
      gradient: 'from-cyan-400 to-sky-500',
    },
    {
      id: 1,
      title: '02. Descent to Parking Depth',
      depth: '1,000 meters',
      action: 'Subsurface Buoyancy Deflation',
      desc: 'Oil is retracted into the internal reservoir, increasing float density. The float slowly descends at ~10 cm/s to the 1,000m isobaric drift level.',
      gradient: 'from-sky-500 to-blue-600',
    },
    {
      id: 2,
      title: '03. 9-Day Isobaric Ocean Drift',
      depth: '1,000 meters',
      action: 'Deep Intermediate Current Mapping',
      desc: 'The float drifts neutrally with intermediate ocean currents for 9 days, gathering acoustic tracking data and deep-ocean trajectory dynamics.',
      gradient: 'from-blue-600 to-indigo-700',
    },
    {
      id: 3,
      title: '04. Deep Dive to 2,000m Bathypelagic',
      depth: '2,000 meters',
      action: 'Maximum Depth Calibration',
      desc: 'Bladder compresses further to dive to the full 2,000m abyssal threshold, stabilizing temperature and conductivity sensors before ascent.',
      gradient: 'from-indigo-700 to-cyan-700',
    },
    {
      id: 4,
      title: '05. Continuous CTD Profile Ascent',
      depth: '2,000m ➔ 0m',
      action: 'Scientific Data Acquisition',
      desc: 'Oil is pumped into the external bladder. As it ascends to the surface over 6 hours, it takes hundreds of high-precision CTD and oxygen measurements.',
      gradient: 'from-teal-400 to-cyan-400',
    },
    {
      id: 5,
      title: '06. Surface Telemetry & NetCDF Ingest',
      depth: '0 meters',
      action: 'Satellite Transmission to Global Repositories',
      desc: 'Float surfaces, extends its antenna, and streams encrypted profile packets to GDAC (Global Data Assembly Centres) and the FloatChat AI ingest pipeline.',
      gradient: 'from-emerald-400 to-teal-500',
    },
  ];

  const current = stages[activeStage];

  return (
    <section id="argo-telemetry" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#020617] border-y border-cyan-500/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4">
            Interactive ARGO Observation Cycle
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-['Outfit',sans-serif] mb-4">
            How ARGO Floats <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-300 to-sky-400">Profile the Ocean</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Understand the autonomous 10-day profiling cycle that powers the real-world dataset behind FloatChat.
          </p>
        </div>

        {/* Two-Column Interactive Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Visual Water Column Depth Graphic */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-[#040c1d] border border-cyan-500/25 shadow-2xl relative overflow-hidden flex flex-col justify-between h-[520px]">
            {/* Background depth gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0e3b66]/30 via-[#071d3a]/60 to-[#020617] pointer-events-none" />

            {/* Surface Line */}
            <div className="relative z-10 flex items-center justify-between border-b border-cyan-400/40 pb-2 text-xs font-mono text-cyan-300">
              <span className="flex items-center gap-1.5">
                <Waves className="w-4 h-4 text-cyan-400" />
                <span>Surface Layer (Epipelagic)</span>
              </span>
              <span>0m Depth • 1 atm</span>
            </div>

            {/* Depth Markers */}
            <div className="relative z-10 my-auto flex flex-col justify-between h-[360px] pl-4 border-l-2 border-dashed border-cyan-500/30">
              {/* 500m */}
              <div className="relative flex items-center gap-3 text-xs font-mono text-slate-400">
                <span className="w-2 h-2 rounded-full bg-cyan-400 -ml-[21px]" />
                <span>500m • Main Thermocline</span>
              </div>

              {/* 1,000m Drift Depth */}
              <div
                className={`relative flex items-center justify-between p-2.5 rounded-xl transition-all ${
                  activeStage === 1 || activeStage === 2
                    ? 'bg-cyan-950/80 border border-cyan-400/50 text-cyan-200'
                    : 'text-slate-400'
                }`}
              >
                <div className="flex items-center gap-3 text-xs font-mono">
                  <span className={`w-2.5 h-2.5 rounded-full ${activeStage === 1 || activeStage === 2 ? 'bg-cyan-300 animate-ping' : 'bg-slate-600'} -ml-[22px]`} />
                  <span className="font-bold">1,000m • Isobaric Parking Level</span>
                </div>
                <span className="text-[10px] text-teal-300 font-sans hidden sm:inline">9-Day Drift</span>
              </div>

              {/* 1,500m */}
              <div className="relative flex items-center gap-3 text-xs font-mono text-slate-500">
                <span className="w-2 h-2 rounded-full bg-slate-700 -ml-[21px]" />
                <span>1,500m • Mesopelagic Layer</span>
              </div>

              {/* 2,000m Max Dive */}
              <div
                className={`relative flex items-center justify-between p-2.5 rounded-xl transition-all ${
                  activeStage === 3 || activeStage === 4
                    ? 'bg-cyan-950/80 border border-teal-400/50 text-teal-200'
                    : 'text-slate-400'
                }`}
              >
                <div className="flex items-center gap-3 text-xs font-mono">
                  <span className={`w-2.5 h-2.5 rounded-full ${activeStage === 3 || activeStage === 4 ? 'bg-teal-300 animate-ping' : 'bg-slate-600'} -ml-[22px]`} />
                  <span className="font-bold">2,000m • Deep Profiling Threshold</span>
                </div>
                <span className="text-[10px] text-cyan-300 font-sans hidden sm:inline">200 atm Pressure</span>
              </div>
            </div>

            {/* Bottom Floor */}
            <div className="relative z-10 flex items-center justify-between border-t border-cyan-500/20 pt-2 text-xs font-mono text-slate-400">
              <span>Bathypelagic Ocean Floor</span>
              <span>CTD Sensor Calibrated</span>
            </div>
          </div>

          {/* Right Column: Step-by-Step Interactive Cycle Navigation */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-6 sm:p-7 rounded-3xl bg-[#050e20] border border-cyan-500/25 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30">
                  Step {activeStage + 1} of 6
                </span>
                <span className="text-xs font-mono text-teal-300 font-semibold">
                  Depth Target: {current.depth}
                </span>
              </div>

              <h3 className="text-2xl font-black text-white font-['Outfit',sans-serif] mb-2">
                {current.title}
              </h3>

              <div className="text-sm font-semibold text-cyan-300 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>{current.action}</span>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                {current.desc}
              </p>

              {/* Cycle Selector Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-4 border-t border-slate-800">
                {stages.map((stage, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveStage(idx)}
                    className={`p-3 rounded-xl text-left transition-all ${
                      activeStage === idx
                        ? 'bg-gradient-to-r from-cyan-950 to-blue-950 border border-cyan-400 text-white shadow-lg shadow-cyan-950/40'
                        : 'bg-[#030917] border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <div className="text-[10px] font-mono text-cyan-400 font-bold">Phase 0{idx + 1}</div>
                    <div className="text-xs font-semibold truncate mt-0.5">{stage.depth}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

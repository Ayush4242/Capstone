import React, { useState } from 'react';
import { Waves } from 'lucide-react';

export default function ArgoSimulator() {
  const [activeStage, setActiveStage] = useState(3);

  const stages = [
    {
      id: 0,
      title: '01. Surface Deployment & GPS Fix',
      depth: '0 meters',
      action: 'Satellite Uplink & Mission Configuration',
      desc: 'Float establishes bi-directional satellite communication via Iridium, obtains GPS fix, checks battery, and initializes internal hydraulic bladders.',
    },
    {
      id: 1,
      title: '02. Descent to Parking Depth',
      depth: '1,000 meters',
      action: 'Subsurface Buoyancy Deflation',
      desc: 'Oil is retracted into the internal reservoir, increasing float density. The float slowly descends at ~10 cm/s to the 1,000m isobaric drift level.',
    },
    {
      id: 2,
      title: '03. 9-Day Isobaric Ocean Drift',
      depth: '1,000 meters',
      action: 'Deep Intermediate Current Mapping',
      desc: 'The float drifts neutrally with intermediate ocean currents for 9 days, gathering acoustic tracking data and deep-ocean trajectory dynamics.',
    },
    {
      id: 3,
      title: '04. Deep Dive to 2,000m Bathypelagic',
      depth: '2,000 meters',
      action: 'Maximum Depth Calibration',
      desc: 'Bladder compresses further to dive to the full 2,000m abyssal threshold, stabilizing temperature and conductivity sensors before ascent.',
    },
    {
      id: 4,
      title: '05. Continuous CTD Profile Ascent',
      depth: '2,000m ➔ 0m',
      action: 'Scientific Data Acquisition',
      desc: 'Oil is pumped into the external bladder. As it ascends to the surface over 6 hours, it takes hundreds of high-precision CTD and oxygen measurements.',
    },
    {
      id: 5,
      title: '06. Surface Telemetry & NetCDF Ingest',
      depth: '0 meters',
      action: 'Satellite Transmission to Global Repositories',
      desc: 'Float surfaces, extends its antenna, and streams encrypted profile packets to GDAC (Global Data Assembly Centres) and the FloatChat AI ingest pipeline.',
    },
  ];

  const current = stages[activeStage];

  return (
    <section id="argo-simulator" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-slate-50 text-slate-900 border-y border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-semibold uppercase tracking-wider mb-4 font-mono shadow-xs">
            Interactive ARGO Observation Cycle
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-['Outfit',sans-serif] mb-4">
            How ARGO Floats <span className="text-sky-600">Profile the Ocean</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Understand the autonomous 10-day profiling cycle that powers the real-world dataset behind FloatChat.
          </p>
        </div>

        {/* Two-Column Interactive Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Water Column Depth Graphic */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm relative overflow-hidden flex flex-col justify-between h-[500px]">
            {/* Surface Line */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-2 text-xs font-mono text-slate-700">
              <span className="flex items-center gap-1.5 font-bold">
                <Waves className="w-4 h-4 text-sky-500" />
                <span>Surface Layer (Epipelagic)</span>
              </span>
              <span>0m Depth</span>
            </div>

            {/* Depth Markers */}
            <div className="my-auto flex flex-col justify-between h-[340px] pl-4 border-l-2 border-dashed border-slate-300">
              {/* 500m */}
              <div className="relative flex items-center gap-3 text-xs font-mono text-slate-500">
                <span className="w-2 h-2 rounded-full bg-slate-400 -ml-[21px]" />
                <span>500m • Main Thermocline</span>
              </div>

              {/* 1,000m Drift Depth */}
              <div
                className={`relative flex items-center justify-between p-2.5 rounded-lg transition-all ${
                  activeStage === 1 || activeStage === 2
                    ? 'bg-sky-50 border border-sky-300 text-sky-900 font-bold'
                    : 'text-slate-600'
                }`}
              >
                <div className="flex items-center gap-3 text-xs font-mono">
                  <span className={`w-2 h-2 rounded-full ${activeStage === 1 || activeStage === 2 ? 'bg-sky-500' : 'bg-slate-400'} -ml-[21px]`} />
                  <span>1,000m • Isobaric Drift Level</span>
                </div>
                <span className="text-[10px] text-sky-700 font-sans hidden sm:inline">9-Day Drift</span>
              </div>

              {/* 1,500m */}
              <div className="relative flex items-center gap-3 text-xs font-mono text-slate-400">
                <span className="w-2 h-2 rounded-full bg-slate-300 -ml-[21px]" />
                <span>1,500m • Mesopelagic Layer</span>
              </div>

              {/* 2,000m Max Dive */}
              <div
                className={`relative flex items-center justify-between p-2.5 rounded-lg transition-all ${
                  activeStage === 3 || activeStage === 4
                    ? 'bg-sky-50 border border-sky-300 text-sky-900 font-bold'
                    : 'text-slate-600'
                }`}
              >
                <div className="flex items-center gap-3 text-xs font-mono">
                  <span className={`w-2 h-2 rounded-full ${activeStage === 3 || activeStage === 4 ? 'bg-sky-500' : 'bg-slate-400'} -ml-[21px]`} />
                  <span>2,000m • Deep Profiling Threshold</span>
                </div>
                <span className="text-[10px] text-sky-700 font-sans hidden sm:inline">200 atm</span>
              </div>
            </div>

            {/* Bottom Floor */}
            <div className="flex items-center justify-between border-t border-slate-200 pt-2 text-xs font-mono text-slate-500">
              <span>Bathypelagic Ocean Floor</span>
              <span>CTD Calibrated</span>
            </div>
          </div>

          {/* Right Column: Step-by-Step Cycle */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-slate-700 uppercase tracking-widest px-2.5 py-1 rounded bg-slate-100 border border-slate-200">
                  Step {activeStage + 1} of 6
                </span>
                <span className="text-xs font-mono text-sky-600 font-semibold">
                  Target Depth: {current.depth}
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 font-['Outfit',sans-serif] mb-1.5">
                {current.title}
              </h3>

              <div className="text-xs font-medium text-slate-600 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                <span>{current.action}</span>
              </div>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                {current.desc}
              </p>

              {/* Cycle Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-4 border-t border-slate-100">
                {stages.map((stage, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveStage(idx)}
                    className={`p-2.5 rounded-lg text-left transition-colors ${
                      activeStage === idx
                        ? 'bg-slate-900 text-white font-medium shadow-xs'
                        : 'bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <div className="text-[10px] font-mono opacity-70">Phase 0{idx + 1}</div>
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

import React, { useState } from 'react';
import { Terminal, Send, Sparkles, CheckCircle2, CornerDownLeft, Database } from 'lucide-react';

export default function OceanTerminal() {
  const [selectedPrompt, setSelectedPrompt] = useState(0);

  const queries = [
    {
      prompt: 'query --basin "Arabian Sea" --param "thermocline_depth" --anomaly',
      response: {
        title: 'Arabian Sea Thermocline Anomaly Analysis',
        summary: 'Thermocline deepened by +18.4m relative to 1993–2020 climatology. High salinity Arabian Sea Water (ASW) core detected at 85m depth with 36.4 PSU.',
        netcdf: 'vars: { TEMP_ADJUSTED: [28.4, 25.1, 19.8], PSAL_ADJUSTED: [36.4, 35.8, 35.2] }',
        status: 'Positive Dipole Correlated (p < 0.01)',
      },
    },
    {
      prompt: 'detect --float "WMO_4902183" --hypoxia_risk',
      response: {
        title: 'Subsurface Oxygen Minimum Zone (OMZ) Alert',
        summary: 'Severe hypoxia identified between 220m and 680m depth. Dissolved oxygen levels dropped to 0.42 ml/L, representing suboxic conditions.',
        netcdf: 'sensor: Aanderaa_Optode_4330 | O2_CONC: 18.2 µmol/kg',
        status: 'Critical Ecological Habitat Stress',
      },
    },
    {
      prompt: 'correlate --sst "Bay of Bengal" --monsoon_rainfall --lead 15d',
      response: {
        title: 'Ocean-Monsoon Precipitation Teleconnection',
        summary: 'Warm pool SST anomalies (> 29.5°C) across the central Bay of Bengal indicate enhanced latent heat flux, driving active convective rainfall spells over eastern India within 12–16 days.',
        netcdf: 'teleconnection_coeff: R = +0.76 | P_VALUE: 0.003',
        status: 'Synoptic Onset Supported',
      },
    },
  ];

  const current = queries[selectedPrompt];

  return (
    <div className="rounded-3xl bg-[#020611] border border-cyan-500/20 p-6 sm:p-7 shadow-2xl flex flex-col justify-between h-full">
      {/* Terminal Title Bar */}
      <div>
        <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-800 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="ml-2 font-mono text-slate-400 font-semibold text-[11px]">
              floatchat-cli ~ ai-agent v1.2
            </span>
          </div>
          <span className="font-mono text-[10px] text-teal-400 px-2 py-0.5 rounded bg-teal-950/80 border border-teal-500/30">
            LLM INFERENCE READY
          </span>
        </div>

        {/* Command Input Simulation */}
        <div className="p-3 rounded-xl bg-[#010308] border border-slate-800 font-mono text-xs text-slate-200 flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 truncate">
            <span className="text-cyan-400 font-bold">$</span>
            <span className="truncate text-cyan-200">{current.prompt}</span>
          </div>
          <span className="text-[10px] text-slate-500 font-sans hidden sm:inline">Executed in 38ms</span>
        </div>

        {/* Terminal Output Stream */}
        <div className="space-y-3 font-mono text-xs">
          <div className="flex items-center gap-2 text-teal-300 font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{current.response.title}</span>
          </div>

          <p className="text-slate-300 font-sans text-xs leading-relaxed font-normal">
            {current.response.summary}
          </p>

          <div className="p-2.5 rounded-lg bg-[#040c1a] border border-cyan-500/15 text-[11px] text-cyan-300/90 font-mono break-all">
            {current.response.netcdf}
          </div>

          <div className="flex items-center justify-between text-[11px] pt-1">
            <span className="text-emerald-400 font-semibold">● {current.response.status}</span>
            <span className="text-slate-500">QC Flag: Good Data (1)</span>
          </div>
        </div>
      </div>

      {/* Preset Query Switcher */}
      <div className="pt-5 mt-5 border-t border-slate-800">
        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
          Test Sample Oceanographic Queries:
        </span>
        <div className="flex flex-col gap-1.5">
          {queries.map((q, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedPrompt(idx)}
              className={`px-3 py-2 rounded-xl text-left font-mono text-[11px] transition-all flex items-center justify-between ${
                selectedPrompt === idx
                  ? 'bg-cyan-950/70 border border-cyan-400/40 text-cyan-200 font-semibold'
                  : 'bg-slate-950/50 border border-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="truncate">{q.prompt}</span>
              <CornerDownLeft className="w-3.5 h-3.5 opacity-60 shrink-0 ml-2" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

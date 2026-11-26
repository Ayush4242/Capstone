import React, { useState } from 'react';
import { Terminal, CornerDownLeft } from 'lucide-react';

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
    <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm flex flex-col justify-between h-full text-slate-900">
      {/* Title Bar */}
      <div>
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-400 inline-block" />
            <span className="font-mono text-slate-600 font-semibold text-[11px]">
              floatchat-cli ~ ai-agent
            </span>
          </div>
          <span className="font-mono text-[10px] text-slate-600 px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
            LLM INFERENCE READY
          </span>
        </div>

        {/* Command Input Box */}
        <div className="p-3 rounded-lg bg-slate-900 font-mono text-xs text-slate-100 flex items-center justify-between mb-3 shadow-inner">
          <div className="flex items-center gap-2 truncate">
            <span className="text-sky-400 font-bold">$</span>
            <span className="truncate text-slate-200">{current.prompt}</span>
          </div>
          <span className="text-[10px] text-slate-500 font-sans hidden sm:inline">38ms</span>
        </div>

        {/* Output Stream */}
        <div className="space-y-2.5 text-xs">
          <div className="font-semibold text-slate-900">
            {current.response.title}
          </div>

          <p className="text-slate-600 text-xs leading-relaxed font-sans">
            {current.response.summary}
          </p>

          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-700 font-mono break-all">
            {current.response.netcdf}
          </div>

          <div className="flex items-center justify-between text-[11px] pt-1">
            <span className="text-emerald-600 font-medium">● {current.response.status}</span>
            <span className="text-slate-400 font-mono text-[10px]">QC: Passed</span>
          </div>
        </div>
      </div>

      {/* Preset Query Switcher */}
      <div className="pt-4 mt-4 border-t border-slate-100">
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-1.5">
          Sample Queries:
        </span>
        <div className="flex flex-col gap-1">
          {queries.map((q, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedPrompt(idx)}
              className={`px-2.5 py-1.5 rounded-lg text-left font-mono text-[11px] transition-colors flex items-center justify-between ${
                selectedPrompt === idx
                  ? 'bg-slate-100 border border-slate-300 text-slate-900 font-medium'
                  : 'bg-white border border-slate-200 text-slate-500 hover:text-slate-800'
              }`}
            >
              <span className="truncate">{q.prompt}</span>
              <CornerDownLeft className="w-3.5 h-3.5 opacity-40 shrink-0 ml-1.5" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

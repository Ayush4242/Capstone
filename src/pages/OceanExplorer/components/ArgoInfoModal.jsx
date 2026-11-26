import React from 'react';
import { X, Compass, Activity, Radio, Waves, CheckCircle2 } from 'lucide-react';

export default function ArgoInfoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-xl rounded-3xl bg-[#030914] border border-cyan-400/40 p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-950 border border-cyan-400/40 flex items-center justify-center text-cyan-400">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white font-['Outfit',sans-serif]">
              What is an ARGO Profiling Float?
            </h3>
            <span className="text-xs font-mono text-cyan-300">
              International Global Ocean Observing System (GOOS)
            </span>
          </div>
        </div>

        {/* Informative Explanation */}
        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p>
            The international <strong className="text-white font-semibold">ARGO program</strong> maintains a global array of nearly 4,000 autonomous robotic floats drifting across Earth's oceans.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="font-mono text-cyan-300 font-bold text-xs mb-1">10-Day Cycle</div>
              <p className="text-xs text-slate-400">
                Floats sink to 1,000m drift depth, dive to 2,000m, and record continuous CTD measurements as they ascend.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="font-mono text-teal-300 font-bold text-xs mb-1">Satellite Ingest</div>
              <p className="text-xs text-slate-400">
                At the ocean surface, antenna relays encrypted NetCDF packets to Iridium/Argos satellites within hours.
              </p>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <div className="font-semibold text-white text-xs uppercase tracking-wider font-mono">
              How to explore this dashboard:
            </div>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Click any float marker on the map to inspect its real vertical CTD sounding profile.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Use the search bar or quick region buttons to fly to Arabian Sea, Bay of Bengal, etc.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Toggle visualization modes (Temperature, Salinity, Oxygen) to analyze distribution patterns.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/25 transition-all"
          >
            Start Exploring Map
          </button>
        </div>
      </div>
    </div>
  );
}

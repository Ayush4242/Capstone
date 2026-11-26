import React from 'react';
import { X, Compass, CheckCircle2 } from 'lucide-react';

export default function ArgoInfoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg rounded-2xl bg-white border border-slate-200 p-6 sm:p-7 shadow-2xl space-y-5 text-slate-900">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-sky-600">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-['Outfit',sans-serif]">
              What is an ARGO Profiling Float?
            </h3>
            <span className="text-xs font-mono text-slate-500">
              Global Ocean Observing System (GOOS)
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <p>
            The international <strong className="text-slate-900 font-semibold">ARGO program</strong> maintains a global array of robotic profiling floats measuring temperature, salinity, and biogeochemistry across the upper 2,000 meters of the ocean.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="font-mono text-slate-900 font-semibold text-xs mb-1">10-Day Cycle</div>
              <p className="text-xs text-slate-600 leading-normal">
                Floats sink to 1,000m drift depth, dive to 2,000m, and record continuous CTD profiles as they ascend.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="font-mono text-slate-900 font-semibold text-xs mb-1">Satellite Uplink</div>
              <p className="text-xs text-slate-600 leading-normal">
                At the surface, data is transmitted to satellite networks and disseminated to researchers worldwide.
              </p>
            </div>
          </div>

          <div className="space-y-1.5 pt-1 text-xs text-slate-600">
            <div className="font-semibold text-slate-900 font-mono text-[11px] uppercase tracking-wider">
              How to navigate:
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
              <span>Click any float marker to inspect its depth sounding profile.</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
              <span>Switch basemaps (Ocean Base, Satellite, OSM) in the top-right toolbar.</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
              <span>Use filters on the right to segment basins, date ranges, and depth levels.</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs uppercase tracking-wider transition-colors shadow-xs"
          >
            Explore Ocean Map
          </button>
        </div>
      </div>
    </div>
  );
}

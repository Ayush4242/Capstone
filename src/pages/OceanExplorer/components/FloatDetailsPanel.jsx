import React from 'react';
import {
  X,
  Compass,
  Gauge,
  Waves,
  Droplets,
  Calendar,
  MapPin,
  Activity,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export default function FloatDetailsPanel({
  float,
  isOpen,
  onClose,
  onViewChartsSection,
}) {
  if (!isOpen || !float) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-[1000] w-full max-w-md bg-white border-l border-slate-200 shadow-2xl p-6 sm:p-7 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200 text-slate-900">
      <div className="space-y-6">
        {/* Panel Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
              <Compass className="w-5 h-5 text-sky-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 font-mono">
                  {float.id}
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 border border-emerald-300 text-emerald-700 font-medium">
                  ACTIVE
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-mono">
                {float.platform} • WMO #{float.wmo}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            title="Close drawer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Telemetry Position Metadata */}
        <div className="space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 block font-semibold">
            Position & Telemetry Metadata
          </span>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-700">
              <span className="text-slate-500 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>Coordinates:</span>
              </span>
              <span className="font-mono text-slate-900 font-medium">
                {float.lat.toFixed(2)}°N, {float.lng.toFixed(2)}°E
              </span>
            </div>

            <div className="flex items-center justify-between text-slate-700">
              <span className="text-slate-500 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Last Observation:</span>
              </span>
              <span className="font-mono text-slate-800">
                {float.lastObservationDate}
              </span>
            </div>

            <div className="flex items-center justify-between text-slate-700">
              <span className="text-slate-500 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-slate-400" />
                <span>Cycle Number:</span>
              </span>
              <span className="font-mono text-slate-900">
                Cycle #{float.cycleNumber} (10-Day Interval)
              </span>
            </div>

            <div className="flex items-center justify-between text-slate-700">
              <span className="text-slate-500 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>QC Validation:</span>
              </span>
              <span className="text-slate-700 font-mono text-[11px]">
                {float.qcFlag}
              </span>
            </div>
          </div>
        </div>

        {/* Measurements Grid */}
        <div className="space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 block font-semibold">
            Core Sensor Measurements
          </span>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-[10px] font-mono text-slate-500 mb-1">Surface Temperature</div>
              <div className="text-xl font-bold text-slate-900 font-mono">
                {float.surfaceTemp}°C
              </div>
              <span className="text-[10px] text-slate-400 font-mono">In-situ CTD</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-[10px] font-mono text-slate-500 mb-1">Practical Salinity</div>
              <div className="text-xl font-bold text-slate-900 font-mono">
                {float.surfaceSalinity} <span className="text-xs font-sans text-slate-500">PSU</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Conductivity Cell</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-[10px] font-mono text-slate-500 mb-1">Max Recorded Depth</div>
              <div className="text-xl font-bold text-slate-900 font-mono">
                {float.maxDepth} <span className="text-xs font-sans text-slate-500">m</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Bathypelagic</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-[10px] font-mono text-slate-500 mb-1">Dissolved Oxygen</div>
              <div className="text-xl font-bold text-slate-900 font-mono">
                {float.dissolvedOxygen || '--'} <span className="text-xs font-sans text-slate-500">ml/L</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Optode Sensor</span>
            </div>
          </div>
        </div>

        {/* Oceanographic Note */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-semibold">
            Oceanographic Note
          </span>
          <p className="text-xs text-slate-700 leading-relaxed font-sans">
            {float.summary}
          </p>
        </div>

        {/* Drift Trajectory Fixes */}
        {float.trajectory && float.trajectory.length > 0 && (
          <div className="space-y-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 block font-semibold">
              10-Day Drift Trajectory ({float.trajectory.length} fixes)
            </span>
            <div className="space-y-1 max-h-32 overflow-y-auto pr-1">
              {float.trajectory.map((t, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200 text-[11px] font-mono"
                >
                  <span className="text-slate-500">Cycle #{t.cycle} ({t.date})</span>
                  <span className="text-slate-900 font-medium">{t.lat.toFixed(2)}°N, {t.lng.toFixed(2)}°E</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Drawer Action Button */}
      <div className="pt-4 border-t border-slate-200">
        <button
          onClick={() => {
            onClose();
            if (onViewChartsSection) onViewChartsSection();
          }}
          className="w-full py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm"
        >
          <span>Plot Full Depth Sounding</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

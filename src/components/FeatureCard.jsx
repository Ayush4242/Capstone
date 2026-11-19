import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  badge,
  tag,
  accentColor = 'cyan',
}) {
  return (
    <div className="group relative rounded-2xl p-6 sm:p-7 bg-[#071731]/70 backdrop-blur-md border border-cyan-500/15 hover:border-cyan-400/40 transition-all duration-300 hover:-translate-y-1.5 shadow-lg shadow-black/40 hover:shadow-cyan-900/20 flex flex-col justify-between overflow-hidden">
      {/* Subtle background glow on hover */}
      <div className="absolute -right-16 -top-16 w-36 h-36 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-400/20 transition-all duration-500 pointer-events-none" />

      <div>
        {/* Top Header: Icon & Badge */}
        <div className="flex items-center justify-between mb-5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 via-sky-500/10 to-transparent border border-cyan-500/30 flex items-center justify-center text-cyan-300 group-hover:scale-110 group-hover:text-cyan-200 group-hover:border-cyan-400 transition-all duration-300 shadow-md shadow-cyan-950/40">
            <Icon className="w-6 h-6" />
          </div>
          {badge && (
            <span className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300">
              {badge}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-200 transition-colors tracking-tight font-['Outfit',sans-serif] mb-2.5">
          {title}
        </h3>

        {/* Description */}
        <p className="text-slate-300 text-sm leading-relaxed mb-4">
          {description}
        </p>
      </div>

      {/* Footer indicator */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-cyan-400 font-medium">
        <span className="text-slate-400 text-[11px]">{tag || 'ARGO Dataset Enabled'}</span>
        <span className="flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
          <span>Explore Module</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
}

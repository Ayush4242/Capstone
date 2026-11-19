import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  badge,
  tag,
  accent = 'cyan',
}) {
  return (
    <div className="group relative rounded-3xl p-6 sm:p-7 bg-[#040c1d]/85 backdrop-blur-xl border border-cyan-500/15 hover:border-cyan-400/50 transition-all duration-400 hover:-translate-y-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(6,182,212,0.18)] flex flex-col justify-between overflow-hidden">
      {/* Corner ambient glow */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-400/25 transition-all duration-500 pointer-events-none" />

      <div>
        {/* Top Header: Icon & Badge */}
        <div className="flex items-center justify-between mb-5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 via-teal-500/10 to-transparent border border-cyan-400/30 flex items-center justify-center text-cyan-300 group-hover:scale-110 group-hover:border-cyan-300 group-hover:text-cyan-200 transition-all duration-300 shadow-lg shadow-cyan-950/50">
            <Icon className="w-6 h-6" />
          </div>
          {badge && (
            <span className="text-[11px] font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300">
              {badge}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white group-hover:text-cyan-200 transition-colors tracking-tight font-['Outfit',sans-serif] mb-2.5">
          {title}
        </h3>

        {/* Description */}
        <p className="text-slate-300 text-sm leading-relaxed mb-6">
          {description}
        </p>
      </div>

      {/* Footer Tag & CTA */}
      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
        <span className="text-slate-400 font-mono text-[11px]">{tag}</span>
        <span className="text-cyan-400 group-hover:text-cyan-300 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
          <span>Explore Module</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
}

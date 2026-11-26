import React from 'react';
import { Link } from 'react-router-dom';
import {
  Waves,
  Compass,
  History,
  Scale,
  Wind,
  Bot,
  User,
  ArrowLeft,
  Activity,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

export default function ExplorerHeader({ activeTab = 'explorer', setActiveTab }) {
  const { user, logout } = useAuth();

  const navItems = [
    { id: 'explorer', label: 'Ocean Explorer', icon: Compass, href: '/explorer' },
    { id: 'time-machine', label: 'Ocean Time Machine', icon: History, href: '#time-machine' },
    { id: 'compare', label: 'Compare', icon: Scale, href: '#compare' },
    { id: 'oxygen', label: 'Oxygen Analysis', icon: Wind, href: '#oxygen' },
    { id: 'ai-assistant', label: 'AI Assistant', icon: Bot, href: '#ai-assistant' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#020617]/95 backdrop-blur-2xl border-b border-cyan-500/15 px-4 sm:px-6 lg:px-8 py-3.5 shadow-xl shadow-black/50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Brand Logo & Back to Home */}
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2.5 group text-white transition-all"
            title="Return to Home Overview"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-md shadow-cyan-500/25">
              <div className="w-full h-full bg-[#020617] rounded-[10px] flex items-center justify-center">
                <Waves className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-extrabold tracking-tight font-['Outfit',sans-serif] text-white">
                Float<span className="text-cyan-400">Chat</span>
              </span>
              <span className="text-[9px] font-mono uppercase tracking-widest text-cyan-300 -mt-0.5">
                Research Portal
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Main Dashboard Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-xl bg-slate-950/80 border border-slate-800/80">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab && setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-teal-500/20 border border-cyan-400/40 text-cyan-300 shadow-md shadow-cyan-950/40'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Live Telemetry Indicator & User Profile */}
        <div className="flex items-center gap-3">
          <div className="hidden xl:flex items-center gap-2 px-2.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/25 text-[11px] font-mono text-cyan-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>GDAC Sync Online</span>
          </div>

          <div className="flex items-center gap-2.5 pl-2 border-l border-slate-800">
            <div className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-300 font-bold text-xs">
              {user?.name?.charAt(0).toUpperCase() || 'R'}
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-semibold text-white truncate max-w-[120px]">
                {user?.name || 'Researcher'}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                {user?.email?.split('@')[0] || 'In-situ User'}
              </span>
            </div>
            {user && (
              <button
                onClick={logout}
                title="Sign out"
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

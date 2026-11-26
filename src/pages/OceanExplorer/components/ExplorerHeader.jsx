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
  LogOut,
  Radio,
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

export default function ExplorerHeader({ activeTab = 'explorer', setActiveTab }) {
  const { user, logout } = useAuth();

  const navItems = [
    { id: 'explorer', label: 'Ocean Explorer', icon: Compass },
    { id: 'time-machine', label: 'Ocean Time Machine', icon: History },
    { id: 'compare', label: 'Compare', icon: Scale },
    { id: 'oxygen', label: 'Oxygen Analysis', icon: Wind },
    { id: 'ai-assistant', label: 'AI Assistant', icon: Bot },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#070a10]/95 backdrop-blur-xl border-b border-white/[0.08] px-4 sm:px-6 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="flex items-center gap-2.5 text-white hover:opacity-90 transition-opacity"
            title="Return to Home Overview"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-800 border border-white/10 flex items-center justify-center text-slate-200">
              <Waves className="w-4 h-4 text-sky-400" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold tracking-tight text-white font-['Outfit',sans-serif]">
                FloatChat
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-medium">
                Console
              </span>
            </div>
          </Link>

          {/* Navigation Items */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab && setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-slate-800 text-white border border-white/10 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-sky-400' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right: Live Telemetry Indicator & User Profile */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-900 border border-white/[0.06] text-[11px] font-mono text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-slate-400">ARGO GDAC:</span>
            <span className="text-emerald-400 font-medium">ONLINE</span>
          </div>

          <div className="flex items-center gap-2.5 pl-3 border-l border-white/[0.08]">
            <div className="w-7 h-7 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-slate-200 font-semibold text-xs">
              {user?.name?.charAt(0).toUpperCase() || 'R'}
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-medium text-slate-200 leading-tight">
                {user?.name || 'Researcher'}
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                {user?.email?.split('@')[0] || 'Active Session'}
              </span>
            </div>
            {user && (
              <button
                onClick={logout}
                title="Sign out"
                className="p-1.5 rounded-md text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors ml-1"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

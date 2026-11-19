import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import API from '../services/api';
import {
  Waves,
  LogOut,
  Compass,
  MessageSquareCode,
  MapPin,
  Activity,
  Database,
  Search,
  Sparkles,
  BarChart3,
  Calendar,
  CloudRain,
  ShieldCheck,
  Radio,
  FileText,
  User,
} from 'lucide-react';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { addToast } = useToast();
  const [serverHealth, setServerHealth] = useState('checking');
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const res = await API.get('/health');
        if (res.data.status === 'ok') {
          setServerHealth('connected');
        } else {
          setServerHealth('degraded');
        }
      } catch (err) {
        setServerHealth('offline');
      }
    };
    checkBackend();
  }, []);

  const handleQuery = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    addToast(`Query submitted: "${searchQuery}". AI Agent module is running in query sandbox.`, 'info');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-[#030b1a] text-slate-100 flex flex-col">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-[#051329]/90 backdrop-blur-md border-b border-cyan-500/20 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 p-0.5">
              <div className="w-full h-full bg-[#051329] rounded-[10px] flex items-center justify-center">
                <Waves className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <span className="font-bold text-lg font-['Outfit',sans-serif] tracking-tight">
              Float<span className="text-cyan-400">Chat</span>
            </span>
          </Link>

          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-md bg-cyan-950/60 border border-cyan-500/25 text-[11px] font-mono text-cyan-300">
            <span
              className={`w-2 h-2 rounded-full ${
                serverHealth === 'connected'
                  ? 'bg-emerald-400 animate-pulse'
                  : serverHealth === 'checking'
                  ? 'bg-amber-400 animate-ping'
                  : 'bg-rose-400'
              }`}
            />
            <span>MongoDB Auth Backend: {serverHealth.toUpperCase()}</span>
          </div>
        </div>

        {/* User Info and Logout */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-300 font-semibold text-xs">
              {user?.name?.charAt(0).toUpperCase() || 'R'}
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-semibold text-white">{user?.name || 'Verified Explorer'}</span>
              <span className="text-[10px] text-slate-400">{user?.email}</span>
            </div>
          </div>

          <button
            onClick={() => {
              logout();
              addToast('You have been signed out safely.', 'info');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 hover:border-rose-500/40 text-xs font-medium text-slate-300 hover:text-rose-300 hover:bg-rose-500/10 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Welcome Banner */}
        <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#061c3d] via-[#092955] to-[#041731] border border-cyan-500/30 overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/30 text-cyan-300 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Researcher Session Active • ID: {user?.id?.slice(-8) || 'ARGO-AUTH'}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-['Outfit',sans-serif]">
              Welcome, {user?.name || 'Ocean Explorer'}
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              Your FloatChat dashboard is connected to live ARGO float telemetry repositories. Ask conversational questions, visualize spatial profiles, or launch anomaly analyses below.
            </p>
          </div>
        </div>

        {/* AI Query Prompt Bar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#06152d]/80 border border-cyan-500/25 shadow-xl backdrop-blur-md">
          <form onSubmit={handleQuery} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-cyan-400">
                <MessageSquareCode className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Ask FloatChat: 'Show me salinity anomalies in the Arabian Sea between 100m and 500m depth...'"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#040e1f] border border-cyan-500/25 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Analyze Query</span>
            </button>
          </form>
        </div>

        {/* Telemetry Stat Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[#071937]/70 border border-cyan-500/20">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>Active ARGO Floats</span>
              <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
            </div>
            <div className="text-2xl font-bold text-white font-mono">3,942</div>
            <div className="text-xs text-emerald-400 mt-1">99.4% telemetry operational</div>
          </div>

          <div className="p-5 rounded-2xl bg-[#071937]/70 border border-cyan-500/20">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>Global Profiles Ingested</span>
              <Database className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-bold text-white font-mono">2,418,910</div>
            <div className="text-xs text-cyan-300 mt-1">Updated every 6 hours</div>
          </div>

          <div className="p-5 rounded-2xl bg-[#071937]/70 border border-cyan-500/20">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>Indian Ocean Floats</span>
              <Compass className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-2xl font-bold text-white font-mono">842 Floats</div>
            <div className="text-xs text-slate-400 mt-1">Monsoon corridor coverage</div>
          </div>

          <div className="p-5 rounded-2xl bg-[#071937]/70 border border-cyan-500/20">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>Data Quality Standard</span>
              <ShieldCheck className="w-4 h-4 text-teal-400" />
            </div>
            <div className="text-2xl font-bold text-white font-mono">RT-QC Level 1</div>
            <div className="text-xs text-teal-400 mt-1">WMO & IOC Calibrated</div>
          </div>
        </div>

        {/* Quick Launch Analytical Modules */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white font-['Outfit',sans-serif]">
            Ocean Intelligence Modules
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-[#071937]/50 border border-cyan-500/20 hover:border-cyan-400/40 transition-colors">
              <h3 className="font-bold text-white text-base mb-1 font-['Outfit',sans-serif]">
                Interactive ARGO Explorer
              </h3>
              <p className="text-xs text-slate-300 mb-4">
                View geographic locations, historical drift trajectories, and bathypelagic profiles of active floats.
              </p>
              <div className="text-xs text-cyan-400 font-semibold flex items-center gap-1">
                <span>Access Explorer</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#071937]/50 border border-cyan-500/20 hover:border-cyan-400/40 transition-colors">
              <h3 className="font-bold text-white text-base mb-1 font-['Outfit',sans-serif]">
                Ocean–Monsoon Correlation
              </h3>
              <p className="text-xs text-slate-300 mb-4">
                Explore correlations between Indian Ocean heat content and monsoon precipitation anomalies.
              </p>
              <div className="text-xs text-cyan-400 font-semibold flex items-center gap-1">
                <span>View Correlation Matrix</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#071937]/50 border border-cyan-500/20 hover:border-cyan-400/40 transition-colors">
              <h3 className="font-bold text-white text-base mb-1 font-['Outfit',sans-serif]">
                Marine Hypoxia & Oxygen Alert
              </h3>
              <p className="text-xs text-slate-300 mb-4">
                Identify hypoxic ocean dead-zones and oxygen minimum zones (OMZ) in the northern Indian Ocean.
              </p>
              <div className="text-xs text-cyan-400 font-semibold flex items-center gap-1">
                <span>Analyze Oxygen Levels</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

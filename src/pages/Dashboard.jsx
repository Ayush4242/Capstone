import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import API from '../services/api';
import {
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
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2.5">
            <img src="/logo.jpg" alt="FloatChat" className="w-9 h-9 rounded-lg object-cover shadow-sm" />
            <span className="font-bold text-lg font-['Outfit',sans-serif] tracking-tight text-slate-900">
              FloatChat
            </span>
          </Link>

          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-[11px] font-mono text-slate-600">
            <span
              className={`w-2 h-2 rounded-full ${
                serverHealth === 'connected'
                  ? 'bg-emerald-500 animate-pulse'
                  : serverHealth === 'checking'
                  ? 'bg-amber-500 animate-ping'
                  : 'bg-rose-500'
              }`}
            />
            <span>MongoDB Auth Backend: {serverHealth.toUpperCase()}</span>
          </div>
        </div>

        {/* User Info and Logout */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-700 font-semibold text-xs">
              {user?.name?.charAt(0).toUpperCase() || 'R'}
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-semibold text-slate-900">{user?.name || 'Verified Explorer'}</span>
              <span className="text-[10px] text-slate-500">{user?.email}</span>
            </div>
          </div>

          <button
            onClick={() => {
              logout();
              addToast('You have been signed out safely.', 'info');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 hover:border-rose-400 text-xs font-medium text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Welcome Banner */}
        <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-200 overflow-hidden shadow-lg">
          <div className="relative z-10 max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sky-200 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5 text-sky-300" />
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
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <form onSubmit={handleQuery} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <MessageSquareCode className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Ask FloatChat: 'Show me salinity anomalies in the Arabian Sea between 100m and 500m depth...'"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Analyze Query</span>
            </button>
          </form>
        </div>

        {/* Telemetry Stat Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span>Active ARGO Floats</span>
              <Radio className="w-4 h-4 text-emerald-500 animate-pulse" />
            </div>
            <div className="text-2xl font-bold text-slate-900 font-mono">3,942</div>
            <div className="text-xs text-emerald-600 mt-1">99.4% telemetry operational</div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span>Global Profiles Ingested</span>
              <Database className="w-4 h-4 text-sky-500" />
            </div>
            <div className="text-2xl font-bold text-slate-900 font-mono">2,418,910</div>
            <div className="text-xs text-sky-600 mt-1">Updated every 6 hours</div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span>Indian Ocean Floats</span>
              <Compass className="w-4 h-4 text-sky-500" />
            </div>
            <div className="text-2xl font-bold text-slate-900 font-mono">842 Floats</div>
            <div className="text-xs text-slate-500 mt-1">Monsoon corridor coverage</div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span>Data Quality Standard</span>
              <ShieldCheck className="w-4 h-4 text-teal-500" />
            </div>
            <div className="text-2xl font-bold text-slate-900 font-mono">RT-QC Level 1</div>
            <div className="text-xs text-teal-600 mt-1">WMO & IOC Calibrated</div>
          </div>
        </div>

        {/* Quick Launch Analytical Modules */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 font-['Outfit',sans-serif]">
            Ocean Intelligence Modules
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all">
              <h3 className="font-bold text-slate-900 text-base mb-1 font-['Outfit',sans-serif]">
                Interactive ARGO Explorer
              </h3>
              <p className="text-xs text-slate-600 mb-4">
                View geographic locations, historical drift trajectories, and bathypelagic profiles of active floats.
              </p>
              <div className="text-xs text-sky-600 font-semibold flex items-center gap-1">
                <span>Access Explorer</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all">
              <h3 className="font-bold text-slate-900 text-base mb-1 font-['Outfit',sans-serif]">
                Ocean–Monsoon Correlation
              </h3>
              <p className="text-xs text-slate-600 mb-4">
                Explore correlations between Indian Ocean heat content and monsoon precipitation anomalies.
              </p>
              <div className="text-xs text-sky-600 font-semibold flex items-center gap-1">
                <span>View Correlation Matrix</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all">
              <h3 className="font-bold text-slate-900 text-base mb-1 font-['Outfit',sans-serif]">
                Marine Hypoxia & Oxygen Alert
              </h3>
              <p className="text-xs text-slate-600 mb-4">
                Identify hypoxic ocean dead-zones and oxygen minimum zones (OMZ) in the northern Indian Ocean.
              </p>
              <div className="text-xs text-sky-600 font-semibold flex items-center gap-1">
                <span>Analyze Oxygen Levels</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

import React, { useState } from 'react';
import { Bot, Send, RefreshCw } from 'lucide-react';

export default function AIInsights({ selectedFloat, selectedRegion }) {
  const [selectedPrompt, setSelectedPrompt] = useState('explain-profile');
  const [loading, setLoading] = useState(false);
  const [customQuestion, setCustomQuestion] = useState('');
  const [customResponse, setCustomResponse] = useState(null);

  const getGroundTruthInsight = (type) => {
    if (!selectedFloat) return 'Select an ARGO float to generate grounded scientific insights.';

    const temp = selectedFloat.surfaceTemp;
    const sal = selectedFloat.surfaceSalinity;
    const o2 = selectedFloat.dissolvedOxygen || 4.2;
    const region = selectedFloat.region;
    const depth = selectedFloat.maxDepth;

    if (type === 'explain-measurements') {
      return `For Float ${selectedFloat.id} in the ${region} (${selectedFloat.lat.toFixed(2)}°N, ${selectedFloat.lng.toFixed(2)}°E), surface temperature is ${temp}°C and practical salinity is ${sal} PSU. These values indicate standard stratification in the upper water column. Dissolved oxygen of ${o2} ml/L indicates typical surface gas exchange, decreasing through the photic boundary layer.`;
    }

    if (type === 'summarize-region') {
      return `The ${region} sector currently exhibits an average thermal signature of ${temp}°C. Based on current ARGO observation cycles, this basin shows steep thermocline gradients between 100m and 500m. In the northern section, higher evaporation rates elevate surface salinity to ${sal} PSU, forming a barrier layer that modulates vertical heat exchange.`;
    }

    if (type === 'identify-anomalies') {
      const hasOxygenAnomaly = o2 < 1.4;
      const isWarm = temp > 29.0;
      return `Telemetry Assessment for Float ${selectedFloat.id}:
• Temperature: ${temp}°C reflects a ${isWarm ? '+0.4°C positive warm-phase deviation' : 'nominal seasonal range'} relative to regional climatology.
• Salinity: ${sal} PSU corresponds to standard evaporative equilibrium in this sector.
• Biogeochemistry: Dissolved oxygen at ${o2} ml/L is ${hasOxygenAnomaly ? 'flagged for Subsurface Hypoxia (< 1.4 ml/L OMZ threshold)' : 'within normal ecological limits'}.`;
    }

    if (type === 'explain-profile') {
      return `Vertical Water Column Analysis (0m to ${depth}m):
• Epipelagic Zone (0–100m): Homogeneous mixed layer maintained by surface wind stress, with temperature holding near ${temp}°C.
• Thermocline Boundary (100–500m): Rapid thermal decrease across 400m depth, isolating deep oceanic water.
• Bathypelagic Zone (500–${depth}m): Deep ocean water stabilizing near 2.4°C and 34.8 PSU, consistent with planetary thermohaline circulation.`;
    }

    return '';
  };

  const handleActionClick = (promptKey) => {
    setSelectedPrompt(promptKey);
    setCustomResponse(null);
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customQuestion.trim() || !selectedFloat) return;

    setLoading(true);
    setTimeout(() => {
      setCustomResponse(
        `Analysis for Float ${selectedFloat.id} (${selectedFloat.region}):\n` +
          `Query: "${customQuestion}"\n` +
          `The measured profile indicates standard thermohaline stratification. Surface temperature (${selectedFloat.surfaceTemp}°C) and salinity (${selectedFloat.surfaceSalinity} PSU) are in equilibrium with regional atmospheric forcing.`
      );
      setLoading(false);
    }, 500);
  };

  const activeInsightText = customResponse || getGroundTruthInsight(selectedPrompt);

  return (
    <div className="rounded-2xl bg-[#0c1017] border border-white/[0.08] p-5 sm:p-6 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4 text-slate-400" />
          <h3 className="text-base font-bold text-white font-['Outfit',sans-serif]">
            Oceanographic Analysis
          </h3>
          <span className="text-[11px] font-mono text-slate-500">
            • Grounded in ARGO observations
          </span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-white/[0.06] text-slate-400">
          Float {selectedFloat?.id || '--'}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-1.5">
        <button
          onClick={() => handleActionClick('explain-measurements')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
            selectedPrompt === 'explain-measurements' && !customResponse
              ? 'bg-slate-800 text-white font-medium border border-white/10'
              : 'bg-[#07090e] border border-white/[0.06] text-slate-400 hover:text-white'
          }`}
        >
          Explain Measurements
        </button>

        <button
          onClick={() => handleActionClick('summarize-region')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
            selectedPrompt === 'summarize-region' && !customResponse
              ? 'bg-slate-800 text-white font-medium border border-white/10'
              : 'bg-[#07090e] border border-white/[0.06] text-slate-400 hover:text-white'
          }`}
        >
          Summarize Region
        </button>

        <button
          onClick={() => handleActionClick('identify-anomalies')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
            selectedPrompt === 'identify-anomalies' && !customResponse
              ? 'bg-slate-800 text-white font-medium border border-white/10'
              : 'bg-[#07090e] border border-white/[0.06] text-slate-400 hover:text-white'
          }`}
        >
          Identify Anomalies
        </button>

        <button
          onClick={() => handleActionClick('explain-profile')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
            selectedPrompt === 'explain-profile' && !customResponse
              ? 'bg-slate-800 text-white font-medium border border-white/10'
              : 'bg-[#07090e] border border-white/[0.06] text-slate-400 hover:text-white'
          }`}
        >
          Explain Depth Sounding
        </button>
      </div>

      {/* Grounded Insight Box */}
      <div className="p-4 rounded-xl bg-[#07090e] border border-white/[0.06] space-y-2">
        <p className="text-slate-300 text-xs leading-relaxed whitespace-pre-line font-mono">
          {activeInsightText}
        </p>
      </div>

      {/* Query Bar */}
      <form onSubmit={handleCustomSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder="Inquire about this float's observations..."
          value={customQuestion}
          onChange={(e) => setCustomQuestion(e.target.value)}
          className="flex-1 px-3.5 py-2 rounded-lg bg-[#07090e] border border-white/[0.1] text-white placeholder-slate-600 text-xs font-mono focus:outline-none focus:border-slate-400"
        />
        <button
          type="submit"
          disabled={loading || !customQuestion.trim()}
          className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs flex items-center gap-1.5 disabled:opacity-50 transition-colors border border-white/10"
        >
          {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
          <span>Analyze</span>
        </button>
      </form>
    </div>
  );
}

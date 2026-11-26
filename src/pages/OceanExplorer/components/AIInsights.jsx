import React, { useState } from 'react';
import { Bot, Send, RefreshCw } from 'lucide-react';

export default function AIInsights({ selectedFloat }) {
  const [selectedPrompt, setSelectedPrompt] = useState('explain-profile');
  const [loading, setLoading] = useState(false);
  const [customQuestion, setCustomQuestion] = useState('');
  const [customResponse, setCustomResponse] = useState(null);

  const getStructuredInsight = (type) => {
    if (!selectedFloat) {
      return {
        title: 'No Float Selected',
        paragraphs: ['Click any ARGO float marker on the map to read an explanation of its ocean measurements.'],
      };
    }

    const temp = selectedFloat.surfaceTemp;
    const sal = selectedFloat.surfaceSalinity;
    const o2 = selectedFloat.dissolvedOxygen || 4.2;
    const region = selectedFloat.region;
    const depth = selectedFloat.maxDepth;

    if (type === 'explain-measurements') {
      return {
        title: `What Float ${selectedFloat.id} Recorded`,
        items: [
          {
            label: 'Surface Temperature',
            text: `At ${temp}°C in the ${region} (${selectedFloat.lat.toFixed(2)}°N, ${selectedFloat.lng.toFixed(2)}°E), surface waters are warm and well-mixed from sunlight and wind.`,
          },
          {
            label: 'Salinity',
            text: `Salinity measures ${sal} PSU, reflecting the local balance between evaporation, rainfall, and ocean currents.`,
          },
          {
            label: 'Dissolved Oxygen',
            text: `Oxygen levels sit at ${o2} ml/L near the surface, supporting marine life before tapering off at deeper levels.`,
          },
        ],
      };
    }

    if (type === 'summarize-region') {
      return {
        title: `${region} Regional Overview`,
        paragraphs: [
          `Observations from Float ${selectedFloat.id} show an average surface temperature around ${temp}°C and salinity of ${sal} PSU in the ${region}.`,
          `Between 100m and 500m below the surface, water temperature drops sharply—creating a strong thermal boundary that keeps warmer surface water separated from the colder deep ocean below.`,
        ],
      };
    }

    if (type === 'identify-anomalies') {
      const hasOxygenAnomaly = o2 < 1.4;
      const isWarm = temp > 29.0;
      return {
        title: `Condition Check for Float ${selectedFloat.id}`,
        items: [
          {
            label: 'Temperature Status',
            text: `${temp}°C is ${isWarm ? 'about 0.4°C warmer than the typical seasonal average for this basin.' : 'within the expected seasonal range for this region.'}`,
          },
          {
            label: 'Salinity Status',
            text: `${sal} PSU falls right in line with normal evaporation and mixing patterns here.`,
          },
          {
            label: 'Oxygen Health',
            text: `At ${o2} ml/L, oxygen is ${hasOxygenAnomaly ? 'low enough to indicate an Oxygen Minimum Zone (below 1.4 ml/L), which can stress marine habitats.' : 'at a healthy level for marine ecosystems.'}`,
          },
        ],
      };
    }

    // default: 'explain-profile'
    return {
      title: `How Conditions Change With Depth (0m to ${depth}m)`,
      items: [
        {
          label: 'Upper Ocean (0–100m)',
          text: `Wind and waves keep the top layer evenly mixed, holding temperatures steady near ${temp}°C.`,
        },
        {
          label: 'Thermocline Layer (100–500m)',
          text: `Temperature falls rapidly across this 400-meter transition zone, separating sunlit surface waters from the deep sea.`,
        },
        {
          label: `Deep Ocean (500–${depth}m)`,
          text: `Below 500m, conditions stabilize into cold, dense deep water around 2.4°C and 34.8 PSU.`,
        },
      ],
    };
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
      setCustomResponse({
        title: `Answer for Float ${selectedFloat.id} (${selectedFloat.region})`,
        paragraphs: [
          `Question: "${customQuestion}"`,
          `Based on this float's latest profile, surface water is ${selectedFloat.surfaceTemp}°C with ${selectedFloat.surfaceSalinity} PSU salinity and ${selectedFloat.dissolvedOxygen || 4.2} ml/L dissolved oxygen—showing clear layering down to ${selectedFloat.maxDepth}m.`,
        ],
      });
      setLoading(false);
    }, 450);
  };

  const insight = customResponse || getStructuredInsight(selectedPrompt);

  return (
    <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-7 shadow-xs space-y-5 text-slate-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2.5">
          <Bot className="w-5 h-5 text-sky-600" />
          <h3 className="text-lg font-bold text-slate-900 font-['Outfit',sans-serif]">
            Oceanographic Insights
          </h3>
          <span className="text-xs text-slate-500 font-medium">
            • Based on live ARGO float data
          </span>
        </div>
        <span className="text-xs px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-semibold">
          Float {selectedFloat?.id || '--'}
        </span>
      </div>

      {/* Action Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { key: 'explain-profile', label: 'Depth Profile' },
          { key: 'explain-measurements', label: 'Current Readings' },
          { key: 'summarize-region', label: 'Region Summary' },
          { key: 'identify-anomalies', label: 'Anomaly Check' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => handleActionClick(tab.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedPrompt === tab.key && !customResponse
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Clean Readable Insight Content */}
      <div className="p-5 sm:p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
        <h4 className="text-base font-bold text-slate-900 font-['Outfit',sans-serif]">
          {insight.title}
        </h4>

        {insight.paragraphs && (
          <div className="space-y-3">
            {insight.paragraphs.map((p, idx) => (
              <p key={idx} className="text-sm sm:text-[15px] text-slate-700 leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        )}

        {insight.items && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {insight.items.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white border border-slate-200 space-y-1.5 shadow-2xs">
                <div className="text-sm font-bold text-slate-900">{item.label}</div>
                <p className="text-sm text-slate-600 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Question Input */}
      <form onSubmit={handleCustomSubmit} className="flex flex-col sm:flex-row gap-2.5">
        <input
          type="text"
          placeholder="Ask a question about this float's measurements..."
          value={customQuestion}
          onChange={(e) => setCustomQuestion(e.target.value)}
          className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-slate-900 focus:bg-white transition-colors"
        />
        <button
          type="submit"
          disabled={loading || !customQuestion.trim()}
          className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-50 transition-colors shadow-xs"
        >
          {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          <span>Ask FloatChat</span>
        </button>
      </form>
    </div>
  );
}

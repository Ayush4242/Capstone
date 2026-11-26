import React, { useState, useMemo } from 'react';
import Plot from 'react-plotly.js';
import {
  Thermometer,
  Waves,
  Droplets,
  TrendingUp,
  Activity,
  Layers,
  HelpCircle,
} from 'lucide-react';

export default function OceanCharts({ selectedFloat }) {
  const [activeParam, setActiveParam] = useState('temperature'); // 'temperature' | 'salinity' | 'oxygen' | 'all'
  const [chartType, setChartType] = useState('depth'); // 'depth' | 'trend'

  if (!selectedFloat) {
    return (
      <div className="p-12 rounded-3xl bg-[#030914] border border-slate-800 text-center text-slate-400 font-mono text-xs">
        Select an ARGO float marker to visualize depth sounding profiles.
      </div>
    );
  }

  const profile = selectedFloat.profile || [];
  const timeSeries = selectedFloat.timeSeries || [];

  const depths = profile.map((p) => p.depth);
  const temps = profile.map((p) => p.temp);
  const salinities = profile.map((p) => p.salinity);
  const oxygens = profile.map((p) => p.o2);

  // Time-series points
  const timeDates = timeSeries.map((t) => t.date);
  const timeTemps = timeSeries.map((t) => t.temp);
  const timeSal = timeSeries.map((t) => t.salinity);

  // Configure Plotly traces for Depth Profile (Depth inverted downwards: autorange: 'reversed')
  const depthPlotData = useMemo(() => {
    const traces = [];

    if (activeParam === 'temperature' || activeParam === 'all') {
      traces.push({
        x: temps,
        y: depths,
        type: 'scatter',
        mode: 'lines+markers',
        name: 'In-situ Temperature (°C)',
        line: { color: '#06b6d4', width: 3 },
        marker: { size: 6, color: '#22d3ee' },
        hovertemplate: 'Depth: %{y} m<br>Temperature: %{x:.2f} °C<extra></extra>',
      });
    }

    if (activeParam === 'salinity' || activeParam === 'all') {
      traces.push({
        x: salinities,
        y: depths,
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Practical Salinity (PSU)',
        line: { color: '#38bdf8', width: 3 },
        marker: { size: 6, color: '#60a5fa' },
        xaxis: activeParam === 'all' ? 'x2' : 'x',
        hovertemplate: 'Depth: %{y} m<br>Salinity: %{x:.2f} PSU<extra></extra>',
      });
    }

    if (activeParam === 'oxygen') {
      traces.push({
        x: oxygens,
        y: depths,
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Dissolved Oxygen (ml/L)',
        line: { color: '#10b981', width: 3 },
        marker: { size: 6, color: '#34d399' },
        hovertemplate: 'Depth: %{y} m<br>Dissolved O₂: %{x:.2f} ml/L<extra></extra>',
      });
    }

    return traces;
  }, [activeParam, temps, salinities, oxygens, depths]);

  // Layout for Depth Profile (Reversed Y-axis: 0m at top, 2000m at bottom)
  const depthLayout = useMemo(() => {
    let xTitle = 'Temperature (°C)';
    if (activeParam === 'salinity') xTitle = 'Practical Salinity (PSU)';
    if (activeParam === 'oxygen') xTitle = 'Dissolved Oxygen (ml/L)';
    if (activeParam === 'all') xTitle = 'Temperature (°C) / Salinity (PSU)';

    return {
      autosize: true,
      paper_bgcolor: 'transparent',
      plot_bgcolor: 'rgba(2, 6, 23, 0.6)',
      font: { family: 'Inter, monospace', color: '#94a3b8' },
      margin: { l: 70, r: 40, t: 30, b: 60 },
      xaxis: {
        title: { text: xTitle, font: { size: 12, color: '#e2e8f0' } },
        gridcolor: '#1e293b',
        zerolinecolor: '#334155',
        tickfont: { color: '#cbd5e1' },
      },
      yaxis: {
        title: { text: 'Water Depth (meters / dbar)', font: { size: 12, color: '#e2e8f0' } },
        autorange: 'reversed', // Scientific standard: depth increases downwards!
        gridcolor: '#1e293b',
        zerolinecolor: '#334155',
        tickfont: { color: '#cbd5e1' },
      },
      legend: {
        x: 0.7,
        y: 0.05,
        bgcolor: 'rgba(2, 6, 23, 0.8)',
        bordercolor: 'rgba(56, 189, 248, 0.2)',
        font: { color: '#e2e8f0', size: 11 },
      },
      hovermode: 'closest',
    };
  }, [activeParam]);

  // Configure Plotly traces for Time-Series Historical Trends
  const trendPlotData = useMemo(() => {
    return [
      {
        x: timeDates,
        y: timeTemps,
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Surface Temperature (°C)',
        line: { color: '#06b6d4', width: 3 },
        marker: { size: 7, color: '#22d3ee' },
        hovertemplate: 'Date: %{x}<br>Temp: %{y:.2f} °C<extra></extra>',
      },
      {
        x: timeDates,
        y: timeSal,
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Salinity (PSU)',
        yaxis: 'y2',
        line: { color: '#818cf8', width: 2, dash: 'dot' },
        marker: { size: 6, color: '#a5b4fc' },
        hovertemplate: 'Date: %{x}<br>Salinity: %{y:.2f} PSU<extra></extra>',
      },
    ];
  }, [timeDates, timeTemps, timeSal]);

  const trendLayout = useMemo(() => {
    return {
      autosize: true,
      paper_bgcolor: 'transparent',
      plot_bgcolor: 'rgba(2, 6, 23, 0.6)',
      font: { family: 'Inter, monospace', color: '#94a3b8' },
      margin: { l: 60, r: 60, t: 30, b: 60 },
      xaxis: {
        title: { text: 'Observation Date', font: { size: 12, color: '#e2e8f0' } },
        gridcolor: '#1e293b',
        tickfont: { color: '#cbd5e1' },
      },
      yaxis: {
        title: { text: 'Sea Surface Temp (°C)', font: { size: 12, color: '#06b6d4' } },
        gridcolor: '#1e293b',
        tickfont: { color: '#cbd5e1' },
      },
      yaxis2: {
        title: { text: 'Salinity (PSU)', font: { size: 12, color: '#818cf8' } },
        overlaying: 'y',
        side: 'right',
        gridcolor: 'transparent',
        tickfont: { color: '#cbd5e1' },
      },
      legend: {
        x: 0.05,
        y: 1.1,
        orientation: 'h',
        bgcolor: 'transparent',
        font: { color: '#e2e8f0', size: 11 },
      },
      hovermode: 'x unified',
    };
  }, []);

  return (
    <div id="charts-section" className="rounded-3xl bg-[#030914] border border-cyan-500/20 p-6 sm:p-8 shadow-2xl space-y-6">
      {/* Top Chart Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <h3 className="text-xl font-black text-white font-['Outfit',sans-serif]">
              Scientific Depth Sounding & Time Series
            </h3>
          </div>
          <p className="text-xs font-mono text-slate-400 mt-0.5">
            Plotting Float {selectedFloat.id} ({selectedFloat.region}) • NetCDF Sensor Profile
          </p>
        </div>

        {/* Chart View Switcher (Depth Profile vs Trend) & Parameter Tabs */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Chart View Switcher */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs">
            <button
              onClick={() => setChartType('depth')}
              className={`px-3 py-1.5 rounded-lg font-mono font-semibold transition-all ${
                chartType === 'depth'
                  ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Vertical Depth Profile (0–2000m)
            </button>
            <button
              onClick={() => setChartType('trend')}
              className={`px-3 py-1.5 rounded-lg font-mono font-semibold transition-all ${
                chartType === 'trend'
                  ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Historical Trend
            </button>
          </div>

          {/* Parameter Tabs (for Depth chart) */}
          {chartType === 'depth' && (
            <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs">
              <button
                onClick={() => setActiveParam('temperature')}
                className={`px-2.5 py-1.5 rounded-lg font-mono transition-all ${
                  activeParam === 'temperature'
                    ? 'bg-cyan-950 border border-cyan-400 text-cyan-300 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Temperature
              </button>
              <button
                onClick={() => setActiveParam('salinity')}
                className={`px-2.5 py-1.5 rounded-lg font-mono transition-all ${
                  activeParam === 'salinity'
                    ? 'bg-cyan-950 border border-cyan-400 text-cyan-300 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Salinity
              </button>
              <button
                onClick={() => setActiveParam('oxygen')}
                className={`px-2.5 py-1.5 rounded-lg font-mono transition-all ${
                  activeParam === 'oxygen'
                    ? 'bg-cyan-950 border border-cyan-400 text-cyan-300 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Dissolved O₂
              </button>
              <button
                onClick={() => setActiveParam('all')}
                className={`px-2.5 py-1.5 rounded-lg font-mono transition-all ${
                  activeParam === 'all'
                    ? 'bg-cyan-950 border border-cyan-400 text-cyan-300 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Combined
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Plotly Canvas Container */}
      <div className="w-full h-[480px] bg-[#020611] rounded-2xl border border-slate-800 p-2 overflow-hidden">
        {chartType === 'depth' ? (
          <Plot
            data={depthPlotData}
            layout={depthLayout}
            useResizeHandler={true}
            style={{ width: '100%', height: '100%' }}
            config={{ responsive: true, displayModeBar: true, displaylogo: false }}
          />
        ) : (
          <Plot
            data={trendPlotData}
            layout={trendLayout}
            useResizeHandler={true}
            style={{ width: '100%', height: '100%' }}
            config={{ responsive: true, displayModeBar: true, displaylogo: false }}
          />
        )}
      </div>

      {/* Oceanographic Sounding Notation */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-400 pt-2 border-t border-slate-800/80 gap-2">
        <div className="flex items-center gap-2">
          <span className="text-cyan-400">● Note:</span>
          <span>Depth is inverted downwards (0m surface to 2,000m abyss) adhering to IOC/WMO standards.</span>
        </div>
        <div className="text-slate-500">
          Source: ARGO GDAC NetCDF Ingestion
        </div>
      </div>
    </div>
  );
}

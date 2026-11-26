import React, { useState, useMemo } from 'react';
import Plot from 'react-plotly.js';

export default function OceanCharts({ selectedFloat }) {
  const [activeParam, setActiveParam] = useState('temperature'); // 'temperature' | 'salinity' | 'oxygen' | 'all'
  const [chartType, setChartType] = useState('depth'); // 'depth' | 'trend'

  if (!selectedFloat) {
    return (
      <div className="p-8 rounded-2xl bg-[#0c1017] border border-white/[0.08] text-center text-slate-500 font-mono text-xs">
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

  const timeDates = timeSeries.map((t) => t.date);
  const timeTemps = timeSeries.map((t) => t.temp);
  const timeSal = timeSeries.map((t) => t.salinity);

  // Configure Plotly traces for Depth Profile
  const depthPlotData = useMemo(() => {
    const traces = [];

    if (activeParam === 'temperature' || activeParam === 'all') {
      traces.push({
        x: temps,
        y: depths,
        type: 'scatter',
        mode: 'lines+markers',
        name: 'In-situ Temperature (°C)',
        line: { color: '#38bdf8', width: 2.5 },
        marker: { size: 5, color: '#e0f2fe' },
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
        line: { color: '#818cf8', width: 2.5 },
        marker: { size: 5, color: '#c7d2fe' },
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
        line: { color: '#34d399', width: 2.5 },
        marker: { size: 5, color: '#a7f3d0' },
        hovertemplate: 'Depth: %{y} m<br>Dissolved O₂: %{x:.2f} ml/L<extra></extra>',
      });
    }

    return traces;
  }, [activeParam, temps, salinities, oxygens, depths]);

  // Layout for Depth Profile (Depth inverted downwards)
  const depthLayout = useMemo(() => {
    let xTitle = 'Temperature (°C)';
    if (activeParam === 'salinity') xTitle = 'Practical Salinity (PSU)';
    if (activeParam === 'oxygen') xTitle = 'Dissolved Oxygen (ml/L)';
    if (activeParam === 'all') xTitle = 'Temperature (°C) / Salinity (PSU)';

    return {
      autosize: true,
      paper_bgcolor: 'transparent',
      plot_bgcolor: '#090d14',
      font: { family: 'Inter, monospace', color: '#94a3b8' },
      margin: { l: 65, r: 35, t: 25, b: 50 },
      xaxis: {
        title: { text: xTitle, font: { size: 11, color: '#cbd5e1' } },
        gridcolor: '#1b222d',
        zerolinecolor: '#2d3748',
        tickfont: { color: '#94a3b8', size: 10 },
      },
      yaxis: {
        title: { text: 'Water Depth (meters / dbar)', font: { size: 11, color: '#cbd5e1' } },
        autorange: 'reversed',
        gridcolor: '#1b222d',
        zerolinecolor: '#2d3748',
        tickfont: { color: '#94a3b8', size: 10 },
      },
      legend: {
        x: 0.72,
        y: 0.05,
        bgcolor: '#0c1017',
        bordercolor: '#21262d',
        font: { color: '#cbd5e1', size: 10 },
      },
      hovermode: 'closest',
    };
  }, [activeParam]);

  // Layout for Time-Series Historical Trends
  const trendPlotData = useMemo(() => {
    return [
      {
        x: timeDates,
        y: timeTemps,
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Surface Temperature (°C)',
        line: { color: '#38bdf8', width: 2.5 },
        marker: { size: 6, color: '#e0f2fe' },
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
        marker: { size: 5, color: '#c7d2fe' },
        hovertemplate: 'Date: %{x}<br>Salinity: %{y:.2f} PSU<extra></extra>',
      },
    ];
  }, [timeDates, timeTemps, timeSal]);

  const trendLayout = useMemo(() => {
    return {
      autosize: true,
      paper_bgcolor: 'transparent',
      plot_bgcolor: '#090d14',
      font: { family: 'Inter, monospace', color: '#94a3b8' },
      margin: { l: 55, r: 55, t: 25, b: 50 },
      xaxis: {
        title: { text: 'Observation Date', font: { size: 11, color: '#cbd5e1' } },
        gridcolor: '#1b222d',
        tickfont: { color: '#94a3b8', size: 10 },
      },
      yaxis: {
        title: { text: 'Sea Surface Temp (°C)', font: { size: 11, color: '#38bdf8' } },
        gridcolor: '#1b222d',
        tickfont: { color: '#94a3b8', size: 10 },
      },
      yaxis2: {
        title: { text: 'Salinity (PSU)', font: { size: 11, color: '#818cf8' } },
        overlaying: 'y',
        side: 'right',
        gridcolor: 'transparent',
        tickfont: { color: '#94a3b8', size: 10 },
      },
      legend: {
        x: 0.05,
        y: 1.1,
        orientation: 'h',
        bgcolor: 'transparent',
        font: { color: '#cbd5e1', size: 10 },
      },
      hovermode: 'x unified',
    };
  }, []);

  return (
    <div id="charts-section" className="rounded-2xl bg-[#0c1017] border border-white/[0.08] p-5 sm:p-6 shadow-sm space-y-4">
      {/* Chart Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-white font-['Outfit',sans-serif]">
              Depth Sounding & Time Series Profile
            </h3>
          </div>
          <p className="text-xs font-mono text-slate-400 mt-0.5">
            Float {selectedFloat.id} ({selectedFloat.region}) • CTD Telemetry
          </p>
        </div>

        {/* Chart View Switcher & Parameter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 p-1 rounded-lg bg-[#07090e] border border-white/[0.08] text-xs">
            <button
              onClick={() => setChartType('depth')}
              className={`px-2.5 py-1 rounded-md font-mono text-xs transition-colors ${
                chartType === 'depth'
                  ? 'bg-slate-800 text-white font-medium border border-white/10'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Depth Sounding (0–2000m)
            </button>
            <button
              onClick={() => setChartType('trend')}
              className={`px-2.5 py-1 rounded-md font-mono text-xs transition-colors ${
                chartType === 'trend'
                  ? 'bg-slate-800 text-white font-medium border border-white/10'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Time Series
            </button>
          </div>

          {chartType === 'depth' && (
            <div className="flex items-center gap-1 p-1 rounded-lg bg-[#07090e] border border-white/[0.08] text-xs">
              <button
                onClick={() => setActiveParam('temperature')}
                className={`px-2 py-1 rounded-md font-mono text-[11px] transition-colors ${
                  activeParam === 'temperature'
                    ? 'bg-slate-800 text-white font-medium'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Temperature
              </button>
              <button
                onClick={() => setActiveParam('salinity')}
                className={`px-2 py-1 rounded-md font-mono text-[11px] transition-colors ${
                  activeParam === 'salinity'
                    ? 'bg-slate-800 text-white font-medium'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Salinity
              </button>
              <button
                onClick={() => setActiveParam('oxygen')}
                className={`px-2 py-1 rounded-md font-mono text-[11px] transition-colors ${
                  activeParam === 'oxygen'
                    ? 'bg-slate-800 text-white font-medium'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Oxygen
              </button>
              <button
                onClick={() => setActiveParam('all')}
                className={`px-2 py-1 rounded-md font-mono text-[11px] transition-colors ${
                  activeParam === 'all'
                    ? 'bg-slate-800 text-white font-medium'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Combined
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Plotly Chart Canvas */}
      <div className="w-full h-[440px] bg-[#07090e] rounded-xl border border-white/[0.06] p-1 overflow-hidden">
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

      {/* Footnote */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-500 pt-1">
        <span>● Y-axis depth inverted downwards (0m surface to 2000m depth) conforming to WMO/IOC standards.</span>
        <span>Data Source: ARGO Global Array</span>
      </div>
    </div>
  );
}

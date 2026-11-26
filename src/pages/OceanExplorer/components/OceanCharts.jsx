import React, { useState, useMemo } from 'react';
import Plot from 'react-plotly.js';

export default function OceanCharts({ selectedFloat }) {
  const [activeParam, setActiveParam] = useState('temperature'); // 'temperature' | 'salinity' | 'oxygen' | 'all'
  const [chartType, setChartType] = useState('depth'); // 'depth' | 'trend'

  if (!selectedFloat) {
    return (
      <div className="p-8 rounded-2xl bg-white border border-slate-200 text-center text-slate-500 font-mono text-xs shadow-xs">
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
      plot_bgcolor: '#f8fafc',
      font: { family: 'Inter, monospace', color: '#475569' },
      margin: { l: 65, r: 35, t: 25, b: 50 },
      xaxis: {
        title: { text: xTitle, font: { size: 11, color: '#1e293b' } },
        gridcolor: '#e2e8f0',
        zerolinecolor: '#cbd5e1',
        tickfont: { color: '#64748b', size: 10 },
      },
      yaxis: {
        title: { text: 'Water Depth (meters / dbar)', font: { size: 11, color: '#1e293b' } },
        autorange: 'reversed',
        gridcolor: '#e2e8f0',
        zerolinecolor: '#cbd5e1',
        tickfont: { color: '#64748b', size: 10 },
      },
      legend: {
        x: 0.72,
        y: 0.05,
        bgcolor: 'rgba(255, 255, 255, 0.9)',
        bordercolor: '#cbd5e1',
        font: { color: '#1e293b', size: 10 },
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
        line: { color: '#0284c7', width: 2.5 },
        marker: { size: 6, color: '#0369a1' },
        hovertemplate: 'Date: %{x}<br>Temp: %{y:.2f} °C<extra></extra>',
      },
      {
        x: timeDates,
        y: timeSal,
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Salinity (PSU)',
        yaxis: 'y2',
        line: { color: '#6366f1', width: 2, dash: 'dot' },
        marker: { size: 5, color: '#4f46e5' },
        hovertemplate: 'Date: %{x}<br>Salinity: %{y:.2f} PSU<extra></extra>',
      },
    ];
  }, [timeDates, timeTemps, timeSal]);

  const trendLayout = useMemo(() => {
    return {
      autosize: true,
      paper_bgcolor: 'transparent',
      plot_bgcolor: '#f8fafc',
      font: { family: 'Inter, monospace', color: '#475569' },
      margin: { l: 55, r: 55, t: 25, b: 50 },
      xaxis: {
        title: { text: 'Observation Date', font: { size: 11, color: '#1e293b' } },
        gridcolor: '#e2e8f0',
        tickfont: { color: '#64748b', size: 10 },
      },
      yaxis: {
        title: { text: 'Sea Surface Temp (°C)', font: { size: 11, color: '#0284c7' } },
        gridcolor: '#e2e8f0',
        tickfont: { color: '#64748b', size: 10 },
      },
      yaxis2: {
        title: { text: 'Salinity (PSU)', font: { size: 11, color: '#6366f1' } },
        overlaying: 'y',
        side: 'right',
        gridcolor: 'transparent',
        tickfont: { color: '#64748b', size: 10 },
      },
      legend: {
        x: 0.05,
        y: 1.1,
        orientation: 'h',
        bgcolor: 'transparent',
        font: { color: '#1e293b', size: 10 },
      },
      hovermode: 'x unified',
    };
  }, []);

  return (
    <div id="charts-section" className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4 text-slate-900">
      {/* Chart Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900 font-['Outfit',sans-serif]">
              Depth Sounding & Time Series Profile
            </h3>
          </div>
          <p className="text-xs font-mono text-slate-500 mt-0.5">
            Float {selectedFloat.id} ({selectedFloat.region}) • CTD Telemetry
          </p>
        </div>

        {/* Chart View Switcher & Parameter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-100 border border-slate-200 text-xs">
            <button
              onClick={() => setChartType('depth')}
              className={`px-2.5 py-1 rounded-md font-mono text-xs transition-colors ${
                chartType === 'depth'
                  ? 'bg-white text-slate-900 font-semibold shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Depth Sounding (0–2000m)
            </button>
            <button
              onClick={() => setChartType('trend')}
              className={`px-2.5 py-1 rounded-md font-mono text-xs transition-colors ${
                chartType === 'trend'
                  ? 'bg-white text-slate-900 font-semibold shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Time Series
            </button>
          </div>

          {chartType === 'depth' && (
            <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-100 border border-slate-200 text-xs">
              <button
                onClick={() => setActiveParam('temperature')}
                className={`px-2 py-1 rounded-md font-mono text-[11px] transition-colors ${
                  activeParam === 'temperature'
                    ? 'bg-white text-slate-900 font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Temperature
              </button>
              <button
                onClick={() => setActiveParam('salinity')}
                className={`px-2 py-1 rounded-md font-mono text-[11px] transition-colors ${
                  activeParam === 'salinity'
                    ? 'bg-white text-slate-900 font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Salinity
              </button>
              <button
                onClick={() => setActiveParam('oxygen')}
                className={`px-2 py-1 rounded-md font-mono text-[11px] transition-colors ${
                  activeParam === 'oxygen'
                    ? 'bg-white text-slate-900 font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Oxygen
              </button>
              <button
                onClick={() => setActiveParam('all')}
                className={`px-2 py-1 rounded-md font-mono text-[11px] transition-colors ${
                  activeParam === 'all'
                    ? 'bg-white text-slate-900 font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Combined
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Plotly Chart Canvas */}
      <div className="w-full h-[440px] bg-slate-50 rounded-xl border border-slate-200 p-1 overflow-hidden">
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

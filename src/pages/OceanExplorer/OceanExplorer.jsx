import React, { useState } from 'react';
import ExplorerHeader from './components/ExplorerHeader';
import OverviewCards from './components/OverviewCards';
import OceanMap from './components/OceanMap';
import FilterSidebar from './components/FilterSidebar';
import FloatDetailsPanel from './components/FloatDetailsPanel';
import OceanCharts from './components/OceanCharts';
import AIInsights from './components/AIInsights';
import ArgoInfoModal from './components/ArgoInfoModal';
import { useOceanData } from './hooks/useOceanData';
import { Compass, HelpCircle, Layers, Activity } from 'lucide-react';

export default function OceanExplorer() {
  const {
    filteredFloats,
    selectedFloat,
    setSelectedFloatId,
    selectedRegion,
    handleSelectRegion,
    visualizationMode,
    setVisualizationMode,
    mapCenter,
    mapZoom,
    filters,
    setFilters,
    resetFilters,
    statistics,
  } = useOceanData();

  const [activeTab, setActiveTab] = useState('explorer');
  const [detailsPanelOpen, setDetailsPanelOpen] = useState(false);
  const [infoModalOpen, setInfoModalOpen] = useState(false);

  // When a float marker is clicked on the map
  const handleSelectFloatFromMap = (floatId) => {
    setSelectedFloatId(floatId);
    setDetailsPanelOpen(true);
  };

  // Smooth scroll down to scientific Plotly depth charts section
  const handleViewCharts = () => {
    const el = document.getElementById('charts-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col font-['Inter',sans-serif]">
      {/* Top Research Header */}
      <ExplorerHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Dashboard Body */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Top 4 Overview Statistics Cards */}
        <OverviewCards statistics={statistics} />

        {/* Ocean Map and Filter Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Large Interactive Leaflet Ocean Map (8 or 9 cols) */}
          <div className="lg:col-span-8 xl:col-span-9">
            <OceanMap
              floats={filteredFloats}
              selectedFloat={selectedFloat}
              onSelectFloat={handleSelectFloatFromMap}
              visualizationMode={visualizationMode}
              setVisualizationMode={setVisualizationMode}
              selectedRegion={selectedRegion}
              onSelectRegion={handleSelectRegion}
              mapCenter={mapCenter}
              mapZoom={mapZoom}
              onResetGlobalView={resetFilters}
              onOpenInfoModal={() => setInfoModalOpen(true)}
            />
          </div>

          {/* Scientific Filter Sidebar (4 or 3 cols) */}
          <div className="lg:col-span-4 xl:col-span-3">
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              onResetFilters={resetFilters}
              totalResults={filteredFloats.length}
            />
          </div>
        </div>

        {/* Dedicated Scientific Plotly Ocean Depth Sounding & Time Series Charts */}
        <OceanCharts selectedFloat={selectedFloat} />

        {/* AI Oceanographic Insights Section */}
        <AIInsights
          selectedFloat={selectedFloat}
          selectedRegion={selectedRegion}
        />
      </main>

      {/* Slide-over Right Float Details Panel */}
      <FloatDetailsPanel
        float={selectedFloat}
        isOpen={detailsPanelOpen}
        onClose={() => setDetailsPanelOpen(false)}
        onViewChartsSection={handleViewCharts}
      />

      {/* Educational First-Time Visitor Modal */}
      <ArgoInfoModal
        isOpen={infoModalOpen}
        onClose={() => setInfoModalOpen(false)}
      />
    </div>
  );
}

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

  const handleSelectFloatFromMap = (floatId) => {
    setSelectedFloatId(floatId);
    setDetailsPanelOpen(true);
  };

  const handleViewCharts = () => {
    const el = document.getElementById('charts-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-['Inter',sans-serif]">
      {/* Top Header */}
      <ExplorerHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Dashboard Layout */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Overview Stats */}
        <OverviewCards statistics={statistics} />

        {/* Map and Filter Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
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

          <div className="lg:col-span-4 xl:col-span-3">
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              onResetFilters={resetFilters}
              totalResults={filteredFloats.length}
            />
          </div>
        </div>

        {/* Plotly Depth Sounding & Time Series Charts */}
        <OceanCharts selectedFloat={selectedFloat} />

        {/* Grounded Oceanographic AI Analysis */}
        <AIInsights
          selectedFloat={selectedFloat}
          selectedRegion={selectedRegion}
        />
      </main>

      {/* Right Float Details Drawer */}
      <FloatDetailsPanel
        float={selectedFloat}
        isOpen={detailsPanelOpen}
        onClose={() => setDetailsPanelOpen(false)}
        onViewChartsSection={handleViewCharts}
      />

      {/* Information Modal */}
      <ArgoInfoModal
        isOpen={infoModalOpen}
        onClose={() => setInfoModalOpen(false)}
      />
    </div>
  );
}

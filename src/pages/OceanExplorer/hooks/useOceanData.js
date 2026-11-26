import { useState, useMemo, useCallback } from 'react';
import { DEMO_ARGO_FLOATS } from '../data/argoData';
import { OCEAN_REGIONS } from '../data/regionsData';

export function useOceanData() {
  const [allFloats] = useState(DEMO_ARGO_FLOATS);
  const [selectedRegionId, setSelectedRegionId] = useState('global');
  const [selectedFloatId, setSelectedFloatId] = useState(DEMO_ARGO_FLOATS[0].id);
  const [visualizationMode, setVisualizationMode] = useState('locations'); // 'locations' | 'temperature' | 'salinity' | 'oxygen'
  const [mapCenter, setMapCenter] = useState([15.0, 30.0]);
  const [mapZoom, setMapZoom] = useState(2.5);

  // Filters State
  const [filters, setFilters] = useState({
    region: 'all',
    startDate: '',
    endDate: '',
    minDepth: 0,
    maxDepth: 2000,
    parameters: {
      temperature: true,
      salinity: true,
      oxygen: true,
    },
    floatIdQuery: '',
    qualityFilter: 'all', // 'all' | 'level1'
  });

  // Currently selected region object
  const selectedRegion = useMemo(() => {
    return OCEAN_REGIONS.find((r) => r.id === selectedRegionId) || OCEAN_REGIONS[0];
  }, [selectedRegionId]);

  // Handle region selection from search bar, dropdown or quick buttons
  const handleSelectRegion = useCallback((regionId) => {
    setSelectedRegionId(regionId);
    const reg = OCEAN_REGIONS.find((r) => r.id === regionId);
    if (reg) {
      setMapCenter(reg.center);
      setMapZoom(reg.zoom);
    }
    // Also sync filter if not global
    setFilters((prev) => ({
      ...prev,
      region: regionId === 'global' ? 'all' : regionId,
    }));
  }, []);

  // Filtered Floats based on all active criteria
  const filteredFloats = useMemo(() => {
    return allFloats.filter((float) => {
      // Region filter
      if (filters.region !== 'all' && float.regionKey !== filters.region) {
        return false;
      }

      // Float ID search query
      if (
        filters.floatIdQuery &&
        !float.id.toLowerCase().includes(filters.floatIdQuery.toLowerCase()) &&
        !float.wmo.includes(filters.floatIdQuery)
      ) {
        return false;
      }

      // Quality filter
      if (filters.qualityFilter === 'level1' && !float.qcFlag.includes('Level 1')) {
        return false;
      }

      // Date range filter
      if (filters.startDate && float.lastObservationDate < filters.startDate) {
        return false;
      }
      if (filters.endDate && float.lastObservationDate > filters.endDate) {
        return false;
      }

      // Depth filter
      if (float.maxDepth < filters.minDepth) {
        return false;
      }

      return true;
    });
  }, [allFloats, filters]);

  // Selected Float Object
  const selectedFloat = useMemo(() => {
    const found = allFloats.find((f) => f.id === selectedFloatId);
    if (found) return found;
    return filteredFloats.length > 0 ? filteredFloats[0] : null;
  }, [allFloats, selectedFloatId, filteredFloats]);

  // Overview Statistics
  const statistics = useMemo(() => {
    const totalFloats = filteredFloats.length;
    const uniqueRegions = new Set(filteredFloats.map((f) => f.region)).size;
    const totalObservations = filteredFloats.reduce((sum, f) => sum + (f.profile ? f.profile.length : 0), 0);

    const avgTemp =
      totalFloats > 0
        ? (filteredFloats.reduce((sum, f) => sum + f.surfaceTemp, 0) / totalFloats).toFixed(2)
        : '--';

    const avgSalinity =
      totalFloats > 0
        ? (filteredFloats.reduce((sum, f) => sum + f.surfaceSalinity, 0) / totalFloats).toFixed(2)
        : '--';

    const avgOxygen =
      totalFloats > 0
        ? (filteredFloats.reduce((sum, f) => sum + f.dissolvedOxygen, 0) / totalFloats).toFixed(2)
        : '--';

    return {
      totalFloats,
      uniqueRegions,
      totalObservations,
      avgTemp,
      avgSalinity,
      avgOxygen,
      selectedRegionName: selectedRegion.label,
    };
  }, [filteredFloats, selectedRegion]);

  // Reset Filters
  const resetFilters = useCallback(() => {
    setFilters({
      region: 'all',
      startDate: '',
      endDate: '',
      minDepth: 0,
      maxDepth: 2000,
      parameters: {
        temperature: true,
        salinity: true,
        oxygen: true,
      },
      floatIdQuery: '',
      qualityFilter: 'all',
    });
    setSelectedRegionId('global');
    setMapCenter([15.0, 30.0]);
    setMapZoom(2.5);
  }, []);

  return {
    allFloats,
    filteredFloats,
    selectedFloat,
    setSelectedFloatId,
    selectedRegion,
    selectedRegionId,
    handleSelectRegion,
    visualizationMode,
    setVisualizationMode,
    mapCenter,
    mapZoom,
    setMapCenter,
    setMapZoom,
    filters,
    setFilters,
    resetFilters,
    statistics,
  };
}

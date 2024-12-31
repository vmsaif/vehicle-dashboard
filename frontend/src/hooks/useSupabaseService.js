/**
 * @file:        useIndicators.js
 * @project:     vehicle-dashboard
 * @author:      Saif Mahmud
 * @date:        2024-12-30
 * @version:     0.1
 * @contact:     msaifofficial@gmail.com
 *
 * @description: Custom hook for fetching vehicle indicators.
 */

import { useEffect, useState } from 'react';
import { supabaseService } from '../services/supabaseService';

export function useSupabaseService(vehicleId) {
  const [data, setData] = useState({
    indicators: supabaseService.indicators,
    infoTiles: supabaseService.infoTiles,
    gaugeData: supabaseService.gaugeData,
    motorSpeed: supabaseService.motorSpeed,
  });

  useEffect(() => {
    const updateData = (newData) => {
      setData(newData);
    };

    supabaseService.subscribe(updateData, vehicleId);

    // Fetch initial data
    supabaseService.fetchData(vehicleId);

    return () => {
      supabaseService.unsubscribe(updateData);
    };
  }, [vehicleId]);

  return data;
}

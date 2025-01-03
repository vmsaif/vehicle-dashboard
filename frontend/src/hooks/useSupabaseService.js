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
import { supabaseService } from '../services/supabaseService.js';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('supabaseUrl and supabaseAnonKey are required.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Custom hook for fetching vehicle indicators.
 * @param {number} vehicleId - The ID of the vehicle to fetch indicators for.
 * @returns {object} - The vehicle indicators.
 */
export function useSupabaseService(vehicleId) {
  const [data, setData] = useState({
    indicators: supabaseService.indicators,
    infoTiles: supabaseService.infoTiles,
    gaugeData: supabaseService.gaugeData,
    sliderValue: supabaseService.sliderValue,
  });

  useEffect(() => {
    const updateData = (newData) => {
      setData(newData);
    };

    // Subscribe to updates
    supabaseService.subscribe(updateData, vehicleId);

    // Fetch initial data
    supabaseService.fetchData(vehicleId);

    return () => {
      supabaseService.unsubscribe(updateData);
    };
  }, [vehicleId]);

  return data;
}

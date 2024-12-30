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

export function useIndicators(vehicleId) {
  const [indicators, setIndicators] = useState(supabaseService.indicators);

  useEffect(() => {
    const updateIndicators = (newIndicators) => {
      setIndicators(newIndicators);
    };

    supabaseService.subscribe(updateIndicators, vehicleId);

    return () => {
      supabaseService.unsubscribe(updateIndicators, vehicleId);
    };
  }, []);

  return indicators;
}

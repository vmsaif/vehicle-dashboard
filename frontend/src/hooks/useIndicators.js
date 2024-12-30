import { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient.js';

export function useIndicators(vehicleId) {
  const [indicators, setIndicators] = useState({
    parking_brake: false,
    check_engine: false,
    motor_status: false,
    battery_low: false,
    is_charging: false,
  });

  useEffect(() => {
    // Fetch initial indicator status
    const fetchIndicators = async () => {
      const { data, error } = await supabase
        .from('indicators')
        .select('*')
        .eq('vehicle_id', vehicleId);

      if (error) {
        console.error('Error fetching indicators:', error);
      } else {
        console.log('Fetched indicators:', data);
        setIndicators(data[0]);
      }
    };

    fetchIndicators();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('indicators_channel')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'indicators',
        filter: `vehicle_id=eq.${vehicleId}`
      }, (payload) => {
        setIndicators(payload.new);
        console.log('Received indicator update:', payload.new);
      })
      .subscribe();

    // Cleanup subscription on component unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [vehicleId]);

  return indicators;
}
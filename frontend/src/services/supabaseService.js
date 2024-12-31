/**
 * @file:        supabaseService.js
 * @project:     vehicle-dashboard
 * @version:     0.1
 * @contact:     msaifofficial@gmail.com
 *
 * @description: Service for handling real-time updates from Supabase.
 */

import { supabase } from './supabaseClient';

class SupabaseService {
  constructor() {
    this.indicators = {
      parking_brake: false,
      check_engine: false,
      motor_status: false,
      battery_low: false,
      is_charging: false,
    };
    this.infoTiles = {
      gear_ratio: 'N/N',
      battery_percentage: 22,
      battery_temperature: 33,
      motor_rpm: 0.0,
    };
    this.gaugeData = {
      power_consumption: 0,
      motor_rpm: 0.0,
    };
    this.motorSpeed = 0;
    this.subscribers = [];
    this.subscribed = false;
  }

  async fetchData(vehicleId) {
    try {
      const { data: indicatorsData, error: indicatorsError } = await supabase
        .from('indicators')
        .select('*')
        .eq('vehicle_id', vehicleId)
        .single();

      const { data: gearData, error: gearError } = await supabase
        .from('gear')
        .select('ratio')
        .eq('vehicle_id', vehicleId)
        .single();

      const { data: batteryData, error: batteryError } = await supabase
        .from('battery')
        .select('percentage, temperature')
        .eq('vehicle_id', vehicleId)
        .single();

      const { data: motorData, error: motorError } = await supabase
        .from('motor')
        .select('rpm, speed_setting')
        .eq('vehicle_id', vehicleId)
        .single();

      const { data: powerData, error: powerError } = await supabase
        .from('power')
        .select('power_consumption, power_input')
        .eq('vehicle_id', vehicleId)
        .single();

      if (indicatorsError || gearError || batteryError || motorError || powerError) {
        throw new Error('Error fetching data from one or more tables');
      }

      this.indicators = indicatorsData;
      console.log('charging:' + this.indicators.is_charging);
      this.infoTiles = {
        gear_ratio: gearData ? gearData.ratio : 'N/N',
        battery_percentage: batteryData ? batteryData.percentage : 0,
        battery_temperature: batteryData ? batteryData.temperature : 0,
        motor_rpm: motorData ? motorData.rpm : 0,
      };
      this.gaugeData = {
        power_consumption: powerData ? powerData.power_consumption : 0,
        motor_rpm: motorData ? motorData.rpm : 0,
      };
      this.motorSpeed = motorData ? motorData.speed_setting : 0;

      this.notifySubscribers();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  subscribe(callback, vehicleId) {
    if (!this.subscribed) {
      this.initSubscription(vehicleId);
      this.subscribed = true;
    }
    this.subscribers.push(callback);
    callback({
      indicators: this.indicators,
      infoTiles: this.infoTiles,
      gaugeData: this.gaugeData,
      motorSpeed: this.motorSpeed,
    });
  }

  unsubscribe(callback) {
    this.subscribers = this.subscribers.filter(cb => cb !== callback);
  }

  notifySubscribers() {
    this.subscribers.forEach(callback => callback({
      indicators: this.indicators,
      infoTiles: this.infoTiles,
      gaugeData: this.gaugeData,
      motorSpeed: this.motorSpeed,
    }));
  }

  initSubscription(vehicleId) {
    // Initialize real-time subscription for each table
    ['indicators', 'gear', 'battery', 'motor', 'power'].forEach(table => {
      const channel = supabase
        .channel(`${table}_channel`)
        .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: table,
          filter: `vehicle_id=eq.${vehicleId}`
        }, (payload) => {
          this.fetchData(vehicleId);
        })
        .subscribe();
    });
  }
}

export const supabaseService = new SupabaseService();

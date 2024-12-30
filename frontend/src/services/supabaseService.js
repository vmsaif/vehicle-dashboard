/**
 * @file:        supabaseService.js
 * @project:     vehicle-dashboard
 * @author:      Saif Mahmud
 * @date:        2024-12-30
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
    this.subscribers = [];
    this.subscribed = false;

  }

  subscribe(callback, vehicleId) {
    if (!this.subscribed) {
      this.initSubscription(vehicleId);
      this.subscribed = true;
    }
    this.subscribers.push(callback);
    callback(this.indicators);
  }

  unsubscribe(callback) {
    this.subscribers = this.subscribers.filter(cb => cb !== callback);
  }

  notifySubscribers() {
    this.subscribers.forEach(callback => callback(this.indicators));
  }

  initSubscription(vehicleId) {
    // Initialize real-time subscription
    const channel = supabase
      .channel('indicators_channel')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'indicators',
        filter: `vehicle_id=eq.${vehicleId}`
      }, (payload) => {
        this.indicators = payload.new;
        this.notifySubscribers();
      })
      .subscribe();
  }
}

export const supabaseService = new SupabaseService();

/**
 * @file:        simulation.js
 * @project:     vehicle-dashboard
 * @author:      Saif Mahmud
 * @date:        2024-12-31
 * @version:     0.1
 * @contact:     msaifofficial@gmail.com
 *
 * @description: This file contains the simulation logic for the vehicle dashboard. It used supabase database subscription to get the data. Then makes appropriate calculations and API calls to update the database.
 */

import { supabaseService } from '../services/supabaseService.js';
import * as apiControllers from './controllers/apiController.js';

let vehicleId = 1;

let initial_data = {
  indicators: supabaseService.indicators,
  infoTiles: supabaseService.infoTiles,
  gaugeData: supabaseService.gaugeData,
  motorSpeed: supabaseService.motorSpeed,
  };

function setState(newState) {
  initial_data = newState;
  simulateVehicleBehavior(newState);
  console.log('Change found:', newState);
}

function motorIndicatorChangeLogic(new_data) {
  let threshold = 600;
  let isMotorOn = new_data.indicators.motor_status;
  console.log('Motor status:', isMotorOn);
  if (new_data.gaugeData.motor_rpm > threshold && !isMotorOn) {
    apiControllers.updateIndicatorStatus(vehicleId, 'motor_status', 'true');
  } else if (new_data.gaugeData.motor_rpm <= threshold && isMotorOn) {
    apiControllers.updateIndicatorStatus(vehicleId, 'motor_status', 'false');
  }
}

function simulateVehicleBehavior(data) {

  let new_data = { ...data };

  // change motor indicator if rpm is
  motorIndicatorChangeLogic(new_data);
  lowBatteryIndicatorChangeLogic(new_data);
  powerConsumptionLogic(new_data);
}

function powerConsumptionLogic(new_data) {
  let powerConsumption = new_data.gaugeData.power_consumption;
  let motorRpm = new_data.gaugeData.motor_rpm;
  const powerConsumptionPerRpm = 0.1;
  let calculatedPowerConsumption = motorRpm * powerConsumptionPerRpm;

  if (powerConsumption !== calculatedPowerConsumption) {
    apiControllers.updatePowerConsumption(vehicleId, calculatedPowerConsumption);
  }
}

function lowBatteryIndicatorChangeLogic(new_data) {
  let batteryPercentage = new_data.infoTiles.battery_percentage;
  let isBatteryLow = new_data.indicators.battery_low;
  let threshold = 20;

  if (batteryPercentage <= threshold && !isBatteryLow) {
    apiControllers.updateIndicatorStatus(vehicleId, 'battery_low', 'true');
  } else if (batteryPercentage > threshold && isBatteryLow) {
    apiControllers.updateIndicatorStatus(vehicleId, 'battery_low', 'false');
  }
}



// function startSimulation() {
//   setInterval(() => {
//     simulateVehicleBehavior(initial_data);
//   }, 1000);
// }



supabaseService.subscribe(setState, vehicleId);
supabaseService.fetchData(vehicleId);
// supabaseService.unsubscribe(updateData);

// startSimulation();





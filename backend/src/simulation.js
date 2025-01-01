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
  sliderValue: supabaseService.sliderValue,
}

function setState(newState) {
  initial_data = newState;
  simulateVehicleBehavior(newState);
  console.log('Change found:', newState);
}

function motorIndicatorChangeLogic(new_data) {
  let threshold = 600;
  let isMotorOn = new_data.indicators.motor_status;
  let motorRpm = new_data.infoTiles.motor_rpm;
  if (motorRpm > threshold && !isMotorOn) {
    apiControllers.updateIndicatorStatus(vehicleId, 'motor_status', 'true');
  } else if (motorRpm <= threshold && isMotorOn) {
    apiControllers.updateIndicatorStatus(vehicleId, 'motor_status', 'false');
  }
}

function simulateVehicleBehavior(data) {

  let new_data = { ...data };

  // change motor indicator if rpm is
  motorIndicatorChangeLogic(new_data);
  lowBatteryIndicatorChangeLogic(new_data);
  powerConsumptionLogic(new_data);
  chargingLogic(new_data);
  motorRpmLogic(new_data);
  wheelRPMLogic(new_data);

}

function chargingLogic(new_data) {
  let isCharging = new_data.indicators.is_charging;
  let batteryPercentage = new_data.infoTiles.battery_percentage;
  let batteryTemperature = new_data.infoTiles.battery_temperature;

  if (isCharging){
    // set slider to 0
    apiControllers.updateMotorSpeedBar(vehicleId, 0);
  }
}


function motorRpmLogic(new_data) {
  let sliderValue = new_data.sliderValue; // 0 to 4 the slider value
  let motorSpecsConstant = 225;
  let motorRpm = sliderValue * motorSpecsConstant;

  if (new_data.infoTiles.motor_rpm !== motorRpm) {
    apiControllers.updateMotorRpm(vehicleId, motorRpm);
  }
}

function wheelRPMLogic(new_data) {
  let wheelSpeed = new_data.gaugeData.wheel_speed;
  let motorRpm = new_data.infoTiles.motor_rpm;
  let gearRatio = new_data.infoTiles.gear_ratio;
  let gear_ratio_numerator = parseFloat(gearRatio.split('/')[0]);
  let gear_ratio_denominator = parseFloat(gearRatio.split('/')[1]);

  let calculatedWheelSpeed = (motorRpm * gear_ratio_numerator) / gear_ratio_denominator;

  if (wheelSpeed !== calculatedWheelSpeed) {
    apiControllers.updateWheelRpm(vehicleId, calculatedWheelSpeed);
  }
}


function powerConsumptionLogic(new_data) {
  let powerConsumption = new_data.gaugeData.power_consumption;
  if (powerConsumption === Number.MIN_SAFE_INTEGER) {
    return;
  }
  let motorRpm = new_data.infoTiles.motor_rpm;
  const powerConsumptionPerRpm = 0.65; // 0.65 Watt per RPM
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





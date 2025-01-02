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
let chargingInterval;
let batteryDrainInterval;
let batteryTemperatureInterval;

function setState(newState) {
  simulateVehicleBehavior(newState);
  console.log('I ran');
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
  batteryTemperatureLogic(new_data);
  motorRpmLogic(new_data);
  // wheelRPMLogic(new_data);
  // batteryDrainLogic(new_data);

}

function batteryTemperatureLogic(new_data) {
  // temperature will be increased in 2 ways. if the charging is on, it will increase by 0.2 degree per second
  // if the charging is off, it will decrease by 0.1 degree per second

  // the second way is based on the power consumption. more power consumption will increase the temperature and negative power consumption will decrease the temperature

  const chargingIncreaseRate = 0.2; // degrees per second
  const dischargingDecreaseRate = -0.1; // degrees per second
  const powerConsumptionRate = 0.05; // degrees per kW per second
  const batteryMinRoomTemp = 20; // degrees

  let batteryTemperature = new_data.infoTiles.battery_temperature;
  let timeUnit = 1000; // 1 second

  // Clear any existing battery temperature interval
  if (batteryTemperatureInterval) {
    clearInterval(batteryTemperatureInterval);
  }

  batteryTemperatureInterval = setInterval(() => {
    let isCharging = new_data.indicators.is_charging;
    let powerConsumption = new_data.gaugeData.power_consumption; // in kW
    let temperatureChangeRate;
    // Base temperature change rate
    if (isCharging){

      let batteryPercentage = new_data.infoTiles.battery_percentage;
      if (batteryPercentage === 100) {
        temperatureChangeRate = 0;
      } else {
        temperatureChangeRate = chargingIncreaseRate;
      }
    } else {
      temperatureChangeRate = dischargingDecreaseRate;
    }

    // temperature change rate based on power consumption
    if (powerConsumption > 0 && !isCharging) {
      temperatureChangeRate += powerConsumption * powerConsumptionRate;
    }

    let calculatedBatteryTemperature = batteryTemperature + temperatureChangeRate;

    if (calculatedBatteryTemperature < batteryMinRoomTemp) {
      calculatedBatteryTemperature = batteryMinRoomTemp;
    }

    console.log('Battery temperature from batteryTemperatureLogic:', calculatedBatteryTemperature);
    if (calculatedBatteryTemperature !== batteryTemperature) {
      apiControllers.updateBatteryTemperature(vehicleId, calculatedBatteryTemperature);
    }
  }, timeUnit);
}

function chargingLogic(new_data) {
  let isCharging = new_data.indicators.is_charging;
  let sliderValue = new_data.sliderValue;
  let timeUnit = 1000; // 1 second
  let powerConsumption = new_data.gaugeData.power_consumption; // in kW
  let charge_input = new_data.charge_input; // in kW
  if (isCharging) {
    // Clear any existing charging interval
    if (chargingInterval) {
      clearInterval(chargingInterval);
    }

    // set slider to 0
    if (sliderValue !== 0) {
      apiControllers.updateMotorSpeedBar(vehicleId, 0);
    }

    // set power consumption to negative value
    if (-charge_input !== powerConsumption) {
      apiControllers.updatePowerConsumption(vehicleId, -charge_input);
    }

    // increase battery percentage
    chargingInterval = setInterval(() => {
      let batteryPercentage = new_data.infoTiles.battery_percentage;
      if (batteryPercentage >= 100) {
        batteryPercentage = 100;
        clearInterval(chargingInterval); // Stop charging when battery is full
      } else {
        let chargingInput = new_data.charge_input; // measured in kw. For now, assuming this is the rate of charging in seconds
        let batteryCapacity = new_data.battery_capacity; // measured in Kwh
        let calculatedBatteryPercentage = batteryPercentage + (chargingInput / batteryCapacity) * 100;

        if (calculatedBatteryPercentage > 100) {
          calculatedBatteryPercentage = 100;
        }

        if (batteryPercentage !== calculatedBatteryPercentage) {
          new_data.infoTiles.battery_percentage = calculatedBatteryPercentage; // Update the new_data object
          apiControllers.updateBatteryPercentage(vehicleId, calculatedBatteryPercentage);
        }
        console.log('Battery percentage from chargingLogic:', calculatedBatteryPercentage);
      }
    }, timeUnit);
  } else {
    // Clear the interval if not charging
    if (chargingInterval) {
      clearInterval(chargingInterval);
    }
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
  // check charging status
  let isCharging = new_data.indicators.is_charging;

  if (isCharging) {
    return;
  }
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

function batteryDrainLogic(new_data) {
  let timeUnit = 1000; // 1 second


  // Clear any existing battery drain interval
  if (batteryDrainInterval) {
    clearInterval(batteryDrainInterval);
  }

  batteryDrainInterval = setInterval(() => {
    let batteryPercentage = new_data.infoTiles.battery_percentage;
    let calculatedBatteryPercentage = batteryPercentage;
    const batteryDrainRatePerKw = 0.1; // Example rate: 0.1% per kW per second
    const powerConsumption = new_data.infoTiles.power_consumption; // in kW

    if (batteryPercentage > 0 && powerConsumption > 0) {
      calculatedBatteryPercentage -= powerConsumption * batteryDrainRatePerKw;
      if (calculatedBatteryPercentage < 0) calculatedBatteryPercentage = 0;

      apiControllers.updateBatteryPercentage(vehicleId, calculatedBatteryPercentage);
    }
  }, timeUnit); // Update every second
}

supabaseService.subscribe(setState, vehicleId);
supabaseService.fetchData(vehicleId);
// supabaseService.unsubscribe(updateData);







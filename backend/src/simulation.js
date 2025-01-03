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

import { supabaseService } from "../services/supabaseService.js";
import * as apiControllers from "./controllers/apiController.js";

let chargingInterval;
let batteryDrainInterval;
let batteryTemperatureInterval;
let vehicleId;

/**
 * Change the status of the motor indicator based on the motor RPM and threshold. It will turn on the motor indicator if the motor RPM is above the threshold and the motor is off.
 * @param {Object} new_data - The new data object
 * @param {number} motorIndicatorAndCheckEngineThreshold - The threshold for motor indicator and check engine
 * @returns {void}
 */

function motorIndicatorChangeLogic(
  new_data,
  motorIndicatorAndCheckEngineThreshold
) {
  let threshold = motorIndicatorAndCheckEngineThreshold;
  let isMotorOn = new_data.indicators.motor_status;
  let motorRpm = new_data.infoTiles.motor_rpm;

  if (motorRpm > threshold && !isMotorOn) {
    apiControllers.updateIndicatorStatus(vehicleId, "motor_status", "true");
  } else if (motorRpm <= threshold && isMotorOn) {
    apiControllers.updateIndicatorStatus(vehicleId, "motor_status", "false");
  }
}

/**
 * Change the status of the check engine indicator based on the motor RPM and threshold. It will turn on the check engine indicator if the motor RPM is above the threshold for 20 seconds and the motor is on.
 * @param {Object} new_data - The new data object
 * @param {number} motorIndicatorAndCheckEngineThreshold - The threshold for motor indicator and check engine
 * @returns {void}
 */
function checkEngineIndicatorChangeLogic(
  new_data,
  motorIndicatorAndCheckEngineThreshold
) {
  // if the motor is on and the rpm is above the threshold for 10 seconds, then check engine indicator will be on
  let timeUnit = 20000; // 20 second
  let threshold = motorIndicatorAndCheckEngineThreshold;
  let isCheckEngineOn = new_data.indicators.check_engine;
  let isMotorOn = new_data.indicators.motor_status;

  if (isMotorOn) {
    if (!isCheckEngineOn) {
      setTimeout(() => {
        if (new_data.infoTiles.motor_rpm > threshold) {
          apiControllers.updateIndicatorStatus(
            vehicleId,
            "check_engine",
            "true"
          );
        }
      }, timeUnit);
    }
  }
}

/**
 * Simulate the vehicle behavior based on the data received from the database.
 * @param {Object} data - The data object received from the database
 * @returns {void}
 * */
function simulateVehicleBehavior(data) {
  let new_data = { ...data };
  let motorIndicatorAndCheckEngineThreshold = 600;

  motorIndicatorChangeLogic(new_data, motorIndicatorAndCheckEngineThreshold);
  checkEngineIndicatorChangeLogic(
    new_data,
    motorIndicatorAndCheckEngineThreshold
  );
  lowBatteryIndicatorChangeLogic(new_data);
  powerConsumptionLogic(new_data);
  chargingLogic(new_data);
  batteryTemperatureLogic(new_data);
  batteryDrainLogic(new_data);
  motorRpmLogic(new_data);
  wheelRPMLogic(new_data);
  parkingBrakeLogic(new_data);
}

/**
 * Simulate the battery temperature behavior based on the data received from the database.
 * - It will increase the battery temperature when the vehicle is charging and decrease when it is discharging.
 * - It will also increase the temperature based on the power consumption.
 * - The temperature will be limited between the room temperature and the maximum charging temperature.
 * - The temperature will be updated every second.
 * @param {number} vehicleId - The ID of the vehicle
 * @param {Object} new_data - The new data object
 * @returns {void}
 * */
function batteryTemperatureLogic(new_data) {
  let timeUnit = 1000; // 1 second

  // Clear any existing battery temperature interval
  if (batteryTemperatureInterval) {
    clearInterval(batteryTemperatureInterval);
  }

  batteryTemperatureInterval = setInterval(() => {
    const chargingIncreaseRate = 0.18; // degrees per second
    const dischargingDecreaseRate = -0.15; // degrees per second
    const powerConsumptionRate = 0.005; // degrees per kW per second
    const batteryMinRoomTemp = 20; // degrees
    const maxChargingTemp = 45; // degrees

    let motorRpm = new_data.infoTiles.motor_rpm;
    let isCharging = new_data.indicators.is_charging;
    let powerConsumption = new_data.gaugeData.power_consumption; // in kW
    let batteryTemperature = new_data.infoTiles.battery_temperature;
    let batteryPercentage = new_data.infoTiles.battery_percentage;

    let batteryMaxTemp =
      motorRpm !== 0 ? batteryMinRoomTemp + motorRpm / 20 : maxChargingTemp;
    let temperatureChangeRate = isCharging
      ? chargingIncreaseRate
      : dischargingDecreaseRate;
    let changeIcon = isCharging ? " ↑" : " ↓";

    if (isCharging && batteryPercentage === 100) {
      temperatureChangeRate = dischargingDecreaseRate;
      changeIcon = " ↓ Not Charging as battery is full. Temperature dropping.";
    }

    if (powerConsumption > 0 && !isCharging) {
      temperatureChangeRate += powerConsumption * powerConsumptionRate;
      changeIcon = " ↑";
    }

    let calculatedBatteryTemperature =
      batteryTemperature + temperatureChangeRate;

    if (calculatedBatteryTemperature < batteryMinRoomTemp) {
      calculatedBatteryTemperature = batteryMinRoomTemp;
    } else if (calculatedBatteryTemperature > batteryMaxTemp) {
      calculatedBatteryTemperature = batteryMaxTemp;
    }

    if (calculatedBatteryTemperature !== batteryTemperature) {
      apiControllers.updateBatteryTemperature(
        vehicleId,
        calculatedBatteryTemperature
      );
      console.log(
        "Battery temperature:",
        calculatedBatteryTemperature.toFixed(2),
        changeIcon
      );
    }
  }, timeUnit);
}

/**
 * Simulate the battery drain behavior based on the data received from the database. It will decrease the battery percentage based on the power consumption. The battery percentage will be updated every second.
 * @param {number} vehicleId - The ID of the vehicle
 * @param {Object} new_data - The new data object
 * @returns {void}
 * */
function batteryDrainLogic(new_data) {
  let timeUnit = 1000; // 1 second
  let changeIcon = " ↓";

  // Clear any existing battery drain interval
  if (batteryDrainInterval) {
    clearInterval(batteryDrainInterval);
  }

  batteryDrainInterval = setInterval(() => {
    let batteryPercentage = new_data.infoTiles.battery_percentage;
    let calculatedBatteryPercentage = batteryPercentage;
    const batteryDrainRatePerKw = 0.001; // Example rate: 0.001% per kW per second
    const powerConsumption = new_data.gaugeData.power_consumption; // in kW

    if (batteryPercentage > 0 && powerConsumption > 0) {
      calculatedBatteryPercentage -= powerConsumption * batteryDrainRatePerKw;
      if (calculatedBatteryPercentage < 0) calculatedBatteryPercentage = 0;
      console.log(
        "Battery percentage from drain:",
        calculatedBatteryPercentage.toFixed(2),
        changeIcon
      );
      apiControllers.updateBatteryPercentage(
        vehicleId,
        calculatedBatteryPercentage
      );
    }
  }, timeUnit); // Update every second
}

/**
 * Simulate the parking brake behavior based on the data received from the database. It will turn on the parking brake indicator if the slider value is 0 and the parking brake is off. It will turn off the parking brake indicator if the slider value is not 0 and the parking brake is on.
 * @param {number} vehicleId - The ID of the vehicle
 * @param {Object} new_data - The new data object
 * @returns {void}
 * */
function parkingBrakeLogic(new_data) {
  // parking brake will be on if the slider value is 0
  let isParkingBrakeOn = new_data.indicators.parking_brake;
  let sliderValue = new_data.sliderValue;

  if (sliderValue === 0 && !isParkingBrakeOn) {
    apiControllers.updateIndicatorStatus(vehicleId, "parking_brake", "true");
  } else if (sliderValue !== 0 && isParkingBrakeOn) {
    apiControllers.updateIndicatorStatus(vehicleId, "parking_brake", "false");
  }
}

/**
 * Simulate the charging behavior based on the data received from the database. It will increase the battery percentage based on the charging input. The battery percentage will be updated every second.
 * @param {number} vehicleId - The ID of the vehicle
 * @param {Object} new_data - The new data object
 * @returns {void}
 * */
function chargingLogic(new_data) {
  let isCharging = new_data.indicators.is_charging;
  let sliderValue = new_data.sliderValue;
  let timeUnit = 1000; // 1 second
  let powerConsumption = new_data.gaugeData.power_consumption; // in kW
  let charge_input = new_data.charge_input; // in kW
  let changeIcon = " ↑";
  // Clear any existing charging interval
  if (chargingInterval) {
    clearInterval(chargingInterval);
  }

  if (isCharging) {
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

      if (batteryPercentage > 100) {
        batteryPercentage = 100;
      } else {
        let chargingInput = new_data.charge_input; // measured in kw. For now, assuming this is the rate of charging in seconds
        let batteryCapacity = new_data.battery_capacity; // measured in Kwh
        let calculatedBatteryPercentage =
          batteryPercentage + (chargingInput / batteryCapacity) * 10;

        if (calculatedBatteryPercentage > 100) {
          calculatedBatteryPercentage = 100;
        }

        if (batteryPercentage !== calculatedBatteryPercentage) {
          new_data.infoTiles.battery_percentage = calculatedBatteryPercentage; // Update the new_data object
          apiControllers.updateBatteryPercentage(
            vehicleId,
            calculatedBatteryPercentage
          );
          console.log(
            "Battery percentage from charge:",
            calculatedBatteryPercentage.toFixed(2),
            changeIcon
          );
        }
      }
    }, timeUnit);
  }
}

/**
 * Simulate the motor RPM behavior based on the data received from the database. It will update the motor RPM based on the slider value and battery percentage. The motor RPM will be updated every second.
 * @param {number} vehicleId - The ID of the vehicle
 * @param {Object} new_data - The new data object
 * @returns {void}
 * */
function motorRpmLogic(new_data) {
  let sliderValue = new_data.sliderValue; // 0 to 4 the slider value
  let motorSpecsConstant = 225;
  let motorRpm = sliderValue * motorSpecsConstant;
  let batteryPercentage = new_data.infoTiles.battery_percentage;

  if (batteryPercentage > 0) {
    if (new_data.infoTiles.motor_rpm !== motorRpm) {
      apiControllers.updateMotorRpm(vehicleId, motorRpm);
    }
  } else {
    if (new_data.infoTiles.motor_rpm !== 0) {
      apiControllers.updateMotorRpm(vehicleId, 0);
    }
  }
}

/**
 * Simulate the wheel RPM behavior based on the data received from the database. It will update the wheel RPM based on the motor RPM and gear ratio. The wheel RPM will be updated every second.
 * @param {number} vehicleId - The ID of the vehicle
 * @param {Object} new_data - The new data object
 * @returns {void}
 * */
function wheelRPMLogic(new_data) {
  let wheelSpeed = new_data.gaugeData.wheel_speed;
  let motorRpm = new_data.infoTiles.motor_rpm;
  let gearRatio = new_data.infoTiles.gear_ratio;
  let gear_ratio_numerator = parseFloat(gearRatio.split("/")[0]);
  let gear_ratio_denominator = parseFloat(gearRatio.split("/")[1]);

  let calculatedWheelSpeed =
    (motorRpm * gear_ratio_numerator) / gear_ratio_denominator;

  if (wheelSpeed !== calculatedWheelSpeed) {
    apiControllers.updateWheelRpm(vehicleId, calculatedWheelSpeed);
  }
}

/**
 * Simulate the power consumption behavior based on the data received from the database. It will calculate the power consumption based on the motor RPM and update the power consumption every second.
 * @param {number} vehicleId - The ID of the vehicle
 * @param {Object} new_data - The new data object
 * @returns {void}
 * */
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
    apiControllers.updatePowerConsumption(
      vehicleId,
      calculatedPowerConsumption
    );
  }
}

/**
 * Simulate the low battery indicator behavior based on the data received from the database. It will turn on the low battery indicator if the battery percentage is below the threshold. It will turn off the low battery indicator if the battery percentage is above the threshold.
 * @param {number} vehicleId - The ID of the vehicle
 * @param {Object} new_data - The new data object
 * @returns {void}
 * */
function lowBatteryIndicatorChangeLogic(new_data) {
  let batteryPercentage = new_data.infoTiles.battery_percentage;
  let isBatteryLow = new_data.indicators.battery_low;
  let threshold = 20;

  if (batteryPercentage <= threshold && !isBatteryLow) {
    apiControllers.updateIndicatorStatus(vehicleId, "battery_low", "true");
  } else if (batteryPercentage > threshold && isBatteryLow) {
    apiControllers.updateIndicatorStatus(vehicleId, "battery_low", "false");
  }
}

/**
 * Run the simulation for the vehicle dashboard. It will subscribe to the Supabase database and fetch the initial data.
 * @param {number} myVehicleId - The ID of the vehicle
 * @returns {void}
 * */
export function run(myVehicleId) {
  vehicleId = myVehicleId;

  function setState(newState) {
    simulateVehicleBehavior(newState);
  }

  supabaseService.subscribe(setState, vehicleId);
  supabaseService.fetchData(vehicleId);
  // supabaseService.unsubscribe(updateData);
}

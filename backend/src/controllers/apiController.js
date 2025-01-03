/**
 * @file:        apiController.js
 * @project:     vehicle-dashboard
 * @author:      Saif Mahmud
 * @date:        2024-12-31
 * @version:     0.1
 * @contact:     msaifofficial@gmail.com
 *
 * @description: This file contains the API controller logic for the vehicle dashboard simulation.
 */

import { fetch } from 'undici';

/**
 * Sends a POST request to the specified URL with the given data.
 * @param {string} url - The URL to send the POST request to.
 * @param {object} data - The data to include in the POST request body.
 * @returns {Promise<object>} - The response data from the server.
 */
export async function sendPostRequest(url, data) {
  const maxRetries = 3;
  const retryDelay = 2000; // 2 seconds

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        // Increase the timeout settings
        headersTimeout: 60000, // 60 seconds
        bodyTimeout: 60000, // 60 seconds
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error);
      console.error(error.stack); // Print the traceback
      console.log('Sending POST request to:', url);
      console.log('With data:', data);
      if (attempt < maxRetries) {
        console.log(`Retrying in ${retryDelay / 1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, retryDelay));
      } else {
        throw error;
      }
    }
  }
}

/**
 * Updates the indicator status for a vehicle.
 * @param {number} vehicleId - The ID of the vehicle.
 * @param {string} field - The indicator field to update.
 * @param {string} value - The new value for the indicator field.
 * @returns {Promise<object>} - The response data from the server.
 */
export async function updateIndicatorStatus(vehicleId, field, value) {
  const url = 'http://localhost:3001/api/indicator-status';
  const data = {
    vehicle_id: vehicleId,
    type: field,
    indicator: value,
  };
  return sendPostRequest(url, data);
}

export async function updateWheelRpm(vehicleId, wheelRpm) {
  const url = 'http://localhost:3001/api/gear-wheel-rpm';
  const data = {
    vehicle_id: vehicleId,
    wheel_rpm: wheelRpm,
  };
  return sendPostRequest(url, data);
}

export async function updateMotorRpm(vehicleId, rpm) {
  const url = 'http://localhost:3001/api/motor-rpm';
  const data = {
    vehicle_id: vehicleId,
    rpm: rpm,
  };
  return sendPostRequest(url, data);
}


/**
 * Updates the motor speed for a vehicle.
 * @param {number} vehicleId - The ID of the vehicle.
 * @param {number} speed - The new motor speed.
 * @returns {Promise<object>} - The response data from the server.
 */
export async function updateMotorSpeedBar(vehicleId, speed_setting) {
  const url = 'http://localhost:3001/api/motor-speed-bar';
  const data = {
    vehicle_id: vehicleId,
    speed_setting: speed_setting,
  };
  return sendPostRequest(url, data);
}

/**
 * Updates the power consumption for a vehicle.
 * @param {number} vehicleId - The ID of the vehicle.
 * @param {number} powerConsumption - The new power consumption value.
 * @param {number} powerInput - The new power input value.
 * @returns {Promise<object>} - The response data from the server.
 */
export async function updatePowerConsumption(vehicleId, powerConsumption) {
  const url = 'http://localhost:3001/api/power-consumption';
  const data = {
    vehicle_id: vehicleId,
    power_consumption: powerConsumption
  };
  return sendPostRequest(url, data);
}



/**
 * Updates the motor speed and RPM for a vehicle.
 * @param {number} vehicleId - The ID of the vehicle.
 * @param {number} rpm - The new RPM value.
 * @param {number} speedSetting - The new speed setting value.
 * @returns {Promise<object>} - The response data from the server.
 */
export async function updateMotorSpeedRpm(vehicleId, rpm, speedSetting) {
  const url = 'http://localhost:3001/api/motor-speed-rpm';
  const data = {
    vehicle_id: vehicleId,
    rpm: rpm,
    speed_setting: speedSetting,
  };
  return sendPostRequest(url, data);
}

/**
 * Updates the battery status for a vehicle.
 * @param {number} vehicleId - The ID of the vehicle.
 * @param {number} percentage - The new battery percentage.
 * @param {number} temperature - The new battery temperature.
 * @returns {Promise<object>} - The response data from the server.
 */
export async function updateBatteryPercentage(vehicleId, percentage) {
  const url = 'http://localhost:3001/api/battery-percentage';
  const data = {
    vehicle_id: vehicleId,
    percentage: percentage,
  };
  return sendPostRequest(url, data);
}

export async function updateBatteryTemperature(vehicleId, temperature) {
  const url = 'http://localhost:3001/api/battery-temperature';
  const data = {
    vehicle_id: vehicleId,
    temperature: temperature,
  };
  return sendPostRequest(url, data);
}

// Add more functions as needed for other endpoints


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

/**
 * Sends a POST request to the specified URL with the given data.
 * @param {string} url - The URL to send the POST request to.
 * @param {object} data - The data to include in the POST request body.
 * @returns {Promise<object>} - The response data from the server.
 */
export async function sendPostRequest(url, data) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log('Success:', responseData);
    return responseData;
  } catch (error) {
    console.error('Error:', error);
    throw error;
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

export async function updatePowerInput(vehicleId, powerInput) {
  const url = 'http://localhost:3001/api/power-consumption';
  const data = {
    vehicle_id: vehicleId,
    charge_input: powerInput
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
export async function updateBatteryStatus(vehicleId, percentage, temperature) {
  const url = 'http://localhost:3001/api/battery';
  const data = {
    vehicle_id: vehicleId,
    percentage: percentage,
    temperature: temperature,
  };
  return sendPostRequest(url, data);
}

// Add more functions as needed for other endpoints


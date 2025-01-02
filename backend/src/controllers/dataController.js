/**
 * @file:        dataController.js
 * @project:     vehicle-dashboard
 * @author:      Saif Mahmud
 * @date:        2024-12-29
 * @version:     0.1
 * @contact:     msaifofficial@gmail.com
 *
 * @description: Controller for fetching data from the database.
 */

import { supabase } from '../../db/supabaseClient.js';

/**
 * Fetches the current status of all indicators.
 * @param {Request} req The request object.
 * @param {Response} res The response object.
 */
async function getIndicatorStatus(req, res) {
  try {
    // Fetch all indicator statuses from the database
    const { data, error } = await supabase
      .from('indicators')
      .select('*');

    if (error) {
      throw error;
    }

    // Return the indicator statuses (the headers are set to see the JSON response in the browser/terminal)
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error fetching indicator status:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

/**
 * Updates the status of a specific indicator.
 * @param {Request} req The request object.
 * @param {Response} res The response object.
 */
async function updateIndicatorStatus(req, res) {
  const { vehicle_id, type, indicator } = req.body;
  try {
    // Update the indicator status in the database
    const { data, error } = await supabase
      .from('indicators')
      .update({ [type]: indicator })
      .eq('vehicle_id', vehicle_id)
      .select();

    if (error) {
      throw error;
    }

    if (data.length === 0) {
      return res.status(404).json({ error: 'Indicator not found' });
    }

    // Return the updated indicator status.(the headers are set to see the JSON response in the browser/terminal)
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(data[0], null, 2) + '\n');

  } catch (err) {
    console.error('Error updating indicator status:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

/**
 * Fetches the current power consumption.
 * @param {Request} req The request object.
 * @param {Response} res The response object.
 */
async function getPowerConsumption(req, res) {
  try {
    // Fetch power consumption from the database
    const { data, error } = await supabase
      .from('power')
      .select('*');

    if (error) {
      throw error;
    }

    // Return the power consumption data
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error fetching power consumption:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

/**
 * Updates the power consumption.
 * @param {Request} req The request object.
 * @param {Response} res The response object.
 */
async function updatePowerConsumption(req, res) {
  const { vehicle_id, power_consumption } = req.body;
  try {
    // Update the power consumption in the database
    const { data, error } = await supabase
      .from('power')
      .update({ power_consumption })
      .eq('vehicle_id', vehicle_id)
      .select();

    if (error) {
      throw error;
    }

    if (data.length === 0) {
      return res.status(404).json({ error: 'Power data not found' });
    }

    // Return the updated power consumption data
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(data[0], null, 2) + '\n');

  } catch (err) {
    console.error('Error updating power consumption:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function updateChargeInput(req, res) {
  const { vehicle_id, charge_input } = req.body;
  try {
    // Update the power input in the database
    const { data, error } = await supabase
      .from('power')
      .update({ charge_input })
      .eq('vehicle_id', vehicle_id)
      .select();

    if (error) {
      throw error;
    }

    if (data.length === 0) {
      return res.status(404).json({ error: 'Power data not found' });
    }

    // Return the updated power input data
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(data[0], null, 2) + '\n');

  } catch (err) {
    console.error('Error updating power input:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

/**
 * Fetches the current motor RPM.
 * @param {Request} req The request object.
 * @param {Response} res The response object.
 */
async function getMotorRpm(req, res) {
  try {
    // Fetch motor RPM from the database
    const { data, error } = await supabase
      .from('motor')
      .select('*');

    if (error) {
      throw error;
    }

    // Return the motor RPM data
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error fetching motor RPM:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

/**
 * Updates the motor speed and RPM.
 * @param {Request} req The request object.
 * @param {Response} res The response object.
 */
async function updateMotorRpm(req, res) {
  const { vehicle_id, rpm } = req.body;
  try {
    // Update the motor speed in the database
    const { data, error } = await supabase
      .from('motor')
      .update({ rpm })
      .eq('vehicle_id', vehicle_id)
      .select();

    if (error) {
      throw error;
    }

    if (data.length === 0) {
      return res.status(404).json({ error: 'Motor data not found' });
    }

    // Return the updated motor speed data
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(data[0], null, 2) + '\n');

  } catch (err) {
    console.error('Error updating motor speed:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

/**
 * Updates the motor speed only.
 * @param {Request} req The request object.
 * @param {Response} res The response object.
 *
 */
async function updateMotorSpeedBar(req, res) {
  const { vehicle_id, speed_setting } = req.body;
  try {
    // Update the motor speed in the database
    const { data, error } = await supabase
      .from('motor')
      .update({ speed_setting })
      .eq('vehicle_id', vehicle_id)
      .select();

    if (error) {
      throw error;
    }

    if (data.length === 0) {
      return res.status(404).json({ error: 'Motor data not found' });
    }

    // Return the updated motor speed data
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(data[0], null, 2) + '\n');

  } catch (err) {
    console.error('Error updating motor speed:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getMotorSpeedBar(req, res) {
  try {
    // Fetch motor speed from the database
    const { data, error } = await supabase
      .from('motor')
      .select('speed_setting');

    if (error) {
      throw error;
    }

    // Return the motor speed data
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error fetching motor speed:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

/**
 * Fetches the current battery data.
 * @param {Request} req The request object.
 * @param {Response} res The response object.
 */
async function getBattery(req, res) {
  try {
    // Fetch battery data from the database
    const { data, error } = await supabase
      .from('battery')
      .select('*');

    if (error) {
      throw error;
    }

    // Return the battery data
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error fetching battery data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function updateBatteryCapacity(req, res) {
  const { vehicle_id, capacity } = req.body;
  try {
    // Update the battery capacity in the database
    const { data, error } = await supabase
      .from('battery')
      .update({ capacity })
      .eq('vehicle_id', vehicle_id)
      .select();

    if (error) {
      throw error;
    }

    if (data.length === 0) {
      return res.status(404).json({ error: 'Battery data not found' });
    }

    // Return the updated battery capacity data
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(data[0], null, 2) + '\n');

  } catch (err) {
    console.error('Error updating battery capacity:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

/**
 * Updates the battery data.
 * @param {Request} req The request object.
 * @param {Response} res The response object.
 */
async function updateBatteryPercentage(req, res) {
  const { vehicle_id, percentage } = req.body;
  try {
    // Update the battery data in the database
    const { data, error } = await supabase
      .from('battery')
      .update({ percentage })
      .eq('vehicle_id', vehicle_id)
      .select();

    if (error) {
      throw error;
    }

    if (data.length === 0) {
      return res.status(404).json({ error: 'Battery data not found' });
    }

    // Return the updated battery data
    // res.setHeader('Content-Type', 'application/json');
    res.status(200);
    // .send(JSON.stringify(data[0], null, 2) + '\n');

  } catch (err) {
    console.error('Error updating battery data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function updateBatteryTemperature(req, res) {
  const { vehicle_id, temperature } = req.body;
  try {
    // Update the battery temperature in the database
    const { data, error } = await supabase
      .from('battery')
      .update({ temperature })
      .eq('vehicle_id', vehicle_id)
      .select();

    if (error) {
      throw error;
    }

    if (data.length === 0) {
      return res.status(404).json({ error: 'Battery data not found' });
    }

    // Return the updated battery temperature data
    // res.setHeader('Content-Type', 'application/json');
    res.status(200)
    // .send(JSON.stringify(data[0], null, 2) + '\n');

  } catch (err) {
    console.error('Error updating battery temperature:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getGearRatio(req, res) {
  try {
    // Fetch gear ratio from the database
    const { data, error } = await supabase
      .from('gear')
      .select('*');

    if (error) {
      throw error;
    }

    // Return the gear ratio data
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error fetching gear ratio:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function updateGearWheelRpm(req, res) {
  const { vehicle_id, wheel_rpm } = req.body;
  try {
    // Update the wheel RPM in the database
    const { data, error } = await supabase
      .from('gear')
      .update({ wheel_rpm })
      .eq('vehicle_id', vehicle_id)
      .select();

    if (error) {
      throw error;
    }

    if (data.length === 0) {
      return res.status(404).json({ error: 'Gear data not found' });
    }

    // Return the updated wheel RPM data
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(data[0], null, 2) + '\n');

  } catch (err) {
    console.error('Error updating wheel RPM:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function updateGearRatio(req, res) {
  const { vehicle_id, ratio_numerator, ratio_denominator } = req.body;
  try {
    // Update the gear ratio in the database
    const { data, error } = await supabase
      .from('gear')
      .update({ ratio_numerator, ratio_denominator })
      .eq('vehicle_id', vehicle_id)
      .select();

    if (error) {
      throw error;
    }

    if (data.length === 0) {
      return res.status(404).json({ error: 'Gear data not found' });
    }

    // Return the updated gear ratio data
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(data[0], null, 2) + '\n');

  } catch (err) {
    console.error('Error updating gear ratio:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export default {
  getIndicatorStatus,
  updateIndicatorStatus,
  getPowerConsumption,
  updatePowerConsumption,
  updateChargeInput,
  getMotorRpm,
  updateMotorRpm,
  getMotorSpeedBar,
  updateMotorSpeedBar,
  getBattery,
  updateBatteryCapacity,
  updateBatteryPercentage,
  updateBatteryTemperature,
  getGearRatio,
  updateGearRatio,
  updateGearWheelRpm
};
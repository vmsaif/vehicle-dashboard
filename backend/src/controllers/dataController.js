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
  const { vehicle_id, power_consumption, power_input } = req.body;
  try {
    // Update the power consumption in the database
    const { data, error } = await supabase
      .from('power')
      .update({ power_consumption, power_input })
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
 * Updates the motor speed.
 * @param {Request} req The request object.
 * @param {Response} res The response object.
 */
async function updateMotorRpmAndSpeed(req, res) {
  const { vehicle_id, rpm, speed_setting } = req.body;
  try {
    // Update the motor speed in the database
    const { data, error } = await supabase
      .from('motor')
      .update({ rpm, speed_setting })
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

/**
 * Updates the battery data.
 * @param {Request} req The request object.
 * @param {Response} res The response object.
 */
async function updateBattery(req, res) {
  const { vehicle_id, percentage, temperature } = req.body;
  try {
    // Update the battery data in the database
    console.log('trying to update battery data with:', vehicle_id, percentage, temperature);
    const { data, error } = await supabase
      .from('battery')
      .update({ percentage, temperature })
      .eq('vehicle_id', vehicle_id)
      .select();

    if (error) {
      throw error;
    }

    if (data.length === 0) {
      return res.status(404).json({ error: 'Battery data not found' });
    }

    // Return the updated battery data
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(data[0], null, 2) + '\n');

  } catch (err) {
    console.error('Error updating battery data:', err);
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

async function updateGearRatio(req, res) {
  const { vehicle_id, ratio } = req.body;
  try {
    // Update the gear ratio in the database
    const { data, error } = await supabase
      .from('gear')
      .update({ ratio })
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
  getMotorRpm,
  updateMotorSpeed: updateMotorRpmAndSpeed,
  getBattery,
  updateBattery,
  getGearRatio,
  updateGearRatio
};
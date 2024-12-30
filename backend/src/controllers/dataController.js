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
/**
 * Updates the status of a vehicle indicator.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request.
 * @param {string} req.body.vehicle_id - The ID of the vehicle.
 * @param {string} req.body.type - The type of the indicator.
 * @param {boolean} req.body.indicator - The status of the indicator.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
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
    res.status(200).send(JSON.stringify(data[0], null, 2));

  } catch (err) {
    console.error('Error updating indicator status:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export default { getIndicatorStatus, updateIndicatorStatus };
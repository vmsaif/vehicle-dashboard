/**
 * @file:        indicatorRoutes.js
 * @project:     vehicle-dashboard
 * @author:      Saif Mahmud
 * @date:        2024-12-28
 * @version:     0.1
 * @contact:     msaifofficial@gmail.com
 *
 * @description: REST API routes for the indicator state of the vehicle dashboard.
 */

import express from 'express';
import { getCurrentIndicator, setCurrentIndicator, broadcastIndicatorState } from '../controllers/websocketController.js';

const router = express.Router();

/**
 * GET /api/indicator
 * Fetch the current indicator state
 */
router.get('/', (req, res) => {
  res.status(200).json({ indicator: getCurrentIndicator() });
});

/**
 * POST /api/indicator
 * Update the indicator state (red or gray)
 */
router.post('/', (req, res) => {
  const { type, indicator } = req.body;
  let allTypes = ['parkingBreak', 'checkEngine', 'motorStatus', 'batteryPercentage'];

  // Validate the incoming indicator value
  if (!['red', 'gray'].includes(indicator)) {
    return res.status(400).json({ error: 'Invalid indicator value. Use "red" or "gray".' });
  }

  // Validate the incoming type value
  if (!allTypes.includes(type)) {
    return res.status(400).json({ error: 'Invalid indicator type.' });
  }

  // Update the state
  setCurrentIndicator(type, indicator);

  // Broadcast the updated state to all WebSocket clients
  broadcastIndicatorState(type, indicator);

  res.status(200).json({
    message: `Indicator ${type} updated to ${indicator}`,
    indicator: getCurrentIndicator(),
  });
});

export { router };



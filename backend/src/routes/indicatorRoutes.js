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
const router = express.Router();

// Default indicator state
let currentIndicator = 'gray'; // Initial state

// WebSockets clients
let wsClients = []; // List of connected WebSocket clients

/**
 * Attach WebSocket server to the backend
 * @param {WebSocket.Server} wss - WebSocket server instance
 */
function attachWebSocketServer(wss) {
  wss.on('connection', (ws) => {
    // Add the new client to the list
    wsClients.push(ws);

    // Send the current indicator state to the new client
    ws.send(JSON.stringify({ indicator: currentIndicator }));

    // Remove the client from the list when it disconnects
    ws.on('close', () => {
      wsClients = wsClients.filter((client) => client !== ws);
    });
  });
}

/**
 * GET /api/indicator
 * Fetch the current indicator state
 */
router.get('/', (req, res) => {
  res.status(200).json({ indicator: currentIndicator });
});

/**
 * POST /api/indicator
 * Update the indicator state (red or gray)
 */
router.post('/', (req, res) => {
  const { indicator } = req.body;

  // Validate the incoming indicator value
  if (!['red', 'gray'].includes(indicator)) {
    return res.status(400).json({ error: 'Invalid indicator value. Use "red" or "gray".' });
  }

  // Update the state
  currentIndicator = indicator;

  // Broadcast the updated state to all WebSocket clients
  wsClients.forEach((client) => {
    client.send(JSON.stringify({ indicator: currentIndicator }));
  });

  res.status(200).json({
    message: `Indicator updated to ${indicator}`,
    indicator: currentIndicator,
  });
});

export { router, attachWebSocketServer };

// example POST command to change the indicator state
// curl -X POST http://localhost:3001/api/indicator \
// -H "Content-Type: application/json" \
// -d '{"indicator": "gray"}'



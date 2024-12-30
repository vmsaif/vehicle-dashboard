/**
 * @file:        websocketController.js
 * @project:     vehicle-dashboard
 * @author:      Saif Mahmud
 * @date:        2024-12-29
 * @version:     0.1
 * @contact:     msaifofficial@gmail.com
 *
 * @description: Controller for handling WebSocket connections and broadcasting indicator
 */

// Default indicator state
let currentIndicator = {
  parkingBreak: 'gray',
  checkEngine: 'gray',
  motorStatus: 'gray',
  batteryPercentage: 'gray',
}; // Initial state

// WebSockets clients
let wsClients = []; // List of connected WebSocket clients

/**
 * Attach WebSocket server to the backend
 * @param {WebSocket.Server} wss - WebSocket server instance
 */
export function attachWebSocketServer(wss) {
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
 * Broadcast the updated state to all WebSocket clients
 * @param {string} type - The type of indicator
 * @param {string} indicator - The updated indicator state
 */
export function broadcastIndicatorState(type, indicator) {
  wsClients.forEach((client) => {
    client.send(JSON.stringify({ type, indicator }));
  });
}

/**
 * Get the current indicator state
 * @returns {object} The current indicator state
 */
export function getCurrentIndicator() {
  return currentIndicator;
}

/**
 * Set the current indicator state
 * @param {string} type - The type of indicator
 * @param {string} indicator - The new indicator state
 */
export function setCurrentIndicator(type, indicator) {
  currentIndicator[type] = indicator;
}
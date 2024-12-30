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
    console.log('Client connected');

    // Remove the client from the list when it disconnects
    ws.on('close', () => {
      wsClients = wsClients.filter((client) => client !== ws);
    });
  });
}



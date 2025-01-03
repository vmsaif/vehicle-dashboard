/**
 * @file:        app.js
 * @project:     vehicle-dashboard
 * @version:     0.1
 * @contact:     msaifofficial@gmail.com
 *
 * @description: Main server application file for the vehicle dashboard.
 */

import express, { json } from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { attachWebSocketServer } from './controllers/websocketController.js';
import routes from './routes/routes.js';
import { run } from './simulation.js';

const app = express();

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(json()); // Parse incoming JSON requests

// Use the routes
app.use(routes);

// Create HTTP server and WebSocket server
const server = createServer(app);
const wss = new WebSocketServer({ server });

// Attach WebSocket server
attachWebSocketServer(wss);

// Start the server
const PORT = 3001;
const vehicleId = 1;
server.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
  run(vehicleId);
});

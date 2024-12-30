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
import { router } from './routes/indicatorRoutes.js';
import { attachWebSocketServer } from './controllers/websocketController.js';

const app = express();

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(json()); // Parse incoming JSON requests

// Routes
app.use('/api/indicator', router);

// Create HTTP server and WebSocket server
const server = createServer(app);
const wss = new WebSocketServer({ server });

// Attach WebSocket server
attachWebSocketServer(wss);

// Start the server
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});

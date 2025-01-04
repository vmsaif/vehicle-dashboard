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
import { WebSocketServer, WebSocket } from 'ws'; // Import WebSocket
import { attachWebSocketServer } from './controllers/websocketController.js';
import routes from './routes/routes.js';
import { run } from './simulation.js';

import dotenv from 'dotenv';
dotenv.config();

const app = express();

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(json()); // Parse incoming JSON requests

// Capture console.log output
let consoleOutput = [];
const originalConsoleLog = console.log;
console.log = function (...args) {
  const message = args.join(' ');
  consoleOutput.push(message);
  originalConsoleLog.apply(console, args);
  // Broadcast the message to all connected WebSocket clients
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
};

// Use the routes
app.use(routes);
app.get('/', (req, res) => {
  res.render('index', { message: 'Welcome to the Vehicle Dashboard Backend!', consoleOutput });
});

// Create HTTP server and WebSocket server
const server = createServer(app);
const wss = new WebSocketServer({ server });

// Attach WebSocket server
attachWebSocketServer(wss);

// Start the server
const PORT = process.env.SERVER_PORT || 3001;
const vehicleId = 1;
server.listen(PORT, () => {
  const serverUrl = process.env.SERVER_URL;
  console.log(`Backend server is running on ${serverUrl}:${PORT}`);
  run(vehicleId);
});

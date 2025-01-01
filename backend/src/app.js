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
import dataController from './controllers/dataController.js';

const app = express();

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(json()); // Parse incoming JSON requests

// Routes

// Route to indicator status from the database
app.get('/api/indicator-status', dataController.getIndicatorStatus); // Route to get indicator status from the database
app.post('/api/indicator-status', dataController.updateIndicatorStatus); // Route to update indicator status in the database

// Route to power consumption
app.get('/api/power-consumption', dataController.getPowerConsumption); // Route to get power consumption from the database
app.post('/api/power-consumption', dataController.updatePowerConsumption); // Route to update power consumption in the database
app.post('/api/charge-input', dataController.updateChargeInput); // Route to update power input in the database

// Route to Motor Speed settings
app.get('/api/motor-rpm', dataController.getMotorRpm); // Route to get Motor Speed from the database
app.post('/api/motor-rpm', dataController.updateMotorRpm); // Route to update Motor Speed in the database

// Route to Motor Speed Bar
app.get('/api/motor-speed-bar', dataController.getMotorSpeedBar); // Route to get Motor Speed from the database
app.post('/api/motor-speed-bar', dataController.updateMotorSpeedBar); // Route to update Motor Speed in the database

// Route to Battery
app.get('/api/battery', dataController.getBattery); // Route to get Battery from the database
app.post('/api/battery', dataController.updateBattery); // Route to update Battery in the database

// Route to Gear Ratio
app.get('/api/gear-ratio', dataController.getGearRatio); // Route to get Gear Ratio from the database
app.post('/api/gear-ratio', dataController.updateGearRatio); // Route to update Gear Ratio in the database
app.post('/api/gear-wheel-rpm', dataController.updateGearWheelRpm); // Route to update Gear Wheel RPM in the database
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

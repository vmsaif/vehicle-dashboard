/**
 * @file:        routes.js
 * @project:     vehicle-dashboard
 * @author:      Saif Mahmud
 * @date:        2025-01-02
 * @version:     0.1
 * @contact:     msaifofficial@gmail.com
 *
 * @description: This file contains all the routes for the API.
 */

import express from 'express';
import dataController from '../controllers/dataController.js';

const router = express.Router();

// Route to indicator status from the database
router.get('/api/indicator-status', dataController.getIndicatorStatus);
router.post('/api/indicator-status', dataController.updateIndicatorStatus);

// Route to power consumption
router.get('/api/power-consumption', dataController.getPowerConsumption);
router.post('/api/power-consumption', dataController.updatePowerConsumption);
router.post('/api/charge-input', dataController.updateChargeInput);

// Route to Motor Speed settings
router.get('/api/motor-rpm', dataController.getMotorRpm);
router.post('/api/motor-rpm', dataController.updateMotorRpm);

// Route to Motor Speed Bar
router.get('/api/motor-speed-bar', dataController.getMotorSpeedBar);
router.post('/api/motor-speed-bar', dataController.updateMotorSpeedBar);

// Route to Battery
router.get('/api/battery', dataController.getBattery);
router.post('/api/battery-percentage', dataController.updateBatteryPercentage);
router.post('/api/battery-temperature', dataController.updateBatteryTemperature);
router.post('/api/battery-capacity', dataController.updateBatteryCapacity);

// Route to Gear Ratio
router.get('/api/gear-ratio', dataController.getGearRatio);
router.post('/api/gear-ratio', dataController.updateGearRatio);
router.post('/api/gear-wheel-rpm', dataController.updateGearWheelRpm);

export default router;
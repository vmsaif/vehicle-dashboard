-- Active: 1735529927162@@34.170.117.238@5432@cloudsqladmin

-- @file:        initial_values.sql
-- @project:     vehicle-dashboard
-- @author:      Saif Mahmud
-- @date:        2024-12-29
-- @version:     0.1
-- @contact:     msaifofficial@gmail.com
--
-- @description: This file is used to insert initial values into the database.


-- vehicle table
INSERT INTO vehicle (vin, name) VALUES ('1HGBH41JXMN109186', '');
-- indicators table
INSERT INTO indicators (vehicle_id, parking_brake, check_engine, motor_status, battery_low, is_charging) VALUES (1, false, false, false, false, false);

-- battery table
INSERT INTO battery (vehicle_id, percentage, temperature) VALUES (1, 50.00, 25.00);

-- motor table
INSERT INTO motor (vehicle_id, rpm, speed_setting) VALUES (1, 0, 0);

-- gear table
INSERT INTO gear (vehicle_id, ratio) VALUES (1, 0.00);

-- power table
INSERT INTO power (vehicle_id, power_consumption, charge_input) VALUES (1, 0.00, 0.00);

-- @file:        initial_values.sql
-- @project:     vehicle-dashboard
-- @description: This file is used to insert initial values into the database.

-- vehicle table
INSERT INTO vehicle (vin, name) VALUES ('1HGBH41JXMN109186', 'Vehicle 1');

-- indicators table
INSERT INTO indicators (vehicle_id, parking_brake, check_engine, motor_status, battery_low, is_charging) VALUES (1, false, false, false, false, false);

-- battery table
INSERT INTO battery (vehicle_id, capacity, percentage, temperature) VALUES (1, 1500, 50.00, 25.00);

-- motor table
INSERT INTO motor (vehicle_id, rpm, speed_setting) VALUES (1, 0, 0);

-- gear table
INSERT INTO gear (vehicle_id, ratio_numerator, ratio_denominator, wheel_rpm) VALUES (1, 1, 1, 0.00);

-- power table
INSERT INTO power (vehicle_id, power_consumption, charge_input) VALUES (1, 0.00, 0.00);

-- @file:        initial_values.sql
-- @project:     vehicle-dashboard
-- @author:      Saif Mahmud
-- @date:        2024-12-29
-- @version:     0.1
-- @contact:     msaifofficial@gmail.com
--
-- @description: This file is used to insert initial values into the database.

-- Create Vehicle Table if not exists
CREATE TABLE IF NOT EXISTS vehicle (
    id SERIAL PRIMARY KEY,
    vin VARCHAR(17) NOT NULL UNIQUE,
    name VARCHAR(100)
);

-- Create Indicators Table
CREATE TABLE IF NOT EXISTS indicators (
    id SERIAL PRIMARY KEY,
    vehicle_id INTEGER NOT NULL REFERENCES vehicle(id),
    parking_brake BOOLEAN NOT NULL,
    check_engine BOOLEAN NOT NULL,
    motor_status BOOLEAN NOT NULL,
    battery_low BOOLEAN NOT NULL,
    is_charging BOOLEAN NOT NULL
);

-- Create Battery Table
CREATE TABLE IF NOT EXISTS battery (
    id SERIAL PRIMARY KEY,
    vehicle_id INTEGER NOT NULL REFERENCES vehicle(id),
    percentage NUMERIC(5, 2) NOT NULL, -- 5 digits, 2 decimal places
    temperature NUMERIC(5, 2) NOT NULL -- 5 digits, 2 decimal places
);

-- Create Motor Table
CREATE TABLE IF NOT EXISTS motor (
    id SERIAL PRIMARY KEY,
    vehicle_id INTEGER NOT NULL REFERENCES vehicle(id),
    rpm INTEGER NOT NULL,
    speed_setting INTEGER NOT NULL
);

-- Create Gear Table
CREATE TABLE IF NOT EXISTS gear (
    id SERIAL PRIMARY KEY,
    vehicle_id INTEGER NOT NULL REFERENCES vehicle(id),
    ratio ratio_numerator INTEGER NOT NULL,
    ratio_denominator INTEGER NOT NULL,
    wheel_rpm INTEGER NUMERIC(5, 2) NOT NULL -- 5 digits, 2 decimal places
);

-- Create Power Table
CREATE TABLE IF NOT EXISTS power (
    id SERIAL PRIMARY KEY,
    vehicle_id INTEGER NOT NULL REFERENCES vehicle(id),
    power_consumption NUMERIC(10, 2) NOT NULL, -- 10 digits, 2 decimal places
    charge_input NUMERIC(10, 2) NOT NULL -- 10 digits, 2 decimal places
);



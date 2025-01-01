#!/bin/bash
set -e

# @file:        test_script.sh
# @project:     vehicle-dashboard
# @version:     0.1
# @contact:     msaifofficial@gmail.com
# @description: This script tests the post_requests.sh script.


# first test script 1
./test_script.sh

# then add the other commands from post_requests.sh except the indicator status update commands

# ------------------- test the gear -------------------
echo "Testing gear ratio value of 1.5"
./post_requests.sh gear ratio 1.5
sleep 2

echo "Testing gear ratio value of 17.23"
./post_requests.sh gear ratio 17.23
sleep 2

# ------------------- test the battery -------------------
echo "Testing battery percentage and temperature values of 50 and 25"
./post_requests.sh battery percentage 50 temperature 42
sleep 2

echo "Testing battery percentage and temperature values of 50 and 25"
./post_requests.sh battery percentage 75 temperature 42
sleep 2

echo "Testing battery percentage and temperature values of 75 and 30"
./post_requests.sh battery percentage 75 temperature 86
sleep 2

echo "Testing battery percentage and temperature values of 75 and 30"
./post_requests.sh battery percentage 75 temperature 56
sleep 2


# ------------------- test the power -------------------
echo "Testing power consumption and input values of 100 and 200"
./post_requests.sh power power_consumption 100 charge_input 200
sleep 2

echo "Testing power consumption and input values of 534 and 674"
./post_requests.sh power power_consumption 534 charge_input 674
sleep 2

# ------------------- test the motor -------------------
echo "Testing motor rpm and speed setting values of 100 and 200"
./post_requests.sh motor rpm 100 speed_setting 3
sleep 2

echo "Testing motor rpm and speed setting values of 259 and 346"
./post_requests.sh motor rpm 259 speed_setting 0
sleep 2

echo "All tests passed successfully!"








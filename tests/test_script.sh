#!/bin/bash
set -e
# @file:        test_script.sh
# @project:     vehicle-dashboard
# @version:     0.1
# @contact:     msaifofficial@gmail.com
# @description: This script tests the post_requests.sh script.

# Test parking_brake indicator
./post_requests.sh indicator parking_brake true
sleep 3

./post_requests.sh indicator parking_brake false
sleep 3

# Test check engine indicator
./post_requests.sh indicator check_engine true
sleep 3
./post_requests.sh indicator check_engine false
sleep 3

# Test motor status indicator
./post_requests.sh indicator motor_status true
sleep 3
./post_requests.sh indicator motor_status false

sleep 3

# Test battery low indicator
./post_requests.sh indicator battery_low true
sleep 3
./post_requests.sh indicator battery_low false

sleep 3

# Test is charging indicator
./post_requests.sh indicator is_charging true
sleep 3
./post_requests.sh indicator is_charging false
sleep 3

echo "Indicator status REST requests complete!"

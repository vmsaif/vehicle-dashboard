#!/bin/bash

# @file:        test_script.sh
# @project:     vehicle-dashboard
# @version:     0.1
# @contact:     msaifofficial@gmail.com
# @description: This script tests the post_requests.sh script.

# Test parking_brake indicator
./post_requests.sh parking_brake true
# wait for 1 second
sleep 2
./post_requests.sh parking_brake false

sleep 2

# Test check engine indicator
./post_requests.sh check_engine true
sleep 2
./post_requests.sh check_engine false

sleep 2

# Test motor status indicator
./post_requests.sh motor_status true
sleep 2
./post_requests.sh motor_status false

sleep 2

# Test battery low indicator
./post_requests.sh battery_low true
sleep 2
./post_requests.sh battery_low false

sleep 2

# Test is charging indicator
./post_requests.sh is_charging true
sleep 2
./post_requests.sh is_charging false

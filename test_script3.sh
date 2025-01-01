#!/bin/bash
set -e

# @file:        test_script.sh
# @project:     vehicle-dashboard
# @version:     0.1
# @contact:     msaifofficial@gmail.com
# @description: This script tests the post_requests.sh script.



# ------------------- test the power Gauge -------------------
echo "Testing power gauge value of 501"
./post_requests.sh power power_consumption 501 charge_input 200
sleep 2

echo "Testing power gauge value of -320"
./post_requests.sh power power_consumption -320 charge_input 200
sleep 2

echo "Testing motor rpm and speed setting values of 100 and 200"
./post_requests.sh motor rpm 100 speed_setting 3
sleep 2

echo "Testing motor rpm and speed setting values of 259 and 346"
./post_requests.sh motor rpm 259 speed_setting 0
sleep 2



echo "All tests passed successfully!"








#!/bin/bash

# @file:        post_requests.sh
# @project:     vehicle-dashboard
# @version:     0.1
# @contact:     msaifofficial@gmail.com
#
# @description: This script sends a POST request to update the indicator status.


# Check if the correct number of arguments is provided
if [ "$#" -ne 2 ]; then
  echo "Usage: $0 <type> <indicator>"
  echo "Example: $0 parking_brake red"
  exit 1
fi

TYPE=$1
INDICATOR=$2

echo "Changing $TYPE indicator to $INDICATOR"

# Send the POST request using curl
curl -X POST http://localhost:3001/api/indicator-status \
  -H "Content-Type: application/json" \
  -d "{
    \"vehicle_id\": 1,
    \"type\": \"$TYPE\",
    \"indicator\": \"$INDICATOR\"
  }"

#!/bin/bash
set -e
# @file:        post_requests.sh
# @project:     vehicle-dashboard
# @version:     0.1
# @contact:     msaifofficial@gmail.com
#
# @description: This script sends a POST request to update the indicator status.


# Check if the correct number of arguments is provided
if [ "$#" -lt 2 ]; then
  echo "Usage: $0 <type> <field> <value> ..."
  echo "Example: $0 indicator parking_brake red"
  exit 1
fi


TYPE=$1
FIELD=$2
VALUE=$3

if [ "$TYPE" == "speed_bar" ]; then
  # Send the POST request using curl
  echo "Sending POST request to update speed bar..."
  curl -X POST http://localhost:3001/api/motor-speed-bar \
    -H "Content-Type: application/json" \
    -d "{
      \"vehicle_id\": 1,
      \"speed_setting\": $FIELD
    }"
fi

if [ "$TYPE" == "power_consumption" ]; then
  # Send the POST request using curl
  curl -X POST http://localhost:3001/api/power-consumption \
    -H "Content-Type: application/json" \
    -d "{
      \"vehicle_id\": 1,
      \"$TYPE\": $FIELD
    }"
fi

if [ "$TYPE" == "charge_input" ]; then
  # Send the POST request using curl
  curl -X POST http://localhost:3001/api/charge-input \
    -H "Content-Type: application/json" \
    -d "{
      \"vehicle_id\": 1,
      \"charge_input\": $FIELD
    }"
fi

if [ "$TYPE" == "temperature" ]; then
  # Send the POST request using curl
  curl -X POST http://localhost:3001/api/battery-temperature \
    -H "Content-Type: application/json" \
    -d "{
      \"vehicle_id\": 1,
      \"temperature\": $FIELD
    }"
fi

if [ "$TYPE" == "gear_ratio" ]; then
  # Send the POST request using curl
  if [ "$#" -ne 3 ]; then
    echo "Usage: $0 gear_ratio ratio_numerator ratio_denominator"
    echo "Example: $0 gear_ratio 1 2"
    exit 1
  fi
  curl -X POST http://localhost:3001/api/gear-ratio \
    -H "Content-Type: application/json" \
    -d "{
      \"vehicle_id\": 1,
      \"ratio_numerator\": $FIELD,
      \"ratio_denominator\": $VALUE
    }"
fi




if [ "$TYPE" == "indicator" ]; then
  if [ "$FIELD" != "parking_brake" ] && [ "$FIELD" != "check_engine" ] && [ "$FIELD" != "motor_status" ] && [ "$FIELD" != "battery" ] && [ "$FIELD" != "is_charging" ]; then
    echo "Invalid field. Available fields: parking_brake, check_engine, motor_status, battery, is_charging."
    exit 1
  fi
  # Send the POST request using curl
  echo "Sending POST request to update indicator status..."
  curl -X POST http://localhost:3001/api/indicator-status \
    -H "Content-Type: application/json" \
    -d "{
      \"vehicle_id\": 1,
      \"type\": \"$FIELD\",
      \"indicator\": \"$VALUE\"
    }"

elif [ "$TYPE" == "rpm" ]; then
  if [ "$FIELD" != "rpm" ]; then
    echo "Invalid field. Available fields: rpm."
    exit 1
  fi
  # Send the POST request using curl
  echo "Sending POST request to update motor RPM..."
  curl -X POST http://localhost:3001/api/motor-rpm \
    -H "Content-Type: application/json" \
    -d "{
      \"vehicle_id\": 1,
      \"$FIELD\": $VALUE
    }"

elif [ "$TYPE" == "gear" ]; then
  if [ "$FIELD" != "ratio" ]; then
    echo "Invalid field. Available fields: ratio."
    exit 1
  fi
  # Send the POST request using curl
  echo "Sending POST request to update gear ratio..."
  curl -X POST http://localhost:3001/api/gear-ratio \
    -H "Content-Type: application/json" \
    -d "{
      \"vehicle_id\": 1,
      \"$FIELD\": $VALUE
    }"
fi
  FIELD2=$4
  VALUE2=$5

  # Validate fields for each type

if [ "$TYPE" == "motor" ]; then
  if [ "$FIELD" != "rpm" ] || [ "$FIELD2" != "speed_setting" ]; then
    echo "Invalid field. Available fields: rpm, speed_setting."
    exit 1
  fi
  # Send the POST request using curl
  curl -X POST http://localhost:3001/api/motor-speed-rpm \
    -H "Content-Type: application/json" \
    -d "{
      \"vehicle_id\": 1,
      \"$FIELD\": $VALUE,
      \"$FIELD2\": $VALUE2
    }"
fi

if [ "$TYPE" == "battery" ]; then
  if [ "$FIELD" != "percentage" ] || [ "$FIELD2" != "temperature" ]; then
    echo "Invalid field. Available fields: percentage, temperature."
    exit 1
  fi
  # Send the POST request using curl
  curl -X POST http://localhost:3001/api/battery \
    -H "Content-Type: application/json" \
    -d "{
      \"vehicle_id\": 1,
      \"$FIELD\": $VALUE,
      \"$FIELD2\": $VALUE2
    }"

fi

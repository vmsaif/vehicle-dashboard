#!/bin/bash
set -e
# @file:        post_requests.sh
# @project:     vehicle-dashboard
# @version:     0.1
# @contact:     msaifofficial@gmail.com
#
# @description: This script sends a POST request to update the indicator status.


# Check if the correct number of arguments is provided
if [ "$#" -lt 3 ]; then
  echo "Usage: $0 <type> <field> <value> ..."
  echo "Example: $0 indicator parking_brake red"
  exit 1
fi


TYPE=$1
FIELD=$2
VALUE=$3


if [ "$#" -ne 3 ] && [ "$#" -ne 5 ]; then
  echo "Invalid number of arguments."
  echo "Usage: $0 <type> <field> <value>"
  echo "Example: $0 indicator parking_brake red"
  echo "Example: $0 power voltage 12 current 1.5"
  echo "Usage with 5 arguments:"
  echo "$0 <type> <field> <value> [<field2> <value2>]"
  echo "Example: $0 power power_consumption 100 power_input 200"
  exit 1
fi

if [ "$TYPE" != "indicator" ] && [ "$TYPE" != "power" ] && [ "$TYPE" != "motor" ] && [ "$TYPE" != "battery" ] && [ "$TYPE" != "gear" ] && [ "$TYPE" != "speedBar" ] && [ "$TYPE" != "rpm" ]; then
  echo "Invalid type. Must be one of: indicator, power, motor, battery, speedBar, gear, rpm."
  exit 1
fi

if [ "$TYPE" == "indicator" ]; then
  if [ "$FIELD" != "parking_brake" ] && [ "$FIELD" != "check_engine" ] && [ "$FIELD" != "motor_status" ] && [ "$FIELD" != "battery_low" ] && [ "$FIELD" != "is_charging" ]; then
    echo "Invalid field. Available fields: parking_brake, check_engine, motor_status, battery_low, is_charging."
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

elif [ "$TYPE" == "speedBar" ]; then
  if [ "$FIELD" != "speed_settings" ]; then
    echo "Invalid field. Available fields: speed_setting."
    exit 1
  fi
  # Send the POST request using curl
  curl -X POST http://localhost:3001/api/motor-speed-bar \
    -H "Content-Type: application/json" \
    -d "{
      \"vehicle_id\": 1,
      \"$FIELD\": $VALUE
    }"
fi

# Check if the type is one of the expected types and validate the number of arguments
if [ "$TYPE" == "power" ] || [ "$TYPE" == "motor" ] || [ "$TYPE" == "battery" ]; then
  if [ "$#" -ne 5 ]; then
    echo "Usage: $0 <type> <field> <value> <field2> <value2>"
    echo "Example: $0 power power_consumption 100 power_input 200"
    exit 1
  fi
  FIELD2=$4
  VALUE2=$5

  # Validate fields for each type
  if [ "$TYPE" == "power" ]; then
    if [ "$FIELD" != "power_consumption" ] || [ "$FIELD2" != "power_input" ]; then
      echo "Invalid field. Available fields: power_consumption, power_input."
      exit 1
    fi
    # Send the POST request using curl
    curl -X POST http://localhost:3001/api/power-consumption \
      -H "Content-Type: application/json" \
      -d "{
        \"vehicle_id\": 1,
        \"$FIELD\": $VALUE,
        \"$FIELD2\": $VALUE2
      }"
  elif [ "$TYPE" == "motor" ]; then
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

  elif [ "$TYPE" == "battery" ]; then
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

  else
    echo "Invalid type. Available types: power, motor, battery."
    exit 1
  fi
fi
# Usage

The app starts with the current values from the database. Let's start with parking_brake. We can change the value of parking_brake by sending a POST request to the API endpoint. For all the POST requests, the vehicle_id is set to 1. I have created the database so that multiple vehicles can be added in the future.

### Parking Brake
```bash
curl -X POST http://localhost:3001/api/indicator-status \
  -H "Content-Type: application/json" \
  -d '{
    "vehicle_id": 1,
    "type": "parking_brake",
    "indicator": false
  }'
```

Change the indicator `true` or `false` to see the changes in the UI.

### Check Engine

The check engine is automated to turn on when the motor ran for more than 20 seconds with rpm (fetched from DB) is above 600.

After the check engine is turned on, we can turn it off by sending a POST request to the API endpoint. Before that, the motor speed settings bar has to be `reduced`.

```bash
curl -X POST http://localhost:3001/api/indicator-status \
  -H "Content-Type: application/json" \
  -d '{
    "vehicle_id": 1,
    "type": "check_engine",
    "indicator": false
  }'
```

### Motor Status

The motor status is automated to turn on when the motor RPM (4th tile of third row) is above 600(from DB) and vice versa. Note that, it is not the gauge rpm value. The gauge value is dependent on the gear ratio (More on it below).

### Low Battery Indicator
Whenever the charge is below 20% (fetched from DB), the low battery indicator will turn on. It will turn off automatically when the charge is above 20%.

### Gear Ratio
The gear ratio (fetched from DB) is related with the motor RPM (Row 3, 4th tile icon) and the gauge RPM (Wheel RPM). If the ratio is 1/1, the gauge RPM will be the same as the motor RPM. If the ratio is 1/2, the gauge RPM will be half of the motor RPM. The gear ratio can be changed by sending a POST request to the API endpoint.

```bash
curl -X POST http://localhost:3001/api/gear-ratio \
  -H "Content-Type: application/json" \
  -d '{
    "vehicle_id": 1,
    "ratio_numerator": 1,
    "ratio_denominator": 2
  }'
```

### Battery Charge Percentage
The battery is automated to charge when the charging status is `true`. Whenever it is charging, the vehicle will `not move.`

We can change the charging status by sending a POST request to the API endpoint.

```bash
curl -X POST http://localhost:3001/api/indicator-status \
  -H "Content-Type: application/json" \
  -d '{
    "vehicle_id": 1,
    "type": "is_charging",
    "indicator": true
  }'
```

To make the vehicle move, the is_charging indicator has to be set to `false`.

### Battery Temperature
The battery temperature is automated to increase or decrease based on these conditions:
- Increase:
- - When the motor is running
- - When the battery is charging
- Decrease:
- - When the motor is not running
- - When the battery is not charging.
- - When the at 100% charge but the charging status is `true`. (I assume there is a charging cut-off at 100% charge)

Dynamic Maximum value is set for the battery temperature. Based on the current motor RPM, the Maximum value is calculated. The battery temperature is set to the minimum (room temparature) value when the vehicle is not moving and the battery is not charging. Currently, the battery minimum temperature is set to 20 degrees.

### Motor RPM
The motor RPM is automated to increase or decrease on the slider (Motor Speed Settings). Both of those data is fetched from the database in real-time.

### Motor Speed Settings
The motor speed settings is the only input field on the frontend, that sends its value directly to the database. Then the backend fetches the updated value of the speed settings to change the motor RPM. The speed setting is automated to set to 0 whenever the charging is on.

### Charging Indicator

  ### Start/Stop charging
  We can start the charging by sending a POST request to the API endpoint.

  ```bash
  curl -X POST http://localhost:3001/api/indicator-status \
    -H "Content-Type: application/json" \
    -d '{
      "vehicle_id": 1,
      "type": "is_charging",
      "indicator": true
    }'
  ```

  The indicator should be set to `false` to stop the charging.


  #### Change Battery Capacity
  We even can change the battery Capacity by sending a POST request to the API endpoint. Initially, the battery capacity is set to 1000

  ```bash
  curl -X POST http://localhost:3001/api/battery-capacity \
    -H "Content-Type: application/json" \
    -d '{
      "vehicle_id": 1,
      "capacity": 1500
    }'
  ```

  It will increase the charge time. As the battery is now bigger.

  #### Increasing Charging rate
  We also can increase the charge power by sending a POST request to the API endpoint. Initially, the charge power is set to 90

  ```bash
  curl -X POST http://localhost:3001/api/charge-input \
    -H "Content-Type: application/json" \
    -d '{
      "vehicle_id": 1,
      "charge_input": 150
    }'
  ```

  This charge_input value will be reflected as negative on the Power Consumption Gauge.

  ### For Detailed API Documentation
  Please refer to the [API Documentation](api_documentation.md) for detailed instructions on how to use the API endpoints.





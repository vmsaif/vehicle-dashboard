# Usage

The app starts with the current values from the database. Let's start with parking_brake. We can change the value of parking_brake by sending a POST request to the API endpoint. For all the POST requests, the vehicle_id is set to 1. I have created the database so that multiple vehicles can be added in the future.

# Backend Console is rendered on the browser:
[Vehicle Dashboard Backend Console (https://vehicle-dashboard.mahmudsaif-aws.us/)](https://vehicle-dashboard.mahmudsaif-aws.us/)

### - Parking Brake
```bash
curl -X POST https://vehicle-dashboard.mahmudsaif-aws.us/api/indicator-status \
  -H "Content-Type: application/json" \
  -d '{
    "vehicle_id": 1,
    "type": "parking_brake",
    "indicator": false
  }'
```

Change the indicator `true` or `false` to see the changes in the UI.

### - Check Engine

The check engine is automated to turn on when the motor ran for more than 20 seconds with rpm (fetched from DB) is above 600.

After the check engine is turned on, we can turn it off by sending a POST request to the API endpoint. Before that, the motor speed settings bar has to be `reduced`.

```bash
curl -X POST https://vehicle-dashboard.mahmudsaif-aws.us/api/indicator-status \
  -H "Content-Type: application/json" \
  -d '{
    "vehicle_id": 1,
    "type": "check_engine",
    "indicator": false
  }'
```

### - Motor Status

The motor status is automated to turn on when the motor RPM (4th tile of third row) is above 600(from DB) and vice versa. Note that, it is not the gauge rpm value. The gauge value is dependent on the gear ratio (More on it below).

### - Low Battery Indicator
Whenever the charge is below 20% (fetched from DB), the low battery indicator will turn on. It will turn off automatically when the charge is above 20%.

### - Gear Ratio
The gear ratio (fetched from DB) is related with the motor RPM (Row 3, 4th tile icon) and the gauge RPM (Wheel RPM). If the ratio is 1/1, the gauge RPM will be the same as the motor RPM. If the ratio is 1/2, the gauge RPM will be half of the motor RPM. The gear ratio can be changed by sending a POST request to the API endpoint.

```bash
curl -X POST https://vehicle-dashboard.mahmudsaif-aws.us/api/gear-ratio \
  -H "Content-Type: application/json" \
  -d '{
    "vehicle_id": 1,
    "ratio_numerator": 1,
    "ratio_denominator": 2
  }'
```

### - Battery Charge Percentage
The battery is automated to charge when the charging status is `true`. Whenever it is charging, the vehicle will `not move.`

We can change the charging status by sending a POST request to the API endpoint.

```bash
curl -X POST https://vehicle-dashboard.mahmudsaif-aws.us/api/indicator-status \
  -H "Content-Type: application/json" \
  -d '{
    "vehicle_id": 1,
    "type": "is_charging",
    "indicator": true
  }'
```

To make the vehicle move, the is_charging indicator has to be set to `false`.

### - Battery Temperature
The battery temperature is automated to increase or decrease based on these conditions:
- Increase:
- - When the motor is running
- - When the battery is charging
- Decrease:
- - When the motor is not running
- - When the battery is not charging.
- - When the at 100% charge but the charging status is `true`. (I assume there is a charging cut-off at 100% charge)

Dynamic Maximum value is set for the battery temperature. Based on the current motor RPM, the Maximum value is calculated. The battery temperature is set to the minimum (room temparature) value when the vehicle is not moving and the battery is not charging. Currently, the battery minimum temperature is set to 20 degrees.

### - Motor RPM
The motor RPM is automated to increase or decrease on the slider (Motor Speed Settings). Both of those data is fetched from the database in real-time.

### - Motor Speed Settings
The motor speed settings is the only input field on the frontend, that sends its value directly to the database. Then the backend fetches the updated value of the speed settings to change the motor RPM. The speed setting is automated to set to 0 whenever the charging is on.

### - Charging Indicator

  ### Start/Stop charging
  We can start the charging by sending a POST request to the API endpoint.

  ```bash
  curl -X POST https://vehicle-dashboard.mahmudsaif-aws.us/api/indicator-status \
    -H "Content-Type: application/json" \
    -d '{
      "vehicle_id": 1,
      "type": "is_charging",
      "indicator": true
    }'
  ```

  The indicator should be set to `false` to stop the charging.


  #### - Change Battery Capacity
  We even can change the battery Capacity by sending a POST request to the API endpoint. Initially, the battery capacity is set to 1000

  ```bash
  curl -X POST https://vehicle-dashboard.mahmudsaif-aws.us/api/battery-capacity \
    -H "Content-Type: application/json" \
    -d '{
      "vehicle_id": 1,
      "capacity": 1500
    }'
  ```

  It will increase the charge time. As the battery is now bigger.

  #### - Increasing Charging rate
  We also can increase the charge power by sending a POST request to the API endpoint. Initially, the charge power is set to 90

  ```bash
  curl -X POST https://vehicle-dashboard.mahmudsaif-aws.us/api/charge-input \
    -H "Content-Type: application/json" \
    -d '{
      "vehicle_id": 1,
      "charge_input": 150
    }'
  ```

  This charge_input value will be reflected as negative on the Power Consumption Gauge.

### - Public Read Only Database

#### Endpoint:
- battery : https://kgvlvrvhrjgjtippbfxs.supabase.co/rest/v1/battery
- gear: https://kgvlvrvhrjgjtippbfxs.supabase.co/rest/v1/gear
- indicators: https://kgvlvrvhrjgjtippbfxs.supabase.co/rest/v1/indicators
- motor: https://kgvlvrvhrjgjtippbfxs.supabase.co/rest/v1/motor
- power: https://kgvlvrvhrjgjtippbfxs.supabase.co/rest/v1/power
- vehicle: https://kgvlvrvhrjgjtippbfxs.supabase.co/rest/v1/vehicle

Anon Public Key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtndmx2cnZocmpnanRpcHBiZnhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU1ODE0NDcsImV4cCI6MjA1MTE1NzQ0N30.uX1R6dBNjMQfBOdD0NhL3BM86uDYVROkwK3EkA6PvB8`

A simple command to fetch the data from the database:

```bash
curl -X GET "https://kgvlvrvhrjgjtippbfxs.supabase.co/rest/v1/battery?vehicle_id=eq.1" \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtndmx2cnZocmpnanRpcHBiZnhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU1ODE0NDcsImV4cCI6MjA1MTE1NzQ0N30.uX1R6dBNjMQfBOdD0NhL3BM86uDYVROkwK3EkA6PvB8" \
  -H "Content-Type: application/json"
```

These databases are read-only, they will `silently` fail if you try to update the data.

Simple test to update the data:

```bash
curl -X PATCH "https://kgvlvrvhrjgjtippbfxs.supabase.co/rest/v1/battery?id=eq.1" \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtndmx2cnZocmpnanRpcHBiZnhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU1ODE0NDcsImV4cCI6MjA1MTE1NzQ0N30.uX1R6dBNjMQfBOdD0NhL3BM86uDYVROkwK3EkA6PvB8" \
  -H "Content-Type: application/json" \
  -d '{"capacity": 12.5, "percentage": 10.5, "temperature": 25.5}'
```

This will fail silently. You can use the get command again to verify the data is not updated.

### Epiroc Challenge Requirements Checklist:

- **Extra Features**
  - The backend console is rendered on the browser. The user can see real-time updates of the server logs.
  - Added "Stop battery temperature increase" when the battery is at 100% charge. The battery temperature will decrease to the minimum value even if the battery charging indicator is on. (Assuming that there is a charging cut-off at 100% charge.)
  - Added CI/CD pipeline for the backend and frontend. The backend is deployed on Amazon AWS EC2 instance and the frontend is deployed on GitHub Pages automatically when the code is pushed to the main branch. They are deployed using GitHub Actions.

- **Read only Database**
  - [x] The database is read-only.
  - [x] Only someone with access to the backend can modify the database.
  - [x] The frontend can only change the charging indicator and the motor speed setting. Which is done by sending a POST request to the API endpoint of the backend.

- **Status Indicator Lights**
  - [x] **Parking Brake**
    - Should be active when the parking brake is engaged.
    - (When the Motor Speed Setting is set to 0, the backend will automatically engage the parking brake.)
  - [x] **Check Engine**
    - Should be active when the engine needs service.
    - (When the Motor RPM is above 600 for more than 20 seconds, the backend will automatically turn on the check engine light.)
  - [x] **Motor**
    - Should be active when the motor is operating above a certain RPM.
  - [x] **Battery Low**
    - Should be active when the battery percentage dips below a certain level.
    - (The battery low indicator will turn on when the battery percentage is below 20%.)
  - [x] **Read from Database**
    - Parking brake and check engine state should be read from the database but should not be modifiable from this dashboard.

- **Power Gauge**
  - [x] Should display the current power consumption or input.
    - (it shows the power consumption)
  - [x] The needle should point to the position corresponding to the power level.
  - [x] The needle should spin with fluid animation when power levels change (not snap instantaneously to the correct value).
  - [x] Power levels should be positive when power is being consumed from the battery through the motor’s operation. The faster the motor runs, the higher the power consumption should be.
    - (The power consumption increases as the motor speed increases.)
  - [x] Power levels should be negative when the battery is charging.

- **Motor RPM Gauge**
  - [x] Should display the current RPM of the motor. (The gear ratio should be taken into account when displaying the RPM on the gauge. For a 1:1 gear ratio, the RPM should be the same as the motor RPM. For a 1:2 gear ratio, the RPM should be half of the motor RPM, etc.)
  - [x] The needle should point to the position corresponding to the RPM.
  - [x] The needle should spin with fluid animation when RPM changes.
  - [x] When the motor is off, RPM should be 0, and RPM should increase as users increase the speed using the Motor Speed Setting slider.
  - [x] When the battery is charging, the motor RPM should be 0.
    - (The motor stops, as well as the Park Brake indicator is turned on when the battery is charging.)

- **Gear Ratio**
  - [x] Should be read from the database and should not be modifiable from this dashboard.
    - The only way to change the gear ratio is by sending a POST request to the API endpoint.

- **Battery Percentage**
  - [x] Should be read from the database and updated in the database through backend emulation.
  - [x] Should decrease over time when the motor is in use.
  - [x] Should increase over time when the battery is charging.

- **Battery Temperature**
  - [x] Should be read from the database and updated in the database through backend emulation.
  - [x] Battery temperature should increase and decrease as the motor speed increases and decreases.
    - (There is a cilling value for the battery temperature, which is calculated based on the current motor RPM, and a minimum temperature value when the vehicle is not moving and the battery is not charging.)
    - (The battery temperature decreases when the motor is off and the battery is not charging upto the minimum temperature value.)
    - When the battery is at 100% charge, the battery temperature will decrease to the minimum value, even if the battery charging indicator is on. (Assuming that there is a charging cut-off at 100% charge.)


- **Motor Speed Setting Slider**
  - [x] Should change the RPM of the motor, with RPM being set to 0 when the slider is in the OFF position, and with RPM increasing as the speed setting increases.
    - (Also will trigger the Park Brake indicator when the speed setting is set to 0.)

- **Charging Button**
  - [x] Should update the charging state and indicate to the user whether the battery is charging.
  - [x] When charging, the motor should be disabled, and the battery percentage should increase over time.
    - (The temperature will increase when the battery is charging upto 100% charge. Then it will slowly decrease to the minimum temperature value even if the battery charging indicator is on. Minimum temperature value is set to 20 degrees.)



  ### For Detailed API Documentation
  Please refer to the [API Documentation](api_documentation.md) for detailed instructions on how to use the API endpoints.





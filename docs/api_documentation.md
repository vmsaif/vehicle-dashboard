# API Documentation

## Overview
The API is used to fetch and update vehicle data in the database. The frontend fetches data from the database using API endpoints managed by the backend. The backend updates the database when the user interacts with the vehicle settings. The database sends real-time updates to the frontend.

## API Methods

### Get Indicator Status
- **Description**: Fetches the current indicator status from the database.
- **Method**: GET
- **Endpoint**: `/api/indicator-status`
- **Responses**:
  - `200 OK`: Successfully fetched the indicator status.
  - `500 Internal Server Error`: Error fetching the data.

### Update Indicator Status
- **Description**: Updates the indicator status in the database.
- **Method**: POST
- **Endpoint**: `/api/indicator-status`
- **Request Body**:
  ```json
  {
    "vehicle_id": "1",
    "status": "active"
  }
  ```
- **Responses**:
  - `200 OK`: Indicator updated successfully.
  - `404 Not Found`: Indicator not found.
  - `500 Internal Server Error`: Error updating the indicator.

### Get Power Consumption
- **Description**: Fetches the current power consumption.
- **Method**: GET
- **Endpoint**: `/power/consumption`
- **Responses**:
  - `200 OK`: Successfully fetched the power consumption data.
  - `500 Internal Server Error`: Error fetching the data.

### Update Power Consumption
- **Description**: Updates the power consumption.
- **Method**: PUT
- **Endpoint**: `/power/update`
- **Request Body**:
  ```json
  {
    "vehicle_id": "1",
    "power_consumption": 250
  }
  ```
- **Responses**:
  - `200 OK`: Successfully updated the power consumption data.
  - `404 Not Found`: Power data not found.
  - `500 Internal Server Error`: Error updating the power consumption.

### Get Motor RPM
- **Description**: Fetches the current motor RPM.
- **Method**: GET
- **Endpoint**: `/motor/rpm`
- **Responses**:
  - `200 OK`: Successfully fetched the motor RPM data.
  - `500 Internal Server Error`: Error fetching the data.

### Update Motor RPM
- **Description**: Updates the motor speed and RPM.
- **Method**: PUT
- **Endpoint**: `/motor/update`
- **Request Body**:
  ```json
  {
    "vehicle_id": "1",
    "rpm": 500
  }
  ```
- **Responses**:
  - `200 OK`: Successfully updated the motor speed data.
  - `404 Not Found`: Motor data not found.
  - `500 Internal Server Error`: Error updating the motor speed.

### Get Battery Data
- **Description**: Fetches the current battery data.
- **Method**: GET
- **Endpoint**: `/battery`
- **Responses**:
  - `200 OK`: Successfully fetched the battery data.
  - `500 Internal Server Error`: Error fetching the data.

### Update Battery Data
- **Description**: Updates the battery capacity and percentage.
- **Method**: PUT
- **Endpoint**: `/battery/update`
- **Request Body**:
  ```json
  {
    "vehicle_id": "1",
    "capacity": 1500,
    "percentage": 50
  }
  ```
- **Responses**:
  - `200 OK`: Successfully updated the battery data.
  - `404 Not Found`: Battery data not found.
  - `500 Internal Server Error`: Error updating the battery data.

### Get Gear Ratio
- **Description**: Fetches the current gear ratio.
- **Method**: GET
- **Endpoint**: `/gear/ratio`
- **Responses**:
  - `200 OK`: Successfully fetched the gear ratio data.
  - `500 Internal Server Error`: Error fetching the data.

### Update Gear Ratio
- **Description**: Updates the gear ratio.
- **Method**: PUT
- **Endpoint**: `/gear/update`
- **Request Body**:
  ```json
  {
    "vehicle_id": "1234",
    "ratio_numerator": 4,
    "ratio_denominator": 1
  }
  ```
- **Responses**:
  - `200 OK`: Successfully updated the gear ratio data.
  - `404 Not Found`: Gear data not found.
  - `500 Internal Server Error`: Error updating the gear ratio.

## Error Handling
Errors are handled within each API method and will return an appropriate HTTP status code along with a JSON-formatted error message.

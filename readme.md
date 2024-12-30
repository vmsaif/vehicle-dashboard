# Vehicle Dashboard
## Tech Stack
| **Layer**             | **Technology**                 | **Purpose**                                  |
|------------------------|------------------------------------------------------------------------------|
| **Frontend**          | React with Vite                | Interactive UI for the dashboard             |
| **Styling**           | Tailwind CSS                   | Responsive, modern design                    |
| **Backend**           | Node.js + ws                   | API and WebSocket real-time communication    |
| **Database**          | PostgreSQL                     | Relational database for telemetry data       |
| **Frontend Hosting**  | GitHub Pages                   | Host the React app                           |
| **Backend Hosting**   | GCP Cloud Run                  | Host WebSocket backend                       |
| **Database Hosting**  | GCP Cloud SQL                  | Managed PostgreSQL instance                  |
| **Version Control**   | GitHub                         | Code repository                              |
| **Deployment CI/CD**  | GitHub Actions                 | Automate build and deployment workflows      |



<!-- Installation -->
## Installation

### Prerequisites
- NVM (Node Version Manager)
- Node.js
- git
- tailwindcss
#### Install nvm
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```
:bulb: *Note: After installing NVM, close the terminal and open a new one to use NVM.*

#### Install and use Node.js
```bash
nvm install node
nvm use node
```

### Clone the repository
```bash
git clone https://github.com/vmsaif/vehicle-dashboard.git
cd vehicle-dashboard
```

### Install dependencies

#### Frontend
```bash
cd frontend
npm install

#### Create a .env file in the frontend directory and add the following line

```bash
echo "VITE_BACKEND_URL=http://localhost:3001" > .env
```
Replace the URL with the backend URL

#### Backend

```bash
cd ../backend
npm install
```

## API to change the top row indicators

The indicators can be changed directly by sending a POST request to the API endpoint

```bash
curl -X POST http://localhost:3001/api/indicator \
  -H "Content-Type: application/json" \
  -d '{
    "type": "parkingBreak",
    "indicator": "red"
  }'
```

Where type can be one of the following values
 - parkingBreak
 - checkEngine
 - motorStatus
 - batteryPercentage

And indicator can be one of the following values
 - red
 - gray

To make things easier, a simple script has been added to the backend to change the indicators

```bash
# ./send-indicator.sh <type> <indicator>
./post_requests.sh parkingBreak red
```

Available commands are:
- #### Change Parking Break Indicator to red or gray
  ```bash
  ./post_requests.sh parkingBreak red
  ./post_requests.sh parkingBreak gray
  ```

- #### Change Check Engine Indicator to red or gray
  ```bash
  ./post_requests.sh checkEngine red
  ./post_requests.sh checkEngine gray
  ```

- #### Change Motor Status Indicator to red or gray
  ```bash
  ./post_requests.sh motorStatus red
  ./post_requests.sh motorStatus gray
  ```

- #### Change Battery Percentage Indicator to red or gray
  ```bash
  ./post_requests.sh batteryPercentage red
  ./post_requests.sh batteryPercentage gray
  ```


### Install tailwindcss by following the instructions [here](https://tailwindcss.com/docs/guides/vite)

## Assets and Resources
- Extracted Icons from the provided PDF.
- Used online photo editor tool to clean up the icons - [Photopea](https://www.photopea.com/)
- Vectorized the icons using [Vector Magic](https://vectormagic.com/)


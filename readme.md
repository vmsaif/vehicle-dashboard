# Vehicle Dashboard

A real-time vehicle dashboard built with React, Express, and PostgreSQL. The dashboard displays telemetry data from a database and allows users to interact with the vehicle settings through API endpoints.

The database has values which are used to render on the frontend.

## Tech Stack

| **Layer**             | **Technology**                 | **Purpose**                                  |
|-----------------------|--------------------------------|----------------------------------------------|
| **Frontend**          | React with Vite                | Interactive UI for the dashboard             |
| **Styling**           | Tailwind CSS                   | Responsive, modern design                    |
| **Backend**           | Express.js + WebSocket         | API and WebSocket real-time communication    |
| **Database**          | PostgreSQL With Supabase       | Relational database for telemetry data       |
| **Frontend Hosting**  | GitHub Pages                   | Host the React app                           |
| **Backend Hosting**   | GCP Cloud Run                  | Host WebSocket backend                       |
| **Database Hosting**  | Supabase                       | Managed PostgreSQL instance                  |
| **Version Control**   | GitHub                         | Code repository                              |
| **Deployment CI/CD**  | GitHub Actions                 | Automate build and deployment workflows      |

## Diagrams

### System Overview

First, the frontend fetches data from the database using API endpoints managed by the backend. The backend updates the database when the user interacts with the vehicle settings. The database sends real-time updates to the frontend.

#### Diag 1:
```mermaid
graph TD
    subgraph System
        A[Frontend] -->|Fetch Data| B[Database]
        B -->|Render Data| A
        C[Backend]
    end
```

The API endpoints are managed by the backend. When the user uses API endpoints to interact with the vehicle settings, The backend updates the database.

#### Diag 2:
```mermaid
graph TD
    subgraph System
        A[Frontend]
        B[Backend]
        C[Database]
        B -->|Update Database| C
    end
```

After the database is updated, it sends a real-time update to the frontend using a WebSocket connection.

#### Diag 3:
```mermaid
graph TD
    subgraph System
        A[Database] -->|I have changes| C[Frontend]
        B[Backend]
    end
```

Then the frontend updates the UI with the new data.

The only input field on the frontend is the motor speed settings. When the user changes the motor speed settings, the frontend sends the new value to the backend, which updates the motor RPM in the database in real-time.

#### Diag 4:
```mermaid
graph TD
    subgraph System
        A[Frontend] -->|Send Motor Speed| B[Backend]
        B -->|Update Motor Speed| C[Database]
        C -->|I have new data| A
    end
```

#### Diag 5:
```mermaid
graph TD
    subgraph System
        A[Frontend] -->|Send Motor Speed| B[Backend]
        B -->|Update Motor Speed| C[Database]
        C -->|I have new data| A
    end
```

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
```

#### Create a .env file in the frontend directory and add the following line

```bash
echo "VITE_BACKEND_URL=http://localhost:3001 \nVITE_SUPABASE_URL= \nVITE_SUPABASE_SERVICE_KEY" > .env
```
Replace the `http://localhost:3001` with the backend URL

#### Backend

```bash
cd ../backend
npm install
```
#### Create a .env file in the backend directory and add the following line

```bash
echo -e "SUPABASE_URL= \nSUPABASE_SERVICE_KEY= " > .env
```

Replace the `SUPABASE_URL` and `SUPABASE_SERVICE_KEY` with the Supabase URL and Anon Key

### Public Read Only Database



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
curl "https://kgvlvrvhrjgjtippbfxs.supabase.co/rest/v1/battery" \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtndmx2cnZocmpnanRpcHBiZnhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU1ODE0NDcsImV4cCI6MjA1MTE1NzQ0N30.uX1R6dBNjMQfBOdD0NhL3BM86uDYVROkwK3EkA6PvB8" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtndmx2cnZocmpnanRpcHBiZnhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU1ODE0NDcsImV4cCI6MjA1MTE1NzQ0N30.uX1R6dBNjMQfBOdD0NhL3BM86uDYVROkwK3EkA6PvB8"
```


### Install tailwindcss by following the instructions [here](https://tailwindcss.com/docs/guides/vite)

### Usage
Please refer to the [usage documentation](docs/usage.md) for detailed instructions on how to use the dashboard.

## Assets and Resources
- Extracted Icons from the provided PDF.
- Used online photo editor tool to clean up the icons - [Photopea](https://www.photopea.com/)
- Vectorized the icons using [Vector Magic](https://vectormagic.com/)


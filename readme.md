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
```bash
cd frontend
npm install
cd ../backend
npm install
```

### Install tailwindcss by following the instructions [here](https://tailwindcss.com/docs/guides/vite)

## Assets and Resources
- Extracted Icons from the provided PDF.
- Used online photo editor tool to clean up the icons - [Photopea](https://www.photopea.com/)
- Vectorized the icons using [Vector Magic](https://vectormagic.com/)


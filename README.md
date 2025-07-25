# Parth Placement Platform

This repository contains the source code for the Parth Placement Platform, a web application designed to help students and recruiters manage placements, job applications, and communications.

## Project Structure

```
parth/
  ├── src/
  │   ├── Home/
  │   ├── Hero/
  │   ├── Form/
  │   ├── adminDashboard/
  │   └── assets/
  ├── public/
  ├── package.json
  ├── Dockerfile
  └── ...
parth-server/
  ├── model/
  ├── controller/
  ├── middleware/
  ├── routes/
  ├── config/
  ├── package.json
  ├── Dockerfile
  └── ...
```

## Features

- Student profile management
- Job suggestions and applications
- Resume builder and templates
- Admin dashboard for company/job management
- Communication panel for notifications and emails

## Getting Started

### Prerequisites

- Node.js
- npm
- Docker (optional)

### Setup

1. Clone the repository.
2. Install dependencies for both `parth` and `parth-server`:

   ```sh
   cd parth
   npm install
   cd ../parth-server
   npm install
   ```

3. Start the frontend and backend servers:

   ```sh
   # In parth/
   npm run dev

   # In parth-server/
   npm start
   ```

4. Access the frontend at `http://localhost:5173` (default Vite port).

## Docker

You can use the provided `Dockerfile` and `docker-compose.yaml` to run the application in containers.

## License

MIT

---

For more details, see the documentation in each folder.
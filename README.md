# Portfolio React + Express Backend

This is a full-stack portfolio website with a blog feature built using **React** (Vite) on the frontend and **Express** with **PostgreSQL** on the backend. It supports viewing blog posts, a user system, and a responsive, modern UI with Tailwind CSS.

---

## Features

- React frontend with Vite for fast development and build
- Express backend serving REST API endpoints for blogs and users
- PostgreSQL database connection via `pg`
- Tailwind CSS styling with subtle gold gradient and pattern overlays
- Blog listing and individual blog post pages
- Proxy setup for frontend to communicate with backend during development
- Concurrent development with `concurrently`
- Production-ready Express server serving the React build

---

## Project Structure

/frontend # React app (Vite)
/server # Express backend
/routes # API routes
/db # Database connection and queries
.env # Environment variables for DB connection

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL (running locally or remotely)

### Clone the repo

git clone https://github.com/yourusername/yourrepo.git
cd yourrepo
Development
1. Setup environment variables
Create a .env file in the /server folder:

DB_USER=bloguser
DB_PASS=yourpassword
DB_NAME=blogdb
DB_HOST=localhost
DB_PORT=5432
2. Install dependencies
Backend:

cd server
npm install
Frontend:

cd ../frontend
npm install
3. Run backend and frontend concurrently
From the project root folder, run:

npx concurrently "npm run dev --prefix server" "npm run dev --prefix frontend"
This runs backend on port 3000 and frontend on port 3001.

Building for Production
1. Build frontend production assets
From the frontend folder:

npm run build
This outputs static files to frontend/dist.

2. Serve frontend with Express backend
The backend is configured to serve static files from frontend/dist when in production mode.

3. Run backend in production mode
From the server folder:

npm run prod
This script sets NODE_ENV=production and starts the backend server.

Environment Variables Reference
Create a .env.example file in the /server folder with the following content:

DB_USER=your_db_username
DB_PASS=your_db_password
DB_NAME=your_db_name
DB_HOST=your_db_host
DB_PORT=5432
Scripts Summary
Frontend (frontend/package.json)
dev — run development server with Vite on port 3001

build — build production assets in dist

preview — preview production build locally

Backend (server/package.json)
dev — run backend with nodemon on port 3000

start — start backend server normally

prod — start backend in production mode (NODE_ENV=production)

Technologies Used
React 19 with Vite

Express 5

PostgreSQL

Tailwind CSS

Concurrently

Node.js & npm

License
This project is licensed under the MIT License.
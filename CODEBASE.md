# Codebase Overview — Jose Ferreira Portfolio

A quick-reference guide to help you get back up to speed with how this project is built, structured, and deployed.

---

## Tech Stack Summary

| Layer        | Technology                                    |
| ------------ | --------------------------------------------- |
| Frontend     | React 19, React Router v6, Tailwind CSS 3     |
| Build Tool   | Vite 6                                        |
| Backend      | Express 4 (Node.js, ES Modules)               |
| Database     | PostgreSQL (via `pg` connection pool)          |
| Auth         | JWT (jsonwebtoken), bcryptjs for password hash |
| Deployment   | Railway (Nixpacks), Procfile                   |
| Font         | JetBrains Mono (Google Fonts)                  |
| Icons        | react-icons (FontAwesome set)                  |
| Dev Tooling  | ESLint, PostCSS, Autoprefixer, Concurrently, Nodemon |

---

## Project Structure

```
joseferreira-portfolio/
├── index.html              # Vite entry HTML (loads /src/main.jsx)
├── vite.config.js          # Vite config — dev port 3001, proxies /api → :3000
├── tailwind.config.js      # Tailwind — JetBrains Mono font, scans src/**
├── postcss.config.js       # PostCSS — Tailwind + Autoprefixer
├── package.json            # Frontend deps & scripts
├── deploy.sh               # Build + install script for deployment
├── railway.json            # Railway platform config (Nixpacks)
├── Procfile                # Heroku/Railway process: runs server
│
├── src/                    # ── FRONTEND (React) ──
│   ├── main.jsx            # React root — mounts <App /> into #root
│   ├── App.jsx             # Router setup — all page routes defined here
│   ├── App.css             # Global/custom CSS (animations, etc.)
│   ├── index.css           # Tailwind base/components/utilities imports
│   │
│   ├── pages/              # Route-level page components
│   │   ├── Home.jsx        # Landing page — animated hero, tech showcase
│   │   ├── About.jsx       # About me page
│   │   ├── Projects.jsx    # Projects listing
│   │   ├── Blogs.jsx       # Blog list (public, fetches from API)
│   │   ├── BlogPosts.jsx   # Single blog post view (/blogs/:id)
│   │   ├── Contact.jsx     # Contact form page
│   │   ├── Login.jsx       # User login form
│   │   ├── Register.jsx    # User registration form
│   │   ├── AdminDashboard.jsx  # Admin panel — manage users & blogs (protected)
│   │   ├── UserAccess.jsx  # Shown when non-admin tries to access admin routes
│   │   └── NotFound.jsx    # 404 fallback
│   │
│   ├── components/         # Shared/reusable components
│   │   ├── Layout.jsx      # Wraps all pages with Header + Chatbot
│   │   ├── Header.jsx      # Top site header
│   │   ├── Navigation.jsx  # Desktop + mobile nav — auth-aware (shows/hides links)
│   │   ├── ProtectedRoute.jsx  # Route guard — checks JWT in localStorage
│   │   └── Chatbot.jsx     # Floating bot icon — shows "under development" modal
│   │
│   ├── api/                # Frontend API service layer (fetch calls to backend)
│   │   ├── auth.js         # registerUser(), loginUser() → /api/auth/*
│   │   ├── blogs.js        # CRUD blog functions → /api/blogs/*
│   │   ├── users.js        # User management → /api/users/*
│   │   └── serverProxy.js  # Proxy/helper utilities
│   │
│   └── utils/
│       └── jwt.js          # Client-side JWT decode (no verification), helpers:
│                           #   decodeJWT(), isTokenExpired(), getUserRole(), getUserId()
│
├── server/                 # ── BACKEND (Express) ──
│   ├── index.js            # Express app entry — middleware, routes, DB init, server start
│   ├── package.json        # Server deps (express, pg, bcryptjs, jsonwebtoken, etc.)
│   ├── config.js           # Centralized config (port, db, jwt, cors)
│   ├── .env.example        # Template for local env vars
│   │
│   ├── db/                 # Database layer
│   │   ├── dbconn.js       # pg.Pool setup — supports DATABASE_URL or individual vars
│   │   ├── blogQueries.js  # getAllBlogs, getBlogById, createBlog, updateBlog, deleteBlog
│   │   └── userQueries.js  # getAllUsers, getUserById, createUser, updateUser, deleteUser
│   │
│   ├── controllers/        # Route handler logic
│   │   ├── auth.js         # registerUser, loginUser — validation, bcrypt, JWT
│   │   └── contact.js      # Contact form handler
│   │
│   ├── middlewares/
│   │   └── auth-middleware.js  # verifyToken, requireAdmin, requireAuth
│   │
│   ├── routes/             # Express routers
│   │   ├── authRouter.js   # POST /api/auth/login, /api/auth/create-account
│   │   ├── blogsRouter.js  # GET/POST/PUT/DELETE /api/blogs (admin-write, public-read)
│   │   └── userRouter.js   # GET/PUT/DELETE /api/users (admin)
│   │
│   └── scripts/            # Utility/setup scripts
│       ├── initDb.js       # Initialize database tables
│       ├── seedDb.js       # Seed sample data
│       ├── createAdmin.js  # Create admin user
│       ├── setup-db.sql    # SQL schema setup
│       ├── database/       # DB inspection/debug scripts
│       └── testing/        # Login/auth test scripts
│
├── public/                 # Static assets served by Vite
│   ├── assets/avatar.png   # Profile avatar image
│   └── videos/codingVid.mp4
│
└── dist/                   # Production build output (Vite)
```

---

## How the Frontend Works

### Routing (`App.jsx`)
All routes are defined in `App.jsx` using React Router v6:

| Path               | Component          | Access     |
| ------------------ | ------------------ | ---------- |
| `/`                | Home               | Public     |
| `/about`           | About              | Public     |
| `/projects`        | Projects           | Public     |
| `/blogs`           | Blogs              | Public     |
| `/blogs/:id`       | BlogPosts          | Public     |
| `/contact`         | Contact            | Public     |
| `/login`           | Login              | Public     |
| `/create-account`  | Register           | Public     |
| `/admin-dash`      | AdminDashboard     | Admin only |
| `/user-access`     | UserAccess         | Public     |
| `*`                | NotFound           | Public     |

### Layout
Every page is wrapped in `Layout.jsx` which renders:
1. `Header.jsx` — contains `Navigation.jsx`
2. Page content (`{children}`)
3. `Chatbot.jsx` — floating bot icon (bottom-right corner, currently a placeholder modal)

### Authentication Flow (Client-Side)
- On login/register, the server returns a JWT which is stored in `localStorage` under the key `"token"`.
- `Navigation.jsx` reads the token on mount, decodes it (using `src/utils/jwt.js`), and conditionally shows Login/Register or Logout/Admin links.
- `ProtectedRoute.jsx` guards admin routes — decodes the token, checks expiry and role. Redirects to `/login` if not authenticated, or `/user-access` if not admin.
- Auth state syncs across tabs via `storage` event listeners and a custom `authChange` event.

### API Calls
The `src/api/` layer wraps all `fetch()` calls to the backend:
- `auth.js` — hits `http://localhost:3000/api/auth/*` directly (hardcoded base URL).
- `blogs.js` — uses relative `/api/blogs` (proxied by Vite in dev).
- Protected endpoints send `Authorization: Bearer <token>` headers.

### Styling
- **Tailwind CSS 3** for all utility-class styling.
- **JetBrains Mono** as the primary font (loaded from Google Fonts in `index.html`).
- Dark theme throughout — black backgrounds, cyan/blue/purple accent colors.
- Heavy use of gradients, glows, blur effects, and CSS animations (pulse, bounce, fadeIn).
- Responsive — mobile menu toggle in Navigation, responsive grid layouts.

---

## How the Backend Works

### Server Entry (`server/index.js`)
1. Loads env vars with `dotenv`.
2. Sets up middleware: CORS (ports 3001 & 5173), custom rate limiting (100 req/min/IP), JSON parser (10MB limit), security headers (X-Frame-Options, XSS protection, etc.).
3. Serves static files from `../dist` (production build).
4. Mounts API routes under `/api/blogs`, `/api/users`, `/api/auth`.
5. Catch-all `/*` serves `index.html` for client-side routing.
6. On startup, runs `initializeDatabase()` which creates `users` and `blogs` tables if they don't exist, seeds a default admin user (`admin` / `admin123`) and a sample blog post.

### Database
- **PostgreSQL** via the `pg` library with connection pooling.
- `dbconn.js` supports three connection modes:
  1. `DATABASE_URL` env var (Railway/production).
  2. Railway-specific `PG*` / `DB_*` env vars.
  3. Individual `DB_USER`, `DB_PASS`, `DB_NAME`, `DB_HOST`, `DB_PORT` (local dev).
- Default local DB name: `blogdb`.

### Database Schema

**`users` table:**
| Column     | Type           | Notes                        |
| ---------- | -------------- | ---------------------------- |
| id         | SERIAL         | Primary key                  |
| username   | VARCHAR(50)    | Unique, not null             |
| email      | VARCHAR(100)   | Unique, not null             |
| password   | VARCHAR(255)   | bcrypt hashed                |
| role       | VARCHAR(20)    | Default `'user'`, or `'admin'` |
| created_at | TIMESTAMP      | Default now                  |

**`blogs` table:**
| Column     | Type           | Notes                        |
| ---------- | -------------- | ---------------------------- |
| id         | SERIAL         | Primary key                  |
| title      | VARCHAR(200)   | Not null                     |
| content    | TEXT           | Not null                     |
| created_at | TIMESTAMP      | Default now                  |

### API Endpoints

**Auth** (`/api/auth`):
| Method | Path              | Description         | Auth     |
| ------ | ----------------- | ------------------- | -------- |
| POST   | `/create-account` | Register new user   | Public   |
| POST   | `/login`          | Login, returns JWT  | Public   |

**Blogs** (`/api/blogs`):
| Method | Path     | Description        | Auth          |
| ------ | -------- | ------------------ | ------------- |
| GET    | `/`      | List all blogs     | Public        |
| GET    | `/:id`   | Get single blog    | Public        |
| POST   | `/`      | Create blog        | Admin only    |
| PUT    | `/:id`   | Update blog        | Admin only    |
| DELETE | `/:id`   | Delete blog        | Admin only    |

**Users** (`/api/users`):
| Method | Path     | Description        | Auth          |
| ------ | -------- | ------------------ | ------------- |
| GET    | `/`      | List all users     | Admin         |
| PUT    | `/:id`   | Update user        | Admin         |
| DELETE | `/:id`   | Delete user        | Admin         |

### Auth & Security
- Passwords hashed with **bcryptjs** (salt rounds: 10).
- **JWT tokens** signed with `JWT_SECRET` env var (fallback: `"dev_secret_key"`), expire in 1 hour.
- Server middleware (`auth-middleware.js`) decodes JWT from `Authorization: Bearer` header — note: it uses a manual base64 decoder rather than `jwt.verify()`, so signature verification is not enforced on the middleware side.
- Security headers set on every response (X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Referrer-Policy).
- Basic in-memory rate limiting: 100 requests/minute per IP.
- Input validation with the `validator` library (email format, password length, username length, XSS escaping).

---

## Development Setup

### Prerequisites
- Node.js (v18+)
- PostgreSQL running locally (default DB: `blogdb`)

### Install & Run
```bash
# Install all dependencies (frontend + server)
npm run install:all

# Set up server environment
cp server/.env.example server/.env
# Edit server/.env with your local Postgres credentials

# Run both frontend and backend concurrently
npm run dev
```

This starts:
- **Frontend** (Vite): `http://localhost:3001` — proxies `/api` requests to the backend.
- **Backend** (Express + Nodemon): `http://localhost:3000` — auto-restarts on file changes.

### Key Scripts

| Script               | What it does                                      |
| -------------------- | ------------------------------------------------- |
| `npm run dev`        | Starts frontend + backend concurrently            |
| `npm run dev-frontend` | Starts only the Vite dev server                 |
| `npm run start-backend` | Starts only the Express server (via nodemon)   |
| `npm run build`      | Production build (outputs to `dist/`)             |
| `npm run lint`       | Runs ESLint                                       |
| `npm run preview`    | Preview production build locally                  |

---

## Deployment (Railway)

- **`railway.json`** defines the build/deploy config using Nixpacks.
- Build: `cd server && npm install --production`
- Start: `cd server && npm start` (also defined in `Procfile`).
- The server serves the pre-built `dist/` folder as static files and falls back to `index.html` for SPA routing.
- Database connection auto-detects `DATABASE_URL` or Railway-specific env vars.
- Health check endpoint: `GET /health` (checks DB connectivity).

---

## Things to Know Before Continuing Development

1. **The Chatbot is a placeholder** — `Chatbot.jsx` just shows a "coming soon" modal. No actual AI integration yet.
2. **Auth middleware doesn't verify JWT signatures** — `auth-middleware.js` decodes the token payload but doesn't validate the cryptographic signature. The `jwt.sign()` in the auth controller does sign properly, but the middleware only decodes. Worth fixing for security.
3. **`src/api/auth.js` has a hardcoded base URL** (`http://localhost:3000/api/auth`) while `blogs.js` and `users.js` use relative paths that go through Vite's proxy. You may want to make `auth.js` consistent by using relative paths too.
4. **Rate limiting is in-memory** — it resets when the server restarts and doesn't work across multiple instances. Consider `express-rate-limit` for production.
5. **No test suite** — there are manual testing scripts in `server/scripts/testing/` but no automated tests (Jest, Vitest, etc.).
6. **Admin Dashboard** (`AdminDashboard.jsx`) is the largest component — it handles user management and blog CRUD all in one file. Could be broken into smaller components.
7. **Environment variables** — the server needs a `.env` file (see `server/.env.example`). Key vars: `DB_USER`, `DB_PASS`, `DB_NAME`, `DB_HOST`, `DB_PORT`, `JWT_SECRET`.
8. **The `dist/` folder is committed** — the production build is in the repo. Typically this would be in `.gitignore` and built during deployment.

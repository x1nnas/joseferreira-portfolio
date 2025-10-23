import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import path from "path";
import { fileURLToPath } from "url";

import blogsRouter from "./routes/blogsRouter.js";
import userRouter from "./routes/userRouter.js";
import authRouter from "./routes/authRouter.js";

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000; // Use environment variable for port or default to 3000

// Serve static files from the built frontend
app.use(express.static('../dist'));

// Security middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
})); // Enable Cross-Origin Resource Sharing with specific origin

// Rate limiting (basic)
let requestCounts = {};
const RATE_LIMIT = 100; // requests per minute
const WINDOW_MS = 60 * 1000; // 1 minute

app.use((req, res, next) => {
  const clientIP = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  
  if (!requestCounts[clientIP]) {
    requestCounts[clientIP] = { count: 0, resetTime: now + WINDOW_MS };
  }
  
  if (now > requestCounts[clientIP].resetTime) {
    requestCounts[clientIP] = { count: 0, resetTime: now + WINDOW_MS };
  }
  
  if (requestCounts[clientIP].count >= RATE_LIMIT) {
    return res.status(429).json({ message: 'Too many requests' });
  }
  
  requestCounts[clientIP].count++;
  next();
});

app.use(express.json({ limit: '10mb' })); // Parse incoming JSON requests with size limit

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

// Routes
app.use("/api/blogs", blogsRouter); // Route for blog-related operations
app.use("/api/users", userRouter); // Route for user-related operations
app.use("/api/auth", authRouter); // Route for authentication-related operations

// Serve React app for all non-API routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const __filename = fileURLToPath(import.meta.url); // Get the current file path
const __dirname = path.dirname(__filename); // Get the directory name of the current file

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "dist"))); // Serve files from the "dist" folder

  // Handle all other routes by serving the frontend's index.html
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });
}

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server is running on port ${PORT}`);
  console.log(`🌐 Health check available at: http://localhost:${PORT}/health`);
  console.log(`📱 App available at: http://localhost:${PORT}`);
});

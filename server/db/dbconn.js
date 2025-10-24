// Import the PostgreSQL client library
import pg from "pg";

// Import dotenv to load environment variables from a .env file
import dotenv from "dotenv";
dotenv.config(); // Load environment variables

// Create a connection pool using environment variables for configuration
// Support both individual DB variables (local) and DATABASE_URL (Railway/Production)
const pool = new pg.Pool(
  process.env.DATABASE_URL 
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
        connectionTimeoutMillis: 5000,
        idleTimeoutMillis: 30000,
        max: 10,
      }
    : {
        user: process.env.DB_USER || 'joseferreira', // Database username
        password: process.env.DB_PASS || '', // Database password - handle empty string
        database: process.env.DB_NAME || 'blogdb', // Database name
        host: process.env.DB_HOST || 'localhost', // Database host (e.g., localhost)
        port: parseInt(process.env.DB_PORT) || 5432, // Database port (default is 5432 for PostgreSQL)
        // Add connection timeout and retry logic
        connectionTimeoutMillis: 5000,
        idleTimeoutMillis: 30000,
        max: 10,
        // Railway/Production optimizations
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
      }
);

// Test connection on startup
pool.on('connect', () => {
  console.log('✅ Database connected successfully');
});

pool.on('error', (err) => {
  console.error('❌ Database connection error:', err.message);
});

// Export the connection pool for use in other modules
export default pool;
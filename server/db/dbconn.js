// Import the PostgreSQL client library
import pg from "pg";

// Import dotenv to load environment variables from a .env file
import dotenv from "dotenv";
dotenv.config(); // Load environment variables

// Debug environment variables
console.log('🔍 Environment check:');
console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'SET' : 'NOT SET');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('DB_HOST:', process.env.DB_HOST);

// Create a connection pool using environment variables for configuration
// Support both individual DB variables (local) and DATABASE_URL (Railway/Production)
let poolConfig;

if (process.env.DATABASE_URL) {
  console.log('🌐 Using DATABASE_URL for database connection');
  poolConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    connectionTimeoutMillis: 10000,
    idleTimeoutMillis: 30000,
    max: 10,
  };
} else if (process.env.NODE_ENV === 'production') {
  console.log('⚠️ Production mode but no DATABASE_URL found, using fallback');
  // Railway fallback - try to construct DATABASE_URL from individual variables
  const dbUrl = `postgresql://${process.env.DB_USER || 'postgres'}:${process.env.DB_PASS || ''}@${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 5432}/${process.env.DB_NAME || 'railway'}`;
  console.log('🔗 Constructed DATABASE_URL:', dbUrl.replace(/:[^:@]*@/, ':***@'));
  
  poolConfig = {
    connectionString: dbUrl,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 10000,
    idleTimeoutMillis: 30000,
    max: 10,
  };
} else {
  console.log('🏠 Using individual DB variables for database connection');
  poolConfig = {
    user: process.env.DB_USER || 'joseferreira',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'blogdb',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    connectionTimeoutMillis: 10000,
    idleTimeoutMillis: 30000,
    max: 10,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  };
}

console.log('📊 Pool config:', {
  ...poolConfig,
  connectionString: poolConfig.connectionString ? 'SET' : 'NOT SET',
  password: poolConfig.password ? 'SET' : 'NOT SET'
});

const pool = new pg.Pool(poolConfig);

// Test connection on startup
pool.on('connect', () => {
  console.log('✅ Database connected successfully');
});

pool.on('error', (err) => {
  console.error('❌ Database connection error:', err.message);
});

// Export the connection pool for use in other modules
export default pool;
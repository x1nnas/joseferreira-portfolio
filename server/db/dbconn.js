// Import the PostgreSQL client library
import pg from "pg";

// Import dotenv to load environment variables from a .env file
import dotenv from "dotenv";
dotenv.config(); // Load environment variables

// Debug environment variables
console.log('🔍 Environment check:');
console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'SET' : 'NOT SET');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('All environment variables containing DB/PG:', Object.keys(process.env).filter(key => 
  key.includes('DB') || key.includes('PG') || key.includes('DATABASE')
).reduce((obj, key) => {
  obj[key] = key.includes('PASS') || key.includes('PASSWORD') ? 'SET' : process.env[key];
  return obj;
}, {}));

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
  console.log('⚠️ Production mode but no DATABASE_URL found, trying Railway detection');
  
  // Try multiple Railway database connection methods
  let railwayHost, railwayPort, railwayUser, railwayPassword, railwayDatabase;
  
  // Method 1: Railway's standard PG variables
  if (process.env.PGHOST) {
    console.log('🚂 Using Railway PG variables');
    railwayHost = process.env.PGHOST;
    railwayPort = process.env.PGPORT || '5432';
    railwayUser = process.env.PGUSER || 'postgres';
    railwayPassword = process.env.PGPASSWORD || '';
    railwayDatabase = process.env.PGDATABASE || 'railway';
  }
  // Method 2: Railway's custom DB variables
  else if (process.env.DB_HOST && process.env.DB_HOST !== 'localhost') {
    console.log('🚂 Using Railway DB variables');
    railwayHost = process.env.DB_HOST;
    railwayPort = process.env.DB_PORT || '5432';
    railwayUser = process.env.DB_USER || 'postgres';
    railwayPassword = process.env.DB_PASS || '';
    railwayDatabase = process.env.DB_NAME || 'railway';
  }
  // Method 3: Try to detect Railway environment
  else {
    console.log('🚂 No Railway DB variables found, using localhost fallback');
    railwayHost = 'localhost';
    railwayPort = '5432';
    railwayUser = 'postgres';
    railwayPassword = '';
    railwayDatabase = 'railway';
  }
  
  console.log('🚂 Final Railway DB config:', {
    host: railwayHost,
    port: railwayPort,
    user: railwayUser,
    password: railwayPassword ? 'SET' : 'NOT SET',
    database: railwayDatabase
  });
  
  poolConfig = {
    host: railwayHost,
    port: parseInt(railwayPort),
    user: railwayUser,
    password: railwayPassword,
    database: railwayDatabase,
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
  console.error('❌ Connection details:', {
    host: poolConfig.host,
    port: poolConfig.port,
    user: poolConfig.user,
    database: poolConfig.database,
    ssl: poolConfig.ssl
  });
});

// Test connection immediately
pool.connect()
  .then(client => {
    console.log('✅ Database connection test successful');
    client.release();
  })
  .catch(err => {
    console.error('❌ Database connection test failed:', err.message);
    console.error('❌ Full error:', err);
  });

// Export the connection pool for use in other modules
export default pool;
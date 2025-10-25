// Environment-based database connection
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from config.env
dotenv.config({ path: path.join(__dirname, '..', 'config.env') });

// Determine which database to use
// Force PostgreSQL for Railway/production deployments
const USE_SQLITE = process.env.USE_SQLITE === 'true' && process.env.NODE_ENV !== 'production';
const DATABASE_TYPE = USE_SQLITE ? 'SQLite' : 'PostgreSQL';

console.log(`🗄️  Using ${DATABASE_TYPE} database`);

let db;

if (USE_SQLITE) {
  // SQLite setup
  const sqlite3 = await import('sqlite3');
  const { open } = await import('sqlite');
  
  db = await open({
    filename: './database.sqlite',
    driver: sqlite3.default.Database
  });

  // Initialize SQLite database tables
  async function initializeSQLiteDatabase() {
    try {
      // Create users table
      await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username VARCHAR(50) UNIQUE NOT NULL,
          email VARCHAR(100) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          role VARCHAR(20) DEFAULT 'user',
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Create blogs table
      await db.exec(`
        CREATE TABLE IF NOT EXISTS blogs (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title VARCHAR(200) NOT NULL,
          content TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      console.log('✅ SQLite database initialized successfully');
    } catch (error) {
      console.error('❌ SQLite database initialization failed:', error);
    }
  }

  await initializeSQLiteDatabase();

} else {
  // PostgreSQL setup
  const pg = await import('pg');
  
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

  db = new pg.Pool(poolConfig);

  // Test connection on startup
  db.on('connect', () => {
    console.log('✅ PostgreSQL database connected successfully');
  });

  db.on('error', (err) => {
    console.error('❌ PostgreSQL database connection error:', err.message);
    console.error('❌ Connection details:', {
      host: poolConfig.host,
      port: poolConfig.port,
      user: poolConfig.user,
      database: poolConfig.database,
      ssl: poolConfig.ssl
    });
  });

  // Test connection immediately
  db.connect()
    .then(client => {
      console.log('✅ PostgreSQL database connection test successful');
      client.release();
    })
    .catch(err => {
      console.error('❌ PostgreSQL database connection test failed:', err.message);
      console.error('❌ Full error:', err);
    });
}

// Create a unified database interface
const databaseInterface = {
  // Query method that works for both SQLite and PostgreSQL
  async query(sql, params = []) {
    if (USE_SQLITE) {
      // SQLite uses ? placeholders
      return await db.get(sql, params);
    } else {
      // PostgreSQL uses $1, $2, etc. placeholders
      return await db.query(sql, params);
    }
  },

  // Get method for single row
  async get(sql, params = []) {
    if (USE_SQLITE) {
      return await db.get(sql, params);
    } else {
      const result = await db.query(sql, params);
      return result.rows[0];
    }
  },

  // Run method for INSERT/UPDATE/DELETE
  async run(sql, params = []) {
    if (USE_SQLITE) {
      return await db.run(sql, params);
    } else {
      return await db.query(sql, params);
    }
  },

  // Get all rows
  async all(sql, params = []) {
    if (USE_SQLITE) {
      return await db.all(sql, params);
    } else {
      const result = await db.query(sql, params);
      return result.rows;
    }
  },

  // Execute method for DDL
  async exec(sql) {
    if (USE_SQLITE) {
      return await db.exec(sql);
    } else {
      return await db.query(sql);
    }
  }
};

// Export the unified database interface
export default databaseInterface;
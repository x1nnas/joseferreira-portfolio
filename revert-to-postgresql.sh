#!/bin/bash

echo "🔄 Reverting to PostgreSQL configuration..."

# Revert database connection file
echo "📝 Reverting server/db/dbconn.js to PostgreSQL..."
cat > server/db/dbconn.js << 'EOF'
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
EOF

# Revert health check endpoint
echo "📝 Reverting health check endpoint..."
sed -i '' 's/await db\.get/await db.query/g' server/index.js

# Revert auth controller
echo "📝 Reverting auth controller..."
cat > server/controllers/auth.js << 'EOF'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";
import db from "../db/dbconn.js";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_key";

// Route: POST /create-account
export async function registerUser(req, res) {
  const { username, email, password } = req.body;

  // Validate input
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  if (!validator.isLength(password, { min: 6 })) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }

  if (!validator.isLength(username, { min: 3, max: 20 })) {
    return res.status(400).json({ message: "Username must be 3-20 characters long" });
  }

  // Basic XSS protection
  const sanitizedUsername = validator.escape(username);
  const sanitizedEmail = validator.normalizeEmail(email);

  try {
    // Check if email already exists
    const existingUser = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Assign default role "user"
    const role = "user";

    // Create user in database
    const newUser = await db.query(
      "INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, username, email, role",
      [sanitizedUsername, sanitizedEmail, hashedPassword, role]
    );

    // Create JWT token
    const token = jwt.sign(
      { id: newUser.rows[0].id, role: newUser.rows[0].role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({ user: newUser.rows[0], token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed" });
  }
}

// Route: POST /login
export async function loginUser(req, res) {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  // Basic input sanitization
  const sanitizedUsername = validator.escape(username);

  try {
    // Find user by username
    const result = await db.query("SELECT * FROM users WHERE username = $1", [
      sanitizedUsername,
    ]);
    const user = result.rows[0];

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    const { password: _, ...userWithoutPassword } = user;
    res.status(200).json({ user: userWithoutPassword, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
}
EOF

# Remove SQLite dependencies
echo "📦 Removing SQLite dependencies..."
cd server && npm uninstall sqlite3 sqlite

# Remove SQLite database file
echo "🗑️ Removing SQLite database file..."
rm -f database.sqlite

echo "✅ Reverted to PostgreSQL configuration!"
echo "🚀 You can now run 'npm run dev' on your main MacBook"

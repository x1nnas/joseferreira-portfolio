import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Create SQLite database connection
const db = await open({
  filename: './database.sqlite',
  driver: sqlite3.Database
});

// Initialize database tables
async function initializeDatabase() {
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
    console.error('❌ Database initialization failed:', error);
  }
}

// Initialize on import
await initializeDatabase();

export default db;

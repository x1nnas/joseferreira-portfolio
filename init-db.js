import db from './server/db/dbconn.js';
import bcrypt from 'bcryptjs';

async function initializeDatabase() {
  try {
    console.log('🚀 Initializing database...');
    
    // Create users table
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Users table created');

    // Create blogs table
    await db.query(`
      CREATE TABLE IF NOT EXISTS blogs (
        id SERIAL PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Blogs table created');

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    await db.query(`
      INSERT INTO users (username, email, password, role) 
      VALUES ($1, $2, $3, $4) 
      ON CONFLICT (email) DO NOTHING
    `, ['admin', 'admin@example.com', hashedPassword, 'admin']);
    
    console.log('✅ Admin user created (username: admin, password: admin123)');
    
    // Create sample blog
    await db.query(`
      INSERT INTO blogs (title, content) 
      VALUES ($1, $2) 
      ON CONFLICT DO NOTHING
    `, [
      'Welcome to My Portfolio', 
      'This is a sample blog post to demonstrate the blog functionality. You can create, edit, and delete blog posts through the admin dashboard.'
    ]);
    
    console.log('✅ Sample blog created');
    console.log('🎉 Database initialization complete!');
    
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
  } finally {
    process.exit(0);
  }
}

initializeDatabase();

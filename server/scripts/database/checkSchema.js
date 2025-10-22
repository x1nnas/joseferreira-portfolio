// Check the actual database schema
import db from "../db/dbconn.js";

async function checkSchema() {
  try {
    console.log("🔍 Checking database schema...\n");
    
    // Check users table
    console.log("👥 USERS TABLE SCHEMA:");
    const usersSchema = await db.query(`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns 
      WHERE table_name = 'users' 
      ORDER BY ordinal_position
    `);
    console.table(usersSchema.rows);
    
    // Check blogs table
    console.log("\n📝 BLOGS TABLE SCHEMA:");
    const blogsSchema = await db.query(`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns 
      WHERE table_name = 'blogs' 
      ORDER BY ordinal_position
    `);
    console.table(blogsSchema.rows);
    
    // Show actual blogs data
    console.log("\n📝 BLOGS DATA:");
    const blogsData = await db.query(`
      SELECT * FROM blogs 
      ORDER BY created_at DESC
    `);
    console.table(blogsData.rows);
    
  } catch (err) {
    console.error("❌ Error checking schema:", err.message);
  } finally {
    await db.end();
  }
}

checkSchema();

// Test database connection and show basic info
import db from "../db/dbconn.js";

async function testConnection() {
  try {
    console.log("🔌 Testing database connection...");
    
    // Test basic connection
    const result = await db.query("SELECT NOW() as current_time, version() as postgres_version");
    console.log("✅ Database connected successfully!");
    console.log("📅 Current time:", result.rows[0].current_time);
    console.log("🐘 PostgreSQL version:", result.rows[0].postgres_version);
    
    // Check if tables exist
    const tablesResult = await db.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    console.log("\n📋 Available tables:");
    tablesResult.rows.forEach(row => {
      console.log(`  - ${row.table_name}`);
    });
    
    // Test each table
    for (const table of tablesResult.rows) {
      const countResult = await db.query(`SELECT COUNT(*) as count FROM ${table.table_name}`);
      console.log(`  📊 ${table.table_name}: ${countResult.rows[0].count} records`);
    }
    
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
  } finally {
    await db.end();
  }
}

testConnection();

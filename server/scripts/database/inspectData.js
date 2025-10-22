// Inspect all data in the database
import db from "../db/dbconn.js";

async function inspectData() {
  try {
    console.log("🔍 Inspecting database data...\n");
    
    // Inspect Users table
    console.log("👥 USERS TABLE:");
    console.log("=" .repeat(50));
    const usersResult = await db.query(`
      SELECT id, username, email, role, created_at 
      FROM users 
      ORDER BY created_at DESC
    `);
    
    if (usersResult.rows.length > 0) {
      console.table(usersResult.rows);
    } else {
      console.log("No users found");
    }
    
    console.log("\n📝 BLOGS TABLE:");
    console.log("=" .repeat(50));
    const blogsResult = await db.query(`
      SELECT id, title, content, author_id, created_at 
      FROM blogs 
      ORDER BY created_at DESC
    `);
    
    if (blogsResult.rows.length > 0) {
      console.table(blogsResult.rows);
    } else {
      console.log("No blogs found");
    }
    
    // Show detailed user info
    console.log("\n🔐 USER PASSWORDS (hashed):");
    console.log("=" .repeat(50));
    const passwordResult = await db.query(`
      SELECT username, email, password, role 
      FROM users 
      ORDER BY created_at DESC
    `);
    
    passwordResult.rows.forEach(user => {
      console.log(`👤 ${user.username} (${user.email})`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Password Hash: ${user.password.substring(0, 20)}...`);
      console.log("");
    });
    
    // Show table schemas
    console.log("\n📋 TABLE SCHEMAS:");
    console.log("=" .repeat(50));
    
    const usersSchema = await db.query(`
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'users' 
      ORDER BY ordinal_position
    `);
    
    console.log("USERS table schema:");
    console.table(usersSchema.rows);
    
    const blogsSchema = await db.query(`
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'blogs' 
      ORDER BY ordinal_position
    `);
    
    console.log("\nBLOGS table schema:");
    console.table(blogsSchema.rows);
    
  } catch (err) {
    console.error("❌ Error inspecting data:", err.message);
  } finally {
    await db.end();
  }
}

inspectData();

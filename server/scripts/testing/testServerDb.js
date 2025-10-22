// Test if the server is using the same database
import db from "../db/dbconn.js";

async function testServerDb() {
  try {
    console.log("🔍 Testing server database connection...\n");
    
    // Test connection
    const result = await db.query("SELECT NOW() as current_time");
    console.log("✅ Database connected:", result.rows[0].current_time);
    
    // Check users
    const users = await db.query("SELECT id, username, email, role FROM users ORDER BY id");
    console.log("\n👥 Users in database:");
    users.rows.forEach(user => {
      console.log(`  ${user.id}: ${user.username} (${user.email}) - ${user.role}`);
    });
    
    // Check if testuser exists
    const testuser = await db.query("SELECT * FROM users WHERE username = 'testuser'");
    console.log(`\n🔍 testuser query result: ${testuser.rows.length} rows`);
    
    if (testuser.rows.length > 0) {
      const user = testuser.rows[0];
      console.log(`  Found: ${user.username} (${user.email})`);
      console.log(`  Password hash: ${user.password.substring(0, 30)}...`);
    } else {
      console.log("❌ testuser not found!");
    }
    
  } catch (err) {
    console.error("❌ Database error:", err.message);
  } finally {
    await db.end();
  }
}

testServerDb();

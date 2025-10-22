// Check the testuser credentials specifically
import db from "../db/dbconn.js";
import bcrypt from "bcryptjs";

async function checkTestUser() {
  try {
    console.log("🔍 Checking testuser credentials...\n");
    
    // Get the testuser from database
    const result = await db.query("SELECT * FROM users WHERE username = 'testuser'");
    
    if (result.rows.length === 0) {
      console.log("❌ testuser not found in database");
      return;
    }
    
    const user = result.rows[0];
    console.log("👤 testuser found:");
    console.log(`  ID: ${user.id}`);
    console.log(`  Username: ${user.username}`);
    console.log(`  Email: ${user.email}`);
    console.log(`  Role: ${user.role}`);
    console.log(`  Created: ${user.created_at}`);
    console.log(`  Password Hash: ${user.password.substring(0, 30)}...`);
    
    // Test password verification
    console.log("\n🔐 Testing password verification:");
    const testPassword = "password123";
    const isValid = await bcrypt.compare(testPassword, user.password);
    
    console.log(`  Testing password: "${testPassword}"`);
    console.log(`  Password match: ${isValid ? '✅ YES' : '❌ NO'}`);
    
    if (!isValid) {
      console.log("\n🔍 Let's check what passwords might work:");
      
      // Test some common passwords
      const commonPasswords = [
        "password123",
        "123456",
        "password",
        "admin123",
        "test123",
        "user123"
      ];
      
      for (const pwd of commonPasswords) {
        const match = await bcrypt.compare(pwd, user.password);
        console.log(`  "${pwd}": ${match ? '✅ MATCH' : '❌ no match'}`);
      }
    }
    
    // Show the actual hash for debugging
    console.log(`\n🔍 Full password hash: ${user.password}`);
    
  } catch (err) {
    console.error("❌ Error checking testuser:", err.message);
  } finally {
    await db.end();
  }
}

checkTestUser();

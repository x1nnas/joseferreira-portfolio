// Debug the login process step by step
import db from "../db/dbconn.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_key";

async function debugLogin() {
  try {
    console.log("🔍 Debugging login process...\n");
    
    const username = "testuser";
    const password = "password123";
    
    console.log(`1. Looking for user: "${username}"`);
    
    // Step 1: Find user by username
    const result = await db.query("SELECT * FROM users WHERE username = $1", [username]);
    console.log(`   Query result: ${result.rows.length} rows found`);
    
    if (result.rows.length === 0) {
      console.log("❌ User not found!");
      return;
    }
    
    const user = result.rows[0];
    console.log(`✅ User found: ${user.username} (ID: ${user.id})`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Role: ${user.role}`);
    console.log(`   Password hash: ${user.password.substring(0, 30)}...`);
    
    console.log(`\n2. Testing password: "${password}"`);
    
    // Step 2: Compare password
    const isValid = await bcrypt.compare(password, user.password);
    console.log(`   Password comparison result: ${isValid ? '✅ VALID' : '❌ INVALID'}`);
    
    if (!isValid) {
      console.log("❌ Password doesn't match!");
      return;
    }
    
    console.log(`\n3. Creating JWT token...`);
    
    // Step 3: Create JWT token
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log(`   Token created: ${token.substring(0, 50)}...`);
    
    console.log(`\n4. Preparing response...`);
    
    // Step 4: Prepare user data (remove password)
    const { password: _, ...userWithoutPassword } = user;
    console.log(`   User data (without password):`, {
      id: userWithoutPassword.id,
      username: userWithoutPassword.username,
      email: userWithoutPassword.email,
      role: userWithoutPassword.role
    });
    
    console.log("\n✅ Login process completed successfully!");
    console.log("   This should work in the actual endpoint...");
    
  } catch (err) {
    console.error("❌ Error in login process:", err.message);
    console.error("Stack trace:", err.stack);
  } finally {
    await db.end();
  }
}

debugLogin();

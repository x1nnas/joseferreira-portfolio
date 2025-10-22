// Test login using the exact same code as the server
import db from "../db/dbconn.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_key";

async function testServerLogin() {
  try {
    console.log("🔍 Testing server login logic...\n");
    
    const username = "testuser";
    const password = "password123";
    
    console.log("🔍 Login attempt:", { username, password: password ? "***" : "undefined" });
    
    // Find user by username
    const result = await db.query("SELECT * FROM users WHERE username = $1", [username]);
    const user = result.rows[0];
    
    console.log("🔍 User query result:", { found: !!user, username: user?.username });
    
    if (!user) {
      console.log("❌ User not found");
      return { success: false, message: "Invalid credentials" };
    }
    
    console.log("🔍 User found, checking password...");
    const isValid = await bcrypt.compare(password, user.password);
    console.log("🔍 Password check result:", isValid);
    
    if (!isValid) {
      console.log("❌ Password doesn't match");
      return { success: false, message: "Invalid credentials" };
    }
    
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });
    
    const { password: _, ...userWithoutPassword } = user;
    
    console.log("✅ Login successful!");
    console.log("Token:", token.substring(0, 50) + "...");
    console.log("User:", userWithoutPassword);
    
    return { success: true, user: userWithoutPassword, token };
    
  } catch (err) {
    console.error("❌ Error in login process:", err.message);
    return { success: false, message: "Login failed" };
  } finally {
    await db.end();
  }
}

testServerLogin();

// Script to create test users for development
import bcrypt from "bcryptjs";
import db from "../db/dbconn.js";

async function createTestUsers() {
  try {
    console.log("Creating test users...");
    
    // Create admin user
    const adminPassword = await bcrypt.hash("admin123", 10);
    await db.query(
      "INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4) ON CONFLICT (username) DO NOTHING",
      ["admin", "admin@example.com", adminPassword, "admin"]
    );
    console.log("✅ Admin user created: username=admin, password=admin123");

    // Create regular user
    const userPassword = await bcrypt.hash("user123", 10);
    await db.query(
      "INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4) ON CONFLICT (username) DO NOTHING",
      ["user", "user@example.com", userPassword, "user"]
    );
    console.log("✅ Regular user created: username=user, password=user123");

    console.log("🎉 Test users created successfully!");
    
  } catch (error) {
    console.error("❌ Error creating test users:", error.message);
  } finally {
    await db.end();
  }
}

createTestUsers();

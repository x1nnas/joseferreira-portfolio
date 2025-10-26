import express from "express";
import { verifyToken, requireAuth, requireAdmin } from "../middlewares/auth-middleware.js";
import db from "../db/dbconn.js";

const router = express.Router(); // Create a new router instance

// Route to fetch all users (admin only)
router.get("/", verifyToken, requireAdmin, async (req, res) => {
  try {
    const users = await db.all(`
      SELECT id, username, email, role, created_at 
      FROM users 
      ORDER BY created_at DESC
    `);
    
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

// Route to fetch a single user by ID (authenticated users only)
router.get("/:id", verifyToken, requireAuth, async (req, res) => {
  try {
    const user = await db.get(
      "SELECT id, username, email, role, created_at FROM users WHERE id = ?",
      [req.params.id]
    );
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Failed to fetch user" });
  }
});

export default router; // Export the router for use in the main application

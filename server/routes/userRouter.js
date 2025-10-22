import express from "express";
import { verifyToken, requireAuth, requireAdmin } from "../middlewares/auth-middleware.js";
import db from "../db/dbconn.js";

const router = express.Router(); // Create a new router instance

// Route to fetch all users (admin only)
router.get("/", verifyToken, requireAdmin, async (req, res) => {
  try {
    const result = await db.query(`
      SELECT id, username, email, role, created_at 
      FROM users 
      ORDER BY created_at DESC
    `);
    
    // Format the response to match frontend expectations
    const users = result.rows.map(user => ({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      created_at: user.created_at
    }));
    
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

// Route to fetch a single user by ID (authenticated users only)
router.get("/:id", verifyToken, requireAuth, async (req, res) => {
  try {
    const result = await db.query(
      "SELECT id, username, email, role, created_at FROM users WHERE id = $1",
      [req.params.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const user = result.rows[0];
    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      created_at: user.created_at
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Failed to fetch user" });
  }
});

export default router; // Export the router for use in the main application

// User database queries
import db from "./dbconn.js";

// Get all users
export const getAllUsers = async () => {
  const result = await db.query("SELECT id, username, email, role, created_at FROM users ORDER BY created_at DESC");
  return result.rows;
};

// Get user by ID
export const getUserById = async (id) => {
  const result = await db.query("SELECT id, username, email, role, created_at FROM users WHERE id = $1", [id]);
  return result.rows[0];
};

// Create new user
export const createUser = async (username, email, password, role = 'user') => {
  const result = await db.query(
    "INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, username, email, role, created_at",
    [username, email, password, role]
  );
  return result.rows[0];
};

// Update user
export const updateUser = async (id, username, email, role) => {
  const result = await db.query(
    "UPDATE users SET username = $1, email = $2, role = $3 WHERE id = $4 RETURNING id, username, email, role, created_at",
    [username, email, role, id]
  );
  return result.rows[0];
};

// Delete user
export const deleteUser = async (id) => {
  const result = await db.query("DELETE FROM users WHERE id = $1 RETURNING id", [id]);
  return result.rows[0];
};

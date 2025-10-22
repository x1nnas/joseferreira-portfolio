// Import the database connection module
import db from "./dbconn.js";

// Fetch all blogs, ordered by creation date (newest first)
export const getAllBlogs = async () => {
  const result = await db.query("SELECT * FROM blogs ORDER BY created_at DESC");
  return result.rows; // Return all rows from the query result
};

// Fetch a single blog by its ID
export const getBlogById = async (id) => {
  const result = await db.query("SELECT * FROM blogs WHERE id = $1", [id]);
  return result.rows[0]; // Return the first row (blog with the given ID)
};

// Create a new blog and return the created blog object
export const createBlog = async (title, content) => {
  const result = await db.query(
    "INSERT INTO blogs (title, content) VALUES ($1, $2) RETURNING *",
    [title, content]
  );
  return result.rows[0]; // Return the newly created blog object
};

// Update an existing blog and return the updated blog object
export const updateBlog = async (id, title, content) => {
  const result = await db.query(
    "UPDATE blogs SET title = $1, content = $2 WHERE id = $3 RETURNING *",
    [title, content, id]
  );
  return result.rows[0]; // Return the updated blog object
};

// Delete a blog by ID and return the deleted blog object
export const deleteBlog = async (id) => {
  const result = await db.query(
    "DELETE FROM blogs WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0]; // Return the deleted blog object
};

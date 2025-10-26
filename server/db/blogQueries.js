// Import the database connection module
import db from "./dbconn.js";

// Fetch all blogs, ordered by creation date (newest first)
export const getAllBlogs = async () => {
  const blogs = await db.all("SELECT * FROM blogs ORDER BY created_at DESC");
  return blogs; // Return all rows from the query result
};

// Fetch a single blog by its ID
export const getBlogById = async (id) => {
  const blog = await db.get("SELECT * FROM blogs WHERE id = ?", [id]);
  return blog; // Return the first row (blog with the given ID)
};

// Create a new blog and return the created blog object
export const createBlog = async (title, content) => {
  const result = await db.run(
    "INSERT INTO blogs (title, content) VALUES (?, ?)",
    [title, content]
  );
  // Get the newly created blog
  const blog = await db.get("SELECT * FROM blogs WHERE id = ?", [result.lastID]);
  return blog; // Return the newly created blog object
};

// Update an existing blog and return the updated blog object
export const updateBlog = async (id, title, content) => {
  await db.run(
    "UPDATE blogs SET title = ?, content = ? WHERE id = ?",
    [title, content, id]
  );
  // Get the updated blog
  const blog = await db.get("SELECT * FROM blogs WHERE id = ?", [id]);
  return blog; // Return the updated blog object
};

// Delete a blog by ID and return the deleted blog object
export const deleteBlog = async (id) => {
  // Get the blog before deleting
  const blog = await db.get("SELECT * FROM blogs WHERE id = ?", [id]);
  if (blog) {
    await db.run("DELETE FROM blogs WHERE id = ?", [id]);
  }
  return blog; // Return the deleted blog object
};

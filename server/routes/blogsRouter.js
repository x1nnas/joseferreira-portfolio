import express from "express";
import { getAllBlogs, getBlogById, createBlog, updateBlog, deleteBlog } from "../db/blogQueries.js";
import { verifyToken, requireAuth, requireAdmin } from "../middlewares/auth-middleware.js";

const router = express.Router(); // Create a new router instance

// Route to fetch all blogs (public)
router.get("/", async (req, res) => {
  try {
    const blogs = await getAllBlogs(); // Fetch all blogs from the database
    res.json(blogs); // Send the blogs as a JSON response
  } catch {
    res.status(500).json({ error: "Database error" }); // Handle database errors
  }
});

// Route to fetch a single blog by ID (public)
router.get("/:id", async (req, res) => {
  try {
    const blog = await getBlogById(req.params.id); // Fetch the blog by ID
    if (!blog) return res.status(404).json({ error: "Blog not found" }); // Handle not found
    res.json(blog); // Send the blog as a JSON response
  } catch {
    res.status(500).json({ error: "Database error" }); // Handle database errors
  }
});

// Route to create a new blog (admin only)
router.post("/", verifyToken, requireAdmin, async (req, res) => {
  try {
    const blog = await createBlog(req.body.title, req.body.content); // Create a new blog
    res.status(201).json(blog); // Send the created blog as a JSON response
  } catch {
    res.status(500).json({ error: "Failed to create blog" }); // Handle creation errors
  }
});

// Route to update an existing blog (admin only)
router.put("/:id", verifyToken, requireAdmin, async (req, res) => {
  try {
    const blog = await updateBlog(req.params.id, req.body.title, req.body.content);
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json(blog); // Send the updated blog as a JSON response
  } catch {
    res.status(500).json({ error: "Failed to update blog" }); // Handle update errors
  }
});

// Route to delete a blog (admin only)
router.delete("/:id", verifyToken, requireAdmin, async (req, res) => {
  try {
    const blog = await deleteBlog(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json({ message: "Blog deleted successfully", blog }); // Send success message
  } catch {
    res.status(500).json({ error: "Failed to delete blog" }); // Handle deletion errors
  }
});

export default router; // Export the router for use in the main application

import { dummyBlogs } from "../data/dummyBlogs";

// Base URL for the backend API.
// In development, this will typically be empty so that Vite's proxy
// can forward `/api/*` calls to the local backend.
// In production (e.g. Vercel), set `VITE_API_BASE_URL` to your backend URL
// like `https://your-api-domain.com`.
const API_BASE = import.meta.env.VITE_API_BASE_URL || "";
const BASE_URL = `${API_BASE}/api/blogs`;
let cachedBlogs = [];

const getBlogId = (blog) => blog?.id ?? blog?.blog_id ?? blog?._id;

const normalizeBlog = (blog) => {
  const normalizedId = getBlogId(blog);
  return {
    ...blog,
    id: normalizedId,
  };
};

const findBlogById = (blogs, id) =>
  blogs.find((blog) => String(getBlogId(blog)) === String(id));

const getSortedDummyBlogs = () =>
  [...dummyBlogs]
    .map(normalizeBlog)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

export const getAllBlogs = async () => {
  const sortedDummyBlogs = getSortedDummyBlogs();

  try {
    const response = await fetch(`${BASE_URL}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to fetch blogs");
    }

    const data = await response.json();

    // In production, an empty API response should still show portfolio blog content.
    if (!Array.isArray(data) || data.length === 0) {
      cachedBlogs = sortedDummyBlogs;
      return sortedDummyBlogs;
    }

    const normalizedBlogs = data.map(normalizeBlog);
    cachedBlogs = normalizedBlogs;
    return normalizedBlogs;
  } catch {
    // Fallback mode: show static portfolio blog content when backend is unavailable.
    cachedBlogs = sortedDummyBlogs;
    return sortedDummyBlogs;
  }
};

export const getBlogById = async (id) => {
  const normalizedId = String(id ?? "");

  try {
    const response = await fetch(`${BASE_URL}/${normalizedId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to fetch blog");
    }

    const blog = await response.json();
    const normalizedBlog = normalizeBlog(blog);
    return normalizedBlog.id ? normalizedBlog : { ...normalizedBlog, id: normalizedId };
  } catch {
    const localBlog =
      findBlogById(cachedBlogs, normalizedId) || findBlogById(dummyBlogs, normalizedId);

    if (!localBlog) {
      throw new Error("Blog not found");
    }

    return normalizeBlog(localBlog);
  }
};

export const createBlog = async (blogData) => {
  const token = localStorage.getItem("token");
  
  const response = await fetch(`${BASE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(blogData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create blog");
  }

  return response.json();
};

export const updateBlog = async (id, blogData) => {
  const token = localStorage.getItem("token");
  
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(blogData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update blog");
  }

  return response.json();
};

export const deleteBlog = async (id) => {
  const token = localStorage.getItem("token");
  
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete blog");
  }

  return response.json();
};
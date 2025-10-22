import React, { useState, useEffect } from "react";
import { getAllUsers } from "../api/users";
import { getAllBlogs, createBlog, updateBlog, deleteBlog } from "../api/blogs";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [newRole, setNewRole] = useState("");
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [blogForm, setBlogForm] = useState({
    title: "",
    content: ""
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);

  useEffect(() => {
    fetchUsers();
    fetchBlogs();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const usersData = await getAllUsers();
      setUsers(usersData);
      setError("");
    } catch {
      // Error fetching users
      setError("Failed to load users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditRole = (user) => {
    setEditingUser(user);
    setNewRole(user.role);
  };

  const handleSaveRole = async () => {
    if (!editingUser || !newRole) return;
    
    try {
      // Mock API call - in real implementation, you'd call your backend
      
      // Update local state
      setUsers(users.map(user => 
        user.id === editingUser.id 
          ? { ...user, role: newRole }
          : user
      ));
      
      setEditingUser(null);
      setNewRole("");
    } catch {
      // Error updating role
      setError("Failed to update user role");
    }
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setNewRole("");
  };

  const fetchBlogs = async () => {
    try {
      const blogsData = await getAllBlogs();
      setBlogs(blogsData);
    } catch {
      // Error fetching blogs
      setError("Failed to load blogs");
    }
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    if (!blogForm.title || !blogForm.content) return;
    
    try {
      if (editingBlog) {
        // Update existing blog
        await updateBlog(editingBlog.id, blogForm);
        setBlogs(blogs.map(blog => 
          blog.id === editingBlog.id 
            ? { ...blog, title: blogForm.title, content: blogForm.content }
            : blog
        ));
        setEditingBlog(null);
      } else {
        // Create new blog
        const newBlog = await createBlog(blogForm);
        setBlogs([newBlog, ...blogs]);
      }
      
      // Reset form
      setBlogForm({ title: "", content: "" });
      setShowBlogForm(false);
      
      // Show success notification
      showSuccessNotification(editingBlog ? "Blog updated successfully!" : "Blog post created successfully!");
    } catch {
      // Error saving blog
      setError(editingBlog ? "Failed to update blog post" : "Failed to create blog post");
    }
  };

  const handleEditBlog = (blog) => {
    setEditingBlog(blog);
    setBlogForm({ title: blog.title, content: blog.content });
    setShowBlogForm(true);
  };

  const handleDeleteBlog = (blog) => {
    setBlogToDelete(blog);
    setShowDeleteModal(true);
  };

  const confirmDeleteBlog = async () => {
    if (!blogToDelete) return;
    
    try {
      await deleteBlog(blogToDelete.id);
      setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id));
      showSuccessNotification("Blog post deleted successfully!");
      setShowDeleteModal(false);
      setBlogToDelete(null);
    } catch {
      // Error deleting blog
      setError("Failed to delete blog post");
    }
  };

  const cancelDeleteBlog = () => {
    setShowDeleteModal(false);
    setBlogToDelete(null);
  };

  const handleCancelBlog = () => {
    setEditingBlog(null);
    setBlogForm({ title: "", content: "" });
    setShowBlogForm(false);
  };

  const showSuccessNotification = (message) => {
    setSuccessMessage(message);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const getRoleIcon = (role) => {
    return role === "admin" ? "🔑" : "👤";
  };

  const getRoleColor = (role) => {
    return role === "admin" ? "text-cyan-400" : "text-blue-400";
  };

  return (
    <section className="min-h-screen py-24 px-6 bg-black text-white">
      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50 animate-bounceIn">
          <div className="bg-green-900/90 border border-green-500/50 rounded-lg p-4 shadow-lg">
            <div className="flex items-center">
              <div className="animate-spin mr-3">
                <span className="text-green-400 text-xl">✓</span>
              </div>
              <p className="text-green-400 font-medium">{successMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-neutral-900 border border-red-500/30 rounded-lg p-6 max-w-md mx-4 animate-bounceIn">
            <div className="flex items-center mb-4">
              <div className="bg-red-900/20 rounded-full p-2 mr-3">
                <span className="text-red-400 text-xl">⚠️</span>
              </div>
              <h3 className="text-lg font-semibold text-white">Delete Blog Post</h3>
            </div>
            
            <p className="text-gray-300 mb-2">
              Are you sure you want to delete this blog post?
            </p>
            
            {blogToDelete && (
              <div className="bg-neutral-800 border border-cyan-500/20 rounded p-3 mb-4">
                <h4 className="text-cyan-300 font-semibold text-sm mb-1">"{blogToDelete.title}"</h4>
                <p className="text-gray-400 text-xs line-clamp-2">{blogToDelete.content}</p>
              </div>
            )}
            
            <p className="text-red-400 text-sm mb-6">
              This action cannot be undone.
            </p>
            
            <div className="flex space-x-3">
              <button
                onClick={confirmDeleteBlog}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-semibold rounded transition-colors"
              >
                Yes, Delete
              </button>
              <button
                onClick={cancelDeleteBlog}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white font-semibold rounded transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <h1 className="text-3xl font-bold text-cyan-400 mb-6 text-center">
        Admin Dashboard
      </h1>
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-cyan-300">
            User Management
          </h2>
          <button
            onClick={fetchUsers}
            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded transition-colors"
          >
            Refresh
          </button>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {users.map((user, index) => (
              <div
                key={user.id}
                className="p-4 border border-cyan-500/30 rounded-lg bg-neutral-900 hover:bg-neutral-800 transition-all duration-300 animate-fadeIn hover:scale-105"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">{getRoleIcon(user.role)}</span>
                    <h3 className="font-bold text-base">{user.username}</h3>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getRoleColor(user.role)} bg-neutral-800`}>
                    {user.role.toUpperCase()}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div>
                    <span className="text-gray-400 text-xs">Email:</span>
                    <p className="text-white text-sm truncate">{user.email}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-xs">ID:</span>
                    <p className="text-white text-sm">#{user.id}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-xs">Joined:</span>
                    <p className="text-white text-xs">
                      {new Date(user.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Role Editing Section */}
                {editingUser && editingUser.id === user.id ? (
                  <div className="space-y-2">
                    <select
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value)}
                      className="w-full px-2 py-1 bg-neutral-800 border border-cyan-500/30 rounded text-white text-sm"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSaveRole}
                        className="px-3 py-1 bg-green-600 hover:bg-green-500 text-white text-xs rounded transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="px-3 py-1 bg-gray-600 hover:bg-gray-500 text-white text-xs rounded transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => handleEditRole(user)}
                    className="w-full px-3 py-2 bg-cyan-600 hover:bg-cyan-500 text-black text-xs font-semibold rounded transition-colors"
                  >
                    Edit Role
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {!loading && !error && users.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No users found</p>
          </div>
        )}
      </div>

      {/* Blog Management Section */}
      <div className="bg-neutral-900 border border-cyan-500/30 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-cyan-300">
            Blog Management
          </h2>
          <button
            onClick={() => {
              setEditingBlog(null);
              setBlogForm({ title: "", content: "" });
              setShowBlogForm(!showBlogForm);
            }}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded transition-colors"
          >
            {showBlogForm ? "Cancel" : "Create New Blog"}
          </button>
        </div>

        {/* Existing Blogs List */}
        {!showBlogForm && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-cyan-300 mb-4">Existing Blogs</h3>
            {blogs.length === 0 ? (
              <div className="bg-neutral-800 border border-cyan-500/20 rounded-lg p-4">
                <p className="text-gray-400 text-center">No blogs found</p>
              </div>
            ) : (
              <div className="space-y-3">
                {blogs.map((blog, index) => (
                  <div
                    key={blog.id}
                    className="bg-neutral-800 border border-cyan-500/20 rounded-lg p-4 animate-slideIn hover:bg-neutral-700 transition-colors duration-300"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-white font-semibold text-lg">{blog.title}</h4>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditBlog(blog)}
                          className="px-3 py-1 bg-cyan-600 hover:bg-cyan-500 text-black text-xs font-semibold rounded transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteBlog(blog)}
                          className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white text-xs font-semibold rounded transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm mb-2 line-clamp-2">
                      {blog.content}
                    </p>
                    <p className="text-gray-400 text-xs">
                      Created: {new Date(blog.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {showBlogForm && (
          <form onSubmit={handleBlogSubmit} className="space-y-4 animate-fadeIn">
            <div>
              <label className="block text-cyan-300 text-sm font-semibold mb-2">
                Blog Title
              </label>
              <input
                type="text"
                value={blogForm.title}
                onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                className="w-full px-3 py-2 bg-neutral-800 border border-cyan-500/30 rounded text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
                placeholder="Enter blog title..."
                required
              />
            </div>
            
            <div>
              <label className="block text-cyan-300 text-sm font-semibold mb-2">
                Blog Content
              </label>
              <textarea
                value={blogForm.content}
                onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                className="w-full px-3 py-2 bg-neutral-800 border border-cyan-500/30 rounded text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 h-32 resize-none"
                placeholder="Write your blog content here..."
                required
              />
            </div>
            
            <div className="flex space-x-3">
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 hover:bg-green-500 text-white font-semibold rounded transition-colors"
              >
                {editingBlog ? "Update Blog Post" : "Create Blog Post"}
              </button>
              <button
                type="button"
                onClick={handleCancelBlog}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-500 text-white font-semibold rounded transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {!showBlogForm && (
          <div className="bg-neutral-800 border border-cyan-500/20 rounded-lg p-4">
            <p className="text-gray-400 text-center">
              Click "Create New Blog" to add a new blog post
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminDashboard;

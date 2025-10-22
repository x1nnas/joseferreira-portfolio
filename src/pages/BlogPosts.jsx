import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getBlogById } from "../api/blogs";
import { FaArrowLeft, FaCalendarAlt, FaCode, FaTerminal, FaDatabase, FaReact, FaBlog, FaShareAlt, FaBookmark } from "react-icons/fa";

const BlogPosts = () => {
  const { id } = useParams(); // Extract blog ID from URL parameters
  const [blog, setBlog] = useState(null); // State to store the blog data
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to track errors

  useEffect(() => {
    // Fetch blog data by ID
    const fetchBlog = async () => {
      try {
        const data = await getBlogById(id); // Fetch blog from API
        setBlog(data); // Set blog data
      } catch (err) {
        setError("Blog not found."); // Handle errors
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchBlog();
  }, [id]); // Dependency array ensures fetch runs when ID changes

  // Show loading state
  if (loading) {
    return (
      <section className="relative min-h-screen py-24 bg-black text-white px-6">
        <div className="relative max-w-4xl mx-auto z-10">
          <div className="text-center py-20">
            <div className="inline-flex items-center space-x-2 text-cyan-400">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-cyan-400"></div>
              <span>Loading blog post...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section className="relative min-h-screen py-24 bg-black text-white px-6">
        <div className="relative max-w-4xl mx-auto z-10">
          <div className="text-center py-20">
            <div className="bg-gradient-to-br from-neutral-900/50 to-neutral-800/30 rounded-2xl p-8 border border-red-500/20">
              <h2 className="text-2xl font-bold text-red-400 mb-4">Blog Not Found</h2>
              <p className="text-gray-300 mb-6">{error}</p>
              <Link 
                to="/blogs" 
                className="inline-flex items-center space-x-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-lg transition-colors"
              >
                <FaArrowLeft />
                <span>Back to Blogs</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Show blog content
  return (
    <section className="relative min-h-screen py-24 bg-black text-white overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-cyan-500/10 to-purple-500/10 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-cyan-500/5 pointer-events-none"></div>
      
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-15 bg-[url('/assets/grid.svg')] bg-cover pointer-events-none animate-pulse"></div>

      {/* Floating tech elements */}
      <div className="absolute top-20 left-10 text-cyan-400/30 animate-bounce">
        <FaCode className="text-2xl" />
      </div>
      <div className="absolute top-40 right-20 text-blue-400/30 animate-bounce" style={{ animationDelay: '1s' }}>
        <FaTerminal className="text-2xl" />
      </div>
      <div className="absolute bottom-40 left-20 text-purple-400/30 animate-bounce" style={{ animationDelay: '2s' }}>
        <FaDatabase className="text-2xl" />
      </div>
      <div className="absolute bottom-20 right-10 text-cyan-400/30 animate-bounce" style={{ animationDelay: '0.5s' }}>
        <FaReact className="text-2xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 z-10">
        {/* Blog header */}
        <div className="mb-8">
          <Link 
            to="/blogs" 
            className="inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors mb-6"
          >
            <FaArrowLeft />
            <span>Back to Blogs</span>
          </Link>
          
          <div className="bg-gradient-to-br from-neutral-900/50 to-neutral-800/30 rounded-2xl p-8 border border-cyan-500/20">
            {/* Blog title */}
            <h1 className="text-4xl font-bold text-cyan-400 mb-4 leading-tight">
              {blog.title}
            </h1>
            
            {/* Blog metadata */}
            <div className="flex items-center space-x-6 mb-6">
              <div className="flex items-center space-x-2 text-gray-400">
                <FaCalendarAlt className="text-cyan-400" />
                <span>Published on {new Date(blog.created_at).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <FaBlog className="text-blue-400" />
                <span>Blog Post</span>
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="flex space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-400 rounded-lg transition-colors">
                <FaShareAlt />
                <span>Share</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg transition-colors">
                <FaBookmark />
                <span>Save</span>
              </button>
            </div>
          </div>
        </div>

        {/* Blog content */}
        <div className="bg-gradient-to-br from-neutral-900/30 to-neutral-800/20 rounded-2xl p-8 border border-cyan-500/10">
          <div className="prose prose-invert max-w-none">
            <div className="text-lg text-gray-300 leading-relaxed whitespace-pre-line">
              {blog.content}
            </div>
          </div>
        </div>

        {/* Blog footer */}
        <div className="mt-8 text-center">
          <div className="bg-gradient-to-br from-neutral-900/50 to-neutral-800/30 rounded-2xl p-6 border border-cyan-500/20">
            <h3 className="text-xl font-bold text-cyan-400 mb-4">Enjoyed this post?</h3>
            <p className="text-gray-300 mb-6">Check out more of my thoughts and tutorials in the blogs section.</p>
            <Link 
              to="/blogs" 
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105"
            >
              <FaBlog />
              <span>View All Blogs</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogPosts;

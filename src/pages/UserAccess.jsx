import React from "react";
import { FaUser, FaCode, FaGraduationCap, FaLaugh, FaHome, FaBlog, FaEnvelope, FaProjectDiagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const UserAccess = () => {
  return (
    <section className="relative min-h-screen py-24 bg-black text-white overflow-hidden flex items-center justify-center">
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
        <FaUser className="text-2xl" />
      </div>
      <div className="absolute bottom-40 left-20 text-purple-400/30 animate-bounce" style={{ animationDelay: '2s' }}>
        <FaGraduationCap className="text-2xl" />
      </div>
      <div className="absolute bottom-20 right-10 text-cyan-400/30 animate-bounce" style={{ animationDelay: '0.5s' }}>
        <FaLaugh className="text-2xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 z-10">
        {/* Page title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full mb-6">
            <FaUser className="text-cyan-400 text-3xl" />
          </div>
          <h1 className="text-5xl font-bold text-cyan-400 mb-4 drop-shadow-lg">
            Welcome to the Site!
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
        </div>

        {/* Main content */}
        <div className="bg-gradient-to-br from-neutral-900/50 to-neutral-800/30 border border-cyan-500/20 rounded-2xl p-8 backdrop-blur-sm">
          {/* Development Notice */}
          <div className="mb-8 p-6 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-lg">
            <div className="flex items-center space-x-3 mb-4">
              <FaLaugh className="text-purple-400 text-2xl" />
              <h2 className="text-2xl font-bold text-purple-400">Development Project Notice</h2>
            </div>
            <p className="text-gray-300 mb-4">
              <FaLaugh className="inline mr-2" />
              <strong>Hey there!</strong> This is a development project focused on authentication and full-stack development. 
              While you're logged in as a regular user, there aren't any special user-only features yet - this is primarily 
              a learning exercise to understand how authentication works!
            </p>
            <p className="text-gray-400 text-sm">
              Think of this as a "proof of concept" - the real magic happens in the code structure and authentication flow! 🎓
            </p>
          </div>

          {/* What you can do */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center">
              <FaCode className="mr-3" />
              What You Can Explore
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-6 rounded-lg border border-cyan-500/20">
                <h4 className="text-lg font-semibold text-cyan-400 mb-3 flex items-center">
                  <FaHome className="mr-2" />
                  Browse the Site
                </h4>
                <p className="text-gray-300 text-sm mb-4">
                  Explore all the public pages - Home, About, Projects, Blogs, and Contact. 
                  Check out the design and animations!
                </p>
                <Link 
                  to="/" 
                  className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
                >
                  <span>Visit Home Page</span>
                  <FaCode className="ml-2" />
                </Link>
              </div>

              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-6 rounded-lg border border-blue-500/20">
                <h4 className="text-lg font-semibold text-blue-400 mb-3 flex items-center">
                  <FaBlog className="mr-2" />
                  Read the Blogs
                </h4>
                <p className="text-gray-300 text-sm mb-4">
                  Check out the blog posts and see how the individual blog pages work. 
                  There's even a typing game in there!
                </p>
                <Link 
                  to="/blogs" 
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors text-sm"
                >
                  <span>Read Blogs</span>
                  <FaBlog className="ml-2" />
                </Link>
              </div>

              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-6 rounded-lg border border-purple-500/20">
                <h4 className="text-lg font-semibold text-purple-400 mb-3 flex items-center">
                  <FaProjectDiagram className="mr-2" />
                  View Projects
                </h4>
                <p className="text-gray-300 text-sm mb-4">
                  See the projects showcase and learn about the development journey 
                  from cabin crew to full-stack developer.
                </p>
                <Link 
                  to="/projects" 
                  className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors text-sm"
                >
                  <span>View Projects</span>
                  <FaProjectDiagram className="ml-2" />
                </Link>
              </div>

              <div className="bg-gradient-to-r from-green-500/10 to-cyan-500/10 p-6 rounded-lg border border-green-500/20">
                <h4 className="text-lg font-semibold text-green-400 mb-3 flex items-center">
                  <FaEnvelope className="mr-2" />
                  Get in Touch
                </h4>
                <p className="text-gray-300 text-sm mb-4">
                  Use the contact form to reach out. It's a great way to see 
                  how forms work in React applications.
                </p>
                <Link 
                  to="/contact" 
                  className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors text-sm"
                >
                  <span>Contact Page</span>
                  <FaEnvelope className="ml-2" />
                </Link>
              </div>
            </div>
          </div>

          {/* Technical Learning */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-blue-400 mb-6 flex items-center">
              <FaGraduationCap className="mr-3" />
              What This Project Teaches
            </h3>
            <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-6 rounded-lg border border-yellow-500/20">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-yellow-400 mb-3">Frontend Skills</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• React components and state management</li>
                    <li>• React Router for navigation</li>
                    <li>• Tailwind CSS for styling</li>
                    <li>• Responsive design principles</li>
                    <li>• Form handling and validation</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-orange-400 mb-3">Backend Skills</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Express.js server setup</li>
                    <li>• JWT authentication</li>
                    <li>• PostgreSQL database integration</li>
                    <li>• Password hashing with bcrypt</li>
                    <li>• RESTful API design</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Call to action */}
          <div className="text-center">
            <p className="text-gray-300 mb-6">
              Ready to explore? Start with the home page and work your way through the site!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105"
              >
                <FaHome />
                <span>Go to Home</span>
              </Link>
              <Link
                to="/blogs"
                className="inline-flex items-center space-x-2 px-6 py-3 border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black font-semibold rounded-lg transition-all duration-300 hover:scale-105"
              >
                <FaBlog />
                <span>Read Blogs</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserAccess;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { decodeJWT } from "../utils/jwt";
import { FaCode, FaBars, FaTimes, FaHome, FaUser, FaProjectDiagram, FaBlog, FaEnvelope, FaSignInAlt, FaUserPlus, FaCog, FaSignOutAlt } from "react-icons/fa";

// Navigation component for rendering the site's navigation menu
const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State to track mobile menu visibility
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track user authentication status
  const [userRole, setUserRole] = useState(null); // State to track user role

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev); // Toggle mobile menu visibility

  // Check authentication status and role on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (token) {
      try {
        const decoded = decodeJWT(token);
        if (decoded && decoded.exp > Date.now() / 1000) {
          setIsLoggedIn(true);
          setUserRole(decoded.role);
        } else {
          // Token expired
          localStorage.removeItem("token");
          setIsLoggedIn(false);
          setUserRole(null);
        }
      } catch {
        // Error decoding token
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setUserRole(null);
      }
    } else {
      setIsLoggedIn(false);
      setUserRole(null);
    }
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserRole(null);
    window.location.href = "/"; // Redirect to home page
  };

  const menuItems = [
    { name: "Home", path: "/", icon: FaHome },
    { name: "About", path: "/about", icon: FaUser },
    { name: "Projects", path: "/projects", icon: FaProjectDiagram },
    { name: "Blogs", path: "/blogs", icon: FaBlog },
    { name: "Contact", path: "/contact", icon: FaEnvelope }
  ]; // Navigation menu items with icons

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden sm:flex space-x-6 items-center">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <Link
              key={item.name}
              to={item.path}
              className="group relative flex items-center space-x-2 px-4 py-2 rounded-lg text-white hover:text-cyan-400 hover:bg-cyan-400/10 transition-all duration-300"
            >
              <IconComponent className="text-lg group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium">{item.name}</span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></div>
            </Link>
          );
        })}
        {!isLoggedIn ? (
          <>
            <Link
              to="/login"
              className="group flex items-center space-x-2 px-4 py-2 rounded-lg text-white hover:text-cyan-400 hover:bg-cyan-400/10 transition-all duration-300"
            >
              <FaSignInAlt className="text-lg group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium">Login</span>
            </Link>
            <Link
              to="/create-account"
              className="group flex items-center space-x-2 px-4 py-2 rounded-lg text-white hover:text-blue-400 hover:bg-blue-400/10 transition-all duration-300"
            >
              <FaUserPlus className="text-lg group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium">Register</span>
            </Link>
          </>
        ) : (
          <>
            {userRole === "admin" && (
              <Link
                to="/admin-dash"
                className="group flex items-center space-x-2 px-4 py-2 rounded-lg text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/20 transition-all duration-300 border border-cyan-400/30"
              >
                <FaCog className="text-lg group-hover:rotate-180 transition-transform duration-300" />
                <span className="font-medium">Admin</span>
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="group flex items-center space-x-2 px-4 py-2 rounded-lg text-white hover:text-red-400 hover:bg-red-400/10 transition-all duration-300"
            >
              <FaSignOutAlt className="text-lg group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium">Logout</span>
            </button>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="sm:hidden flex items-center">
        <button
          onClick={toggleMobileMenu}
          className="inline-flex items-center justify-center p-3 text-white hover:text-yellow-400 hover:bg-yellow-400/10 rounded-lg transition-all duration-300"
        >
          {isMobileMenuOpen ? (
            <FaTimes className="h-6 w-6 animate-spin" />
          ) : (
            <FaBars className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`${
          isMobileMenuOpen ? "block animate-slideIn" : "hidden"
        } sm:hidden bg-black/95 backdrop-blur-lg border-t border-cyan-400/20 px-6 py-4`}
      >
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className="group flex items-center space-x-3 text-white py-3 border-b border-cyan-400/20 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all duration-300"
            >
              <IconComponent className="text-lg group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
        {!isLoggedIn ? (
          <>
            <Link
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="group flex items-center space-x-3 text-white py-3 border-b border-cyan-400/20 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all duration-300"
            >
              <FaSignInAlt className="text-lg group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium">Login</span>
            </Link>
            <Link
              to="/create-account"
              onClick={() => setIsMobileMenuOpen(false)}
              className="group flex items-center space-x-3 text-white py-3 border-b border-blue-400/20 hover:text-blue-400 hover:bg-blue-400/10 transition-all duration-300"
            >
              <FaUserPlus className="text-lg group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium">Register</span>
            </Link>
          </>
        ) : (
          <>
            {userRole === "admin" && (
              <Link
                to="/admin-dash"
                onClick={() => setIsMobileMenuOpen(false)}
                className="group flex items-center space-x-3 text-cyan-400 py-3 border-b border-cyan-400/20 hover:text-cyan-300 hover:bg-cyan-400/20 transition-all duration-300"
              >
                <FaCog className="text-lg group-hover:rotate-180 transition-transform duration-300" />
                <span className="font-medium">Admin Dashboard</span>
              </Link>
            )}
            <button
              onClick={() => {
                handleLogout();
                setIsMobileMenuOpen(false);
              }}
              className="group flex items-center space-x-3 text-white py-3 border-b border-yellow-400/20 hover:text-red-400 hover:bg-red-400/10 transition-all duration-300 w-full text-left"
            >
              <FaSignOutAlt className="text-lg group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium">Logout</span>
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Navigation;

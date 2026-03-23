import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { decodeJWT } from "../utils/jwt";
import { FaCode, FaBars, FaTimes, FaHome, FaUser, FaProjectDiagram, FaBlog, FaEnvelope, FaSignInAlt, FaCog, FaSignOutAlt } from "react-icons/fa";

// Navigation component for rendering the site's navigation menu
const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State to track mobile menu visibility
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track user authentication status
  const [userRole, setUserRole] = useState(null); // State to track user role

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev); // Toggle mobile menu visibility

  // Check authentication status and role on component mount and when localStorage changes
  useEffect(() => {
    const checkAuth = () => {
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
    };

    // Check auth on mount
    checkAuth();

    // Listen for storage changes (when user logs in/out in another tab)
    const handleStorageChange = (e) => {
      if (e.key === 'token') {
        checkAuth();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Also check auth when the component becomes visible (user navigates back)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        checkAuth();
      }
    };

    // Listen for custom auth events (when user logs in/out)
    const handleAuthChange = () => {
      checkAuth();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('authChange', handleAuthChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserRole(null);
    
    // Trigger auth change event
    window.dispatchEvent(new CustomEvent('authChange'));
    
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
      <div className="hidden xl:flex space-x-2 md:space-x-3 lg:space-x-6 items-center">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <Link
              key={item.name}
              to={item.path}
              className="group relative flex items-center space-x-2 px-2 md:px-3 lg:px-4 py-2 rounded-lg text-white hover:text-cyan-400 hover:bg-cyan-400/10 transition-all duration-300"
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
              className="group flex items-center space-x-2 px-2 md:px-3 lg:px-4 py-2 rounded-lg text-white hover:text-cyan-400 hover:bg-cyan-400/10 transition-all duration-300"
            >
              <FaSignInAlt className="text-lg group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium">Login</span>
            </Link>
          </>
        ) : (
          <>
            {userRole === "admin" && (
              <Link
                to="/admin-dash"
                className="group flex items-center space-x-2 px-2 md:px-3 lg:px-4 py-2 rounded-lg text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/20 transition-all duration-300 border border-cyan-400/30"
              >
                <FaCog className="text-lg group-hover:rotate-180 transition-transform duration-300" />
                <span className="font-medium">Admin</span>
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="group flex items-center space-x-2 px-2 md:px-3 lg:px-4 py-2 rounded-lg text-white hover:text-red-400 hover:bg-red-400/10 transition-all duration-300"
            >
              <FaSignOutAlt className="text-lg group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium">Logout</span>
            </button>
          </>
        )}
      </div>

      {/* Mobile/Tablet controls + anchored dropdown */}
      <div className="xl:hidden relative">
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="inline-flex items-center justify-center p-3 text-white hover:text-cyan-400 hover:bg-cyan-400/10 rounded-lg transition-all duration-300 touch-manipulation"
            aria-label="Go to home"
          >
            <FaHome className="h-5 w-5" />
          </Link>
          <div className="hidden md:flex items-center gap-1">
            <Link
              to="/projects"
              className="px-3 py-2 rounded-lg text-sm text-white/90 hover:text-cyan-300 hover:bg-cyan-400/10 transition-all duration-300"
            >
              Projects
            </Link>
            <Link
              to="/blogs"
              className="px-3 py-2 rounded-lg text-sm text-white/90 hover:text-cyan-300 hover:bg-cyan-400/10 transition-all duration-300"
            >
              Blogs
            </Link>
          </div>
          <button
            onClick={toggleMobileMenu}
            className="inline-flex items-center justify-center p-4 text-white hover:text-cyan-400 hover:bg-cyan-400/10 rounded-lg transition-all duration-300 touch-manipulation"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <FaTimes className="h-6 w-6 animate-spin" />
            ) : (
              <FaBars className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile/Tablet Navigation Menu */}
        <div
          className={`${
            isMobileMenuOpen ? "flex animate-slideIn" : "hidden"
          } absolute top-full right-0 mt-2 z-[90] w-[min(92vw,26rem)] max-h-[calc(100vh-5.5rem)] flex-col overflow-y-auto rounded-2xl border border-cyan-400/25 bg-slate-950 px-5 py-4 shadow-2xl md:w-[min(78vw,30rem)] md:bg-gradient-to-br md:from-slate-950/98 md:via-blue-950/92 md:to-cyan-950/88 md:backdrop-blur-xl`}
        >
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className="group flex items-center space-x-4 text-white py-4 px-2 border-b border-cyan-400/20 hover:text-cyan-300 hover:bg-cyan-400/10 rounded-lg transition-all duration-300 touch-manipulation min-h-[48px]"
            >
              <IconComponent className="text-xl group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium text-base md:text-lg">{item.name}</span>
            </Link>
          );
        })}
        {!isLoggedIn ? (
          <>
            <Link
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="group flex items-center space-x-4 text-white py-4 px-2 border-b border-cyan-400/20 hover:text-cyan-300 hover:bg-cyan-400/10 rounded-lg transition-all duration-300 touch-manipulation min-h-[48px]"
            >
              <FaSignInAlt className="text-xl group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium text-base md:text-lg">Login</span>
            </Link>
          </>
        ) : (
          <>
            {userRole === "admin" && (
              <Link
                to="/admin-dash"
                onClick={() => setIsMobileMenuOpen(false)}
                className="group flex items-center space-x-4 text-cyan-400 py-4 px-2 border-b border-cyan-400/20 hover:text-cyan-300 hover:bg-cyan-400/20 rounded-lg transition-all duration-300 touch-manipulation min-h-[48px]"
              >
                <FaCog className="text-xl group-hover:rotate-180 transition-transform duration-300" />
                <span className="font-medium text-base md:text-lg">Admin Dashboard</span>
              </Link>
            )}
            <button
              onClick={() => {
                handleLogout();
                setIsMobileMenuOpen(false);
              }}
              className="group flex items-center space-x-4 text-white py-4 px-2 border-b border-red-400/20 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all duration-300 w-full text-left touch-manipulation min-h-[48px]"
            >
              <FaSignOutAlt className="text-xl group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium text-base md:text-lg">Logout</span>
            </button>
          </>
        )}
        </div>
      </div>
    </>
  );
};

export default Navigation;

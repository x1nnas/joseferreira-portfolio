import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { decodeJWT } from "../utils/jwt";

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      
      if (!token) {
        setIsAuthenticated(false);
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        // Decode the JWT token to get user info
        const decoded = decodeJWT(token);
        
        if (decoded && decoded.exp > Date.now() / 1000) {
          setIsAuthenticated(true);
          setIsAdmin(decoded.role === "admin");
        } else {
          // Token expired
          localStorage.removeItem("token");
          setIsAuthenticated(false);
          setIsAdmin(false);
        }
      } catch (error) {
        // Error decoding token
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setIsAdmin(false);
      }
      
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/user-access" replace />;
  }

  return children;
};

export default ProtectedRoute;

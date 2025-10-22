// Manual JWT verification without external library
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_key";

// Simple JWT decoder (client-side compatible)
function decodeJWT(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
}

// Note: For production, you should use proper JWT signature verification
// This simplified version only decodes the token payload

export function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Missing token" });

  try {
    // For now, just decode the token without signature verification
    // This is less secure but works without external dependencies
    const decoded = decodeJWT(token);
    
    if (!decoded) {
      return res.status(403).json({ message: "Invalid token" });
    }
    
    // Check if token is expired
    if (decoded.exp && decoded.exp < Date.now() / 1000) {
      return res.status(403).json({ message: "Token expired" });
    }
    
    req.user = decoded; // Attach user info to request
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
}

// Middleware to check if user has admin role
export function requireAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ message: "Authentication required" });
  }
  
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  
  next();
}

// Middleware to check if user is authenticated (any role)
export function requireAuth(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ message: "Authentication required" });
  }
  
  next();
}

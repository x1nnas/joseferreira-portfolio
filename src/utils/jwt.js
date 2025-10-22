// Helper function to decode JWT token without external library
// This is a browser-compatible JWT decoder that doesn't require Node.js libraries
export const decodeJWT = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    // Error decoding token
    return null;
  }
};

// Helper function to check if token is expired
export const isTokenExpired = (token) => {
  const decoded = decodeJWT(token);
  if (!decoded || !decoded.exp) return true;
  return decoded.exp < Date.now() / 1000;
};

// Helper function to get user role from token
export const getUserRole = (token) => {
  const decoded = decodeJWT(token);
  return decoded ? decoded.role : null;
};

// Helper function to get user ID from token
export const getUserId = (token) => {
  const decoded = decodeJWT(token);
  return decoded ? decoded.id : null;
};

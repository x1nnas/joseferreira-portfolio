// Base URL for your backend.
// Uses `VITE_API_BASE_URL` in production (e.g. Vercel) and falls back
// to a relative `/api` path in development so Vite's proxy can be used.
const API_BASE = import.meta.env.VITE_API_BASE_URL || "";
const BASE_URL = `${API_BASE}/api/auth`;
// Registration 
export async function registerUser({ username, email, password }) {
  try {
    const res = await fetch(`${BASE_URL}/create-account`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Tell the server we're sending JSON
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json(); // Get JSON response

    if (!res.ok) {
      throw new Error(data.message || "Registration failed");
    }

    return data; // Will include { user, token }
  } catch (err) {
    // Error during registration
    throw err; // Re-throw so you can catch it in your component
  }
}

// Login
export async function loginUser({ username, password }) {
  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Login failed");
    }

    return data; // Will include { user, token }
  } catch (err) {
    // Error during login
    throw err;
  }
}

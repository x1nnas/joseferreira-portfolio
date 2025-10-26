// Base URL for your backend - use relative URL for proxy
const BASE_URL = "/api/auth";
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

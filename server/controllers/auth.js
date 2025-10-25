import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";
import db from "../db/dbconn.js";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_key";

// Route: POST /create-account
export async function registerUser(req, res) {
  const { username, email, password } = req.body;

  // Validate input
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  if (!validator.isLength(password, { min: 6 })) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }

  if (!validator.isLength(username, { min: 3, max: 20 })) {
    return res.status(400).json({ message: "Username must be 3-20 characters long" });
  }

  // Basic XSS protection
  const sanitizedUsername = validator.escape(username);
  const sanitizedEmail = validator.normalizeEmail(email);

  try {
    // Check if email already exists
    const existingUser = await db.get(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Assign default role "user"
    const role = "user";

    // Create user in database
    const result = await db.run(
      "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
      [sanitizedUsername, sanitizedEmail, hashedPassword, role]
    );
    
    // Get the created user
    const newUser = await db.get(
      "SELECT id, username, email, role FROM users WHERE id = ?",
      [result.lastID]
    );

    // Create JWT token
    const token = jwt.sign(
      { id: newUser.id, role: newUser.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({ user: newUser, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed" });
  }
}

// Route: POST /login
export async function loginUser(req, res) {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  // Basic input sanitization
  const sanitizedUsername = validator.escape(username);

  try {
    // Find user by username
    const user = await db.get("SELECT * FROM users WHERE username = ?", [
      sanitizedUsername,
    ]);

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    const { password: _, ...userWithoutPassword } = user;
    res.status(200).json({ user: userWithoutPassword, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
}

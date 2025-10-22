// BACKUP: Mock authentication for testing without database
// This is a fallback implementation that doesn't require database
// Use auth.js for production with real database authentication
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_key";

// Mock users for testing
const mockUsers = [
  {
    id: 1,
    username: "admin",
    email: "admin@example.com",
    password: "admin123", // Simple password for testing
    role: "admin"
  },
  {
    id: 2,
    username: "user",
    email: "user@example.com", 
    password: "user123", // Simple password for testing
    role: "user"
  }
];

// Mock registration function
export async function registerUser(req, res) {
  const { username, email, password } = req.body;

  // Check if user already exists
  const existingUser = mockUsers.find(u => u.username === username || u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Create new user
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: mockUsers.length + 1,
    username,
    email,
    password: hashedPassword,
    role: "user"
  };
  
  mockUsers.push(newUser);

  // Create JWT token
  const token = jwt.sign(
    { id: newUser.id, role: newUser.role },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.status(201).json({ 
    user: { id: newUser.id, username: newUser.username, email: newUser.email, role: newUser.role }, 
    token 
  });
}

// Mock login function
export async function loginUser(req, res) {
  const { username, password } = req.body;

  // Find user
  const user = mockUsers.find(u => u.username === username);
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // Check password (simple comparison for testing)
  if (user.password !== password) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // Create JWT token
  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: "1h",
  });

  const { password: _, ...userWithoutPassword } = user;
  res.status(200).json({ user: userWithoutPassword, token });
}

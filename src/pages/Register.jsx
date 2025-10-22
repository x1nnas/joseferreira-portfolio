import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import { registerUser } from "../api/auth";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaTerminal, FaCode, FaDatabase, FaReact, FaGraduationCap, FaLaugh } from "react-icons/fa";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Client-side validation
    if (!username || !email || !password) {
      setError("Please fill in all fields");
      return;
    }
    if (!validator.isEmail(email)) {
      setError("Invalid email address");
      return;
    }
    if (!validator.isLength(password, { min: 6 })) {
      setError("Password must be at least 6 characters long");
      return;
    }

    try {
      const { user, token } = await registerUser({ username, email, password });

      // Store JWT token
      localStorage.setItem("token", token);
      setSuccess("Registration successful!");
      setTimeout(() => navigate("/login"), 1500); // Redirect to login page w timeout

      // Reset form
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      // Handle registration error
    }
  };

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
        <FaTerminal className="text-2xl" />
      </div>
      <div className="absolute bottom-40 left-20 text-purple-400/30 animate-bounce" style={{ animationDelay: '2s' }}>
        <FaDatabase className="text-2xl" />
      </div>
      <div className="absolute bottom-20 right-10 text-cyan-400/30 animate-bounce" style={{ animationDelay: '0.5s' }}>
        <FaReact className="text-2xl" />
      </div>

      <div className="relative max-w-md mx-auto px-6 z-10 w-full">
        {/* Page title */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-cyan-400 mb-2">
            Join the Code
          </h2>
          <p className="text-gray-400">Create your developer account</p>
        </div>

        {/* Development notice */}
        <div className="mb-6 p-4 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-lg">
          <div className="flex items-center space-x-2 text-purple-300">
            <FaLaugh className="text-lg" />
            <span className="text-sm font-medium">Development Notice</span>
          </div>
          <p className="text-gray-300 text-sm mt-2">
            <FaLaugh className="inline mr-1" />
            <strong>Note:</strong> This is a development project focused on authentication! 
            You're registering for a learning environment. 
            But hey, at least you're learning something! 🎓
          </p>
        </div>

        {/* Registration form */}
        <div className="bg-gradient-to-br from-neutral-900/50 to-neutral-800/30 border border-cyan-500/20 rounded-2xl shadow-2xl p-8 backdrop-blur-sm">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="text-sm font-medium text-cyan-300 mb-2 flex items-center"
              >
                <FaUser className="mr-2" />
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-neutral-800/50 border border-cyan-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all"
                placeholder="Enter your username"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-cyan-300 mb-2 flex items-center"
              >
                <FaEnvelope className="mr-2" />
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-neutral-800/50 border border-cyan-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-cyan-300 mb-2 flex items-center"
              >
                <FaLock className="mr-2" />
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-neutral-800/50 border border-cyan-500/30 rounded-lg px-4 py-3 pr-12 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            {error && (
              <div className="animate-fadeIn">
                <p className="text-red-400 text-sm flex items-center">
                  <span className="mr-2">⚠️</span>
                  {error}
                </p>
              </div>
            )}
            {success && (
              <div className="animate-fadeIn">
                <p className="text-green-400 text-sm flex items-center">
                  <span className="mr-2">✓</span>
                  {success}
                </p>
              </div>
            )}
            <div className="flex justify-end items-center">
              <button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:scale-105"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;

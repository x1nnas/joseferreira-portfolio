import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";
import { FaLock, FaUser, FaEye, FaEyeSlash, FaTerminal, FaCode, FaDatabase, FaReact } from "react-icons/fa";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    if (!username || !password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      // Use the loginUser helper function
      const { token } = await loginUser({ username, password });

      localStorage.setItem("token", token);
      setSuccess("Login successful!");
      setShowSuccess(true);

      // Trigger auth change event to update navigation
      window.dispatchEvent(new CustomEvent('authChange'));

      // Clear the form
      setUsername("");
      setPassword("");

      // Redirect to dashboard after successful login with smooth transition
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/admin-dash");
      }, 2000);
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
      // Handle login error
    } finally {
      setIsLoading(false);
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
            Welcome Back
          </h2>
          <p className="text-gray-400">Sign in to your developer account</p>
        </div>

        {/* Login form */}
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
              <div className="relative">
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
                <p className="text-red-500 text-sm flex items-center">
                  <span className="mr-2">⚠️</span>
                  {error}
                </p>
              </div>
            )}
            {showSuccess && (
              <div className="animate-fadeIn">
                <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-3 flex items-center">
                  <div className="animate-spin mr-2">
                    <span className="text-green-400">✓</span>
                  </div>
                  <p className="text-green-400 text-sm font-medium">
                    {success} Redirecting to dashboard...
                  </p>
                </div>
              </div>
            )}
            <div className="flex justify-between items-center">
              <a
                href="/forgot-password"
                className="text-sm text-cyan-400 hover:text-cyan-300 hover:underline transition-colors"
              >
                Forgot Password?
              </a>
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:scale-105 ${
                  isLoading 
                    ? 'opacity-50 cursor-not-allowed' 
                    : ''
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Logging in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

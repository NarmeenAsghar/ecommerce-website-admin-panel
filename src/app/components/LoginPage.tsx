"use client";

import { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// Adding prop to accept onLoginSuccess function
interface LoginProps {
  onLoginSuccess: () => void; // The function that will be invoked after successful login
}

const LoginPage = ({ onLoginSuccess }: LoginProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Handle the login attempt
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    // Simulate an API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const adminEmail = process.env.NEXT_PUBLIC_EMAIL;
    const adminPassword = process.env.NEXT_PUBLIC_PASSWORD;

    if (email === adminEmail && password === adminPassword) {
      setMessage("Login successful");
      localStorage.setItem("isLoggedIn", "true");
      onLoginSuccess(); 
    } else {
      if (email !== adminEmail) {
        setMessage("Invalid email address");
      } else if (password !== adminPassword) {
        setMessage("Invalid password");
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-300 to-gray-200 text-white flex justify-center items-center">
      <motion.form
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleLogin}
        className="bg-gradient-to-t from-gray-400 to-gray-500 shadow-lg rounded-[4px] p-8 w-full sm:w-96 relative overflow-hidden"
      >
        <h2 className="text-3xl font-semibold text-center text-gray-900 mb-6">
          Welcome to Login Page
        </h2>

        {/* Animated message */}
        <AnimatePresence>
          {message && (
            <motion.div
              key="message"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`mb-4 p-2 text-center rounded-md ${
                message.includes("Invalid")
                  ? "bg-red-300 text-red-700"
                  : "bg-green-300 text-green-700"
              }`}
            >
              {message}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Email Field */}
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-900 mb-2">
            Email
          </label>
          <motion.div className="relative" whileHover={{ scale: 1.03 }}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 pl-12 bg-gray-100 rounded-lg border-2 text-black border-gray-300 placeholder-gray-500"
            />
            <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </motion.div>
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-600 mb-2">
            Password
          </label>
          <motion.div className="relative" whileHover={{ scale: 1.03 }}>
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 pl-12 bg-gray-100 rounded-lg border-2 border-gray-300 text-black placeholder-gray-500"
            />
            <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </motion.div>
        </div>

        {/* Login Button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isLoading}
          className={`w-full py-3 bg-gradient-to-r from-blue-200 to-teal-950 text-white rounded-lg font-semibold relative overflow-hidden ${
            isLoading ? 'cursor-not-allowed opacity-50' : ''
          }`}
        >
          {isLoading ? (
            <motion.span
              className="absolute inset-0 bg-gradient-to-y from-blue-200 to-teal-950"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                duration: 1.5,
              }}
            />
          ) : null}
          <span className="relative z-10">
            {isLoading ? "Logging in..." : "Login"}
          </span>
        </motion.button>
      </motion.form>
    </div>
  );
};

export default LoginPage;

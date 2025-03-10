import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // For animation
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2"; // Alert library

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home"); // Redirect to home after login
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        Swal.fire({
          icon: "warning",
          title: "User Not Found!",
          text: "It looks like you don’t have an account. Please create one to continue.",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Create Account",
          showCancelButton: true,
          cancelButtonText: "Cancel",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/signup"); // Redirect to the signup page
          }
        });
      } else if (error.code === "auth/wrong-password") {
        Swal.fire({
          icon: "error",
          title: "Incorrect Password!",
          text: "Please try again.",
          confirmButtonColor: "#d33",
          confirmButtonText: "Retry",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed!",
          text: "Please check your details and try again.",
          confirmButtonColor: "#d33",
          confirmButtonText: "Try Again",
        });
      }
    }
  };

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 to-purple-600"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
          Welcome Back! 👋
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Password Input with Toggle */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span
              className="absolute right-4 top-4 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300 transform hover:scale-105"
          >
            Login
          </button>
        </form>

        {/* OR Divider */}
        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-3 text-gray-500">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* Signup Link */}
        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </motion.div>
  );
};

export default Login;

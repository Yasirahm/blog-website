import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // For animation
import { FaEye, FaEyeSlash } from "react-icons/fa"; 
import Swal from "sweetalert2";// Icons for password toggle

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  

const handleSignup = async (e) => {
  e.preventDefault();
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    navigate("/home"); // Redirect after successful signup
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      Swal.fire({
        icon: "warning",
        title: "Email Already Registered!",
        text: "This email is already registered. Please log in.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
    } else if (error.code === "auth/weak-password") {
      Swal.fire({
        icon: "error",
        title: "Weak Password!",
        text: "Password is too weak. Use at least 6 characters.",
        confirmButtonColor: "#d33",
        confirmButtonText: "Try Again",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Signup Failed!",
        text: "Something went wrong. Please try again.",
        confirmButtonColor: "#d33",
        confirmButtonText: "OK",
      });
    }
  }
};

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-400 to-blue-600"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
          Create an Account 🚀
        </h2>
        <form onSubmit={handleSignup} className="space-y-4">
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

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300 transform hover:scale-105"
          >
            Sign Up
          </button>
        </form>

        {/* OR Divider */}
        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-3 text-gray-500">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* Login Link */}
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </motion.div>
  );
};

export default Signup;

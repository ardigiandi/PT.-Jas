import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // Add state for error handling
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit called"); // Log to confirm function call
    console.log("Attempting login with:", { email, password }); // Log data being sent

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      });
      console.log("Login successful:", response.data);
      // Assuming the API returns a token in response.data.token
      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        navigate("/admin/dashboard"); // Redirect to admin dashboard
      } else {
        setError(new Error("Login successful but no token received."));
        alert("Login successful but no token received.");
      }
    } catch (error) {
      setError(error);
      console.error(
        "Login failed:",
        error.response ? error.response.data : error.message
      ); // Log detailed error
      // Handle login errors (e.g., display error message to user)
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-oren to-yellow-600">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-lg p-8 max-w-sm w-full"
      >
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Admin Login
        </h1>
        <p className="text-center text-gray-600 mb-4">Enter your credentials</p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="email" // Changed htmlFor to email
            >
              Email
            </label>
            <input
              type="email" // Changed input type to email
              id="email" // Changed id to email
              className="w-full p-2 mt-1 border border-gray-400 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 text-gray-800"
              placeholder="Enter your email" // Changed placeholder to Enter your email
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 mt-1 border border-gray-400 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 text-gray-800"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginPage;

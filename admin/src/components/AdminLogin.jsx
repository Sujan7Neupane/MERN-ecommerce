// AdminLogin.jsx
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../store/adminSlice.js";
import { useNavigate } from "react-router";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "/api/v1/admin/login",
        { email, password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        toast.success("Admin logged in successfully!");

        // Update Redux state with user info
        dispatch(
          login({
            username: response.data.user.username,
            email: response.data.user.email,
            role: response.data.user.role,
          })
        );

        // Navigate to dashboard
        navigate("/", { replace: true }); // Use replace to prevent going back to login
      } else {
        toast.error(response.data.message || "Login failed!");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl px-8 py-10 w-full max-w-md">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          Admin Panel Login
        </h1>

        <form onSubmit={onSubmitHandler} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-lg w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-black focus:border-black outline-none transition"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-lg w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-black focus:border-black outline-none transition"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`mt-4 w-full py-2.5 rounded-lg text-white font-medium shadow-sm hover:shadow-md cursor-pointer transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:bg-gray-900"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;

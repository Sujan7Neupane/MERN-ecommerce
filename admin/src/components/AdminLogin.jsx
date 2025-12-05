import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setToken } from "../store/adminSlice.js";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "/api/v1/user/admin",
        { email, password },
        { withCredentials: true }
      );

      if (response.data.success) {
        dispatch(setToken(response.data.accessToken)); // Store in Redux
        toast.success("Admin logged in!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl px-8 py-10 w-full max-w-md">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          Admin Panel Login
        </h1>

        <form onSubmit={onSubmitHandler} className="space-y-5">
          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Email Address
            </label>
            <input
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-lg w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-black focus:border-black outline-none transition"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-lg w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-black focus:border-black outline-none transition"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 w-full py-2.5 rounded-lg text-white bg-black hover:bg-gray-900 transition font-medium shadow-sm hover:shadow-md cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;

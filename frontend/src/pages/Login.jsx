import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import { setUser } from "../store/authSlice";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Form fields
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onFormSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      let response;

      if (currentState === "Sign Up") {
        // SIGN UP
        response = await axios.post(
          "/api/v1/user/register",
          { name, username, email, password },
          { withCredentials: true }
        );
      } else {
        // LOGIN
        response = await axios.post(
          "/api/v1/user/login",
          { username, email, password },
          { withCredentials: true }
        );
      }

      // If backend returns success
      if (response.data.success) {
        const user = response.data.data.user;

        // Save to Redux
        dispatch(setUser(user));

        toast.success(
          currentState === "Sign Up"
            ? "User Registered Successfully!"
            : "Logged In Successfully!"
        );

        navigate("/");
      } else {
        toast.error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <form
      onSubmit={onFormSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      {/* HEADER */}
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {/* SIGN UP ONLY: Name */}
      {currentState !== "Login" && (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
          required
        />
      )}

      {/* Username */}
      <input
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        type="text"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Username"
        required
      />

      {/* SIGN UP ONLY: Email */}
      {currentState !== "Login" && (
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Email"
          required
        />
      )}

      {/* Password */}
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        required
      />

      {/* SWITCH LOGIN / SIGNUP */}
      <div className="w-full flex justify-between text-sm -mt-2">
        <p className="cursor-pointer">Forgot your password?</p>

        {currentState === "Login" ? (
          <p
            className="cursor-pointer"
            onClick={() => setCurrentState("Sign Up")}
          >
            Create Account
          </p>
        ) : (
          <p
            className="cursor-pointer"
            onClick={() => setCurrentState("Login")}
          >
            Login Here
          </p>
        )}
      </div>

      {/* SUBMIT BUTTON */}
      <button className="bg-black text-white font-light px-8 py-2 mt-4 cursor-pointer">
        {currentState === "Login" ? "Login" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;

import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import { setUser } from "../store/authSlice";
import { useEffect } from "react";

const Login = () => {
  // Making login and signup in the same page
  // hiding name field in login and showing in signup
  const [currentState, setCurrentState] = useState("Login");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  // forms value tanna
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onFormSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      let response;
      if (currentState === "Sign Up") {
        // Sign Up
        response = await axios.post(
          "/api/v1/user/register",
          { name, username, email, password },
          { withCredentials: true }
        );
      } else {
        // Login
        response = await axios.post(
          "/api/v1/user/login",
          { username, email, password },
          { withCredentials: true }
        );
        navigate("/");
      }

      console.log(response.data.data.user);
      // console.log(response.data.accessToken);
      // console.log(response.data.refreshToken);

      if (response.data.success) {
        dispatch(
          setUser({
            user: response.data.data.user,
            accessToken: response.data.data.accessToken,
            refreshToken: response.data.data.refreshToken,
          })
        );
        // localStorage.setItem("user", JSON.stringify(response.data.data.user));

        toast.success(
          currentState === "Sign Up"
            ? "User Registered Successfully!"
            : "User Logged In Successfully!"
        );
        // dis;
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
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

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

      <input
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        type="text"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Username"
        required
      />

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

      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password" // ✅ Correct input type
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        required
      />

      <div className="w-full flex justify-between text-sm -mt-2">
        <p className="cursor-pointer">Forgot your password?</p>
        {currentState === "Login" ? (
          <p onClick={() => setCurrentState("Sign Up")}>Create Account</p>
        ) : (
          <p onClick={() => setCurrentState("Login")}>Login Here</p>
        )}
      </div>

      <button className="bg-black text-white font-light px-8 py-2 mt-4 cursor-pointer">
        {currentState === "Login" ? "Login" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;

import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";

const Login = () => {
  // Making login and signup in the same page
  // hiding name field in login and showing in signup
  const [currentState, setCurrentState] = useState("Login");

  const { token } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  // for forms value
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onFormSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      // signup cha vane signup api call garne
      if (currentState == "Sign Up") {
        axios.post();
      }
      // natra login api call
      else {
      }
    } catch (error) {}
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

      {currentState === "Login" ? (
        ""
      ) : (
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
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="text"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        required
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="text"
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

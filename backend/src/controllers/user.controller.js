import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import validator from "validator";
import jwt from "jsonwebtoken";

const generateTokens = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Error while generating Tokens!");
  }
};

const userRegister = asyncHandler(async (req, res) => {
  const { name, username, email, password } = req.body;

  //   Checking empty fields
  if (
    [name, username, email, password].some(
      (field) => !field || field.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  //   validating email
  if (!validator.isEmail(email)) {
    throw new ApiError(400, "Please enter a valid email");
  }

  //   checking password length
  if (password.length < 8) {
    throw new ApiError(400, "Please enter a strong password");
  }

  //   validating email existing
  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    throw new ApiError(400, "User already exists with username or email");
  }

  const user = await User.create({
    name,
    username: username.toLowerCase(),
    email,
    password,
  });

  const { accessToken, refreshToken } = await generateTokens(user._id);

  const registeredUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: registeredUser },
        "User Registered Successfully!"
      )
    );
});

const userLogin = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;
  console.log(email);

  if (!(username || email)) {
    throw new ApiError(400, "username or email is required");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateTokens(user._id);

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged In Successfully"
      )
    );
});

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const emailInput = email?.trim();
    const passwordInput = password?.trim();

    if (
      emailInput === process.env.SUPER_ADMIN_EMAIL &&
      passwordInput === process.env.SUPER_ADMIN_PASSWORD
    ) {
      const accessToken = jwt.sign(
        { _id: "superadmin", role: "admin" },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      const refreshToken = jwt.sign(
        { _id: "superadmin", role: "admin" },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
      );

      const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      };

      return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({
          success: true,
          user: {
            username: "Super Admin",
            email: emailInput,
            role: "admin",
          },
          accessToken,
          refreshToken,
          message: "Super Admin logged in successfully",
        });
    }

    // Wrong credentials
    return res.status(401).json({
      success: false,
      message: "Admin Login Failed!",
    });
  } catch (error) {
    console.error("Admin Login Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export { userLogin, userRegister, adminLogin };

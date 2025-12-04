import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import validator from "validator";

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
    secure: process.env.NODE_ENV,
    sameSite: "strict",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: registeredUser, accessToken, refreshToken },
        "User Registered Successfully!"
      )
    );
});

const userLogin = asyncHandler(async (req, res) => {});

const adminLogin = asyncHandler(async (req, res) => {});

export { userLogin, userRegister, adminLogin };

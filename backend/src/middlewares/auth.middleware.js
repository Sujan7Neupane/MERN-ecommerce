import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

import { User } from "../models/user.models.js";
import ApiError from "../utils/ApiError.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  console.log(token);

  if (!token) {
    throw new ApiError(400, "Unauthorized request");
  }

  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  const user = await User.findById(decodedToken._id).select(
    "-password -refreshToken"
  );

  if (!user) {
    throw new ApiError(400, "Invalid Access Token");
  }

  req.user = user;
  next();
});

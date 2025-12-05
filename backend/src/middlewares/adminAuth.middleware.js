import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.models.js";

const isAdmin = asyncHandler(async (req, res, next) => {
  // Check token from cookies or headers
  const token =
    req.cookies?.accessToken ||
    req.headers.authorization?.replace("Bearer ", "") ||
    req.headers.token;

  if (!token) {
    throw new ApiError(401, "Not Authorized! Login Again");
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (err) {
    throw new ApiError(401, "Invalid or expired token");
  }

  // Super admin
  if (decodedToken._id === "superadmin" && decodedToken.role === "admin") {
    req.user = {
      _id: "superadmin",
      username: "Super Admin",
      email: process.env.SUPER_ADMIN_EMAIL,
      role: "admin",
    };
    return next();
  }

  // Normal admin
  const user = await User.findById(decodedToken._id).select(
    "-password -refreshToken"
  );
  if (!user || user.role !== "admin") {
    throw new ApiError(403, "Access denied! Not an admin.");
  }

  req.user = user;
  next();
});

export default isAdmin;

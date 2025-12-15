import asyncHandler from "../utils/asyncHandler.js";
// import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
// import { User } from "../models/user.models.js";

const isAdmin = asyncHandler(async (req, res, next) => {
  if (req.cookies?.adminToken === "authenticated") {
    req.user = {
      _id: "superadmin",
      username: "Super Admin",
      email: process.env.SUPER_ADMIN_EMAIL,
      role: "admin",
    };
    return next();
  }

  throw new ApiError(401, "Not Authorized! Login Again");
});

export default isAdmin;

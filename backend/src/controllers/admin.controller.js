import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const emailInput = email?.trim();
  const passwordInput = password?.trim();

  if (!emailInput || !passwordInput) {
    throw new ApiError(400, "Email and password are required");
  }

  // Super Admin login
  if (
    emailInput === process.env.SUPER_ADMIN_EMAIL &&
    passwordInput === process.env.SUPER_ADMIN_PASSWORD
  ) {
    // Set a cookie to indicate admin is logged in
    const cookieOptions = {
      httpOnly: true,
      secure: false, // true in production with HTTPS
      sameSite: "lax",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    };

    res
      .status(200)
      .cookie("isAdmin", "true", cookieOptions)
      .json({
        success: true,
        user: {
          username: "Super Admin",
          email: emailInput,
          role: "admin",
        },
        message: "Super Admin logged in successfully",
      });
  }

  // Invalid credentials
  throw new ApiError(401, "Admin Login Failed!");
});
const adminLogout = asyncHandler(async (req, res) => {
  return res
    .clearCookie("isAdmin", { path: "/" })
    .status(200)
    .json({ success: true, message: "Admin logged out successfully" });
});

export { adminLogin, adminLogout };

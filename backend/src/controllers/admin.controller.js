import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

// adminController.js (backend)
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
      // httpOnly: true,
      // secure: process.env.NODE_ENV === "production", // true in production with HTTPS
      // sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      // path: "/",
      // maxAge: 24 * 60 * 60 * 1000, // 1 day
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
    };

    return res
      .status(200)
      .cookie("adminToken", "authenticated", cookieOptions) // Changed cookie name
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
  // Clear the authentication cookie
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
  };

  res
    .clearCookie("adminToken", cookieOptions) // Make sure this matches your login cookie name
    .status(200)
    .json({
      success: true,
      message: "Admin logged out successfully",
    });
});

// const checkAuth = asyncHandler(async (req, res) => {
//   // Check if adminToken cookie exists

//   console.log("Cookies received:", req.cookies); // Debug
//   console.log("adminToken:", req.cookies.adminToken); // Debug

//   if (req.cookies.adminToken === "authenticated") {
//     return res.status(200).json({
//       authenticated: true,
//       user: {
//         username: "Super Admin",
//         email: process.env.SUPER_ADMIN_EMAIL,
//         role: "admin",
//       },
//     });
//   }

//   return res.status(200).json({
//     authenticated: false,
//   });
// });

const checkAuth = asyncHandler(async (req, res) => {
  console.log("Checking auth...");
  console.log("All cookies:", req.cookies);
  console.log("adminToken cookie:", req.cookies.adminToken);
  console.log("Origin:", req.headers.origin);
  console.log("Referer:", req.headers.referer);

  // Check if adminToken cookie exists
  if (req.cookies.adminToken === "authenticated") {
    console.log("✅ User is authenticated");
    return res.status(200).json({
      authenticated: true,
      user: {
        username: "Super Admin",
        email: process.env.SUPER_ADMIN_EMAIL,
        role: "admin",
      },
    });
  }

  console.log("User is NOT authenticated");
  return res.status(200).json({
    authenticated: false,
    debug: {
      cookies: req.cookies,
      origin: req.headers.origin,
    },
  });
});

export { adminLogin, adminLogout, checkAuth };

import { Router } from "express";
import {
  adminLogin,
  userLogin,
  userRegister,
  userLogout,
  getCurrentUser,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(userRegister);
router.route("/login").post(userLogin);
router.route("/logout").post(verifyJWT, userLogout);
router.route("/getCurrentUser").get(verifyJWT, getCurrentUser);

router.route("/admin").post(adminLogin);

export default router;

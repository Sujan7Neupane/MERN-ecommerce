import { Router } from "express";
import {
  adminLogin,
  userLogin,
  userRegister,
} from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(userRegister);
router.route("/login").post(userLogin);
router.route("/admin").post(adminLogin);

export default router;

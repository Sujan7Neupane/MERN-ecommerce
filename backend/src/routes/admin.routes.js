import { Router } from "express";
import {
  adminLogin,
  adminLogout,
  checkAuth,
} from "../controllers/admin.controller.js";
import isAdmin from "../middlewares/adminAuth.middleware.js";

const router = Router();

router.route("/login").post(adminLogin);
router.route("/logout").post(isAdmin, adminLogout);
router.get("/check-auth", checkAuth);

export default router;

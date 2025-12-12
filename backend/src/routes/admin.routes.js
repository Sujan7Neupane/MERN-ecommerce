import { Router } from "express";
import { adminLogin, adminLogout } from "../controllers/admin.controller.js";
import isAdmin from "../middlewares/adminAuth.middleware.js";

const router = Router();

router.route("/login").post(adminLogin);
router.route("/logout").post(isAdmin, adminLogout);

export default router;

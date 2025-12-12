import { Router } from "express";
import {
  allOrdersAdmin,
  allOrdersUser,
  placeOrder,
  placeOrderEsewa,
  placeOrderfonePay,
  updateStatus,
} from "../controllers/order.controller.js";
import isAdmin from "../middlewares/adminAuth.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// for the ADMIN
router.route("/adminorders").post(isAdmin, allOrdersAdmin);
router.route("/status").post(isAdmin, updateStatus);

// payment features
router.route("/place").post(verifyJWT, placeOrder);
router.route("/esewa").post(verifyJWT, placeOrderEsewa);
router.route("/fonepay").post(verifyJWT, placeOrderfonePay);

// for the normal users
router.route("/userorders").get(verifyJWT, allOrdersUser);

export default router;

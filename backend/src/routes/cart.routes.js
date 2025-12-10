import express from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  addToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
  getCart,
} from "../controllers/cart.controllers.js";

const router = express.Router();

router.post("/add", verifyJWT, addToCart);
router.patch("/update", verifyJWT, updateCartQuantity);
router.delete("/remove", verifyJWT, removeFromCart);
router.delete("/clear", verifyJWT, clearCart);

router.get("/get", verifyJWT, getCart);

export default router;

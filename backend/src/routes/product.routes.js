import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getProductsById,
  removeProduct,
} from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import isAdmin from "../middlewares/adminAuth.middleware.js";

const router = Router();

router
  .route("/add-product")
  .post(isAdmin, upload.array("image", 5), createProduct);

router.route("/all-products").get(getAllProducts);

router.route("/:id").get(getProductsById);

router.route("/delete/:id").delete(isAdmin, removeProduct);

export default router;

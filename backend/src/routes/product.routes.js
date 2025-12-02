import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getProductsById,
} from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/add-product").post(upload.array("image", 5), createProduct);

router.route("/all-products").get(getAllProducts);

router.route("/:id").get(getProductsById);

export default router;

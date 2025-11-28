import { Router } from "express";
import {
  createProduct,
  getAllProducts,
} from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/add-product").post(upload.array("image", 5), createProduct);

router.route("/all-products").get(getAllProducts);

export default router;

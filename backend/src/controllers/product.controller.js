import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import uploadOnCloudinary from "../utils/uploadOnCloudinary.js";

import { Product } from "../models/product.model.js";

const createProduct = asyncHandler(async (req, res) => {
  let {
    name,
    description,
    price,
    category,
    subCategory,
    sizes,
    date,
    bestseller,
  } = req.body;

  // Validate empty fields (only for strings)
  const requiredFields = [name, description, price, category, subCategory];

  if (requiredFields.some((field) => !field || field.trim() === "")) {
    throw new ApiError(400, "Required fields cannot be empty");
  }

  // Convert sizes string → array
  if (typeof sizes === "string") {
    try {
      sizes = JSON.parse(sizes); // turns '["S","M","L"]' → ["S","M","L"]
    } catch (error) {
      throw new ApiError(400, "Sizes must be a valid JSON array");
    }
  }

  // Validate for sizes which mus be an array
  if (!Array.isArray(sizes)) {
    throw new ApiError(400, "Sizes must be an array");
  }

  // each size is allowed by enum
  const allowedSizes = ["S", "M", "L"];
  if (!sizes.every((s) => allowedSizes.includes(s))) {
    throw new ApiError(400, "Invalid size provided");
  }

  const imagesFilePath = req.files?.map((file) => file.path) || [];

  if (!imagesFilePath.length) {
    throw new ApiError(400, "Images are required!");
  }

  const imageUrls = [];

  for (const file of imagesFilePath) {
    const uploadedImage = await uploadOnCloudinary(file);
    if (uploadedImage) {
      imageUrls.push(uploadedImage.secure_url);
    }
  }

  // Create product
  const newProduct = await Product.create({
    name,
    description,
    price,
    image: imageUrls,
    category: category.toLowerCase(),
    subCategory: subCategory.toLowerCase(),
    sizes,
    bestseller: bestseller || false,
    date,
  });

  return res
    .status(201)
    .json(new ApiResponse(200, newProduct, "New Product added successfully!"));
});

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, products, "All products fetched successfully!"));
});

const getProductsById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    throw new ApiError(400, "Product not found!");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, product, "Product fetched by Id successfully!"));
});

const removeProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found!" });
  }

  return res
    .status(200)
    .json({ success: true, message: "Product deleted successfully!" });
});
export { createProduct, getAllProducts, getProductsById, removeProduct };

import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import uploadOnCloudinary from "../utils/uploadOnCloudinary.js";

import Product from "../models/product.model.js";

const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    price,
    category,
    subCategory,
    sizes,
    date,
    bestseller,
  } = req.body;

  if (
    [
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      date,
      bestseller,
    ].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "This field cannot be empty");
  }

  // Get uploaded file paths
  const imagesFilePath = req.files?.map((file) => file.path) || [];

  if (!imagesFilePath.length) {
    throw new ApiError(400, "Images are required!");
  }

  // Upload each image to Cloudinary
  const imageUrls = [];

  for (const file of imagesFilePath) {
    const uploadedImage = await uploadOnCloudinary(file);
    if (uploadedImage) {
      imageUrls.push(uploadedImage.secure_url);
    }
  }

  const newProduct = await Product.create({
    name,
    description,
    price,
    image: imageUrls || "",
    category,
    subCategory,
    sizes,
    bestseller: bestseller || false,
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

export { createProduct, getAllProducts };

import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import ApiResponse from "../utils/ApiResponse.js";

const addToCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { productId, size } = req.body;

  if (!productId || !size) {
    throw new ApiError(400, "Product ID and size required");
  }

  const user = await User.findById(userId);

  // Find existing item
  const existing = user.cartData.find(
    (item) => item.productId.toString() === productId && item.size === size
  );

  if (existing) {
    existing.quantity += 1;
  } else {
    user.cartData.push({ productId, size, quantity: 1 });
  }

  await user.save();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { cartData: user.cartData },
        "Cart data fetched successfully!"
      )
    );
});

const updateCartQuantity = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { productId, size, quantity } = req.body;

  const user = await User.findById(userId);

  const item = user.cartData.find(
    (item) => item.productId.toString() === productId && item.size === size
  );

  if (!item) {
    throw new ApiError("Item not found in cart");
  }

  item.quantity = quantity;
  await user.save();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { cartData: user.cartData || [] },
        "Cart updated successfully"
      )
    );
});

const removeFromCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { productId, size } = req.body;

  const user = await User.findById(userId);

  user.cartData = user.cartData.filter(
    (item) => !(item.productId.toString() === productId && item.size === size)
  );

  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, user.userData, "Removed Items from cart"));
});

const clearCart = async (req, res) => {
  const userId = req.user._id;

  const user = await User.findById(userId);
  user.cartData = [];
  await user.save();

  return res.json(new ApiResponse(200, [], "Cart cleared"));
};

const getCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const user = await User.findById(userId).populate("cartData.productId");

  return res
    .status(200)
    .json(new ApiResponse(200, user.cartData, "fetched current cart data"));
});

export { addToCart, updateCartQuantity, removeFromCart, clearCart, getCart };

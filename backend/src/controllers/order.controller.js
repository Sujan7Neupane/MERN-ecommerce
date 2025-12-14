import { Order } from "../models/order.model.js";
import { User } from "../models/user.models.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

// placing order on the basis of Cash On delivery
const placeOrder = asyncHandler(async (req, res) => {
  const { userId, items, amount, address, paymentMethod, deliveryFee } =
    req.body;

  if (!userId || !items || !amount || !address) {
    throw new ApiError(400, "Missing required fields");
  }

  // Create the order
  const order = await Order.create({
    userId,
    items,
    amount,
    address,
    paymentMethod,
    payment: paymentMethod === "cashOnDelivery" ? false : null,
    deliveryFee: deliveryFee,
    date: Date.now(),
  });

  await User.findByIdAndUpdate(userId, { cartData: [] });

  return res
    .status(200)
    .json(new ApiResponse(200, order, "Order placed successfully!"));
});

// to display the orders in admin panel
const allOrdersAdmin = asyncHandler(async (req, res) => {
  // Fetch all orders and sort by newest first
  const orders = await Order.find().sort({ date: -1 });

  if (!orders || orders.length === 0) {
    return res.status(200).json(new ApiResponse(200, [], "No orders found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, orders, "Orders fetched successfully"));
});

// to display orders in user profile
const allOrdersUser = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(401, "User not authenticated");
  }

  const orders = await Order.find({ userId }).sort({ date: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, orders, "Orders fetched successfully"));
});

// to change the status from admin panel
// only for the admin
const updateStatus = asyncHandler(async (req, res) => {
  const { orderId, status } = req.body;

  if (!orderId || !status) {
    throw new ApiError(400, "Order ID and status are required");
  }

  const allowedStatuses = ["Pending", "Ready to ship", "Shipped", "Delivered"];

  if (!allowedStatuses.includes(status)) {
    throw new ApiError(400, "Invalid status value");
  }

  const updatedOrder = await Order.findByIdAndUpdate(
    orderId,
    { status },
    { new: true }
  );

  if (!updatedOrder) {
    throw new ApiError(404, "Order not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedOrder, "Order status updated by admin"));
});

// PAYMENT GATEWAYS
// placing order on the basis of Stripe payment method
// const placeOrderEsewa = asyncHandler(async (req, res) => {});

// // placing order on the basis of Razor pay payment method
// const placeOrderfonePay = asyncHandler(async (req, res) => {});

export {
  placeOrder,
  // placeOrderEsewa,
  // placeOrderfonePay,
  allOrdersAdmin,
  allOrdersUser,
  updateStatus,
};

import React, { useEffect, useState } from "react";
import axios from "axios";
import { assets } from "../assets/admin_assets/assets.js";

axios.defaults.withCredentials = true;

const OrderPage = () => {
  const [orders, setOrders] = useState([]);

  // Fetch all orders for admin
  const fetchAllOrdersAdmin = async () => {
    try {
      const response = await axios.post(
        "/api/v1/order/adminorders",
        {},
        { withCredentials: true }
      );

      // console.log("Fetched orders:", response.data);
      setOrders(response.data.data || []);
    } catch (error) {
      // console.error("Error fetching admin orders:", error);
    }
  };

  // Update order status
  const updateStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.post(
        "/api/v1/order/status",
        { orderId, status: newStatus },
        { withCredentials: true }
      );

      // console.log(response);

      // Update UI immediately
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );

      // console.log("Status updated:", response.data);
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  useEffect(() => {
    fetchAllOrdersAdmin();
  }, []);

  return (
    <div className="w-full py-5 px-4 md:px-10">
      <h3 className="text-2xl font-bold mb-5">All Orders</h3>

      {/* Desktop Header - Adjusted grid columns */}
      <div className="hidden md:grid grid-cols-[80px_3fr_1fr_2fr_40px] items-center py-2 px-2 border border-gray-200 bg-[#e0ffed] text-sm font-medium">
        <span>Image</span>
        <span>Name</span>
        <span className="ml-7">Ordered By</span>
        <span className="ml-7">Address</span>
        <span>Status</span>
      </div>

      <div className="flex flex-col gap-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="flex flex-col md:grid md:grid-cols-[80px_3fr_1fr_2fr_90px]  gap-3 md:gap-0 items-start md:items-center py-3 px-3 border border-gray-200 rounded bg-white"
          >
            {/* Image */}
            <img
              src={order.items[0]?.image?.[0] || assets.parcel_icon}
              alt="Order item"
              className="w-20 h-20 md:w-12 md:h-12 object-cover rounded"
            />

            {/* Product Names - Now has more space */}
            <div className="w-full md:min-w-0 md:pr-4">
              {order.items.map((item, i) => (
                <p
                  key={i}
                  className="text-xs sm:text-sm line-clamp-2 wrap-break-word md:truncate"
                  title={item.name}
                >
                  <span className="font-semibold md:hidden">Name: </span>
                  {item.name} x {item.quantity}{" "}
                  <span className="font-medium">{item.size}</span>
                </p>
              ))}
            </div>

            {/* Customer - Less space */}
            <p className="text-sm md:truncate md:px-2 md:text-center text-center">
              <span className="font-semibold md:hidden">Ordered By: </span>
              {order.address.firstName} {order.address.lastName}
            </p>

            {/* Address */}
            <p className="text-xs sm:text-sm leading-tight line-clamp-2 md:truncate md:px-2">
              <span className="font-semibold md:hidden">Address: </span>
              {order.address.street}, {order.address.state},{" "}
              {order.address.country}
            </p>

            {/* Status - Less space */}
            <select
              value={order.status}
              onChange={(e) => updateStatus(order._id, e.target.value)}
              className="border rounded px-2 py-1 text-xs sm:text-sm font-medium w-[130px] md:w-full"
            >
              <option value="Pending">Pending</option>
              <option value="Ready to ship">Ready to ship</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderPage;

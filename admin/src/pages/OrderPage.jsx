import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { assets } from "../assets/admin_assets/assets.js";

const OrderPage = () => {
  const adminToken = useSelector((state) => state.admin.adminToken);
  const [orders, setOrders] = useState([]);

  const fetchAllOrdersAdmin = async () => {
    if (!adminToken) return;

    try {
      const response = await axios.post(
        "/api/v1/order/adminorders",
        {},
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      setOrders(response.data.data || []);
    } catch (error) {
      console.error("Error fetching admin orders:", error);
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.post(
        "/api/v1/order/status",
        { orderId, status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      // Update UI immediately
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );

      console.log("Updated:", response.data);
    } catch (err) {
      console.log("Error updating status:", err);
    }
  };

  useEffect(() => {
    fetchAllOrdersAdmin();
  }, [adminToken]);

  return (
    <div className="w-full py-5 px-4 md:px-10">
      <h3 className="text-2xl font-bold mb-5">All Orders</h3>

      {/* Desktop Header */}
      <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_2fr_1fr] items-center py-2 px-2 border border-gray-200 bg-[#e0ffed] text-sm font-medium">
        <span>Image</span>
        <span className="ml-2">Name</span>
        <span>Ordered By</span>
        <span>Address</span>
        <span>Status</span>
      </div>

      {/* Orders */}
      <div className="flex flex-col gap-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="flex flex-col md:grid md:grid-cols-[1fr_3fr_1fr_2fr_1fr] gap-3 md:gap-0 items-start md:items-center py-3 px-3 border border-gray-200 rounded bg-white"
          >
            {/* Image */}
            <div className="md:justify-center w-full md:w-auto">
              <img
                src={order.items[0]?.image?.[0] || assets.parcel_icon}
                alt="Order item"
                className="w-24 h-24 md:w-12 md:h-12 object-cover rounded"
              />
            </div>

            {/* Product Names */}
            <div className="flex flex-col w-full">
              {order.items.map((item, i) => (
                <p key={i} className="text-sm truncate">
                  <span className="font-semibold md:hidden">Name: </span>
                  {item.name} x {item.quantity}{" "}
                  <span className="font-medium">{item.size}</span>
                </p>
              ))}
            </div>

            {/* Customer */}
            <div className="flex items-center w-full">
              <p>
                <span className="font-semibold md:hidden">Ordered By: </span>
                {order.address.firstName} {order.address.lastName}
              </p>
            </div>

            {/* Address */}
            <div className="flex items-center w-full">
              <p className="text-sm">
                <span className="font-semibold md:hidden">Address: </span>
                {order.address.street}, {order.address.state},{" "}
                {order.address.country}, {order.address.zipCode}
              </p>
            </div>

            {/* Status Dropdown */}
            <div className="flex items-center w-full md:w-auto">
              <select
                value={order.status}
                onChange={(e) => updateStatus(order._id, e.target.value)}
                className="border rounded px-2 py-1 text-sm font-medium"
              >
                <option value="Pending">Pending</option>
                <option value="Ready to ship">Ready to ship</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderPage;

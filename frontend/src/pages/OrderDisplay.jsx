import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Title } from "../components";
import axios from "axios";

const OrderDisplay = () => {
  const { currency } = useSelector((state) => state.store);
  const { user } = useSelector((state) => state.auth);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user orders
  const fetchOrders = async () => {
    if (!user) return;

    try {
      const response = await axios.get("/api/v1/order/userorders", {
        withCredentials: true,
      });

      if (response.data.success) {
        setOrders(response.data.data); // Assuming backend returns an array of orders
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch + polling every 5 seconds
  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, [user]);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">Loading orders...</div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        You have no orders yet.
      </div>
    );
  }

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1="MY" text2="ORDERS" />
      </div>

      {orders.map((order) => (
        <div
          key={order._id}
          className="border-t border-b py-4 text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div className="flex items-start gap-6 text-sm">
            <img
              className="w-16 sm:w-20"
              src={order.items[0]?.image[0]}
              alt={order.items[0]?.name}
            />
            <div>
              <p className="sm:text-base font-medium">{order.items[0]?.name}</p>
              <div className="flex items-center gap-2 mt-2 text-base text-gray-700">
                <p className="text-lg">
                  {currency}
                  {order.items[0]?.price}
                </p>
                <p> Quantity: {order.items[0]?.quantity}</p>
                <p>Size: {order.items[0]?.size}</p>
              </div>
              <p className="mt-2">
                Date:{" "}
                <span className="text-gray-400">
                  {new Date(order.date).toLocaleDateString()}
                </span>
              </p>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <p
                className={`min-w-2 rounded-full h-2 ${
                  order.status === "Order Placed"
                    ? "bg-yellow-500"
                    : order.status === "Processing"
                    ? "bg-blue-500"
                    : order.status === "Shipped"
                    ? "bg-purple-500"
                    : order.status === "Delivered"
                    ? "bg-green-500"
                    : "bg-gray-400"
                }`}
              ></p>
              <p className="text-sm md:text-base">{order.status}</p>
            </div>

            <button
              className="border px-4 py-2 text-sm font-medium rounded-sm cursor-pointer"
              onClick={() =>
                alert(
                  order.status === "Order Placed"
                    ? `Your order has been placed. Track Order after some time.`
                    : `Your item has been ${order.status}.`
                )
              }
            >
              Track Order
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderDisplay;

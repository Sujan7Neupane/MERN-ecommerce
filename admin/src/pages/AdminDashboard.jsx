import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [recentOrders, setRecentOrders] = useState([]);

  const stats = [
    { title: "Total Revenue", value: "$28,450", change: "+12.5%", icon: "💰" },
    { title: "Active Orders", value: "142", change: "+8.2%", icon: "📦" },
    { title: "Products", value: "342", change: "+5.1%", icon: "📊" },
    { title: "Customers", value: "1,892", change: "+15.3%", icon: "👥" },
  ];

  // const recentOrders = [
  //   {
  //     id: "#ORD-001",
  //     customer: "John Doe",
  //     amount: "$245",
  //     status: "Delivered",
  //   },
  //   {
  //     id: "#ORD-002",
  //     customer: "Jane Smith",
  //     amount: "$189",
  //     status: "Processing",
  //   },
  //   {
  //     id: "#ORD-003",
  //     customer: "Robert Johnson",
  //     amount: "$342",
  //     status: "Pending",
  //   },
  //   {
  //     id: "#ORD-004",
  //     customer: "Emily Davis",
  //     amount: "$125",
  //     status: "Delivered",
  //   },
  // ];
  const fetchOrders = async () => {
    try {
      const response = await axios.post("/api/v1/order/adminorders", {
        withCredentials: true, // send cookies
      });

      console.log("Fetched orders:", response.data);
      setRecentOrders(response.data.data || []);
    } catch (error) {
      console.error("Error fetching admin orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="w-full py-5 px-10">
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
        <p className="text-gray-600 mt-2">
          Welcome to your admin dashboard. Here's what's happening today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-linear-to-br from-white to-gray-50 rounded-xl p-5 border border-gray-200 hover:shadow-lg transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stat.value}
                </p>
                <span className="text-sm text-green-600 font-medium">
                  {stat.change}
                </span>
              </div>
              <div className="text-2xl">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="mb-8 ">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
          <button
            onClick={() => navigate("/order")}
            className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
          >
            View All →
          </button>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount ($)
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {order._id.slice(0, 7)}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <p>
                        {order.address.firstName} {order.address.lastName}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.amount}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Processing"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-linear-to-r from-indigo-50 to-white p-5 rounded-xl border border-indigo-100">
          <h4 className="font-semibold text-gray-900 mb-3">Add New Product</h4>
          <p className="text-sm text-gray-600 mb-4">
            Quickly add new items to your inventory
          </p>
          <button
            onClick={() => navigate("/add")}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Add Items
          </button>
        </div>

        <div className="bg-linear-to-r from-emerald-50 to-white p-5 rounded-xl border border-emerald-100">
          <h4 className="font-semibold text-gray-900 mb-3">Manage Products</h4>
          <p className="text-sm text-gray-600 mb-4">
            View and edit your product catalog
          </p>
          <button
            onClick={() => navigate("/list")}
            className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition"
          >
            View Products
          </button>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-white p-5 rounded-xl border border-amber-100">
          <h4 className="font-semibold text-gray-900 mb-3">Order Management</h4>
          <p className="text-sm text-gray-600 mb-4">
            Process and track customer orders
          </p>
          <button
            onClick={() => navigate("/order")}
            className="w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition"
          >
            View Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

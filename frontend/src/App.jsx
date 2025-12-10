import React, { useEffect } from "react";
import { Header, Footer } from "./components";
import { Outlet } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { logout, setUser } from "./store/authSlice.js";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchCart, setCart } from "./store/cartSlice.js";

const App = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  // for faster data fetching on load
  // fetchCart fn in createSlice.js
  useEffect(() => {
    if (user) {
      dispatch(fetchCart());
    }
  }, [user, dispatch]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/v1/user/getCurrentUser", {
          withCredentials: true,
        });
        console.log("Current login user", res);

        dispatch(setUser(res.data.data)); // populate Redux
      } catch (err) {
        console.log("Not logged in");
      }
    };

    fetchUser();
  }, [dispatch]);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const res = await axios.get("/api/v1/cart/get", {
          withCredentials: true,
        });
        console.log("Cart Data:", res);

        dispatch(setCart(res.data.data));
      } catch (err) {
        console.log("User not logged in");
      }
    };

    loadCart();
  }, [dispatch]);

  return (
    <div>
      {" "}
      <div className="flex flex-col min-h-screen">
        <ToastContainer />

        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Outlet />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default App;

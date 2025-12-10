import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Title, CartTotal } from "../components";
import { assets } from "../assets/frontend_assets/assets";
import {
  updateQuantity,
  removeItemCompletely,
  setBackendCart,
} from "../store/cartSlice.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currency } = useSelector((state) => state.store);
  const cartData = useSelector((state) => state.cart.cartData || []);
  const [loading, setLoading] = useState(true);

  // const [cartData, setCartData] = useState([]);

  // Fetch backend cart
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get("/api/v1/cart/get", {
          withCredentials: true,
        });

        const backendCart = Array.isArray(response.data?.data?.cartData)
          ? response.data.data.cartData
          : [];
        dispatch(setBackendCart(backendCart));
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, [dispatch]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-6">
        <Title text1="CART" text2="INFORMATION" />
      </div>
      {/* CART ITEMS */}
      <div className="mb-8">
        {loading ? (
          <p className="text-center py-10 text-gray-500">Loading cart...</p>
        ) : Array.isArray(cartData) && cartData.length > 0 ? (
          cartData.map((item) => {
            const product = item.productId; // full product object
            if (!product) return null;

            return (
              <div
                key={item._id}
                className="py-4 border-t border-b grid grid-cols-[4fr_2fr_1fr] items-center gap-4"
              >
                {/* Product Info */}
                <div className="flex gap-4">
                  <img
                    className="w-20 h-20 object-cover rounded"
                    src={product.image[0]}
                    alt={product.name}
                  />
                  <div>
                    <p className="text-lg font-medium">{product.name}</p>
                    <div className="flex gap-4 mt-1">
                      <p>
                        {currency}
                        {product.price}
                      </p>
                      <p className="text-sm border px-2 py-1 rounded bg-slate-100">
                        {item.size}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quantity */}
                <div className="flex justify-center">
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    className="border w-16 px-2 py-1 text-center rounded"
                    onChange={(e) => {
                      const qty = Number(e.target.value);
                      if (qty < 1) return;
                      dispatch(
                        updateQuantity({
                          productId: product._id,
                          size: item.size,
                          quantity: qty,
                        })
                      );
                    }}
                  />
                </div>

                {/* Delete */}
                <div className="flex justify-end">
                  <img
                    className="w-4 cursor-pointer"
                    src={assets.bin_icon}
                    alt="Delete"
                    onClick={() =>
                      dispatch(
                        removeItemCompletely({
                          productId: product._id,
                          size: item.size,
                        })
                      )
                    }
                  />
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500 py-10">Your cart is empty.</p>
        )}
      </div>

      {/* TOTAL SECTION */}
      <div className="flex justify-center my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />

          <div className="w-full text-end">
            <button
              onClick={() => navigate("/place-order")}
              className="bg-black text-white text-sm my-8 px-8 py-3 cursor-pointer"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

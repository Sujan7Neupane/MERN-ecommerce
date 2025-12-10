import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Title, CartTotal } from "../components";
import { assets } from "../assets/frontend_assets/assets";
import { fetchCart, updateQuantity } from "../store/cartSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currency } = useSelector((state) => state.store);
  const cartData = useSelector((state) => state.cart.cartData || []);
  const { user } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Fetch cart once user is available
  useEffect(() => {
    if (user) {
      dispatch(fetchCart()).finally(() => setLoading(false));
    }
  }, [user, dispatch]);

  // Handle quantity changes (Optimized)
  const handleQuantityChange = async (productId, size, quantity) => {
    if (quantity < 1 || quantity > 99) return;

    // Update instantly on UI
    dispatch(updateQuantity({ productId, size, quantity }));

    setUpdating(true);

    try {
      await axios.patch(
        "/api/v1/cart/update",
        { productId, size, quantity },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Failed to update quantity:", error);

      // If update fails → re-sync cart
      dispatch(fetchCart());
    } finally {
      setUpdating(false);
    }
  };

  // Handle item deletion
  const handleRemoveItem = async (productId, size) => {
    setUpdating(true);

    // Remove instantly from UI
    dispatch(updateQuantity({ productId, size, quantity: 0 }));

    try {
      await axios.delete("/api/v1/cart/remove", {
        data: { productId, size },
        withCredentials: true,
      });
    } catch (error) {
      console.error("Failed to remove item:", error);
      dispatch(fetchCart());
    } finally {
      setUpdating(false);
    }
  };

  const isCartEmpty = cartData.length === 0;

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-6">
        <Title text1="CART" text2="INFORMATION" />
      </div>

      <div className="mb-8">
        {loading ? (
          <div className="text-center py-10">
            <p className="text-gray-500">Loading cart...</p>
          </div>
        ) : isCartEmpty ? (
          <div className="text-center py-10">
            <p className="text-gray-500">Your cart is empty.</p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 bg-black text-white px-6 py-2 rounded cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          cartData.map((item) => {
            const product = item.productId;
            if (!product) return null;

            const itemKey = `${product._id}-${item.size}`;
            const currentQuantity = item.quantity;

            return (
              <div
                key={itemKey}
                className="py-4 border-t border-b mb-4 border-slate-300 grid grid-cols-[4fr_2fr_1fr] items-center gap-4 hover:bg-slate-50 transition-colors duration-300 cursor-pointer"
              >
                {/* Product Info */}
                <div className="flex gap-4">
                  <img
                    className="w-20 h-20 object-cover rounded"
                    src={product.image?.[0] || assets.placeholder}
                    alt={product.name}
                  />
                  <div>
                    <p className="text-lg font-medium">{product.name}</p>
                    <div className="flex gap-4 mt-1">
                      <p>
                        {currency}
                        {product.price}
                      </p>
                      <p className="text-sm px-2 py-1 rounded bg-slate-100">
                        Size: {item.size}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quantity */}
                <div className="flex justify-center items-center">
                  <div className="flex items-center">
                    <button
                      onClick={() =>
                        handleQuantityChange(
                          product._id,
                          item.size,
                          currentQuantity - 1
                        )
                      }
                      disabled={currentQuantity <= 1 || updating}
                      className="px-3 py-1 border rounded-l disabled:opacity-50 cursor-pointer"
                    >
                      -
                    </button>

                    <input
                      type="number"
                      min="1"
                      max="99"
                      value={currentQuantity}
                      disabled={updating}
                      onChange={(e) =>
                        handleQuantityChange(
                          product._id,
                          item.size,
                          parseInt(e.target.value) || 1
                        )
                      }
                      className="px-3 py-1 border disabled:opacity-50 cursor-pointer"
                    />

                    <button
                      onClick={() =>
                        handleQuantityChange(
                          product._id,
                          item.size,
                          currentQuantity + 1
                        )
                      }
                      disabled={currentQuantity >= 99 || updating}
                      className="px-3 py-1 border rounded-r disabled:opacity-50 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Delete */}
                <div className="flex justify-end">
                  <button
                    onClick={() => handleRemoveItem(product._id, item.size)}
                    disabled={updating}
                    className="p-2 hover:bg-gray-100 rounded disabled:opacity-50 cursor-pointer"
                  >
                    <img className="w-4 h-4" src={assets.bin_icon} alt="" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {!loading && !isCartEmpty && (
        <div className="flex justify-center my-20">
          <div className="w-full sm:w-[450px]">
            <CartTotal />
            <div className="w-full text-end">
              <button
                onClick={() => navigate("/place-order")}
                disabled={updating}
                className="bg-black text-white text-sm my-8 px-8 py-3 rounded hover:bg-gray-800 disabled:bg-gray-400 cursor-pointer"
              >
                {updating ? "PROCESSING..." : "PROCEED TO CHECKOUT"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

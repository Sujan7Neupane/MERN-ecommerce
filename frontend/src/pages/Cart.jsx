import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Title, CartTotal } from "../components";
import { assets } from "../assets/frontend_assets/assets";
import { fetchCart, updateQuantity } from "../store/cartSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currency, delivery_fee } = useSelector(
    (state) => state.store,
    shallowEqual
  );
  const cartData = useSelector(
    (state) => state.cart.cartData || [],
    shallowEqual
  );
  const { user } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Fetch cart whenever user changes or on mount
  useEffect(() => {
    if (user) {
      setLoading(true);
      dispatch(fetchCart()).finally(() => setLoading(false));
    }
  }, [user, dispatch]);

  const handleQuantityChange = async (productId, size, quantity) => {
    if (quantity < 1 || quantity > 99) return;

    // Optimistically update Redux state
    dispatch(updateQuantity({ productId, size, quantity }));

    setUpdating(true);
    try {
      await axios.patch(
        "/api/v1/cart/update",
        { productId, size, quantity },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Quantity update failed:", error);
      dispatch(fetchCart()); // rollback if failed
    } finally {
      setUpdating(false);
    }
  };

  const handleRemoveItem = async (productId, size) => {
    setUpdating(true);
    dispatch(updateQuantity({ productId, size, quantity: 0 }));

    try {
      await axios.delete("/api/v1/cart/remove", {
        data: { productId, size },
        withCredentials: true,
      });
    } catch (error) {
      console.error("Remove item failed:", error);
      dispatch(fetchCart());
    } finally {
      setUpdating(false);
    }
  };

  const isCartEmpty = !cartData.length;

  return (
    <div className="border-t pt-10 sm:pt-14">
      <div className="text-xl sm:text-2xl mb-6">
        <Title text1="CART" text2="INFORMATION" />
      </div>

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
        <>
          {/* Cart Items */}
          <div className="mb-8">
            {cartData.map((item) => {
              const product = item.productId;
              const productId =
                typeof product === "object" ? product._id : product;

              const itemKey = `${productId}-${item.size}`;
              const currentQuantity = item.quantity;

              return (
                <div
                  key={itemKey}
                  className="border-t border-b border-slate-300 mb-4 p-4
              flex flex-col gap-4
              sm:grid sm:grid-cols-[4fr_2fr_1fr] sm:items-center sm:gap-4
              hover:bg-slate-50 transition"
                >
                  {/* Product Info */}
                  <div className="flex gap-4">
                    <img
                      className="w-20 h-20 object-cover rounded"
                      src={product.image?.[0] || assets.placeholder}
                      alt={product.name}
                    />
                    <div className="flex flex-col justify-between">
                      <p className="text-base sm:text-lg font-medium">
                        {product.name}
                      </p>
                      <div className="flex flex-wrap gap-3 mt-1 text-sm">
                        <p>
                          {currency} {product.price}
                        </p>
                        <p className="px-2 py-0.5 rounded bg-slate-100">
                          Size: {item.size}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="flex justify-start sm:justify-center">
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
                        className="px-3 py-1 border rounded-l disabled:opacity-50"
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
                        className="w-12 text-center px-2 py-1 border disabled:opacity-50"
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
                        className="px-3 py-1 border rounded-r disabled:opacity-50"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Delete */}
                  <div className="flex justify-end sm:justify-end">
                    <button
                      onClick={() => handleRemoveItem(product._id, item.size)}
                      disabled={updating}
                      className="p-2 hover:bg-gray-100 rounded disabled:opacity-50"
                    >
                      <img
                        className="w-4 h-4"
                        src={assets.bin_icon}
                        alt="Delete"
                      />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cart Total & Checkout */}
          <div className="flex justify-center my-14 sm:my-20 px-4 sm:px-0">
            <div className="w-full sm:w-[450px]">
              <CartTotal />
              <div className="w-full text-end">
                <button
                  onClick={() => navigate("/place-order")}
                  disabled={updating}
                  className="bg-black text-white text-sm my-8 px-8 py-3 rounded
              hover:bg-gray-800 disabled:bg-gray-400 w-full sm:w-auto"
                >
                  {updating ? "PROCESSING..." : "PROCEED TO CHECKOUT"}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

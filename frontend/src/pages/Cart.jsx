import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Title, CartTotal } from "../components/index";
import { assets } from "../assets/frontend_assets/assets";
import { updateQuantity, removeItemCompletely } from "../store/cartSlice";
import { useNavigate } from "react-router";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, currency } = useSelector((state) => state.store);
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    localStorage.setItem("cartData", JSON.stringify(cartItems));
  }, [cartItems, navigate, dispatch]);

  const cartData = [];

  // Loop through each product in cartItems
  for (const productId in cartItems) {
    const sizes = cartItems[productId];

    // Loop through each size for that product
    for (const size in sizes) {
      const quantity = sizes[size];
      cartData.push({ _id: productId, size, quantity });
    }
  }

  console.log(cartData, "Yeslai backend bata lyaune");
  // But complex for now

  return (
    <div className="borer-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"CART"} text2={"INFORMATION"} />
      </div>

      {/* products information */}
      <div>
        {cartData.map((item, i) => {
          const productData = products.find(
            (product) => product._id === item._id
          );
          if (!productData) return null;
          return (
            <div
              key={i}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img
                  className="w-16 sm:w-20"
                  src={productData.image[0]}
                  alt=""
                />
                <div>
                  <p className="text-xs sm:text-lg font-medium">
                    {productData.name}
                  </p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>
                      {currency}
                      {productData.price}
                    </p>
                    <p className="px-2 sm:px-3 sm:py-1 border-gray-900 bg-slate-100">
                      {item.size}
                    </p>
                  </div>
                </div>
              </div>
              <input
                onChange={(e) => {
                  const qty = Number(e.target.value);
                  dispatch(
                    updateQuantity({
                      productId: item._id,
                      size: item.size,
                      quantity: qty,
                    })
                  );
                }}
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                type="number"
                min={1}
                defaultValue={item.quantity}
              />
              <img
                onClick={() =>
                  dispatch(
                    removeItemCompletely({
                      productId: item._id,
                      size: item.size,
                    })
                  )
                }
                className="w-4 mr-4 sm:w-5 cursor-pointer"
                src={assets.bin_icon}
                alt=""
              />
            </div>
          );
        })}
      </div>

      {/* total amount section */}
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

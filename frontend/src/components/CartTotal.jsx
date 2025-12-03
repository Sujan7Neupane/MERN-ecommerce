import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Title } from "./index";

const CartTotal = () => {
  const { products, currency, delivery_fee } = useSelector(
    (state) => state.store
  );

  const cartItems = useSelector((state) => state.cart.cartItems);

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    let total = 0;

    // Loop through each product in cartItems
    for (const productId in cartItems) {
      const product = products.find((p) => p._id === productId);
      if (!product) continue;

      const sizes = cartItems[productId];

      // Loop through each size for that product
      for (const size in sizes) {
        total += product.price * sizes[size];
      }
    }

    setTotalAmount(total);
  }, [cartItems, products]); // Recalculate whenever cart or products change

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={"CART"} text2={"TOTALS"} />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>
            {currency} {totalAmount}.00
          </p>
        </div>

        <hr />

        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>
            {currency} {delivery_fee}.00
          </p>
        </div>

        <hr />

        <div className="flex justify-between">
          <b>Total</b>
          <b>
            {currency} {totalAmount + delivery_fee}.00
          </b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;

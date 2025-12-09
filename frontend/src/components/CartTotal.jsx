import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Title } from "./index";

const CartTotal = () => {
  const { currency, delivery_fee } = useSelector((state) => state.store);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    let total = 0;

    for (const productId in cartItems) {
      const item = cartItems[productId]; // full item including price
      const sizes = item.sizes; // sizes object

      for (const size in sizes) {
        total += item.price * sizes[size]; // price × quantity
      }
    }

    setTotalAmount(total);
  }, [cartItems]);

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

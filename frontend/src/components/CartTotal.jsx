import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Title } from "../components/index.js";

const CartTotal = () => {
  const { currency, delivery_fee } = useSelector((state) => state.store);
  const { cartData } = useSelector((state) => state.cart);

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    let total = 0;

    if (Array.isArray(cartData)) {
      cartData.forEach((item) => {
        const product = item.productId; // full product object
        if (!product) return;

        total += product.price * item.quantity;
      });
    }

    setTotalAmount(total);
  }, [cartData]);

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

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Title } from "./index";

const CartTotal = () => {
  const { currency, delivery_fee, products } = useSelector(
    (state) => state.store
  );
  const cartItems = useSelector((state) => state.cart.cartItems);

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    let total = 0;

    // Loop through cart items
    for (const productId in cartItems) {
      const sizes = cartItems[productId]; // { S: 2, M: 1 }
      const productData = products.find((p) => p._id === productId);

      if (!productData) continue; // skip if product not found

      for (const size in sizes) {
        const quantity = sizes[size];
        total += productData.price * quantity; // price × quantity
      }
    }

    setTotalAmount(total);
  }, [cartItems, products]);

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

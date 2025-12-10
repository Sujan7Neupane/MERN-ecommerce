import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { Title } from "../components";

const CartTotal = () => {
  const { currency, delivery_fee } = useSelector((state) => state.store);
  const { cartData } = useSelector((state) => state.cart);

  // Calculate totals reactively using useMemo
  const subtotal = useMemo(() => {
    if (!Array.isArray(cartData)) return 0;

    return cartData.reduce((sum, item) => {
      const product = item.productId;
      if (!product) return sum;

      const price = Number(product.price) || 0;
      const quantity = Number(item.quantity) || 0;

      return sum + price * quantity;
    }, 0);
  }, [cartData]);

  const total = subtotal + Number(delivery_fee || 0);

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1="CART" text2="TOTALS" />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>
            {currency} {subtotal}
          </p>
        </div>

        <hr />

        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>
            {currency} {delivery_fee}
          </p>
        </div>

        <hr />

        <div className="flex justify-between">
          <b>Total</b>
          <b>
            {currency} {total}
          </b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;

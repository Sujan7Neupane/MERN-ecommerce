import React, { useMemo } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { Title } from "../components";

const CartTotal = () => {
  // Grab store and cartData from Redux
  const { currency, delivery_fee } = useSelector(
    (state) => state.store,
    shallowEqual
  );
  const cartData =
    useSelector((state) => state.cart.cartData, shallowEqual) || [];

  // Debug: check if component is rendering
  // console.log("CartTotal rendered, cartData:", cartData);

  // Compute subtotal using useMemo
  const subtotal = useMemo(() => {
    if (!cartData.length) return 0;

    return cartData.reduce((sum, item) => {
      const product = item.productId;
      if (!product) return sum;

      const price = Number(product.price) || 0;
      const quantity = Number(item.quantity) || 0;

      return sum + price * quantity;
    }, 0);
  }, [cartData]);

  // Total including delivery fee
  const total = useMemo(
    () => subtotal + Number(delivery_fee || 0),
    [subtotal, delivery_fee]
  );

  return (
    <div className="w-full p-4 border rounded-md shadow-sm bg-white">
      <div className="text-2xl mb-4">
        <Title text1="CART" text2="TOTALS" />
      </div>

      <div className="flex flex-col gap-2 text-sm">
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
            {currency} {delivery_fee || 0}
          </p>
        </div>

        <hr />

        <div className="flex justify-between font-bold">
          <p>Total</p>
          <p>
            {currency} {total}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;

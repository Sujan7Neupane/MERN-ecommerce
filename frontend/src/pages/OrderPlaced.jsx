import React, { useState } from "react";
import { CartTotal, Title } from "../components";
import { assets } from "../assets/frontend_assets/assets";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setBackendCart } from "../store/cartSlice";
import { toast } from "react-toastify";

import axios from "axios";

const OrderPlaced = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Payment method
  const [method, setMethod] = useState("cashOnDelivery");

  // Redux data
  const { user } = useSelector((state) => state.auth);
  const cartData = useSelector((state) => state.cart.cartData || []);
  const { delivery_fee } = useSelector((state) => state.store);

  // Form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onFormSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const orderItems = cartData.map((item) => ({
        productId: item.productId._id || item.productId,
        name: item.productId.name,
        price: item.productId.price,
        image: item.productId.image,
        size: item.size,
        quantity: item.quantity,
      }));

      // Validate orderItems
      if (orderItems.length === 0) {
        toast.error("Your cart is empty");
        return;
      }

      const amount = orderItems.reduce(
        (sum, item) => sum + (item.price || 0) * item.quantity,
        0
      );

      const orderPayload = {
        userId: user?._id,
        items: orderItems,
        amount,
        address: formData,
        paymentMethod: method,
        deliveryFee: delivery_fee || 0,
      };

      console.log("FINAL ORDER PAYLOAD:", orderPayload);

      const response = await axios.post("/api/v1/order/place", orderPayload);

      if (response.data.success) {
        dispatch(setBackendCart({}));
        toast.success("Order placed successfully!");
        navigate("/orders");
      } else {
        toast.error("Error placing orders");
      }
    } catch (error) {
      console.log("Order placement error:", error);
      toast.error("Failed to place order");
    }
  };

  return (
    <form
      onSubmit={onFormSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* LEFT SIDE - DELIVERY INFO */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1="DELIVERY" text2="DETAILS" />
        </div>

        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="First Name"
            required
          />
          <input
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Last Name"
            required
          />
        </div>

        <input
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="email"
          placeholder="Email"
          required
        />

        <input
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Street"
          required
        />

        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="City"
            required
          />
          <input
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="State"
            required
          />
        </div>

        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="zipCode"
            value={formData.zipCode}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="number"
            placeholder="Zip Code"
            required
          />
          <input
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Country"
            required
          />
        </div>

        <input
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="number"
          placeholder="Phone"
          required
        />
      </div>

      {/* RIGHT SIDE - PAYMENT & ORDER */}
      <div className="mt-8 min-w-80">
        <CartTotal />

        <div className="mt-12">
          <Title text1="PAYMENT" text2="METHOD" />

          <div className="flex gap-3 flex-col lg:flex-row">
            {/* ESewa */}
            <div
              onClick={() => setMethod("esewa")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "esewa" ? "bg-green-500" : ""
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.esewa_logo} alt="esewa" />
            </div>

            {/* Fonepay */}
            <div
              onClick={() => setMethod("fonepay")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "fonepay" ? "bg-green-500" : ""
                }`}
              ></p>
              <img
                className="h-5 mx-4"
                src={assets.fonepay_logo}
                alt="fonepay"
              />
            </div>

            {/* COD */}
            <div
              onClick={() => setMethod("cashOnDelivery")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cashOnDelivery" ? "bg-green-500" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-black text-white px-16 py-3 text-sm cursor-pointer"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default OrderPlaced;

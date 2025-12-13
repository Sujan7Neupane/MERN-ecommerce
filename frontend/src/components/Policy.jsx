import React from "react";
import { assets } from "../assets/frontend_assets/assets";
import { Title } from "../components/index.js";

const Policy = () => {
  return (
    <div className="py-20">
      <div className="w-full flex justify-center items-center text-3xl mb-8">
        <Title text1={"EXCHANGE"} text2={"POLICY"} />
      </div>
      <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center text-xs sm:text-sm md:text-base text-gray-700">
        <div>
          <img src={assets.exchange_icon} className="w-12 m-auto mb-5" alt="" />
          <p className="font-semibold">Hassle-free Exchange Policy</p>
          <p className="text-gray-400">
            Enjoy a smooth and simple exchange process.
          </p>
        </div>
        <div>
          <img src={assets.return_icon} className="w-12 m-auto mb-5" alt="" />
          <p className="font-semibold">7-Day Easy Return</p>
          <p className="text-gray-400">
            We provide a convenient and quick return service.
          </p>
        </div>
        <div>
          <img
            src={assets.customer_support_img}
            className="w-12 m-auto mb-5"
            alt=""
          />
          <p className="font-semibold">Dedicated Customer Support</p>
          <p className="text-gray-400">
            We’re always here to assist you with your needs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Policy;

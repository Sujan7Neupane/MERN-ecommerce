import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const Policy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
      <div>
        <img src={assets.exchange_icon} className="w-12 m-auto mb-5" alt="" />
        <p className="font-semibold">Hassle-free Exchange Policy</p>
        <p className="text-gray-400">
          Enjoy a smooth and simple exchange process.
        </p>
      </div>
      <div>
        <img src={assets.quality_icon} className="w-12 m-auto mb-5" alt="" />
        <p className="font-semibold">7-Day Easy Return</p>
        <p className="text-gray-400">
          We provide a convenient and quick return service.
        </p>
      </div>
      <div>
        <img src={assets.support_img} className="w-12 m-auto mb-5" alt="" />
        <p className="font-semibold">Dedicated Customer Support</p>
        <p className="text-gray-400">
          We’re always here to assist you with your needs.
        </p>
      </div>
    </div>
  );
};

export default Policy;

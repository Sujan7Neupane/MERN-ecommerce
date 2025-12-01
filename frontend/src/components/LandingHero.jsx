import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const LandingHero = () => {
  return (
    <div className="flex flex-col sm:flex-row border border-gray-400 ">
      {/* Left side of hero section */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className="text-[#414141]">
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 h-0.5 bg-[#414141]"></p>
            <p className="font-medium text-sm md:text-base">OUR TOP SELLERS</p>
          </div>
          <h1 className="text-3xl sm:py-3 lg:text-5xl leading-relaxed playwrite-us-trad-guides-regular">
            Recent Arrivals
          </h1>
          <div className="flex items-center gap-2 mt-4">
            <p className="font-medium text-sm md:text-base">SHOP NOW</p>
            <p className="w-8 md:w-11 h-0.5 bg-[#414141]"></p>
          </div>
        </div>
      </div>

      {/* Right side of Landing hero */}
      <img className="w-full sm:w-1/2" src={assets.heroImage2} alt="" />
    </div>
  );
};

export default LandingHero;

import React from "react";
import { NewsLetter, Title } from "../components";
import { assets } from "../assets/frontend_assets/assets";

const Contact = () => {
  return (
    <div>
      {/* Title of the page */}
      <div className="text-center text-2xl border-t pt-10">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          className="w-full md:max-w-[480px]"
          src={assets.contact_img}
          alt=""
        />

        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold  text-xl text-gray-400">Our Store</p>
          <p className="text-gray-500">
            1500 Jane St, Toronto, <br /> ON M9N 1B7, Canada
          </p>
          <p className="text-gray-500">
            Tel: (647) 641- 6628 <br /> Email: admin@ourstore@gmail.com
          </p>
          <p className="font-semibold text-xl to-gray-600">
            {" "}
            Careers at Buyee Online{" "}
          </p>
          <p className="text-gray-500">Learn more about us and job openings</p>
          <button className="text-black border border-black text-sm px-8 py-4 hover:text-white  hover:bg-black transition-all duration-500 cursor-pointer">
            Explore More..
          </button>
        </div>
      </div>
      <NewsLetter />
    </div>
  );
};

export default Contact;

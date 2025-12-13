import React from "react";
import { NewsLetter, Title } from "../components";
import { assets } from "../assets/frontend_assets/assets";
import { Link } from "react-router";

const Contact = () => {
  return (
    <div className="bg-white">
      {/* Page Header */}
      <div className="text-center text-3xl border-t pt-12">
        <Title text1={"CONTACT"} text2={"US"} />
        <p className="mt-3 text-gray-500 text-sm max-w-xl mx-auto">
          We’d love to hear from you. Whether it’s feedback, support, or career
          opportunities — reach out anytime.
        </p>
      </div>

      {/* Main Content */}
      <div className="my-14 flex flex-col lg:flex-row items-center justify-center gap-14 px-6 max-w-6xl mx-auto mb-32">
        {/* Image Section */}
        <div className="relative">
          <img
            className="w-full max-w-md rounded-xl shadow-lg"
            src={assets.contact_img}
            alt="Contact"
          />
          <div className="absolute -bottom-4 -right-4 bg-black text-white text-xs px-4 py-2 rounded-md">
            <Link
              to="https://www.google.com/maps/place/York+Mills,+North+York,+ON,+Canada"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Visit Our Store
            </Link>
          </div>
        </div>

        {/* Text Content */}
        <div className="flex flex-col gap-6 max-w-md">
          <div>
            <p className="uppercase tracking-widest text-sm text-gray-400">
              Our Store
            </p>
            <p className="mt-2 text-gray-600 leading-relaxed">
              1500 Jane St, Toronto, <br /> ON M9N 1B7, Canada
            </p>
          </div>

          <div>
            <p className="text-gray-600 leading-relaxed">
              Tel: (647) 641-6628 <br />
              Email: admin@ourstore@gmail.com
            </p>
          </div>

          <div className="pt-4 border-t">
            <p className="font-semibold text-lg text-gray-700">
              Careers at Buyee Online
            </p>
            <p className="text-gray-500 text-sm mt-1">
              Learn more about us and explore exciting job opportunities.
            </p>
          </div>

          <button className="mt-4 w-fit border border-black px-8 py-3 text-sm font-medium text-black hover:bg-black hover:text-white transition-all duration-300">
            Explore More
          </button>
        </div>
      </div>

      {/* Newsletter */}
      <NewsLetter />
    </div>
  );
};

export default Contact;

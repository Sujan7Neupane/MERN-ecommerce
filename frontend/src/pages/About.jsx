import React from "react";
import { Title, NewsLetter } from "../components";
import { assets } from "../assets/frontend_assets/assets";

const About = () => {
  return (
    <div className="bg-white">
      {/* Page Title */}
      <div className="text-2xl text-center pt-10 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
        <p className="mt-3 text-sm text-gray-500 max-w-2xl mx-auto">
          Learn more about who we are, what we stand for, and why customers
          trust us.
        </p>
      </div>

      {/* About Section */}
      <div className="my-16 flex flex-col lg:flex-row items-center gap-16 px-6 max-w-6xl mx-auto">
        {/* Image */}
        <div className="relative">
          <img
            className="w-full max-w-xs md:max-w-sm rounded-xl shadow-lg"
            src={assets.about_img}
            alt="About us"
          />
          <div className="absolute -bottom-4 -left-4 bg-black text-white text-xs px-4 py-2 rounded-md">
            Since Day One
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center gap-6 lg:w-1/2 text-gray-600 leading-relaxed">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
            dolorum, in libero nam quaerat suscipit a quisquam optio voluptatem.
            Numquam. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Ratione, suscipit.
          </p>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem
            voluptatum ipsam sit natus repudiandae, dignissimos officia deserunt
            ducimus sapiente hic! Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Similique, officiis!
          </p>

          <div className="pt-4 border-t">
            <b className="text-gray-800 text-lg">Our Mission</b>
            <p className="mt-2">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis
              enim deleniti et a earum illum eveniet iste obcaecati eligendi
              facilis?
            </p>
          </div>
        </div>
      </div>

      {/* Why Us Section */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-xl py-6 text-center">
          <Title text1={"WHY"} text2={"US?"} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          <div className="border rounded-xl px-10 py-12 flex flex-col gap-4 hover:shadow-md transition">
            <b className="text-gray-800">Convenience</b>
            <p className="text-gray-600 text-sm leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
              recusandae esse optio voluptates deserunt minus.
            </p>
          </div>

          <div className="border rounded-xl px-10 py-12 flex flex-col gap-4 hover:shadow-md transition">
            <b className="text-gray-800">Exceptional Customer Service</b>
            <p className="text-gray-600 text-sm leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
              recusandae esse optio voluptates deserunt minus.
            </p>
          </div>

          <div className="border rounded-xl px-10 py-12 flex flex-col gap-4 hover:shadow-md transition">
            <b className="text-gray-800">Quality Assurance</b>
            <p className="text-gray-600 text-sm leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
              recusandae esse optio voluptates deserunt minus.
            </p>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <NewsLetter />
    </div>
  );
};

export default About;

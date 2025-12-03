import React from "react";
import { Title, NewsLetter } from "../components";
import { assets } from "../assets/frontend_assets/assets";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        {/* image section */}
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt=""
        />

        {/* First section */}
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
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
          <b className="text-gray-800">Our Mission</b>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis enim
            deleniti et a earum illum eveniet iste obcaecati eligendi facilis?
          </p>
        </div>
      </div>
      {/* Another section */}
      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"US?"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
            recusandae esse optio voluptates deserunt minus.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
            recusandae esse optio voluptates deserunt minus.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
            recusandae esse optio voluptates deserunt minus.
          </p>
        </div>
      </div>
      {/* Newsletter section  */}
      <NewsLetter />
    </div>
  );
};

export default About;

import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-gray-400 py-10 mt-16">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand + About */}
        <div>
          <h2 className="text-2xl text-gray-700 font-semibold mb-3">
            MyEcommerceStore
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Your one-stop shop for quality products. Built with React and
            Tailwind, this app is where I practice, learn, and create a smooth
            shopping experience.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg text-gray-700 font-semibold mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/"
                className="cursor-pointer text-gray-800 hover:text-gray-500 border-b-2 border-transparent hover:border-gray-500 transition-all duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="cursor-pointer text-gray-800 hover:text-gray-500 border-b-2 border-transparent hover:border-gray-500 transition-all duration-300"
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="cursor-pointer text-gray-800 hover:text-gray-500 border-b-2 border-transparent hover:border-gray-500 transition-all duration-300"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="cursor-pointer text-gray-800 hover:text-gray-500 border-b-2 border-transparent hover:border-gray-500 transition-all duration-300"
              >
                Delivery
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="cursor-pointer text-gray-800 hover:text-gray-500 border-b-2 border-transparent hover:border-gray-500 transition-all duration-300"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Contact</h3>
          <p className="text-gray-400 text-sm">Email: hello@myecommerce.com</p>
          <p className="text-gray-400 text-sm">Phone: +977 9800000000</p>
          <p className="text-gray-400 text-sm">Location: Kathmandu, Nepal</p>
        </div>
      </div>

      {/* Bottom line */}

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500 text-sm">
        <p className="py-3 text-center">
          © {new Date().getFullYear()} My Ecommerce Website. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

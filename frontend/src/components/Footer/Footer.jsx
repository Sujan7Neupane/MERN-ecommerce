import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-300 mt-20">
      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            NexBuy Ecommerce Store
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
            Your one-stop shop for quality products. Built with React and
            Tailwind, this app is where I practice, learn, and create a smooth
            shopping experience.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm">
            {[
              { name: "Home", path: "/" },
              { name: "Projects", path: "#" },
              { name: "About", path: "/about" },
              { name: "Delivery", path: "#" },
              { name: "Privacy Policy", path: "#" },
            ].map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className="inline-block text-gray-700 border-b-2 border-transparent hover:border-gray-700 transition-all duration-300"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact</h3>
          <div className="space-y-2 text-sm text-gray-500">
            <p>Email: hello@myecommerce.com</p>
            <p>Phone: +977 9800000000</p>
            <p>Location: Kathmandu, Nepal</p>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-300 py-5 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} NexBuy Ecommerce Store. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;

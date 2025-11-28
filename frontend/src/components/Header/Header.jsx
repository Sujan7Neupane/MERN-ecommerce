import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { assets } from "../../assets/frontend_assets/assets";
import Container from "../Container";

const Header = () => {
  const navigate = useNavigate();

  // for the mobile menu view
  const [visibility, setVisibility] = useState(false);

  // Profile drop down open on click otherwise it was on hover
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  const navItems = [
    {
      name: "Home",
      path: "/",
      active: true,
    },
    {
      name: "Collection",
      path: "/collection",
      active: true,
    },
    {
      name: "About",
      path: "/about",
      active: true,
    },
    {
      name: "Contact",
      path: "/contact",
      active: true,
    },
  ];
  return (
    <div>
      <Container>
        <div className="flex items-center justify-between w-full p-4 bg-gray-100">
          {/* Logo */}
          <img src={assets.logo} alt="Logo" className="w-36 cursor-pointer" />

          {/* Navigation Links */}
          <ul className="hidden sm:flex gap-6 text-sm text-gray-700">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      className="relative font-medium cursor-pointer text-gray-700 hover:text-blue-500 border-b-2 border-transparent hover:border-blue-500 transition-all duration-200"
                      onClick={() => navigate(item.path)}
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
          </ul>

          {/* Right Side Icons */}
          <div className="flex items-center gap-6">
            {/* Search Icon */}
            <img
              src={assets.search_icon}
              alt="Search"
              className="w-5 cursor-pointer"
            />

            {/* Profile Dropdown */}
            <div className="relative">
              {/* Invisible backdrop when menu is open */}
              {isProfileOpen && (
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => toggleProfile(false)}
                />
              )}

              {/* Profile Icon */}
              <img
                onClick={() => toggleProfile(!isProfileOpen)}
                src={assets.profile_icon}
                alt="Profile"
                className="w-5 cursor-pointer relative z-20"
              />

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 min-w-[140px] bg-white shadow-lg rounded p-3 flex flex-col gap-2 text-gray-600 z-30">
                  <p className="cursor-pointer hover:text-black">My Profile</p>
                  <p className="cursor-pointer hover:text-black">Orders</p>
                  <p className="cursor-pointer hover:text-black">Logout</p>
                </div>
              )}
            </div>

            {/* Cart */}
            <Link to="/cart" className="relative">
              <img src={assets.cart_icon} alt="Cart" className="w-5" />
              <span className="absolute -right-1 -bottom-1 w-4 h-4 text-[8px] text-white bg-black rounded-full flex items-center justify-center">
                10
              </span>
            </Link>

            {/* Mobile Menu Icon */}
            <img
              onClick={() => setVisibility(true)}
              src={assets.menu_icon}
              alt="Menu"
              className="w-5 cursor-pointer sm:hidden"
            />
          </div>

          {/* sidebar for the mobile devices */}
          <div
            className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
              visibility ? "w-full" : "w-0"
            }`}
          >
            <div className="flex flex-col text-gray-600">
              <div
                onClick={() => setVisibility(false)}
                className="flex items-center gap-4 p-3 cursor-pointer"
              >
                <img
                  className="h-4 rotate-180"
                  src={assets.dropdown_icon}
                  alt=""
                />
                <p className="">Back</p>
              </div>

              <NavLink
                onClick={() => setVisibility(false)}
                className="py-2 pl-6 border"
                to="/"
              >
                Home
              </NavLink>
              <NavLink
                onClick={() => setVisibility(false)}
                className="py-2 pl-6 border"
                to="/collection"
              >
                Collection
              </NavLink>
              <NavLink
                onClick={() => setVisibility(false)}
                className="py-2 pl-6 border"
                to="/about"
              >
                About
              </NavLink>
              <NavLink
                onClick={() => setVisibility(false)}
                className="py-2 pl-6 border"
                to="/contact"
              >
                Contact
              </NavLink>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;

import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { assets } from "../assets/frontend_assets/assets";
import { setShowSearch } from "../store/productSlice";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  // for the mobile menu view
  const [visibility, setVisibility] = useState(false);

  // Profile drop down open on click otherwise it was on hover
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  //for total items in cart
  const { cartItems } = useSelector((state) => state.cart);
  const [totalItems, setTotalItems] = useState(0);

  //to display total items added in cart
  const getCartCount = () => {
    let totalItems = 0;

    for (const productId in cartItems) {
      const sizes = cartItems[productId]; // e.g., { M: 2, L: 1 }

      for (const size in sizes) {
        totalItems += sizes[size]; // add the quantity
      }
    }

    console.log("Total items in cart:", totalItems);
    return totalItems;
  };

  useEffect(() => {
    const count = getCartCount(cartItems);
    setTotalItems(count);
  }, [cartItems]);

  const navItems = [
    {
      name: "Home",
      path: "/",
      active: true,
    },
    {
      name: "Collection",
      path: "/collection",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Contact",
      path: "/contact",
    },
  ];

  return (
    <div className="flex items-center justify-between w-full p-4 border-b">
      {/* Logo */}
      <Link to={"/"}>
        <img src={assets.logo} alt="Logo" className="w-36 cursor-pointer" />
      </Link>

      {/* Navigation Links */}
      <ul className="hidden sm:flex gap-6 text-1.5xl text-gray-500">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <li key={item.name}>
              <button
                className={`relative font-medium cursor-pointer text-gray-900 hover:text-gray-500 border-b-2 border-transparent hover:border-gray-500 transition-all duration-300 ${
                  isActive ? "border-b-gray-500" : ""
                }`}
                onClick={() => navigate(item.path)}
              >
                {item.name}
              </button>
            </li>
          );
        })}
      </ul>

      {/* Right Side Icons */}
      <div className="flex items-center gap-6">
        {/* Search Icon */}
        <img
          onClick={() => dispatch(setShowSearch(true))}
          src={assets.search_icon}
          alt="Search"
          className="w-5 cursor-pointer"
        />

        {/* Profile Dropdown */}
        <div className="relative">
          {/* Invisible backdrop when menu is open */}
          {isProfileOpen && (
            <div
              className="fixed inset-0 z-40"
              onClick={() => toggleProfile(false)}
            />
          )}

          {/* Profile Icon */}
          <img
            onClick={() => toggleProfile(!isProfileOpen)}
            src={assets.profile_icon}
            alt="Profile"
            className="w-5 cursor-pointer"
          />

          {/* Dropdown Menu */}
          {isProfileOpen && !visibility && (
            <div className="absolute right-0 mt-2 min-w-[140px] bg-white shadow-lg rounded p-3 flex flex-col gap-2 text-gray-600 z-50">
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
            {totalItems}
          </span>
        </Link>

        {/* Mobile Menu Icon */}
        <img
          onClick={() => {
            toggleProfile(false); // close dropdown
            setVisibility(true); // open mobile menu
          }}
          src={assets.menu_icon}
          alt="Menu"
          className="w-5 cursor-pointer sm:hidden"
        />
      </div>

      {/* sidebar for the mobile devices */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-[width] ${
          visibility ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600 z-100">
          <div
            onClick={() => setVisibility(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="" />
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
  );
};

export default Navbar;

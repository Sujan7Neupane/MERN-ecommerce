import React from "react";
import { assets } from "../assets/admin_assets/assets";
import { useDispatch } from "react-redux";
import { logout } from "../store/adminSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center justify-between py-3 px-5 sm:px-10 border-b border-gray-300">
      {/* Logo */}
      <img
        className="w-[max(12%,80px)] sm:w-[max(8%,100px)] object-contain"
        src={assets.logo}
        alt="Logo"
      />

      {/* Logout Button */}
      <button
        onClick={() => dispatch(logout())}
        className="bg-gray-700 hover:bg-gray-800 text-white font-medium px-5 py-2 sm:px-6 sm:py-2.5 rounded-full transition duration-300 shadow-sm hover:shadow-md cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;

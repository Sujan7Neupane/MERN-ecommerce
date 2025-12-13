import React, { useEffect, useState, useCallback } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets";
import { setShowSearch } from "../store/productSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { logout } from "../store/authSlice";
import { clearCart, fetchCart, setBackendCart } from "../store/cartSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [visibility, setVisibility] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const cartData = useSelector((state) => state.cart.cartData || []);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(setBackendCart());
    }
  }, [user, dispatch]);

  // Calculate total items in cart
  const getCartCount = useCallback(() => {
    if (!Array.isArray(cartData)) return 0;
    return cartData.reduce((total, item) => total + (item.quantity || 0), 0);
  }, [cartData]);

  const totalItems = getCartCount();

  const logoutUser = async () => {
    // prevent double logout
    if (!user) return;

    try {
      const response = await axios.post(
        "/api/v1/user/logout",
        {},
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success(response.data.message || "Logged out successfully");
      }

      // Clear Redux user value immediately
      dispatch(logout());
      // localStorage.removeItem("user");

      // clear cart after user logs out
      dispatch(clearCart());

      // Close profile dropdown
      setIsProfileOpen(false);

      // Navigate to homepage
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Error logging out");
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close profile dropdown if clicked outside
      if (isProfileOpen && !event.target.closest(".profile-dropdown")) {
        setIsProfileOpen(false);
      }

      // Close mobile menu if clicked outside
      if (visibility && !event.target.closest(".mobile-menu")) {
        setVisibility(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isProfileOpen, visibility]);

  // Close mobile menu when route changes
  useEffect(() => {
    setVisibility(false);
    setIsProfileOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Collection", path: "/collection" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div className="flex items-center justify-between w-full p-4 border-b relative">
      {/* Logo */}
      <Link to={"/"}>
        <img src={assets.logo} alt="Logo" className="w-36 cursor-pointer" />
      </Link>

      {/* Navigation Links */}
      <ul className="hidden sm:flex gap-6">
        {navItems.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `relative font-medium text-gray-900 pb-1 transition-all duration-300
           ${
             isActive
               ? "border-b-2 border-gray-900"
               : "border-b-2 border-transparent hover:border-gray-500"
           }`
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Right Side Icons */}
      <div className="flex items-center gap-6">
        {/* Search Icon */}
        <button
          onClick={() => dispatch(setShowSearch(true))}
          className="p-1 hover:bg-gray-100 rounded cursor-pointer"
        >
          <img src={assets.search_icon} alt="Search" className="w-6" />
        </button>

        {/* Profile Dropdown */}
        <div className="profile-dropdown relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (!user) {
                navigate("/login");
              } else {
                setIsProfileOpen(!isProfileOpen);
              }
            }}
            className="p-1 hover:bg-gray-100 rounded cursor-pointer"
          >
            <img src={assets.profile_icon} alt="Profile" className="w-6" />
          </button>

          {/* Dropdown Menu */}
          {isProfileOpen && user && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-2 flex flex-col gap-1 text-gray-600 z-50 border">
              <div className="px-3 py-2 border-b">
                <p className="text-sm font-medium text-gray-900">
                  {user.name || user.email}
                </p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              <button
                onClick={() => {
                  setIsProfileOpen(false);
                  navigate("/profile");
                }}
                className="px-3 py-2 text-left hover:bg-gray-100 rounded text-sm cursor-pointer"
              >
                My Profile
              </button>
              <button
                onClick={() => {
                  setIsProfileOpen(false);
                  navigate("/orders");
                }}
                className="px-3 py-2 text-left hover:bg-gray-100 rounded text-sm cursor-pointer"
              >
                Orders
              </button>
              <button
                onClick={() => {
                  setIsProfileOpen(false);
                  logoutUser();
                }}
                className="px-3 py-2 text-left hover:bg-gray-100 rounded text-sm text-red-600 cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Cart */}
        <Link to="/cart" className="relative p-1 hover:bg-gray-100 rounded">
          <img src={assets.cart_icon} alt="Cart" className="w-6" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] text-xs text-white bg-red-500 rounded-full flex items-center justify-center px-1">
              {totalItems > 99 ? "99+" : totalItems}
            </span>
          )}
        </Link>

        {/* Mobile Menu Icon */}
        <button
          onClick={() => {
            setIsProfileOpen(false);
            setVisibility(true);
          }}
          className="p-1 hover:bg-gray-100 rounded sm:hidden"
        >
          <img src={assets.menu_icon} alt="Menu" className="w-5" />
        </button>
      </div>

      {/* Mobile Sidebar */}
      {visibility && (
        <div className="mobile-menu fixed inset-0 z-50 bg-black bg-opacity-50 sm:hidden">
          <div className="absolute top-0 right-0 bottom-0 w-3/4 max-w-sm bg-white shadow-xl">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">Menu</h2>
                <button
                  onClick={() => setVisibility(false)}
                  className="p-2 hover:bg-gray-100 rounded"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* User Info */}
              {user && (
                <div className="p-4 border-b bg-gray-50">
                  <p className="font-medium text-gray-900">
                    {user.name || user.email}
                  </p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              )}

              {/* Navigation Items */}
              <div className="flex-1 overflow-y-auto">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      navigate(item.path);
                      setVisibility(false);
                    }}
                    className={`w-full text-left px-6 py-4 border-b hover:bg-gray-50 ${
                      location.pathname === item.path
                        ? "bg-blue-50 text-blue-600"
                        : ""
                    }`}
                  >
                    {item.name}
                  </button>
                ))}

                {/* User Actions */}
                <div className="p-4 border-t">
                  {user ? (
                    <>
                      <button
                        onClick={() => {
                          navigate("/profile");
                          setVisibility(false);
                        }}
                        className="w-full text-left px-6 py-3 hover:bg-gray-50 rounded"
                      >
                        My Profile
                      </button>
                      <button
                        onClick={() => {
                          navigate("/orders");
                          setVisibility(false);
                        }}
                        className="w-full text-left px-6 py-3 hover:bg-gray-50 rounded"
                      >
                        Orders
                      </button>
                      <button
                        onClick={() => {
                          setVisibility(false);
                          logoutUser();
                        }}
                        className="w-full text-left px-6 py-3 hover:bg-gray-50 rounded text-red-600"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        navigate("/login");
                        setVisibility(false);
                      }}
                      className="w-full text-left px-6 py-3 hover:bg-gray-50 rounded text-blue-600"
                    >
                      Login / Register
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

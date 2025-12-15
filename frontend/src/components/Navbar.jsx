import React, { useEffect, useState, useCallback } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets";
import { setShowSearch } from "../store/productSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { logout } from "../store/authSlice";
import { clearCart, setBackendCart } from "../store/cartSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const cartData = useSelector((state) => state.cart.cartData || []);

  useEffect(() => {
    if (user) dispatch(setBackendCart());
  }, [user, dispatch]);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [mobileOpen]);

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  const cartCount = useCallback(() => {
    return cartData.reduce((sum, item) => sum + (item.quantity || 0), 0);
  }, [cartData]);

  const logoutUser = async () => {
    try {
      await axios.post("/api/v1/user/logout", {}, { withCredentials: true });
      dispatch(logout());
      dispatch(clearCart());
      toast.success("Logged out successfully");
      navigate("/");
    } catch {
      toast.error("Logout failed");
    }
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Collection", path: "/collection" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="border-b sticky top-0 bg-white z-40">
      <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/">
          <img src={assets.logo} alt="Logo" className="w-36" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `pb-1 font-medium border-b-2 transition ${
                  isActive
                    ? "border-black"
                    : "border-transparent hover:border-gray-400"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Right Icons */}
        <div className="flex items-center gap-5">
          {/* Search */}
          <button
            onClick={() => dispatch(setShowSearch(true))}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <img src={assets.search_icon} alt="Search" className="w-6" />
          </button>

          {/* Profile (desktop only) */}
          <div className="relative hidden sm:block">
            <button
              onClick={() =>
                user ? setProfileOpen(!profileOpen) : navigate("/login")
              }
              className="p-1 hover:bg-gray-100 rounded"
            >
              <img src={assets.profile_icon} alt="Profile" className="w-6" />
            </button>

            {profileOpen && user && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow z-50">
                <div className="px-4 py-2 border-b">
                  <p className="font-medium">{user.name || user.email}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <button
                  onClick={() => navigate("/profile")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  My Profile
                </button>
                <button
                  onClick={() => navigate("/orders")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Orders
                </button>
                <button
                  onClick={logoutUser}
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Cart */}
          <Link to="/cart" className="relative p-1 hover:bg-gray-100 rounded">
            <img src={assets.cart_icon} alt="Cart" className="w-6" />
            {cartCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
                {cartCount() > 99 ? "99+" : cartCount()}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(true)}
            className="sm:hidden p-1 hover:bg-gray-100 rounded cursor-pointer"
          >
            <img src={assets.menu_icon} alt="Menu" className="w-5" />
          </button>
        </div>
      </div>

      {/* Mobile Top Menu */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50 sm:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="bg-slate-50 w-full shadow-md animate-slideDown"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-400">
              <h2 className="font-semibold">Menu</h2>
              <button onClick={() => setMobileOpen(false)}>✕</button>
            </div>

            {/* User */}
            {user && (
              <div className="p-4 border-b border-[#6db98d] bg-gray-50">
                <p className="font-medium">{user.name || user.email}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            )}

            {/* Navigation */}
            <nav className="flex flex-col">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `px-6 py-4 border-b border-gray-300  ${
                      isActive
                        ? "bg-[#d1f7d6] text-black"
                        : "hover:bg-[#e6ffe6] "
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>

            {/* Actions */}
            <div className="p-4 border-t border-[#6db98d]">
              {user ? (
                <>
                  <button
                    onClick={() => navigate("/profile")}
                    className="block w-full text-left py-3"
                  >
                    My Profile
                  </button>
                  <button
                    onClick={() => navigate("/orders")}
                    className="block w-full text-left py-3"
                  >
                    Orders
                  </button>
                  <button
                    onClick={logoutUser}
                    className="block w-full text-left py-3 text-red-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="block w-full text-left py-3 text-blue-600"
                >
                  Login / Register
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

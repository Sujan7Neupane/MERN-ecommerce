import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { logout } from "../store/adminSlice.js";
import { assets } from "../assets/admin_assets/assets.js";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Call the backend logout endpoint
      const response = await axios.post(
        "/api/v1/admin/logout",
        {},
        { withCredentials: true }
      );

      if (response.data.success) {
        Cookies.remove("isAdmin");

        // Clear Redux state
        dispatch(logout());

        // Show success message
        toast.success(response.data.success);

        // Redirect to login
        navigate("/admin-login");
      } else {
        toast.error("Logout failed on server!");
      }
    } catch (error) {
      console.error("Logout error:", error);

      // Even if server call fails, try to logout locally
      Cookies.remove("isAdmin");
      dispatch(logout());
      toast.error("Logout failed! Redirecting to login...");
      navigate("/admin-login");
    }
  };

  return (
    <div className="flex items-center justify-between py-3 px-5 sm:px-10 border-b border-gray-300">
      <img
        className="w-[max(12%,80px)] sm:w-[max(8%,100px)] object-contain"
        src={assets.logo}
        alt="Logo"
      />

      <button
        onClick={handleLogout}
        className="bg-gray-700 hover:bg-gray-800 text-white font-medium px-5 py-2 sm:px-6 sm:py-2.5 rounded-full transition duration-300 shadow-sm hover:shadow-md cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;

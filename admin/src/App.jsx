import React, { useEffect } from "react";
import { Header, Footer } from "./components";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import AdminLogin from "./components/AdminLogin";
import { useSelector } from "react-redux";

import { Sidebar } from "./components/index.js";
// import AddItems from "./pages/AddItems.jsx";
// import ListItems from "./pages/ListItems.jsx";
// import OrderPage from "./pages/OrderPage.jsx";

const App = () => {
  const { adminToken } = useSelector((state) => state.admin);

  // Store token in localStorage on change
  useEffect(() => {
    if (adminToken) {
      localStorage.setItem("adminToken", adminToken);
    } else {
      localStorage.removeItem("adminToken");
    }
  }, [adminToken]);

  return (
    <div className="flex flex-col min-h-screen">
      <ToastContainer />

      {adminToken === "" ? (
        <AdminLogin />
      ) : (
        <>
          {/* Header */}
          <Header />

          {/* Main Content */}
          <main>
            <div className="flex w-full">
              <Sidebar />
              <Outlet />
            </div>
          </main>

          {/* Footer */}
          <Footer />
        </>
      )}
    </div>
  );
};

export default App;

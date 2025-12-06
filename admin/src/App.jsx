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
  const { token } = useSelector((state) => state.admin);

  // Store token in localStorage on change
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  return (
    <div className="flex flex-col min-h-screen">
      <ToastContainer />

      {token === "" ? (
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

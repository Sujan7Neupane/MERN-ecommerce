import React, { useEffect } from "react";
import { Header, Footer } from "./components";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import AdminLogin from "./components/AdminLogin";
import { useSelector } from "react-redux";

const App = () => {
  // Get token from Redux
  const { token } = useSelector((state) => state.admin);

  // Store token in localStorage on change (optional)
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
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Outlet />
          </main>

          {/* Footer */}
          <Footer />
        </>
      )}
    </div>
  );
};

export default App;

import React from "react";
import { Header, Footer } from "./components";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import { Sidebar } from "./components/index.js";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <ToastContainer />

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
    </div>
  );
};

export default App;

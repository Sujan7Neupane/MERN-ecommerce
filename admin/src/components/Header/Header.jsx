import React from "react";
import { Navbar, Sidebar } from "../index";

const Header = () => {
  return (
    <div>
      <Navbar />
      <div className="flex w-full">
        <Sidebar />
      </div>
    </div>
  );
};

export default Header;

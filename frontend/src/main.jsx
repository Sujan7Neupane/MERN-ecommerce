import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  Collection,
  About,
  Product,
  Cart,
  Login,
  OrderDisplay,
  OrderPlaced,
  Contact,
} from "./pages/index.js";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/collection" element={<Collection />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact-us" element={<Contact />} />
      <Route path="/product/:productId" element={<Product />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/place-order" element={<OrderPlaced />} />
      <Route path="/orders" element={<OrderDisplay />} />
    </Routes>
  </BrowserRouter>
);

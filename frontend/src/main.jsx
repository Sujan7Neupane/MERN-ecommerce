import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
// import { Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true;

import {
  Collection,
  About,
  Product,
  Cart,
  Login,
  OrderDisplay,
  OrderPlaced,
  Contact,
  Homepage,
} from "./pages/index.js";
import { createBrowserRouter, RouterProvider } from "react-router";
import UserProfile from "./pages/UserProfile.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Homepage /> },
      { path: "collection", element: <Collection /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "product/:productId", element: <Product /> },
      { path: "cart", element: <Cart /> },
      { path: "login", element: <Login /> },
      { path: "place-order", element: <OrderPlaced /> },
      { path: "orders", element: <OrderDisplay /> },
      { path: "profile", element: <UserProfile /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

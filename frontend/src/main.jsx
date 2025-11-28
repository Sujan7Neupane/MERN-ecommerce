import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";

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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Homepage /> },
      { path: "collection", element: <Collection /> },
      { path: "about", element: <About /> },
      { path: "contact-us", element: <Contact /> },
      { path: "product/:productId", element: <Product /> },
      { path: "cart", element: <Cart /> },
      { path: "login", element: <Login /> },
      { path: "place-order", element: <OrderPlaced /> },
      { path: "orders", element: <OrderDisplay /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

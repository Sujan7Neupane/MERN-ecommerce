import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
// import { Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.js";

import AddItems from "./pages/AddItems.jsx";
import ListItems from "./pages/ListItems.jsx";
import OrderPage from "./pages/OrderPage.jsx";
import AdminLogin from "./components/AdminLogin.jsx";

import { createBrowserRouter, RouterProvider } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <AdminLogin /> },
      { path: "add", element: <AddItems /> },
      { path: "list", element: <ListItems /> },
      { path: "order", element: <OrderPage /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

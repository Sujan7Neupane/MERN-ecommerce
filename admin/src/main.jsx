import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store.js";

import {
  AdminDashboard,
  AddItems,
  ListItems,
  OrderPage,
} from "./pages/index.js";

import App from "./App.jsx";

import { AdminLogin, AdminProtectedRoute } from "./components/index.js";

// import AdminProtectedRoute from "./components/AdminProtectedRoute.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/admin-login",
    element: <AdminLogin />,
  },
  {
    path: "/",
    element: <AdminProtectedRoute />,
    children: [
      {
        element: <App />,
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: "add", element: <AddItems /> },
          { path: "list", element: <ListItems /> },
          { path: "order", element: <OrderPage /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

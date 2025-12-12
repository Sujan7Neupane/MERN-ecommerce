import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/adminSlice";

const AdminProtectedRoute = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.admin);

  // Check cookie on initial load
  useEffect(() => {
    const isAdmin = Cookies.get("isAdmin") === "true";
    if (isAdmin && !isLoggedIn) {
      dispatch(login());
    }
  }, [dispatch, isLoggedIn]);

  // If not logged in and no cookie, redirect to login
  if (!isLoggedIn && Cookies.get("isAdmin") !== "true") {
    return <Navigate to="/admin-login" replace />;
  }

  return <Outlet />;
};

export default AdminProtectedRoute;

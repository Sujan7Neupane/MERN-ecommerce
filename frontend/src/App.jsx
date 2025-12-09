import React, { useEffect } from "react";
import { Header, Footer } from "./components";
import { Outlet } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { logout, setUser } from "./store/authSlice.js";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

// const App = () => {
//   const dispatch = useDispatch();
//   const { loading } = useSelector((state) => state.auth); // optional loading state

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await axios.get("/api/v1/user/getCurrentUser", {
//           withCredentials: true,
//         });

//         console.log("Res from app.jsx", res);

//         if (res.data.success) {
//           dispatch(setUser(res.data.data));
//         } else {
//           dispatch(logout()); // no user
//         }
//       } catch (error) {
//         dispatch(logout()); // not logged in or error
//         console.log("User not logged in or error fetching user");
//       }
//     };

//     fetchUser();
//   }, [dispatch]);

//   return (
//   );
// };

// export default App;

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/v1/user/getCurrentUser", {
          withCredentials: true,
        });
        dispatch(setUser(res.data.data)); // populate Redux
      } catch (err) {
        console.log("Not logged in");
      }
    };

    fetchUser();
  }, [dispatch]);

  return (
    <div>
      {" "}
      <div className="flex flex-col min-h-screen">
        <ToastContainer />

        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Outlet />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default App;

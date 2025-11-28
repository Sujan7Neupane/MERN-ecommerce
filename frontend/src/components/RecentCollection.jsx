import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setProducts, setError } from "../store/productSlice";

const RecentCollection = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(setLoading());

      try {
        const response = await axios.get("/api/v1/product/all-products", {
          withCredentials: true,
        });

        console.log("Full response:", response.data);

        dispatch(setProducts(response.data.data));
      } catch (error) {
        dispatch(
          setError(error.response?.data?.message || "Failed to fetch products")
        );
      }
    };

    fetchProducts();
  }, [dispatch]);

  const { products } = useSelector((state) => state.store);
  console.log(products);

  return <div>RecentCollection</div>;
};

export default RecentCollection;

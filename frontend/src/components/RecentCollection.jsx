import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setProducts, setError } from "../store/productSlice";
import axios from "axios";
import Title from "./Title";
import ProductsCard from "./ProductsCard";

const RecentCollection = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(setLoading());

      try {
        const response = await axios.get("/api/v1/product/all-products", {
          withCredentials: true,
        });

        // console.log("Full response:", response.data);

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
  // console.log(products);
  const firstTenProducts = products.slice(0, 10);

  return (
    <div className="my-10 ">
      <div className="text-center py-8 text-3xl">
        <Title text1={"RECENT"} text2={"COLLECTIONS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
          voluptas deleniti cum doloribus qui hic.
        </p>
      </div>

      {/* Render components here in Cards */}
      <div className="grid grid-cols-2 sm:grid-col-3 md:grid-col-4 lg:grid-cols-5 gap-4 gap-y-6">
        {firstTenProducts.map((item) => (
          <ProductsCard
            key={item.name}
            _id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentCollection;

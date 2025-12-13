import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { assets } from "../assets/admin_assets/assets";

const ListItems = () => {
  const [productList, setProductList] = useState([]);

  // console.log(productList);

  const { currency, adminToken } = useSelector((state) => state.admin);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/v1/product/all-products");
      // console.log(response?.data.data);

      if (response?.data.data) {
        setProductList(response?.data.data);
      } else {
        toast.error(
          error?.response?.data?.message || "Error fetching products!"
        );
      }
    } catch (error) {
      console.log(error);
      toast(error?.response?.data?.message || "Error fetching products!");
    }
  };

  const deleteItem = async (id) => {
    try {
      const response = await axios.delete(`/api/v1/product/delete/${id}`, {
        headers: { adminToken },
      });

      toast.success(response?.data?.message || "Item deleted successfully!");
      // refresh list after removing product from the list
      await fetchProducts();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
  };

  useEffect(() => {
    fetchProducts();
    // setProductList(response?data.data);
  }, []);

  return (
    <div className="w-full py-5 px-4 md:px-10">
      <p className="mb-3 font-medium">All products list</p>

      <div className="flex flex-col gap-3">
        {/* Table Header (Desktop) */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center py-2 px-3 border border-gray-100 text-sm bg-[#e0ffed] font-semibold">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Sub Category</span>
          <span>Price</span>
          <span className="text-center">Action</span>
        </div>

        {/* Product Rows */}
        {productList.map((item, i) => (
          <div
            key={i}
            className="relative border rounded-md p-3 md:p-0 md:rounded-none flex flex-col gap-2 md:grid md:grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] md:items-center md:px-3 md:py-2"
          >
            {/* Delete Icon – Mobile */}
            <img
              onClick={() => deleteItem(item._id)}
              src={assets.cross_icon}
              alt="delete"
              className="absolute top-3 right-3 w-4 h-4 cursor-pointer md:hidden"
            />

            {/* Image */}
            <img className="w-14 md:w-12" src={item.image[0]} alt={item.name} />

            {/* Name */}
            <p className="font-medium">{item.name}</p>

            {/* Category */}
            <p>
              <span className="md:hidden font-semibold">Category: </span>
              {item.category}
            </p>

            {/* Sub Category */}
            <p>
              <span className="md:hidden font-semibold">Sub Category: </span>
              {item.subCategory}
            </p>

            {/* Price */}
            <p>
              <span className="md:hidden font-semibold">Price: </span>
              {currency} {item.price}
            </p>

            {/* Delete Icon – Desktop */}
            <div className="hidden md:flex justify-center">
              <img
                onClick={() => deleteItem(item._id)}
                src={assets.cross_icon}
                alt="delete"
                className="w-4 h-4 cursor-pointer"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListItems;

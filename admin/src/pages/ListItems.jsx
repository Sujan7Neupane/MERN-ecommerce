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
      console.log(response?.data.data);

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
    <div className="w-full py-5 px-10">
      <p className="mb-2">All products list</p>
      {/* Table to display the products data */}
      <div className="flex flex-col gap-2">
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border border-gray-100 text-sm bg-[#e0ffed]">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>
        {/* Products will be displayed here */}
        {productList.map((item, i) => (
          <div
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
            key={i}
          >
            <img className="w-12" src={item.image[0]} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>
              {currency}
              {item.price}
            </p>
            <div className="flex items-center justify-center">
              <img
                onClick={() => deleteItem(item._id)}
                src={assets.cross_icon}
                alt="close"
                className="w-4 h-4 text-right md:text-center cursor-pointer text-lg "
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListItems;

import React, { useState } from "react";
import { assets } from "../assets/admin_assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const AddItems = () => {
  const [loading, setLoading] = useState(false);

  const [images, setImages] = useState([null, null, null, null]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();

    // Append images (backend expects: "image")
    images.forEach((img) => {
      if (img) formData.append("image", img);
    });

    // Basic product info
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append("sizes", JSON.stringify(sizes));
    formData.append("bestseller", bestseller);

    try {
      const response = await axios.post(
        "/api/v1/product/add-product",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        console.log(response.data.message);
        toast(response.data.message);
        // Reset all the fields after items been added
        setName("");
        setDescription("");
        setPrice("");
        setCategory("");
        setSubCategory("");
        setSizes([]);
        setBestseller(false);
        setImages([]);
        setImagePreviews([]);
      }
    } catch (error) {
      console.log(error);
      toast(error?.response?.data?.message || "Error creating product");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const updated = [...images];
      updated[index] = file;
      setImages(updated);
    }
  };

  const handleSizeClick = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  return (
    <div className="w-full py-5 px-10">
      <form onSubmit={onSubmitHandler} className="flex flex-col gap-3 w-full">
        {/* upload images */}
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div key={i}>
              <label htmlFor={`image${i}`}>
                <img
                  className="w-20 h-20 object-cover cursor-pointer border"
                  src={
                    images[i]
                      ? URL.createObjectURL(images[i])
                      : assets.upload_area
                  }
                  alt="upload preview"
                />
              </label>

              <input
                type="file"
                id={`image${i}`}
                hidden
                accept="image/*"
                onChange={(e) => handleImageChange(e, i)}
              />
            </div>
          ))}
        </div>

        <div className="w-full">
          <p className="mb-2">Product Name</p>
          <input
            onChange={(e) => setName(e.target.value)}
            className="w-full max-w-[500px] px-3 py-2"
            type="text"
            required
          />
        </div>

        <div className="w-full">
          <p className="mb-2">Product Description</p>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            className="w-full max-w-[500px] px-3 py-2"
            required
          />
        </div>

        {/* category / subcategory / price */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <p className="mb-2">Category</p>
            <select
              onChange={(e) => setCategory(e.target.value)}
              className="px-3 py-2"
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          <div>
            <p className="mb-2">SubCategory</p>
            <select
              onChange={(e) => setSubCategory(e.target.value)}
              className="px-3 py-2"
            >
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>

          <div>
            <p className="mb-2">Price ($)</p>
            <input
              onChange={(e) => setPrice(e.target.value)}
              className="px-3 py-2 w-[120px]"
              type="number"
              required
            />
          </div>
        </div>

        {/* sizes and mapping */}
        <div>
          <p className="mb-4">Product Sizes</p>
          <div className="flex gap-3">
            {["S", "M", "L"].map((size) => (
              <p
                key={size}
                onClick={() => handleSizeClick(size)}
                className={`px-3 py-1 cursor-pointer rounded 
                  ${
                    sizes.includes(size) ? "bg-black text-white" : "bg-gray-200"
                  }`}
              >
                {size}
              </p>
            ))}
          </div>
        </div>

        {/* top sellers section */}
        <div className="flex items-center gap-2 mt-3">
          <label className="relative cursor-pointer flex items-center">
            <input
              type="checkbox"
              className="peer sr-only" // hides the default checkbox
              checked={bestseller}
              onChange={(e) => setBestseller(e.target.checked)}
            />
            {/* Custom box */}
            <span
              className="w-5 h-5 border border-gray-300 rounded-sm 
                     peer-checked:bg-green-200 peer-checked:border-green-400 
                     transition-colors"
            ></span>
            <span className="ml-2 select-none">Bestseller</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-28 mt-4 py-3 text-white bg-black cursor-pointer flex items-center justify-center 
    ${loading && "opacity-70 cursor-not-allowed"}`}
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Add product"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddItems;

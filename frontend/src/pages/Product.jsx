import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios"; // You always forget this, so added it.
import { addToCart, setBackendCart } from "../store/cartSlice";
import { assets } from "../assets/frontend_assets/assets";
import { RelatedProductSuggestion } from "../components";

const Product = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [singleImage, setSingleImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const { currency } = useSelector((state) => state.store);
  const { cartData } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  // Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/v1/product/${productId}`);
        const data = response.data?.data;

        setProduct(data);
        setSingleImage(data.image[0]); // first image as default
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const addToCart = async () => {
    if (!user) return navigate("/login");
    if (!selectedSize) return alert("Please select a size");
    if (!product || !product._id) return alert("Product not loaded");

    try {
      const response = await axios.post(
        "/api/v1/cart/add",
        { productId: product._id, size: selectedSize },
        { withCredentials: true }
      );

      dispatch(setBackendCart(response.data.data.cartData));
    } catch (error) {
      console.error(
        "Failed to add to cart:",
        error.response?.data || error.message
      );
      alert(error.response?.data?.message || "Failed to add item to cart");
    }
  };

  // Debugging cart updates
  useEffect(() => {
    console.log("Cart updated:", cartData);
  }, [cartData]);

  if (loading) return <p className="text-black">Loading...</p>;
  if (!product) return <p className="text-black">Product not found.</p>;

  return (
    <div className="border-t pt-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* LEFT — IMAGES */}
        <div className="flex-1 flex flex-col-reverse lg:flex-row gap-6">
          {/* Thumbnails */}
          <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto lg:w-[15%] w-full">
            {product.image.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setSingleImage(img)}
                className="w-[22%] lg:w-full rounded-xl border hover:border-black cursor-pointer transition-all shadow-sm"
                alt=""
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="w-full lg:w-[80%]">
            <img
              src={singleImage}
              alt=""
              className="w-full h-auto rounded-2xl shadow-lg border"
            />
          </div>
        </div>

        {/* RIGHT — DETAILS */}
        <div className="flex-1 space-y-5">
          <h1 className="text-3xl font-semibold text-gray-900">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4].map((n) => (
              <img key={n} src={assets.star_icon} className="w-4" />
            ))}
            <img src={assets.star_dull_icon} className="w-4" />
            <p className="text-gray-500 text-sm pl-2">122 reviews</p>
          </div>

          {/* Price */}
          <p className="text-4xl font-bold text-gray-900">
            {currency} {product.price}
          </p>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed md:w-4/5">
            {product.description}
          </p>

          {/* Sizes */}
          <div className="flex flex-col gap-4 my-8">
            <p className="font-bold">Select Size</p>

            <div className="flex gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`border py-2 px-4 bg-gray-100 cursor-pointer 
                  ${selectedSize === size ? "border-orange-500" : ""}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <div className="flex gap-4 pt-4">
            <button
              className="px-6 py-3 bg-black text-white hover:bg-gray-800 transition cursor-pointer active:bg-gray-700"
              onClick={addToCart}
            >
              Add To Cart
            </button>
          </div>

          <hr className="mt-8 sm:w-4/5 text-gray-400" />

          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>Guaranteed 100% authentic products</p>
            <p>Cash on delivery available</p>
            <p>Hassle-free returns and exchanges within 7 days</p>
          </div>
        </div>
      </div>

      {/* Description + Reviews */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (22)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            An e-commerce website allows businesses to sell products online,
            providing customers with convenient access at any time.
          </p>
          <p>
            These platforms showcase products, include customer reviews, secure
            payments, and personalized recommendations.
          </p>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProductSuggestion
        category={product.category}
        subCategory={product.subCategory}
      />
    </div>
  );
};

export default Product;

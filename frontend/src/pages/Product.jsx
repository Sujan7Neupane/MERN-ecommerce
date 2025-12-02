// individual products posts here
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { assets } from "../assets/frontend_assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { RelatedProductSuggestion } from "../components";
import { addToCart } from "../store/cartSlice";

// ({product}) yesma single product item matra hunxa
// products ma sabai products
const Product = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();

  // all the products
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  // console.log(products);

  // for mapping multiple images
  const [singleImage, setSingleImage] = useState("");

  // For selecting sizes in S, M, L
  const [sizes, setSizes] = useState("");

  const { currency } = useSelector((state) => state.store);

  // for the cartItems to add items in the cart
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/v1/product/${productId}`);
        // console.log(response.data?.data);

        setProduct(response.data?.data);

        setSingleImage(response.data?.data.image[0]);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  if (loading) return <p className="text-black">Loading...</p>;

  return product ? (
    <div className="border-t pt-12 transition-opacity duration-500 opacity-100">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* LEFT SECTION — Images */}
        <div className="flex-1 flex flex-col-reverse lg:flex-row gap-6">
          {/* Thumbnails */}
          <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto lg:w-[15%] w-full">
            {product.image.map((item, i) => (
              <img
                key={i}
                src={item}
                onClick={() => setSingleImage(item)}
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

        {/* RIGHT SECTION — Details */}
        <div className="flex-1 space-y-5">
          {/* Title */}
          <h1 className="text-3xl font-semibold text-gray-900">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <img src={assets.star_icon} className="w-4" />
            <img src={assets.star_icon} className="w-4" />
            <img src={assets.star_icon} className="w-4" />
            <img src={assets.star_icon} className="w-4" />
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

          {/* sizes */}
          <div className="flex flex-col gap-4 my-8">
            <p className="font-bold">Select Size</p>

            <div className="flex gap-2">
              {product.sizes.map((item, i) => (
                <button
                  onClick={() => setSizes(item)}
                  key={i}
                  value={item}
                  className={`border py-2 px-4 bg-gray-100 cursor-pointer ${
                    item === sizes ? "border-orange-500" : ""
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Add to cart Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={() => {
                dispatch(addToCart({ productId: product._id, size: sizes }));
              }}
              className="px-6 py-3 bg-black text-white hover:bg-gray-800 transition cursor-pointer active:bg-gray-700"
            >
              Add To Cart
            </button>

            <button className="px-6 py-3 border border-gray-300 hover:bg-gray-100 transition cursor-pointer">
              Buy Now
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

      {/* Description plus review section */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews(22)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            An e-commerce website is an online platform that allows businesses
            to sell products or services directly to customers over the
            internet, providing a convenient shopping experience from anywhere
            at any time.
          </p>
          <p>
            These websites showcase a wide variety of products, offer detailed
            descriptions, and often include features like customer reviews,
            secure payments, and personalized recommendations to enhance the
            shopping journey.
          </p>
        </div>
      </div>

      {/* Related products suggestion */}
      <RelatedProductSuggestion
        category={product.category}
        subCategory={product.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;

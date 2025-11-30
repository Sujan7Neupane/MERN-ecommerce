import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProductsCard = ({ _id, image, name, price }) => {
  const { currency } = useSelector((state) => state.store);

  return (
    <Link to={`/product/${_id}`} className="cursor-pointer group block">
      <div className="w-full h-56 overflow-hidden rounded-lg bg-white border shadow-sm group-hover:shadow-md transition-all">
        <img
          src={image?.[0] || "/placeholder.jpg"}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      <div className="mt-3">
        <p className="text-sm font-medium text-gray-800 group-hover:text-black transition">
          {name}
        </p>

        <p className="text-sm font-semibold text-gray-900 mt-1">
          {currency}
          {price}
        </p>
      </div>
    </Link>
  );
};

export default ProductsCard;

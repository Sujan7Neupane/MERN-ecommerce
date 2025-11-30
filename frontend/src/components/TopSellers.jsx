import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Title } from "./index";
import ProductsCard from "./ProductsCard";

const TopSellers = () => {
  const { products } = useSelector((state) => state.store);
  const [topSeller, setTopSeller] = useState([]);
  console.log(topSeller);

  useEffect(() => {
    const topProducts = products.filter((item) => item.bestseller);
    setTopSeller(topProducts.slice(0, 5));
  }, []);

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={"TOP"} text2={"SELLERS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis
          aliquam odio nisi cupiditate cumque deserunt.
        </p>
      </div>

      {/* Render components here in Cards */}
      <div className="grid grid-cols-2 sm:grid-col-3 md:grid-col-4 lg:grid-cols-5 gap-4 gap-y-6">
        {topSeller.map((item) => (
          <ProductsCard
            key={item.name}
            _id={item._id}
            name={item.name}
            image={item.image}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default TopSellers;

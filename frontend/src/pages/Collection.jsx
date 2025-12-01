import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { assets } from "../assets/frontend_assets/assets";
import { Title } from "../components/index";
import ProductsCard from "../components/ProductsCard";

const Collection = () => {
  const { products } = useSelector((state) => state.store);

  // to display only in the desktop screen
  const [displayFilter, setDispayFilter] = useState(false);

  // to display filter products
  const [filteredProducts, setFilteredProduct] = useState([]);

  // filter on the basis of product price and relevent
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  // for storing the sort by selection item's state
  const [sortType, setSortType] = useState("relevent");

  // for search bar searching items from input
  const { product, search, showSearch } = useSelector((state) => state.store);

  //product select on the options and filter
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilterOnProducts = () => {
    let productsCopy = products.slice();

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredProduct(productsCopy);
  };

  const sortProducts = () => {
    let filteredProductsCopy = filteredProducts.slice();

    // console.log(typeof filteredProducts[0].price, filteredProducts[0].price);

    switch (sortType) {
      case "low-high":
        setFilteredProduct(
          filteredProductsCopy.sort((a, b) => a.price - b.price)
        );
        break;

      case "high-low":
        setFilteredProduct(
          filteredProductsCopy.sort((a, b) => b.price - a.price)
        );
        break;

      default:
        applyFilterOnProducts();
        break;
    }
  };
  // OR

  // const sortFunctions = {
  //   "low-high": (a, b) => a.price - b.price,
  //   "high-low": (a, b) => b.price - a.price,
  // };

  // const sortProducts = () => {
  //   if (!sortFunctions[sortType]) {
  //     applyFilterOnProducts();
  //     return;
  //   }

  //   const sorted = [...filteredProducts].sort(sortFunctions[sortType]);
  //   setFilteredProduct(sorted);
  // };

  // initially data ako herna matra
  // useEffect(() => {
  //   setFilteredProduct(products);
  // }, []);

  // rendering category and subCategory filters
  useEffect(() => {
    applyFilterOnProducts();
    // console.log(category);
    // console.log(subCategory);
  }, [category, subCategory, search, showSearch]);

  //render the select items filter on the basic of price
  useEffect(() => {
    sortProducts();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter on the left */}
      <div className="min-w-60">
        <p
          // mobile view hide display filters on clicking
          onClick={() => setDispayFilter(!displayFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          {/* smaller screen showing > (this icon) */}
          <img
            className={`h-3 sm:hidden ${displayFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>

        {/* display only in the desktop screen */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            displayFilter ? " " : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>

          {/* Filter on the basis of category */}
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                onChange={toggleCategory}
                className="w-3"
                type="checkbox"
                value={"Men"}
              />{" "}
              Men
            </p>
            <p className="flex gap-2">
              <input
                onChange={toggleCategory}
                className="w-3"
                type="checkbox"
                value={"Women"}
              />{" "}
              Women
            </p>
            <p className="flex gap-2">
              <input
                onChange={toggleCategory}
                className="w-3"
                type="checkbox"
                value={"Kids"}
              />{" "}
              Kids
            </p>
          </div>
        </div>

        {/* Filter on the basis of sub-category */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            displayFilter ? " " : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                onChange={toggleSubCategory}
                className="w-3"
                type="checkbox"
                value={"Topwear"}
              />{" "}
              Topwear
            </p>
            <p className="flex gap-2">
              <input
                onChange={toggleSubCategory}
                className="w-3"
                type="checkbox"
                value={"Bottomwear"}
              />{" "}
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input
                onChange={toggleSubCategory}
                className="w-3"
                type="checkbox"
                value={"Winterwear"}
              />{" "}
              Winterwear
            </p>
          </div>
        </div>
      </div>

      {/* Content on the right */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />

          {/* Sort product according to price like high to low  */}

          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2 cursor-pointer"
          >
            <option value="relevent">Sort By: Relevent</option>
            <option value="low-high">Sort By: Low to High</option>
            <option value="high">Sort By: High to Low</option>
          </select>
        </div>

        {/* Displaying all products here. Also showing on the basis of filter */}

        <div className="grid grid-cols-2 md:grid-col-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filteredProducts.map((item) => (
            <ProductsCard
              key={item.name}
              _id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;

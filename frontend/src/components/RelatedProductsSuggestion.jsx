import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Title } from "../components/index";
import ProductsCard from "./ProductsCard";

const RelatedProductsSuggestion = ({ category, subCategory }) => {
  const { products } = useSelector((state) => state.store);

  //   just to store filtered realated product here
  const [relatedProduct, setRelatedProduct] = useState([]);

  useEffect(() => {
    // products 0 bhanda greater vayo vane matra display
    if (products.length > 0) {
      let productsCopy = products.slice();

      //   individual item ra category ko item same cha xaina hereko
      productsCopy = productsCopy.filter((item) => category === item.category);

      //   similar to subcategory
      productsCopy = productsCopy.filter(
        (item) => subCategory == item.subCategory
      );
      //   check
      //   console.log(productsCopy.slice(0, 5));

      setRelatedProduct(productsCopy.slice(0, 5));
    }
  }, [products]);

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1={"Related Product"} text2={"Suggestion"} />
      </div>
      <div className="grid grid-col-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-col-5 gap-4 gap-y-6">
        {relatedProduct.map((item, i) => (
          <ProductsCard
            key={i}
            _id={item._id}
            name={item.name}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProductsSuggestion;

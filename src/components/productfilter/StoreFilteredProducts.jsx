import React, { useState, useEffect } from "react";
import ProductCard from "../store/ProductCard";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function StoreFilteredProducts() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filteredproducts, setFilteredProducts] = useState([]);
  const sizeParam = searchParams.get("size");
  const searchquery = searchParams.get("search");
  console.log(searchquery);

  useEffect(() => {
    if (searchquery) {
      axios
        .get("http://localhost:3000/products")
        .then((response) => {
          console.log(response.data);
          if (response.data) {
            const filteredsearch = response.data.filter((product) =>
              product.name.toLowerCase().includes(searchquery)
            );
            console.log(filteredsearch);
            setFilteredProducts(filteredsearch);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const category = searchParams.get("category");
      const brandsParam = searchParams.get("brand");
      const typeParam = searchParams.get("type");
      const febricParam = searchParams.get("febric");
      const clothingParam = searchParams.get("clothing");

      console.log("category:", category); // Log category

      const params = new URLSearchParams();

      if (category) {
        params.append("category", category);
      }
      if (brandsParam) {
        brandsParam
          .split(",")
          .forEach((brand) => params.append("brand", brand));
      }
      if (typeParam) {
        typeParam.split(",").forEach((type) => params.append("type", type));
      }
      if (febricParam) {
        febricParam
          .split(",")
          .forEach((febric) => params.append("febric", febric));
      }
      if (clothingParam) {
        clothingParam
          .split(",")
          .forEach((clothing) => params.append("clothing", clothing));
      }

      const url = `http://localhost:3000/products?${params.toString()}`;
      console.log(url);

      axios
        .get(url)
        .then((response) => {
          setProducts(response.data);
          setFilteredProducts(response.data);
          if (sizeParam) {
            sizeFilter();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [searchParams]);

  function sizeFilter() {
    console.log(sizeParam);
    const sizes = sizeParam.split(",");

    let filteredProducts = products.filter((product) => {
      // Checking if all of the selected sizes are included in the product sizes
      return sizes.every((size) => product.sizes.includes(size));
    });

    setFilteredProducts(filteredProducts);
  }

  return (
    <div>
      <div className="px-2 lg:px-0 grid gap-x-3 gap-y-8 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence initial={false}>
          {filteredproducts.map((product) => (
            <motion.div
              key={product.id}
              layoutId={`gameCard-${product.id}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                opacity: { duration: 0.2, ease: "easeInOut" },
                scale: { duration: 0.2, ease: "easeInOut" },
                layout: { duration: 0.2, ease: "easeInOut" }, // Add layout animation
              }}
              layout // Enable layout animation
            >
              <ProductCard
                id={product.id}
                name={product.name}
                image={product.thumbnail}
                price={product.price}
                oldprice={product.oldprice}
                tag={product.tag}
                rating={product.rating}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

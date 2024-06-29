import React from "react";
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Heading from "../common/Heading";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      delay: 0.4,
      staggerChildren: 0.1, // Adjust the stagger delay as needed
      duration: 0.5, // Add duration
      ease: "easeOut", // Add easing
    },
  },
};

const cardVarient = {
  hidden: { opacity: 0, scale: 0.9 }, // Add y for a slight upward motion
  show: { opacity: 1, scale: 1 },
  transition: {
    duration: 0.5, // Add duration
    ease: "easeOut", // Add easing
  },
};

export default function PopularProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/products", { params: { _limit: 8 } })
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <div className=" py-6 sm:py-8 lg:py-12">
        <Heading
          title="Popular"
          highlight="Products"
          description="Detail is not an obsession, it is the very essence of perfection. "
        />
        <div className="mx-auto max-w-screen-2xl px-4 md:px-12">
          <div className=" my-6 flex items-end justify-end gap-4">
            <NavLink to="/productfilter">
              <button className="inline-block rounded-lg border  px-4 py-2 text-center text-sm font-semibold text-gray-200 outline-none ring-indigo-300 hover:text-amber-600 hover:border-amber-600 md:text-base">
                Show more
              </button>
            </NavLink>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid gap-x-4 gap-y-8 grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4"
          >
            {products.map((product) => (
              <motion.div key={product.id} variants={cardVarient}>
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
          </motion.div>
        </div>
      </div>
    </div>
  );
}

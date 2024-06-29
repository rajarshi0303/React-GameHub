import React from "react";
import Heading from "../common/Heading";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";

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
  hidden: { opacity: 0, scale: 0.7 }, // Add y for a slight upward motion
  show: { opacity: 1, scale: 1 },
  transition: {
    duration: 0.5, // Add duration
    ease: "easeOut", // Add easing
  },
};

export default function PopularCatogeries() {
  const navigateTo = useNavigate();
  return (
    <div className="max-w-screen-2xl mx-auto mt-6">
      <Heading
        title="Popular"
        highlight="Catogeries"
        description="Detail is not an obsession, it is the very essence of perfection. "
      />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mx-4 lg:mx-14"
      >
        <div className=" mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <motion.div variants={cardVarient}>
            <div onClick={() => navigateTo("/productfilter?category=headset")}>
              <ProductCard
                imgSrc="/public/images/store/catogeries/catogery_01.png"
                title="Headset"
                description="Detail is not an obsession, it is the very essence of perfection."
                buttonColor="text-red-700"
                buttonText="Browse"
              />
            </div>
          </motion.div>
          <motion.div variants={cardVarient}>
            <div onClick={() => navigateTo("/productfilter?category=headset")}>
              <ProductCard
                imgSrc="/public/images/store/catogeries/catogery_02.png"
                title="Earbuds"
                description="Detail is not an obsession, it is the very essence of perfection."
                buttonColor="text-yellow-700"
                buttonText="Browse"
              />
            </div>
          </motion.div>
          <motion.div variants={cardVarient}>
            <div onClick={() => navigateTo("/productfilter?category=cloths")}>
              <ProductCard
                imgSrc="/public/images/store/catogeries/catogery_03.png"
                title="Cloths "
                description="Detail is not an obsession, it is the very essence of perfection."
                buttonColor="text-blue-700"
                buttonText="Browse"
              />
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-5 grid-rows-0 gap-4 mt-4">
          <div className="lg:col-span-3">
            <motion.div variants={cardVarient}>
              <div onClick={() => navigateTo("/productfilter?category=gaming")}>
                <ProductCard
                  imgSrc="/public/images/store/catogeries/catogery_04.png"
                  title="Console and accessories"
                  description="Detail is not an obsession, it is the very essence of perfection."
                  buttonColor="text-gray-700"
                  buttonText="Browse"
                />
              </div>
            </motion.div>
          </div>
          <div className="lg:col-span-2 lg:col-start-4">
            <motion.div variants={cardVarient}>
              <div onClick={() => navigateTo("/productfilter?category=watch")}>
                <ProductCard
                  imgSrc="/public/images/store/catogeries/catogery_06.png"
                  title="Watch"
                  description="Detail is not an obsession, it is the very essence of perfection."
                  buttonColor="text-gray-700"
                  buttonText="Browse"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const ProductCard = ({
  imgSrc,
  title,
  description,
  buttonColor,
  buttonText,
}) => {
  return (
    <div
      className="relative min-h-60 w-full flex items-center overflow-hidden shadow-lg rounded-xl group"
      style={{
        backgroundImage: `url('/public/images/store/product_bg.png')`,
        backgroundPosition: "top",
        backgroundSize: "cover",
      }}
    >
      <LazyLoadImage
        alt="moto"
        src={imgSrc}
        className="w-2/5 max-h-60 absolute object-contain mb-4 right-1 -bottom-2 transition duration-500 ease-in-out group-hover:scale-110"
      />
      <div className="w-4/6 px-6 z-10">
        <p className="mb-2 text-xl capitalize font-bold text-gray-200">
          {title}
        </p>
        <p className="text-sm text-gray-200">{description}</p>
        <button
          className={`px-4 py-1 mt-4 text-sm font-semibold tracking-wide capitalize bg-gray-200 rounded-full ${buttonColor}`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

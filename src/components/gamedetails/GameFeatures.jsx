import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import LazyVideo from "../common/LazyVideo";

import LoadingDots from "../common/LoadingDots";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      when: "beforeChildren",
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function GameFeatures({ id }) {
  const [features, setFeatures] = useState([]);
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/gamefeatures/${id}`)
      .then((response) => {
        setFeatures(response.data.features);
        setName(response.data.name);
        setTitle(response.data.title);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (features.length === 0) return null;

  return (
    <>
      {isLoading ? (
        <LoadingDots />
      ) : (
        <div className="max-w-screen-2xl mx-auto ">
          <div className="mt-12 mb-4 lg:mb-0 lg:mt-16">
            <p className="text-amber-600 text-center text-base font-semibold capitalize">
              Why You Should Play {name}?
            </p>
            <h1 className="px-4 text-center text-3xl tracking-wide uppercase font-semibold text-gray-300 lg:text-2xl">
              {title}
            </h1>
          </div>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`lg:px-12 container flex flex-col py-8 lg:py-10 lg:flex-row lg:items-center ${
                index % 2 === 0 ? "" : "lg:flex-row-reverse"
              }`}
            >
              <motion.div
                className="flex items-center justify-center w-full lg:w-1/2"
                initial={{
                  opacity: 0,
                  // if odd index card,slide from right instead of left
                  x: index % 2 === 0 ? -100 : 100,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0, // Slide in to its original position
                  transition: {
                    duration: 0.6, // Animation duration
                    type: "spring",
                  },
                }}
                viewport={{ once: true }}
              >
                {feature.type === "image" ? (
                  <LazyLoadImage
                    className="object-cover object-bottom w-full h-full lg:h-96 rounded-md"
                    src={feature.url}
                    alt="glasses photo"
                  />
                ) : (
                  <LazyVideo
                    className="object-cover object-bottom w-full h-full lg:h-96 rounded-md"
                    src={feature.url}
                    type="video/mp4"
                    autoPlay
                    loop
                    muted
                  ></LazyVideo>
                )}
              </motion.div>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="w-full lg:w-1/2"
              >
                <div className="max-w-lg lg:px-12">
                  <motion.h1
                    variants={itemVariants}
                    className="text-2xl tracking-wide text-gray-300 lg:text-4xl"
                  >
                    {feature.title}
                  </motion.h1>
                  <motion.p
                    variants={itemVariants}
                    className="mt-4 text-gray-300 whitespace-pre-line"
                  >
                    {feature.description}
                  </motion.p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      )}
    </>
  );
}

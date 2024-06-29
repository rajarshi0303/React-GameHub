import React from "react";
import NewsCard from "./NewsCard";
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
  hidden: { opacity: 0, scale: 0.7 }, // Add y for a slight upward motion
  show: { opacity: 1, scale: 1 },
  transition: {
    duration: 0.5, // Add duration
    ease: "easeOut", // Add easing
  },
};

export default function TrendingNews() {
  const news = [
    {
      image: "/public/images/news/trending_thumb01.jpg",
      video: "https://www.youtube.com/embed/C44_HrseDSs",
    },
    {
      image: "/public/images/news/trending_thumb02.jpg",
      video: "https://www.youtube.com/embed/ssrNcwxALS4",
    },
    {
      image: "/public/images/news/trending_thumb03.jpg",
      video: "https://www.youtube.com/embed/xzCEdSKMkdU",
    },
    {
      image: "/public/images/news/trending_thumb04.jpg",
      video: "https://www.youtube.com/embed/C44_HrseDSs",
    },
    {
      image: "/public/images/news/trending_thumb05.jpg",
      video: "https://www.youtube.com/embed/xzCEdSKMkdU",
    },
    {
      image: "/public/images/news/trending_thumb06.jpg",
      video: "https://www.youtube.com/embed/ssrNcwxALS4",
    },
  ];
  return (
    <div className="max-w-screen-2xl mx-auto ">
      <div className="px-4 lg:px-20 mt-14">
        <div className="flex items-center justify-between">
          <h1 className="my-4 text-base font-bold uppercase px-3 border-l-8 text-gray-100 border-amber-600 lg:text-xl">
            Trending
          </h1>

          <h1 className="px-4 text-base font-semibold text-amber-600">
            View More
          </h1>
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-8 lg:gap-y-12"
        >
          {news.map((item, index) => (
            <motion.div key={index} variants={cardVarient}>
              <NewsCard image={item.image} video={item.video} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

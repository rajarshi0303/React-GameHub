import React from "react";
import ArticleCard from "./ArticleCard";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      delay: 0.5,
      staggerChildren: 0.1, // Adjust the stagger delay as needed
      duration: 0.5, // Add duration
      ease: "easeOut", // Add easing
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 50 }, // Add y for a slight upward motion
  show: { opacity: 1, y: 0 },
  transition: {
    duration: 0.5, // Add duration
    ease: "easeOut", // Add easing
  },
};

export default function FeaturedArticles() {
  const articles = [
    { url: "/public/images/news/article01.jpg" },
    { url: "/public/images/news/article02.jpg" },
    { url: "/public/images/news/article03.jpg" },
    { url: "/public/images/news/article04.jpg" },
    { url: "/public/images/news/article05.jpg" },
    { url: "/public/images/news/article06.jpg" },
  ];

  return (
    <div className="max-w-screen-2xl mx-auto ">
      <div className="px-4 lg:px-20 mt-14">
        <div className="flex items-center justify-between">
          <h1 className="my-4 text-base font-bold uppercase px-3 border-l-8 text-gray-100 border-amber-600 lg:text-xl">
            Articles
          </h1>

          <h1 className="px-4 text-base font-semibold text-amber-600">
            View More
          </h1>
        </div>
        <motion.div
          className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-8 lg:gap-y-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {articles.map((article, index) => (
            <motion.div key={index} variants={cardVariant}>
              <ArticleCard image={article.url} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

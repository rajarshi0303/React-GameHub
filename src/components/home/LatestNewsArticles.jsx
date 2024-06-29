import React from "react";
import Heading from "../common/Heading";
import ArticleCard from "../news/ArticleCard";
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

export default function LatestNewsArticles() {
  const articles = [
    { url: "/public/images/news/article01.jpg" },
    { url: "/public/images/news/article05.jpg" },
    { url: "/public/images/news/article06.jpg" },
  ];
  return (
    <div className="max-w-screen-2xl mx-auto mt-16">
      <Heading
        title="Latest News"
        highlight="Articles"
        description="Compete with 100 players on a remote island for winner takes showdown known issue where certain skin strategic"
      />
      <div className="px-4 lg:px-20 mt-14">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-8 lg:gap-y-12"
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

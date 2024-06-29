import React from "react";
import { motion } from "framer-motion";

export default function Heading({ title, highlight, description }) {
  return (
    <div className="mt-4 lg:mt-16">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        viewport={{ once: true }}
        className="mx-auto max-w-screen-2xl px-6 md:px-8"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="mb-3 text-center text-2xl font-bold uppercase tracking-tight text-gray-200 md:mb-4 lg:text-3xl"
        >
          {title} <span className="text-amber-600">{highlight}</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          className="mb-4 mx-auto max-w-screen-sm text-center text-gray-300 md:text-base"
        >
          {description}
        </motion.p>
        <motion.img
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
          className="mx-auto max-w-lg lg:w-1/5"
          src="public\images\icons\title_bar03.png"
          alt=""
        />
      </motion.div>
    </div>
  );
}

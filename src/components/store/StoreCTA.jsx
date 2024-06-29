import React from "react";
import { motion } from "framer-motion";

export default function StoreCTA({
  bg_image,
  image,
  discount,
  title,
  name,
  date,
  company,
  sale,
  description,
}) {
  return (
    <div>
      <section className="max-w-screen-2xl mx-auto">
        <div className="mx-4 lg:mx-16 mt-28">
          <motion.div
            className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 py-12 rounded-2xl group"
            style={{
              backgroundImage: `url('${bg_image}')`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="col-span-4 pl-10 self-center">
              <motion.h1
                className="text-gray-200 font-semibold text-xl"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {discount}% OFF
              </motion.h1>
              <motion.h2
                className="mt-4 text-2xl font-semibold text-gray-300 md:text-2xl lg:text-2xl"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {title}
              </motion.h2>
              <motion.h2
                className="text-2xl uppercase font-bold text-white md:text-2xl lg:text-5xl"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {name}
              </motion.h2>
              <motion.h1
                className="mt-2 text-gray-200 font-semibold text-lg"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {date}
              </motion.h1>
            </div>
            <div className=" col-span-4 relative ">
              <motion.img
                alt="moto"
                src={image}
                className="lg:absolute mb-4 -inset-10 -top-36 transition duration-500 ease-in-out"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
              />
            </div>
            <div className="col-span-4 px-4 self-center">
              <motion.h1
                className="text-gray-200 font-semibold text-xl"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                {company}
              </motion.h1>
              <motion.h2
                className="mt-4 text-xl font-bold text-white md:text-2xl lg:text-4xl"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
              >
                {sale}
              </motion.h2>
              <motion.p
                className="mt-2 max-w-md text-gray-200"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.6 }}
              >
                {description}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.8 }}
              >
                <a className="mt-4 inline-block rounded-full bg-white px-6 py-2 text-center text-base font-semibold text-gray-800 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:bg-gray-200 md:text-base">
                  Shop now
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

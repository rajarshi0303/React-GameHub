import React from "react";
import HomeHeroSlider from "./HomeHeroSlider";
import { TypeWriterEffect } from "../animations/TypeWriterEffect";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
export default function HomeHero() {
  const words = [
    {
      text: "World",
    },
    {
      text: "of",
    },
    {
      text: "Gaming",
      className: "text-amber-600",
    },
  ];
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "90%"]);
  return (
    <div className="lg:h-screen max-w-screen-2xl mx-auto">
      <div
        ref={ref}
        className="relative overflow-hidden w-full h-full bg-center bg-cover "
      >
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('/public/images/slider/homehero/slider_bg02.webp')`,
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            y: backgroundY,
          }}
        />
        <div className="relative z-10 flex flex-col items-center justify-between gap-4 lg:h-full lg:flex-row">
          <div className="mt-28 lg:w-3/5 lg:flex justify-center lg:items-center ">
            <HomeHeroSlider></HomeHeroSlider>
          </div>
          <div className="px-8 mb-20 lg:mb-0  lg:order-first lg:w-2/5">
            <h3 className="mt-2 w-fit text-nase font-bold uppercase">
              welcome to
            </h3>
            <h2 className="text-3xl font-bold text-gray-100 uppercase lg:text-5xl">
              <TypeWriterEffect words={words} />
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 1.2 }}
              viewport={{ once: true }}
              className="mt-4 text-gray-100"
            >
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam,
              eum modi incidunt adipisci quod porro et non exercitationem quasi
            </motion.p>
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 1.8 }}
              viewport={{ once: true }}
              className="mt-4 w-fit py-2 px-6 font-semibold  text-base tracking-wide text-white rounded-full bg-amber-700 hover:bg-amber-800"
            >
              Find Out More
            </motion.button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full py-4 lg:h-1/6 rounded-md bg-gradient-to-t from-gray-950"></div>
      </div>
    </div>
  );
}

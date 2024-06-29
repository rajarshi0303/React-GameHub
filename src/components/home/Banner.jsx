import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function Banner() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageX = useTransform(scrollYProgress, [0, 0.5], ["-150%", "0%"]);
  return (
    <div className="h-screen mt-16 max-w-screen-2xl mx-auto ">
      <div
        ref={ref}
        className="relative overflow-hidden w-full h-full bg-center bg-cover "
      >
        <motion.div
          className="absolute inset-0 z-0 "
          style={{
            backgroundImage: `url('/public/images/design/cta_bg.webp')`,
            backgroundPosition: "bottom",
            backgroundSize: "cover",
          }}
        />
        <div className="relative z-10 flex flex-col items-center justify-between gap-4 lg:h-full lg:flex-row">
          <div className="container px-6 py-8 mx-auto ">
            <div className="items-center lg:flex">
              <div className="flex items-center justify-center w-full mt-6  lg:mt-0 lg:w-3/5 ">
                <motion.div style={{ x: imageX }}>
                  <LazyLoadImage
                    className="h-96 lg:h-[34rem]"
                    src="/public/images/design/cta_img.webp"
                    alt="Catalogue-pana.svg"
                  />
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="w-full justify-end lg:w-2/5 "
              >
                <LazyLoadImage
                  className="py-4"
                  src="/public/images/icons/cta_icon.png"
                  alt="feature image"
                />
                <h1 className="text-3xl font-bold text-white uppercase lg:text-4xl">
                  This month on <span className="text-amber-500">Gaming</span>
                </h1>

                <div className="mt-4  relative">
                  <h1 className="absolute text-base text-amber-600 font-bold top-1/3 mt-4 -left-14 -rotate-90 ">
                    THEMEBEYOND
                  </h1>
                  <div className="pl-6">
                    <h1 className="text-2xl tracking-wide text-gray-300 font-bold">
                      WORLDS MEET REAL
                    </h1>

                    <p className="mt-2 text-gray-300 max-w-lg">
                      The Legend of Zelda: Skyward Sword is an action-adventure
                      game developed and published by Nintendo for the Wii. The
                      sixteenth mainline entry in The Legend of Zelda series.
                      Compete with 100 players on a remote island
                    </p>
                  </div>
                </div>
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.6, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className=" group w-fit mx-4"
                >
                  <button className="mt-6 skew-x-[-18deg] bg-amber-600">
                    <span className="block py-2 px-5 font-semibold text-white -skew-x-[-18deg] z-10">
                      Read More
                    </span>
                  </button>
                  <button className="ml-2 py-2 w-1 text-amber-600 bg-amber-600 skew-x-[-18deg] group-hover:ml-0">
                    .
                  </button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full py-4 lg:h-1/6 rounded-md bg-gradient-to-b from-gray-950"></div>
        <div className="absolute bottom-0 left-0 w-full py-4 lg:h-1/6 rounded-md bg-gradient-to-t from-gray-950"></div>
      </div>
    </div>
  );
}

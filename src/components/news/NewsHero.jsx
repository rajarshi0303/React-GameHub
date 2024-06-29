import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function NewsHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  return (
    <div className="relative lg:h-screen">
      <div
        ref={ref}
        className="relative overflow-hidden w-full h-full bg-center bg-cover "
      >
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('/public/images/news/Newsbanner.jpg')`,
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            y: backgroundY,
          }}
        />
        <div className="relative z-10 max-w-screen-2xl mx-auto flex items-center px-6 lg:px-10 w-full h-full ">
          <div className="my-28 lg:my-0">
            <h3 className="mt-2 text-lg font-bold uppercase text-amber-600">
              Best of 2024
            </h3>
            <h2 className="text-3xl font-bold text-gray-100 uppercase lg:text-5xl">
              Gaming<span className="text-amber-500"></span>
            </h2>
            <h2 className="text-3xl font-bold text-gray-100 uppercase lg:text-5xl">
              World Class<span className="text-amber-500"> News</span>
            </h2>
            <p className="mt-4 max-w-lg text-gray-100">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam,
              eum modi incidunt adipisci quod porro et non exercitationem quasi
            </p>
            <div className="flex items-center mt-4">
              <button className="text-gray-950 bg-white font-bold text-sm px-2 uppercase text-center me-2 mb-2">
                PS18
              </button>
              <button className="text-gray-50 border border-white font-bold text-sm px-2 uppercase text-center me-2 mb-2">
                HD
              </button>
              <span className="mb-2 mx-4 text-white text-base">
                The Ragnarok
              </span>
              <div className="mb-2 flex items-center text-white text-base">
                <span className="w-4 h-4 mr-1 text-white">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </span>
                128 min
              </div>
            </div>
            <button className=" mt-4 w-fit py-2 px-6 gap-2 font-semibold uppercase text-sm tracking-wide text-white transition duration-300 rounded-full whitespace-nowrap border-4 border-amber-600 hover:bg-amber-600    ">
              <div className="flex items-center">
                <span className="w-4 h-4 mr-2">
                  <svg
                    data-slot="icon"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                    ></path>
                  </svg>
                </span>
                Watch Now
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full py-4 h-1/6 rounded-md bg-gradient-to-t from-gray-950"></div>
    </div>
  );
}

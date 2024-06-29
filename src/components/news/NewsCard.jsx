import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function NewsCard({ image, video }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <a>
        <figure className="relative group">
          <LazyLoadImage
            className="object-cover w-full h-full rounded-xl "
            src={image}
            alt="Cover Image"
          />
          <div className="flex justify-center items-center absolute bottom-0 left-0 w-full h-full rounded-md bg-gradient-to-t from-slate-950/70">
            <span
              onClick={() => setIsOpen(true)}
              className="relative inline-flex h-16 w-16 "
            >
              <svg
                className="w-16 h-16 text-white rounded-full"
                data-slot="icon"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z"
                ></path>
              </svg>
            </span>
          </div>
          <figcaption className="flex justify-end absolute bottom-0 right-0 px-4 py-4 w-full text-white">
            <div className="flex items-center">
              <button className="text-gray-950 bg-white font-semibold text-sm px-2 uppercase text-center me-2">
                01:56
              </button>
              <button className="text-gray-50 border border-white font-semibold text-sm px-2 uppercase text-center me-2 ">
                HD
              </button>
            </div>
          </figcaption>
        </figure>
        <div className="mt-3 flex justify-between items-center">
          <h1 className="text-white font-semibold text-lg">
            Mark Sniper sells House
          </h1>
          <button className="w-fit px-3 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-amber-600 rounded-md ">
            lives
          </button>
        </div>
        <div className="text-gray-300 text-sm flex space-x-4 uppercase">
          <h1 className="text-white text-xs">36k Views</h1>
          <h1 className="text-white text-xs">JANUARY 25, 2022</h1>
        </div>
      </a>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} video={video} />
    </div>
  );
}

const Modal = ({ isOpen, setIsOpen, video }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-4 lg:p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="rounded-lg w-full max-w-4xl shadow-xl cursor-default relative overflow-hidden"
          >
            <div className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="relative z-10">
              <div className="flex justify-end">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-fit rounded pb-2"
                >
                  <svg
                    class="w-6 h-6 text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </button>
              </div>
              <div className="w-full h-72 rounded-xl lg:h-[32rem] bg-gray-950">
                <iframe
                  className="rounded-xl h-full w-full"
                  src={video}
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen={true}
                ></iframe>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

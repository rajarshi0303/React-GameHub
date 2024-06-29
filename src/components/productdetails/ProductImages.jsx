import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";

import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import LoadingDots from "../common/LoadingDots";

export default function ProductImages({ id, selectedColor }) {
  const [data, setData] = useState();
  const [images, setImages] = useState([]);
  const [tag, setTag] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/productImages/${id}`)
      .then((response) => {
        //console.log("Images Data", response.data);
        setData(response.data);
        setTag(response.data.tag);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [api, setApi] = React.useState();
  const [current, setCurrent] = React.useState(0);

  useEffect(() => {
    if (data) {
      const variation = data.variations.find(
        (variation) => variation.color === selectedColor
      );
      if (variation) {
        setImages(variation.images);
        setCurrent(0);
      }
    }
  }, [data, selectedColor]);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", handleSelect);

    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  const handleDotClick = (index) => {
    setCurrent(index);
    api.scrollTo(index);
  };

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  const [isSmallDevice, setIsSmallDevice] = React.useState(
    window.innerWidth <= 768
  );

  React.useEffect(() => {
    const handleResize = () => {
      setIsSmallDevice(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function to remove the event listener on unmount This is important to avoid memory leaks.
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      {isLoading ? (
        <LoadingDots />
      ) : (
        <div className="sticky top-20 grid gap-3 lg:grid-cols-5 h-fit">
          <div className="order-last flex gap-4 lg:order-none lg:flex-col">
            <Carousel
              setApi={setApi}
              plugins={[plugin.current]}
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
              opts={{
                align: "start",
              }}
              orientation={isSmallDevice ? "horizontal" : "vertical"}
              className=""
            >
              <CarouselContent className="mt-0 lg:h-[30rem]">
                {images.map((image, index) => (
                  <CarouselItem
                    key={index}
                    className="pt-1 basis-32 lg:basis-1"
                  >
                    <div
                      onClick={() => handleDotClick(index)}
                      className="pb-2 overflow-hidden "
                    >
                      <LazyLoadImage
                        src={image}
                        loading="lazy"
                        alt="Photo by Himanshu Dewangan"
                        className="h-28 w-full object-cover object-center rounded-lg"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          <div className="h-96 lg:h-[30rem] relative overflow-hidden rounded-lg  lg:col-span-4">
            <AnimatePresence>
              <motion.img
                key={images[current]}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                src={images[current]}
                loading="lazy"
                alt="Photo by Himanshu Dewangan"
                className="h-full w-full object-cover object-center"
              />
            </AnimatePresence>
            {tag && (
              <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm uppercase tracking-wider text-white">
                {tag}
              </span>
            )}
            <a className="absolute right-4 top-4 inline-block rounded-lg border bg-white px-3.5 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:text-gray-700 md:text-base">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </a>
          </div>
        </div>
      )}
    </>
  );
}

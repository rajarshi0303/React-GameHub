import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Heading from "../common/Heading";

export default function FeaturedStore() {
  const [products, setproducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/products", { params: { _limit: 8 } })
      .then((response) => {
        setproducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [api, setApi] = React.useState();
  const [current, setCurrent] = React.useState(0);

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

  return (
    <div>
      <div className="max-w-screen-2xl mx-auto bg-gray-950 lg:pt-8 ">
        <Heading
          title="Gaming Products"
          highlight="corner"
          description="Compete with 100 players on a remote island for winner takes showdown known issue where certain skin strategic"
        />

        <Carousel setApi={setApi} opts={{ loop: true }}>
          <CarouselContent>
            {products.map((product, index) => (
              <CarouselItem
                key={index}
                className={` basis-auto flex items-center justify-center ${
                  current === index ? "" : "brightness-75"
                }`}
              >
                <div class="flex-shrink-0 mx-6 my-10 relative overflow-hidden bg-gray-800 rounded-lg w-80 h-96 shadow-lg group">
                  <svg
                    class="absolute bottom-0 left-0 mb-8 scale-150 group-hover:scale-[1.65] transition-transform text-gray-700"
                    viewBox="0 0 375 283"
                    fill="none"
                  >
                    <rect
                      x="159.52"
                      y="175"
                      width="152"
                      height="152"
                      rx="8"
                      transform="rotate(-45 159.52 175)"
                      fill="currentColor"
                    />
                    <rect
                      y="107.48"
                      width="152"
                      height="152"
                      rx="8"
                      transform="rotate(-45 0 107.48)"
                      fill="currentColor"
                    />
                  </svg>
                  <div class="relative w-full h-full py-10 px-10 flex items-center justify-center group-hover:scale-110 transition-transform ">
                    <div
                      class="block absolute w-full h-full bottom-0 left-0 -mb-24 ml-3 "
                      style={{
                        background:
                          "radial-gradient(black, transparent 60%); transform: rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1); opacity: 0.2",
                      }}
                    ></div>
                    <LazyLoadImage
                      class="relative w-full h-full object-contain "
                      src={product.thumbnail}
                      alt=""
                    />
                  </div>
                  <div class="absolute bottom-0 w-full text-white px-6 pb-6 mt-6">
                    <span class="block capitalize opacity-75 -mb-1">
                      {product.brand}
                    </span>
                    <div class="flex justify-between">
                      <span class="block capitalize font-semibold text-xl">
                        {product.name}
                      </span>
                      <span class=" bg-white rounded-full text-orange-500 text-sm font-bold px-3 py-2 leading-none flex items-center">
                        $36.00
                      </span>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 lg:left-10" />
          <CarouselNext className="right-4 lg:right-10" />
        </Carousel>
        <div className="flex justify-center pb-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`mx-1 w-4 h-1 rounded-full ${
                current === index ? "bg-white" : "bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

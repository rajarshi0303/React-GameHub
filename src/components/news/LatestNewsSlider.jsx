import React from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { LazyLoadImage } from "react-lazy-load-image-component";

export default function LatestNewsSlider() {
  const images = [
    { url: "/public/images/news/trand_news01.jpg", type: "sport" },
    { url: "/public/images/news/trand_news02.jpg", type: "action" },
    { url: "/public/images/news/trand_news03.jpg", type: "explore" },
  ];

  function handleColor(type) {
    const colorMap = {
      action: "bg-red-600",
      sport: "bg-lime-600",
      explore: "bg-blue-600",
    };
    return colorMap[type] || ""; // If type doesn't match, return an empty string
  }

  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  return (
    <>
      <Carousel
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        className=""
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index} className="pl-0">
              <div className="relative">
                <div className="absolute bottom-0 left-0 w-full h-full rounded-md bg-gradient-to-t from-slate-950/50"></div>
                <LazyLoadImage
                  src={image.url}
                  loading="lazy"
                  alt="Photo by Himanshu Dewangan"
                  className="h-[38rem] w-full object-cover object-center"
                />
                <div className="absolute w-full bottom-0 left-0 px-10 py-8 flex flex-col text-white group-hover:inset-0 group-hover:items-center justify-center group-hover:text-center">
                  <button
                    className={`${handleColor(image.type)} 
                   w-fit px-3 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-md `}
                  >
                    {image.type}
                  </button>
                  <h1 className="mt-3 text-gray-400 font-bold text-sm">
                    JANUARY 25, 2022
                  </h1>
                  <h1 className="mt-3text-white font-bold text-xl capitalize hover:cursor-pointer hover:text-red-600">
                    Mark was in night before NFL
                  </h1>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
}

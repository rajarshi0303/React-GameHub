import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { LazyLoadImage } from "react-lazy-load-image-component";

export default function LatestArtical() {
  const images = [
    { url: "/public/images/news/trand_news01.jpg", type: "sport" },
    { url: "/public/images/news/trand_news02.jpg", type: "action" },
    { url: "/public/images/news/trand_news03.jpg", type: "explore" },
    { url: "/public/images/news/article04.jpg", type: "sport" },
    { url: "/public/images/news/article05.jpg", type: "explore" },
    { url: "/public/images/news/article06.jpg", type: "action" },
    { url: "/public/images/news/trending_thumb04.jpg", type: "explore" },
    { url: "/public/images/news/trending_thumb05.jpg", type: "sport" },
    { url: "/public/images/news/trending_thumb06.jpg", type: "action" },
  ];

  function handleColor(type) {
    const colorMap = {
      action: "bg-red-600",
      sport: "bg-lime-600",
      explore: "bg-blue-600",
    };
    return colorMap[type] || ""; // If type doesn't match, return an empty string
  }

  const [isSmallDevice, setIsSmallDevice] = React.useState(
    window.innerWidth <= 768
  );

  React.useEffect(() => {
    console.log("re-render");
    const handleResize = () => {
      setIsSmallDevice(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function to remove the event listener on unmount This is important to avoid memory leaks.
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false, stopOnMouseEnter: true })
  );
  return (
    <>
      <Carousel
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        opts={{
          align: "start",
          loop: true,
        }}
        orientation={isSmallDevice ? "horizontal" : "vertical"}
        className="w-full"
      >
        <CarouselContent className="lg:h-[38rem]">
          {images.map((image, index) => (
            <CarouselItem key={index} className="pt-1 lg:basis-1">
              <li className="flex flex-col py-3 sm:flex-row sm:justify-between">
                <div className="flex w-full space-x-2 sm:space-x-4">
                  <LazyLoadImage
                    className="flex-shrink-0 object-cover w-20 h-20 dark:border- rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500"
                    src={image.url}
                    alt="Polaroid camera"
                  />
                  <div className="flex items-center w-full py-2">
                    <div>
                      <button
                        className={`${handleColor(image.type)} 
                        w-fit px-3 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform rounded-md`}
                      >
                        {image.type}
                      </button>
                      <h1 className="mt-2 text-gray-400 font-bold text-sm">
                        JANUARY 25, 2022
                      </h1>
                      <h1 className=" text-white font-bold text-lg capitaliz tracking-tighter hover:cursor-pointer ">
                        Mark was in night before NFL was in night
                      </h1>
                    </div>
                  </div>
                </div>
              </li>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
}

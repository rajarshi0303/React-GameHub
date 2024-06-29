import React from "react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import "react-lazy-load-image-component/src/effects/blur.css";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export default function HomeHeroSlider() {
  const slides = [
    { url: "public/images/slider/homehero/slider_image01.webp" },
    { url: "public/images/slider/homehero/slider_image02.webp" },
    { url: "public/images/slider/homehero/slider_image03.webp" },
    { url: "public/images/slider/homehero/slider_image04.webp" },
    { url: "public/images/slider/homehero/slider_image05.webp" },
  ];

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

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  return (
    <div className="max-w-screen-lg mx-auto">
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        className="w-full"
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem
              key={index}
              className="w-full lg:w-32 px-0 flex items-center justify-center"
            >
              <motion.div
                initial={false}
                animate={{
                  opacity: current === index ? 1 : 0,
                  scale: current === index ? 1 : 0.9,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                }}
                transition={{
                  duration: 0,
                  delay: current === index ? 0.4 : 0,
                }}
              >
                <img className="h-80 lg:h-[34rem] " src={slide.url} alt="" />
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

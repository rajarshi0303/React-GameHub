import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export default function StoreHero() {
  const products = [
    { id: 1, url: "/public/images/store/product_01.png" },
    { id: 2, url: "/public/images/store/product_02.png" },
    { id: 3, url: "/public/images/store/product_03.png" },
    { id: 4, url: "/public/images/store/product_04.png" },
    { id: 5, url: "/public/images/store/product_02.png" },
    { id: 6, url: "/public/images/store/product_04.png" },
  ];

  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true, stopOnMouseEnter: false })
  );

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
    <div
      className="min-h-screen max-w-screen-2xl mx-auto"
      style={{
        backgroundImage: `url('/public/images/store/bg03.avif')`,
        backgroundPosition: "bottom",
        backgroundSize: "cover",
      }}
    >
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        className=""
        opts={{ loop: true }}
      >
        <CarouselContent>
          {products.map((product, index) => (
            <CarouselItem key={product.id} className="pl-0 h-full">
              <div className="relative flex flex-col items-center justify-between gap-4 lg:h-full lg:flex-row">
                <div className="lg:w-3/5 lg:flex justify-center lg:items-center ">
                  <figure>
                    <picture>
                      <source
                        className=" h-full w-full"
                        srcSet={product.url}
                        media="(min-width: 1024px)"
                      />
                      <source
                        className="w-full h-full"
                        srcSet={product.url}
                        media="(min-width: 300px)"
                      />
                      <LazyLoadImage
                        className="object-cover object-center w-full h-[22rem] lg:h-[37rem] pt-16 lg:pt-24"
                        src={product.url}
                        alt=""
                      />
                    </picture>
                  </figure>
                </div>

                <div className="px-8 mb-6 lg:mb-0  lg:order-first lg:w-2/5">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{
                      opacity: 0,
                    }}
                    transition={{
                      duration: current === index ? 0.6 : 0,
                      delay: current === index ? 0.6 : 0,
                      ease: "easeOut",
                    }}
                  >
                    <h2 className="text-3xl text-gray-100 capitalize lg:text-4xl">
                      Introducing the New console and accessories
                    </h2>
                    <h3 className="mt-8 w-fit text-xl uppercase text-amber-600 ">
                      DualSense Edge™ Wireless Controller
                    </h3>
                    <p className="mt-2 text-gray-200">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Ipsam, eum modi incidunt adipisci quod porro et non
                      exercitationem quasi
                    </p>
                    <button className="mt-4 w-fit py-2 px-6 font-semibold  text-base tracking-wide text-white rounded-full bg-amber-700 hover:bg-amber-800">
                      Find Out More
                    </button>
                  </motion.div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex justify-center lg:mt-4 lg:max-w-screen-lg mx-auto">
        <div className="flex lg:grid lg:grid-cols-6 gap-2 overflow-x-auto">
          {products.map((product, index) => (
            <LazyLoadImage
              key={index}
              onClick={() => handleDotClick(index)}
              src={product.url} // Replace with your image source
              className={`h-24 w-full object-cover object-top lg:max-w-56 rounded-lg ${
                current === index ? "border-2 border-black" : "opacity-60"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

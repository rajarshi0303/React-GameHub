import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { NavLink } from "react-router-dom";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export default function GamesPageSlider() {
  const [games, setgames] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/gameslider")
      .then((response) => {
        setgames(response.data);
        console.log(response.data);
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
    <div className="h-screen">
      <Carousel setApi={setApi} opts={{ loop: true }}>
        <CarouselContent>
          {games.map((game, index) => (
            <CarouselItem key={game.id} className="pl-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: current === index ? 1 : 0,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  duration: current === index ? 0.7 : 0,
                  delay: current === index ? 0.4 : 0,
                }}
                className="relative h-full"
              >
                <figure className="relative">
                  <picture>
                    <source
                      className=" h-full w-full"
                      srcSet={game.url}
                      media="(min-width: 1024px)"
                    />
                    <source
                      className="w-full h-full"
                      srcSet={game.mobile}
                      media="(min-width: 300px)"
                    />
                    <LazyLoadImage
                      className="object-cover lg:object-right-top w-full h-96 lg:h-[82vh]"
                      src={game.mobile}
                      alt=""
                    />
                  </picture>
                  <figcaption className="absolute bottom-0 left-0 w-full h-1/6 bg-gradient-to-t from-slate-950 text-white"></figcaption>
                  <figcaption className="hidden lg:block absolute bottom-0 left-0 w-2/5 h-full bg-gradient-to-r from-slate-950/80"></figcaption>
                </figure>

                <div className="max-w-screen-2xl mx-auto px-8 py-6 lg:absolute lg:inset-0 flex items-center lg:h-full bg-gray-950 lg:bg-gray-900/10">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{
                      opacity: 0,
                    }}
                    transition={{
                      duration: current === index ? 0.8 : 0,
                      delay: current === index ? 0.8 : 0,
                      ease: "easeOut",
                    }}
                    className="text-center lg:text-left lg:px-10 max-w-lg"
                  >
                    <LazyLoadImage
                      className="max-w-72 h-24 hidden lg:block"
                      src={game.logo}
                      alt=""
                    />
                    <h1 className="mt-4 text-3xl text-white lg:text-4xl">
                      {game.title}
                    </h1>
                    <p className="mt-4 text-lg lg:text-base text-gray-100">
                      {game.description}
                    </p>
                    <button className="mt-4 w-fit py-2 px-6 font-semibold  text-base tracking-wide text-white rounded-full bg-amber-700 hover:bg-amber-800">
                      <NavLink to={`/game/${game.id}`}>Find Out More</NavLink>
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="flex justify-center lg:mt-4 lg:max-w-screen-lg mx-auto">
        <div className="flex lg:grid lg:grid-cols-6 gap-2 overflow-x-auto">
          {games.map((game, index) => (
            <LazyLoadImage
              key={index}
              onClick={() => handleDotClick(index)}
              src={game.mobile} // Replace with your image source
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

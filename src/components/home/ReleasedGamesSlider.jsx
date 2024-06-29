import React from "react";
import Autoplay from "embla-carousel-autoplay";
import axios from "axios";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import LoadingDots from "../common/LoadingDots";

import Heading from "../common/Heading";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const ContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delay: 0.4,
      when: "beforeChildren",
      staggerChildren: 0.3, // Adjust the stagger delay as needed
    },
  },
};

const imageVariant = {
  hidden: { opacity: 0, x: 70 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      type: "tween",
      ease: "easeOut",
      duration: 0.4, // Adjust the duration as needed
    },
  },
};

export default function ReleasedGamesSlider() {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/games?_start=1&_end=4")
      .then((response) => {
        setGames(response.data);
        setIsLoading(false);
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

  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  return (
    <>
      <Heading
        title="Released"
        highlight="games"
        description="Compete with 100 players on a remote island for winner takes showdown known issue where certain skin strategic"
      />
      {isLoading ? (
        <LoadingDots />
      ) : (
        <div className="mt-14 lg:flex justify-center max-w-screen-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, type: "tween", duration: 0.4 }} // Adjust the duration as needed
            viewport={{ once: true }}
          >
            <Carousel
              setApi={setApi}
              plugins={[plugin.current]}
              className="p-4 lg:p-2 md:max-w-4xl h-fit shadow-xl border-gray-700 bg-gray-900"
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
              opts={{ loop: true }}
            >
              <CarouselContent>
                {games.map((game) => (
                  <CarouselItem key={game.id}>
                    <Card game={game} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </motion.div>

          <motion.div
            variants={ContainerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-1 mx-4 mt-4 lg:mt-0 lg:mx-2 hidden lg:block"
          >
            {games.map((game, index) => (
              <motion.div key={index} variants={imageVariant}>
                <LazyLoadImage
                  onClick={() => handleDotClick(index)}
                  src={game.heroMobile} // Replace with your image source
                  alt="nav images"
                  className={`w-full object-cover object-top h-[138px] lg:w-[20rem] cursor-pointer ${
                    current === index ? " " : "opacity-60"
                  }`}
                  effect="blur"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}
    </>
  );
}
function Card({ game }) {
  return (
    <div className="flex flex-col items-center md:flex-row text-gray-100">
      <LazyLoadImage
        className="object-cover w-full h-full"
        src={game.thumbnail}
        alt="released game image"
        effect="blur"
      />
      <div className="pt-4 lg:pt-0 flex flex-col justify-between leading-normal">
        <div className="flex items-center px-2 lg:px-8">
          <span className="font-bold pr-2">Rating : </span>

          <span className="flex items-center gap-2 rounded">
            <span className="font-semibold text-lg text-white">
              {game.review}
            </span>
            <span
              className="flex gap-1 text-white"
              role="img"
              aria-label="Rating: 4 out of 5 stars"
            >
              {Array.from({ length: 5 }).map((_, index) => (
                <span key={index} aria-hidden="true">
                  <svg
                    className="w-4 h-4 text-amber-600 me-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill={
                      index < Math.round(game.review) ? "currentColor" : "none"
                    }
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                </span>
              ))}
            </span>
          </span>
        </div>

        <div className="mt-4 relative overflow-hidden">
          <LazyLoadImage
            className=" h-12 relative -left-20 "
            src="public/images/design/released_game_brush.webp"
            alt="brush image"
          />
          <h1 className="py-2 px-2 lg:px-8 text-xl font-bold absolute inset-0 capitalize ">
            {game.name}
          </h1>
        </div>
        <div className="px-2 lg:px-8">
          <h1 className="font-bold mt-8">
            Catogery :{" "}
            <span className="px-2 capitalize font-medium text-gray-300">
              {game.generes.split(",").join(" / ")}
            </span>
          </h1>
          <h1 className="font-bold mt-2">
            Model :{" "}
            <span className="px-2  font-medium text-gray-300">
              Complete 100 players
            </span>
          </h1>
          <h1 className="font-bold mt-2">
            Platform :{" "}
            <span className="px-2 uppercase font-medium text-gray-300">
              {game.platform}
            </span>
          </h1>
          <p className="mt-4 text-gray-300 font-medium">
            Compete with 100 players on a remote island for winner takes
            showdown known issue where certain skin strategic
          </p>

          <NavLink to={`/game/${game.id}`}>
            <div className=" group w-fit">
              <button className="mt-6 skew-x-[-18deg] bg-amber-600">
                <span className="block py-2 px-5 text-white -skew-x-[-18deg] z-10">
                  More Info
                </span>
              </button>
              <button className="ml-2 py-2 w-1 text-amber-600 bg-amber-600 skew-x-[-18deg] group-hover:ml-0">
                .
              </button>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

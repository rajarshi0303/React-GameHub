import React from "react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import LazyVideo from "../common/LazyVideo";

export default function PlayOnlineHero() {
  const games = [
    {
      name: "Amazing Spiderman",
      video: "/public/videos/playonline/slider01.mp4",
      review: 4.1,
      genre: "Action",
      link: "https://www.crazygames.com/game/amazing-strange-rope-police-vice-spider",
    },
    {
      name: "Forward Assult",
      video: "/public/videos/playonline/slider02.mp4",
      review: 4.6,
      genre: "Action / Shooting",
      link: "https://www.crazygames.com/game/forward-assault",
    },
    {
      name: "Dead Shot",
      video: "/public/videos/playonline/slider03.mp4",
      review: 4.9,
      genre: "Action / Shooting",
      link: "https://www.crazygames.com/game/hazmob-fps-online-shooter",
    },
    {
      name: "Tower Defense",
      video: "/public/videos/playonline/slider04.mp4",
      review: 4.0,
      genre: "Action / Adventure",
      link: "https://www.crazygames.com/game/skillfite-io",
    },
    {
      name: "Tower Defense",
      video: "/public/videos/playonline/slider05.mp4",
      review: 4.7,
      genre: "Car / Simulation",
      link: "https://www.crazygames.com/t/car?sorting=most-played",
    },
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
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );
  return (
    <div className="px-8 pb-8">
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        className="w-full"
        opts={{ loop: true }}
      >
        <CarouselContent>
          {games.map((game, index) => (
            <CarouselItem key={index} className="">
              <motion.div className="relative">
                <figure className="relative">
                  <LazyVideo
                    className="object-cover w-full lg:h-96 rounded-xl"
                    src={game.video}
                    type="video/mp4"
                    autoPlay
                    loop
                    muted
                  ></LazyVideo>
                  <figcaption className="hidden lg:block absolute bottom-0 left-0 w-2/5 h-full bg-gradient-to-r from-slate-900/80"></figcaption>
                </figure>

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{
                    opacity: current === index ? 1 : 0,
                    y: current === index ? 0 : 50,
                    transition: {
                      duration: 0.8,
                      ease: "easeInOut",
                    },
                  }}
                  exit={{
                    opacity: 0,
                    y: 50,
                    transition: {
                      duration: 0.5,
                      ease: "easeInOut",
                    },
                  }}
                  transition={{
                    delay: current === index ? 0.8 : 0,
                  }}
                  className="px-4 py-8 lg:absolute lg:inset-0 flex items-center lg:h-full "
                >
                  <div className="text-center lg:text-left lg:px-10 max-w-lg">
                    <h1 className="font-semibold text-xl text-white lg:text-2xl capitalize">
                      {game.name}
                    </h1>

                    <div className="mt-4 hidden lg:block">
                      <h4 className="text-gray-400">Reviews</h4>
                      <span className="flex items-center justify-center lg:justify-start gap-2 rounded">
                        <span className="font-semibold text-base text-white">
                          {game.review}
                        </span>
                        <span
                          className="flex gap-1 text-white"
                          role="img"
                          aria-label="Rating: 4 out of 5 stars"
                        >
                          {Array.from({ length: game.review }).map(
                            (_, index) => (
                              <span key={index} aria-hidden="true">
                                <svg
                                  className="h-3 w-3"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill={
                                    index < Math.round(game.review)
                                      ? "currentColor"
                                      : "none"
                                  }
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </span>
                            )
                          )}
                        </span>
                      </span>
                    </div>
                    <div className="mt-4 flex justify-center items-center lg:justify-start gap-2 ">
                      <div className="flex items-center self-center ">
                        <svg
                          className="h-4 w-4 text-white"
                          fill="currentColor"
                          viewBox="0 0 32 32"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M1.615 4.123l14.385-4.123 14.385 4.128v0.491c0 4.325-0.011 8.65 0 12.975 0.022 6.834-4.718 12.498-10.953 14.021-1.361 0.333-2.735 0.415-4.131 0.375-2.306-0.063-4.449-0.705-6.306-1.785l0.063 0.034c-3.863-2.197-6.279-5.473-7.18-9.84-0.168-0.797-0.264-1.713-0.264-2.651 0-0.033 0-0.066 0-0.1l-0 0.005q0.006-6.487 0-12.975zM3.52 5.574v0.527c0 3.778-0.006 7.555 0.005 11.333-0 0.027-0 0.058-0 0.090 0 0.873 0.083 1.727 0.242 2.553l-0.014-0.084c0.59 2.999 2.062 5.475 4.443 7.372 2.961 2.355 6.342 3.186 10.062 2.53 3.024-0.532 5.504-2.037 7.44-4.413 1.919-2.354 2.785-5.084 2.784-8.105q0-5.666 0-11.333c0-0.154-0.012-0.306-0.021-0.478l-12.464-3.576z"></path>{" "}
                          <path d="M10.061 24.718l-2.417-0.651c-0.219-0.82-0.433-1.616-0.656-2.437l7.439-7.93 1.074 1.989-6.805 6.813c0.027 0.165 0.047 0.281 0.068 0.418l0.38 0.124 6.852-6.841 1.976 1.052c-0.215 0.326-7.019 6.74-7.912 7.462z"></path>{" "}
                          <path d="M22.794 18.688c0.025 0.49-0.27 0.791-0.623 0.977-0.599 0.317-1.236 0.562-1.944 0.873 0.254-0.569 0.473-1.059 0.703-1.572q-0.914-0.916-1.822-1.822t-1.788-1.786l-1.822-1.822q-0.894-0.894-1.789-1.788c-0.604-0.604-1.218-1.2-1.781-1.787 0.113-0.508 0.375-0.81 0.75-0.994 0.574-0.281 1.162-0.529 1.745-0.789 0.022-0.009 0.054 0.008 0.117 0.021-0.23 0.51-0.456 1.014-0.69 1.534z"></path>{" "}
                          <path d="M23.724 10.53l-3.896 3.931-2.556-2.56 3.912-3.924z"></path>{" "}
                          <path d="M25.547 9.647c-0.182 0.381-0.442 0.607-0.796 0.822l-3.478-3.477c0.185-0.346 0.468-0.619 0.812-0.786l0.011-0.005z"></path>{" "}
                        </svg>
                      </div>
                      <div className="flex flex-col gap-0 items-start justify-center">
                        <h4 className="text-sm text-slate-200 capitalize">
                          {game.genre}
                        </h4>
                      </div>
                    </div>

                    <p className="mt-2 text-sm lg:text-sm text-gray-100">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Labore, hic. Corrupti, laborum. Dolorum adipisci aliquam
                    </p>
                    <a href={game.link}>
                      <button className="mt-4 w-fit py-1 px-4 gap-2  text-base tracking-wide text-white transition duration-300 rounded-full whitespace-nowrap bg-amber-700 hover:bg-amber-800    ">
                        Play Now
                      </button>
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden lg:flex -left-4 bg-gray-600" />
        <CarouselNext className="hidden lg:flex -right-4 bg-gray-600" />
      </Carousel>
    </div>
  );
}

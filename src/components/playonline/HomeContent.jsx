import React from "react";
import VideoCard from "./VideoCard";
import axios from "axios";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

import PlayOnlineHero from "./PlayOnlineHero";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
} from "@/components/ui/carousel";

export default function HomeContent() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/playonlinegames")
      .then((response) => {
        setGames(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const genresList = ["featured", "action", "car"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <PlayOnlineHero />
      {genresList.map((genre, index) => (
        <div key={index}>
          <GenresHighlight key={index} games={games} genre={genre} />
        </div>
      ))}
    </motion.div>
  );
}

function GenresHighlight({ games, genre }) {
  let filteredGames = games.filter((game) => {
    return game.genre.toLowerCase().includes(genre);
  });

  return (
    <>
      <div className=" mb-10 px-6 lg:px-8">
        <div className="w-full flex items-center justify-between">
          <h1 className="mb-4 text-base font-semibold capitalize px-3 border-l-4 text-gray-100 border-amber-600 lg:text-lg">
            {genre} Games
          </h1>
          <NavLink to={`/playonline/genre?genres=${genre}`}>
            <h1 className="px-4 text-base font-semibold text-amber-600">
              View More
            </h1>
          </NavLink>
        </div>

        <Carousel className="w-full">
          <CarouselContent>
            {filteredGames.map((game, index) => (
              <CarouselItem key={index} className="basis-1/2 lg:basis-1/3">
                <VideoCard id={game.id} game={game} />
              </CarouselItem>
            ))}

            <CarouselItem className="basis-1/2 lg:basis-1/3">
              <NavLink to={`/playonline/genre?genres=${genre}`}>
                <div className="w-full border-2 h-full flex items-center justify-center border-dashed rounded-lg border-gray-300 dark:border-gray-600">
                  <h1 className="text-white font-semibold text-center capitalize">
                    View All <br /> {genre} Games
                  </h1>
                </div>
              </NavLink>
            </CarouselItem>
          </CarouselContent>
          <CarouselNext className="hidden lg:flex -right-3 bg-gray-600 hover:bg-gray-300" />
        </Carousel>
      </div>
    </>
  );
}

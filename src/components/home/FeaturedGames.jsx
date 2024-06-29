import React from "react";
import { useState, useEffect } from "react";
import GameCard from "../games/GameCard";
import axios from "axios";
import Heading from "../common/Heading";

import { motion } from "framer-motion";
import LoadingDots from "../common/LoadingDots";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      delay: 0.4,
      staggerChildren: 0.1, // Adjust the stagger delay as needed
      duration: 0.5, // Add duration
      ease: "easeOut", // Add easing
    },
  },
};

const cardVarient = {
  hidden: { opacity: 0, scale: 0.8 }, // Add y for a slight upward motion
  show: { opacity: 1, scale: 1 },
  transition: {
    duration: 0.5, // Add duration
    ease: "easeOut", // Add easing
  },
};

export default function FeaturedGames() {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios
      .get("http://localhost:3000/games", { params: { _limit: 8 } })
      .then((response) => {
        setGames(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="max-w-screen-2xl mx-auto px-4 lg:px-20 mt-14">
      <Heading
        title="Just Featured"
        highlight="games"
        description="Compete with 100 players on a remote island for winner takes showdown known issue where certain skin strategic"
      />
      {isLoading ? (
        <LoadingDots />
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-14 grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3 lg:grid-cols-3 xl:grid-cols-4"
        >
          {games.map((game) => (
            <motion.div key={game.id} variants={cardVarient}>
              <GameCard
                id={game.id}
                url={game.thumbnail}
                name={game.name}
                platform={game.platform}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

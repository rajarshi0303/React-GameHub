import React from "react";
import VideoCard from "./VideoCard";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function GameGenre() {
  const [searchParams] = useSearchParams();
  //console.log("Catogery:-", searchParams.get("genres")); // ▶ URLSearchParams {}

  const catogerys = searchParams.get("genres");
  const search = searchParams.get("search");

  const [games, setGames] = useState([]);
  const [filteredgames, setFilteredGames] = useState([]);
  const [title, setTitle] = useState("");
  const navigateTo = useNavigate();

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

  let GamesCategoryFilter = () => {
    const selectedCategories = catogerys.split(",");
    if (games.length > 0) {
      let filteredGames = games.filter((game) => {
        // Checking if any of the selected categories are included in the game's genres
        return selectedCategories.some((category) =>
          game.genre.toLowerCase().includes(category)
        );
      });

      return filteredGames; // Return the filtered result
    }
  };

  function handleSearch() {
    const searchTearm = search.toLowerCase();
    let filteredGames = games.filter((game) => {
      return game.name.toLowerCase().includes(searchTearm);
    });
    return filteredGames;
  }

  useEffect(() => {
    if (games.length > 0) {
      // First, filter based on search term
      if (search) {
        let filteredResult = handleSearch();
        setFilteredGames(filteredResult);
        let title = `Search Results For '${search}'`;
        setTitle(title);
      }
      // If there's no search term, then filter based on categories
      if (!search && catogerys) {
        let filteredResult = GamesCategoryFilter();
        setFilteredGames(filteredResult);
        let title = catogerys.split(",").join(" / ") + " Games";
        setTitle(title);
      }
      if (!search && !catogerys) {
        navigateTo("/playonline/");
      }
    }
  }, [games, catogerys, search]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="mb-7 px-6 lg:px-8"
    >
      <div className="w-full mb-4 lg:mb-8 flex items-center justify-between">
        <h1 className=" text-base capitalize font-semibold px-3 border-l-4 text-gray-100 border-amber-600 lg:text-xl">
          {title}
        </h1>
        <h1 className="text-base font-semibold text-amber-600">
          {filteredgames.length} items
        </h1>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-4 mb-4">
        <AnimatePresence initial={false}>
          {filteredgames.map((game, index) => (
            <motion.div
              key={game.id}
              layoutId={`gameCard-${game.id}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                opacity: { duration: 0.2, ease: "easeInOut" },
                scale: { duration: 0.2, ease: "easeInOut" },
                layout: { duration: 0.2, ease: "easeInOut" }, // Add layout animation
              }}
              layout // Enable layout animation
            >
              <VideoCard key={index} id={game.id} game={game} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

import React from "react";
import GameCard from "./GameCard";
import { motion, AnimatePresence } from "framer-motion";

export default function GameCardList({ games }) {
  return (
    <div>
      <div className="mt-16">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence initial={false}>
            {games.map((game) => (
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
                <GameCard
                  key={game.id}
                  id={game.id}
                  url={game.thumbnail}
                  name={game.name}
                  platform={game.platform}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

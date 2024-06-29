import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useUserStore } from "@/store/userStore";
import { usePlayOnlineLibrary } from "@/store/playonlineLibraryStore";

import VideoCard from "./VideoCard";

export default function PlayonlineLibrary() {
  const navigateTo = useNavigate();
  const user = useUserStore((state) => state.user);
  const initOnlineGames = usePlayOnlineLibrary(
    (state) => state.initOnlineGames
  );
  const onlineGames = usePlayOnlineLibrary((state) => state.onlineGames);

  useEffect(() => {
    if (user) {
      initOnlineGames(user.id);
    } else {
      navigateTo("/signin");
    }
  }, [user]);

  console.log("playonline library");
  return (
    <div className="mb-7 px-6 lg:px-8">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-4 mb-4">
        {onlineGames.map((game) => (
          <VideoCard key={game.id} id={game.gameId} game={game} />
        ))}
      </div>
    </div>
  );
}

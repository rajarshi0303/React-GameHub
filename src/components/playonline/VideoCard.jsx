import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { usePlayOnlineLibrary } from "@/store/playonlineLibraryStore";
import { useUserStore } from "@/store/userStore";

export default function VideoCard({ id, game }) {
  const onlineGames = usePlayOnlineLibrary((state) => state.onlineGames);
  const addOnlineGame = usePlayOnlineLibrary((state) => state.addOnlineGame);
  const removeOnlineGame = usePlayOnlineLibrary(
    (state) => state.removeOnlineGame
  );
  const user = useUserStore((state) => state.user);

  const [isHovered, setIsHovered] = useState(false);

  //checking the logic of isGameInLibrary only when the mouse is hovered,
  const [isGameInLibrary, setIsGameInLibrary] = useState(false);
  const handleMouseOver = () => {
    setIsHovered(true);
    setIsGameInLibrary(onlineGames.some((gameCart) => gameCart.gameId === id));
    console.log(isGameInLibrary);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  return (
    <div>
      <figure className="relative group">
        <a
          href={game.link}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          {isHovered ? (
            <video
              className="object-cover w-full lg:h-52 rounded-md"
              autoPlay
              loop
              muted
            >
              <source src={game.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <LazyLoadImage
              className="object-cover w-full lg:h-52 rounded-md"
              src={game.image}
              alt="Cover Image"
            />
          )}
          <div className="absolute bottom-0 left-0 w-full h-full rounded-md bg-gradient-to-t from-slate-950/70 group-hover:hidden"></div>
          <figcaption className="absolute bottom-0 left-0 px-4 pb-2 w-fit text-gray-300 group-hover:hidden">
            <h3 className=" text-xs lg:text-sm uppercase font-semibold">
              {game.name}
            </h3>
          </figcaption>
        </a>
        <div className="absolute top-2 right-2 w-fit rounded-bl-sm text-white hidden group-hover:block">
          {isGameInLibrary ? (
            <button
              onClick={() => removeOnlineGame(id)}
              class="flex items-center px-2 py-1 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-400/50 rounded-full hover:bg-gray-500 "
            >
              <svg
                className="h-5 w-5 mx-1"
                data-slot="icon"
                fill="none"
                stroke-width="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
                ></path>
              </svg>

              <span class="mx-1">Remove</span>
            </button>
          ) : (
            <button
              onClick={() =>
                addOnlineGame({
                  userId: user.id,
                  gameId: game.id,
                  name: game.name,
                  image: game.image,
                  video: game.video,
                  link: game.link,
                })
              }
              class="flex items-center px-2 py-1 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-400/50 rounded-full hover:bg-gray-500 "
            >
              <svg
                className="h-5 w-5 mx-1"
                data-slot="icon"
                fill="none"
                stroke-width="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
                ></path>
              </svg>

              <span class="mx-1">save</span>
            </button>
          )}
        </div>
      </figure>
    </div>
  );
}

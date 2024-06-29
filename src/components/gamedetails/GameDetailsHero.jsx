import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import LoadingDots from "../common/LoadingDots";
import { useGameStore } from "@/store/gameStore";
import { useUserStore } from "@/store/userStore";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};
const detailsVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 1, // Delay the animation for 1 second
      duration: 0.5,
      ease: "easeInOut",
      staggerChildren: 0.2, // Stagger the animation of child components
      delayChildren: 1.5, // Delay the animation of child components
    },
  },
};

const tagVariants = {
  hidden: { x: -50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring", // Use a spring animation
      stiffness: 200, // Adjust the stiffness of the spring
      damping: 15, // Adjust the damping of the spring
    },
  },
};
export default function GameDetailsHero({ id }) {
  const addGame = useGameStore((state) => state.addGame);
  const removeGame = useGameStore((state) => state.removeGame);
  const games = useGameStore((state) => state.gameCart);
  const user = useUserStore((state) => state.user);

  const [game, setGame] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/games/${id}`)
      .then((response) => {
        setGame(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const isGameInCart = games.some((gameCart) => gameCart.gameId === game.id);

  return (
    <div>
      {isLoading ? (
        <LoadingDots />
      ) : (
        <div className="h-screen bg-gray-950">
          <figure className="hidden lg:block relative">
            {game.herotype === "image" ? (
              <img
                className="max-auto w-full h-screen object-cover object-right"
                src={game.hero}
                alt=""
              />
            ) : (
              <video
                className="max-auto w-full max-h-screen object-cover"
                autoPlay
                loop
                muted
              >
                <source src={game.hero} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
            <figcaption className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-slate-950 p-20 text-white"></figcaption>
            <figcaption className="absolute bottom-0 left-0 w-2/5 h-full bg-gradient-to-r from-slate-950/80"></figcaption>
          </figure>
          <figure className="relative lg:hidden">
            {game.herotype === "image" ? (
              <img
                src={game.heroMobile}
                alt="card image"
                className="max-auto w-full h-full"
              />
            ) : (
              <video className="max-auto w-full h-full" autoPlay loop muted>
                <source src={game.heroMobile} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
            <figcaption className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-slate-950 p-10 text-white"></figcaption>
          </figure>

          <div className="max-w-screen-2xl mx-auto px-8 py-8 lg:absolute lg:inset-0 flex items-center lg:h-full bg-gray-950 lg:bg-gray-900/0">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:text-left lg:px-10 "
            >
              <motion.h1
                variants={itemVariants}
                className=" text-white text-4xl capitalize"
              >
                {game.name}
              </motion.h1>
              <motion.div variants={itemVariants} className="mt-4">
                <h4 className="text-gray-400">Reviews</h4>
                <motion.span
                  variants={itemVariants}
                  className="flex items-center gap-2 rounded"
                >
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
                          className="h-4 w-4"
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
                    ))}
                  </span>
                </motion.span>
              </motion.div>
              <motion.h1
                variants={itemVariants}
                className="text-2xl text-white mt-2"
              >
                Rs {game.price.toLocaleString()}
              </motion.h1>

              <motion.div
                variants={itemVariants}
                className="flex gap-3 items-center justify-center max-w-xs"
              >
                {isGameInCart ? (
                  <motion.button
                    onClick={() => removeGame(game.id)}
                    className="mt-4 w-full py-2 gap-2 text-base tracking-wide text-white transition duration-300 rounded-full whitespace-nowrap bg-red-600 hover:bg-red-700"
                  >
                    Remove From Cart
                  </motion.button>
                ) : (
                  <motion.button
                    onClick={() =>
                      addGame({
                        userId: user.id,
                        gameId: game.id,
                        thumbnail: game.thumbnail,
                        name: game.name,
                        genres: game.generes,
                        platform: game.platform,
                        price: game.price,
                      })
                    }
                    className="mt-4 w-full py-2 gap-2 text-base tracking-wide text-white transition duration-300 rounded-full whitespace-nowrap bg-amber-600 hover:bg-amber-700"
                  >
                    Add to Cart
                  </motion.button>
                )}

                <button className="mt-4 w-fit gap-2  text-base tracking-wide text-white transition duration-300 rounded-full whitespace-nowrap ">
                  <svg
                    className="h-9 w-9 hover:fill-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    ></path>
                  </svg>
                </button>
              </motion.div>

              <motion.section
                variants={detailsVariants}
                initial="hidden"
                animate="visible"
                className="mt-4 text-white"
              >
                <h4 className="text-gray-400 text-sm">
                  Released {game.releasedDate}
                </h4>

                <div className="mt-2 grid grid-cols-4 gap-2 md:grid-cols-8 lg:grid-cols-12">
                  <motion.div
                    variants={tagVariants}
                    className="col-span-4 lg:col-span-6 pr-20"
                  >
                    <div className="flex items-center gap-2 ">
                      <div className="flex items-center self-center ">
                        <svg
                          className="h-5 w-5 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <path d="M8 3.75V6H2.75C2.33579 6 2 6.33579 2 6.75V18.25C2 19.7688 3.23122 21 4.75 21H19.25C20.7688 21 22 19.7688 22 18.25V6.75C22 6.33579 21.6642 6 21.25 6H16V3.75C16 2.7835 15.2165 2 14.25 2H9.75C8.7835 2 8 2.7835 8 3.75ZM9.75 3.5H14.25C14.3881 3.5 14.5 3.61193 14.5 3.75V6H9.5V3.75C9.5 3.61193 9.61193 3.5 9.75 3.5ZM8 13V9.5H11.5V13H8ZM8 17.5V14H11.5V17.5H8ZM16 13H12.5V9.5H16V13ZM12.5 17.5V14H16V17.5H12.5Z"></path>{" "}
                          </g>
                        </svg>
                      </div>

                      <div className="flex flex-col gap-0 items-start justify-center">
                        <h4 className="text-sm text-slate-200 ">
                          In-game purchases option
                        </h4>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    variants={tagVariants}
                    className="col-span-4 lg:col-span-6 pr-20"
                  >
                    <div className="flex items-center gap-2 ">
                      <div className="flex items-center self-center ">
                        <svg
                          className="h-4 w-4 text-white"
                          fill="currentColor"
                          version="1.1"
                          id="_x32_"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          viewBox="0 0 512 512"
                          xmlSpace="preserve"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <g>
                              {" "}
                              <path
                                className="st0"
                                d="M511.275,335.864c-13.696-182.839-84.68-268.054-158.186-268.054c-55.32,0-73.124,39.474-97.088,39.474 c-23.964,0-41.824-39.474-97.089-39.474c-73.505,0-144.49,85.216-158.186,268.054c-5.225,57.878,18.231,94.731,56.036,105.86 c38.222,11.256,84.926-16.545,123.429-72.472c17.151-24.925,46.267-58.459,75.81-58.459c29.542,0,58.658,33.534,75.81,58.459 c38.504,55.927,85.206,83.728,123.428,72.472C493.053,430.595,516.5,393.742,511.275,335.864z M198.694,252.418h-37.116v37.116 H120.87v-37.116H83.755v-40.708h37.115v-37.115h40.708v37.115h37.116V252.418z M321.914,257.768c-11.864,0-21.47-9.596-21.47-21.46 c0-11.855,9.606-21.461,21.47-21.461c11.854,0,21.47,9.606,21.47,21.461C343.384,248.172,333.769,257.768,321.914,257.768z M373.77,309.642c-11.846,0-21.452-9.606-21.452-21.469c0-11.855,9.606-21.461,21.452-21.461c11.864,0,21.469,9.606,21.469,21.461 C395.239,300.036,385.633,309.642,373.77,309.642z M373.77,205.904c-11.846,0-21.452-9.614-21.452-21.469 c0-11.864,9.606-21.469,21.452-21.469c11.864,0,21.469,9.606,21.469,21.469C395.239,196.29,385.633,205.904,373.77,205.904z M425.642,257.768c-11.854,0-21.469-9.596-21.469-21.46c0-11.855,9.615-21.461,21.469-21.461c11.865,0,21.469,9.606,21.469,21.461 C447.111,248.172,437.507,257.768,425.642,257.768z"
                              ></path>{" "}
                            </g>{" "}
                          </g>
                        </svg>
                      </div>

                      <div className="flex flex-col gap-0 items-start justify-center">
                        <h4 className="text-sm text-slate-200 ">
                          Remote Play Support
                        </h4>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    variants={tagVariants}
                    className="col-span-4 lg:col-span-6"
                  >
                    <div className="flex items-center gap-2 ">
                      <div className="flex items-center self-center ">
                        <svg
                          className="h-5 w-5 text-white"
                          fill="currentColor"
                          viewBox="0 0 32 32"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <title>adventure</title>{" "}
                            <path d="M1.615 4.123l14.385-4.123 14.385 4.128v0.491c0 4.325-0.011 8.65 0 12.975 0.022 6.834-4.718 12.498-10.953 14.021-1.361 0.333-2.735 0.415-4.131 0.375-2.306-0.063-4.449-0.705-6.306-1.785l0.063 0.034c-3.863-2.197-6.279-5.473-7.18-9.84-0.168-0.797-0.264-1.713-0.264-2.651 0-0.033 0-0.066 0-0.1l-0 0.005q0.006-6.487 0-12.975zM3.52 5.574v0.527c0 3.778-0.006 7.555 0.005 11.333-0 0.027-0 0.058-0 0.090 0 0.873 0.083 1.727 0.242 2.553l-0.014-0.084c0.59 2.999 2.062 5.475 4.443 7.372 2.961 2.355 6.342 3.186 10.062 2.53 3.024-0.532 5.504-2.037 7.44-4.413 1.919-2.354 2.785-5.084 2.784-8.105q0-5.666 0-11.333c0-0.154-0.012-0.306-0.021-0.478l-12.464-3.576z"></path>{" "}
                            <path d="M10.061 24.718l-2.417-0.651c-0.219-0.82-0.433-1.616-0.656-2.437l7.439-7.93 1.074 1.989-6.805 6.813c0.027 0.165 0.047 0.281 0.068 0.418l0.38 0.124 6.852-6.841 1.976 1.052c-0.215 0.326-7.019 6.74-7.912 7.462z"></path>{" "}
                            <path d="M22.794 18.688c0.025 0.49-0.27 0.791-0.623 0.977-0.599 0.317-1.236 0.562-1.944 0.873 0.254-0.569 0.473-1.059 0.703-1.572q-0.914-0.916-1.822-1.822t-1.788-1.786l-1.822-1.822q-0.894-0.894-1.789-1.788c-0.604-0.604-1.218-1.2-1.781-1.787 0.113-0.508 0.375-0.81 0.75-0.994 0.574-0.281 1.162-0.529 1.745-0.789 0.022-0.009 0.054 0.008 0.117 0.021-0.23 0.51-0.456 1.014-0.69 1.534z"></path>{" "}
                            <path d="M23.724 10.53l-3.896 3.931-2.556-2.56 3.912-3.924z"></path>{" "}
                            <path d="M25.547 9.647c-0.182 0.381-0.442 0.607-0.796 0.822l-3.478-3.477c0.185-0.346 0.468-0.619 0.812-0.786l0.011-0.005z"></path>{" "}
                          </g>
                        </svg>
                      </div>

                      <div className="flex flex-col gap-0 items-start justify-center">
                        <h4 className="text-sm text-slate-200 capitalize">
                          {game.generes.split(",").join(" / ")}
                        </h4>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    variants={tagVariants}
                    className="col-span-4 lg:col-span-6"
                  >
                    <div className="flex items-center gap-2 ">
                      <div className="flex items-center self-center ">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="currentColor"
                          height="200px"
                          width="200px"
                          version="1.1"
                          id="XMLID_14_"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          viewBox="0 0 24 24"
                          xmlSpace="preserve"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <g id="platform-windows">
                              {" "}
                              <path d="M0,3.4l9.9-1.3v9.4H0V3.4z M9.8,12.6V22L0,20.7v-8.2L9.8,12.6z M11,1.9L24,0v11.4l-13,0.1V1.9z M24,12.7V24l-13-1.8v-9.5 H24z"></path>{" "}
                            </g>{" "}
                          </g>
                        </svg>
                      </div>

                      <div className="flex flex-col gap-0 items-start justify-center">
                        <h4 className="text-sm text-slate-200 ">
                          {game.platform}
                        </h4>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    variants={tagVariants}
                    className="col-span-4 lg:col-span-6"
                  >
                    <div className="flex items-center gap-2 ">
                      <div className="flex items-center self-center ">
                        <svg
                          className="w-5 h-5 text-white"
                          data-slot="icon"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z"></path>
                        </svg>
                      </div>

                      <div className="flex flex-col gap-0 items-start justify-center">
                        <h4 className="text-sm text-slate-200 ">
                          {game.players}
                        </h4>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    variants={tagVariants}
                    className="col-span-4 lg:col-span-6"
                  >
                    <div className="flex items-center gap-2 ">
                      <div className="flex items-center self-center ">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            clipRule="evenodd"
                            fillRule="evenodd"
                            d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
                          ></path>
                        </svg>
                      </div>

                      <div className="flex flex-col gap-0 items-start justify-center">
                        <h4 className="text-sm text-slate-200 ">
                          {game.onlineSupport
                            ? "Online Play Option"
                            : "Offline Play"}
                        </h4>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    variants={tagVariants}
                    className="col-span-4 lg:col-span-6 pr-20"
                  >
                    <div className="flex items-center gap-2 ">
                      <div className="flex items-center self-center ">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            clipRule="evenodd"
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          ></path>
                        </svg>
                      </div>

                      <div className="flex flex-col gap-0 items-start justify-center">
                        <h4 className="text-sm text-slate-200 ">
                          Game Help Supported
                        </h4>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.section>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}

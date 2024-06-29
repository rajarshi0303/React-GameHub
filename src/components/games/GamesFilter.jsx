import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import GameCardList from "./GameCardList";
import LoadingDots from "../common/LoadingDots";
import Heading from "../common/Heading";

export default function GamesFilter() {
  const [showCategory, setShowCatogery] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [query, setQuery] = useSearchParams();

  useEffect(() => {
    axios
      .get("http://localhost:3000/games")
      .then((response) => {
        setGames(response.data);
        setFilteredGames(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //----------Search Filter---------------------
  const search = query.get("search");

  function handleSearch() {
    const searchTearm = search.toLowerCase();
    let filteredGames = games.filter((game) => {
      return game.name.toLowerCase().includes(searchTearm);
    });
    setFilteredGames(filteredGames);
  }

  //-------------------------Genres Filter----------------------
  const genres = query.get("genres");
  const [selectedCategories, setSelectedCategories] = useState(
    genres ? genres.split(",") : []
  );

  let Genres = [
    "Action",
    "Adventure",
    "Sports",
    "Survival",
    "Shooting",
    "Space",
    "Role Playing",
    "Racing",
  ];

  function handleGenres(event) {
    const copy = new URLSearchParams(query);
    const catogery = event.target.name.toLowerCase();

    //If the selected catogery already exists then remove it else add it
    if (selectedCategories.includes(catogery)) {
      let genres = selectedCategories.filter((item) => item !== catogery);
      setSelectedCategories(genres);
      copy.set("genres", genres.join(","));
    } else {
      const genres = [...selectedCategories, catogery];
      setSelectedCategories((prevCategories) => [...prevCategories, catogery]);
      copy.set("genres", genres.join(","));
    }
    setQuery(copy);
  }

  let GamesCategoryFilter = () => {
    if (genres) {
      const Categories = genres.split(",");
      // Use the filter function directly on the games array
      let filteredGames = games.filter((game) => {
        // Checking if any of the selected categories are included in the game's genres
        return Categories.some((category) =>
          game.generes.toLowerCase().includes(category)
        );
      });
      return filteredGames; // Return the filtered result
    } else {
      return [...games]; // Return the original games array if no categories are selected
    }
  };

  //--------------------------------------Platform Filter---------------------------------
  const platform = query.get("platform");
  function handlePlatforn(games) {
    //Return the games array if no platform are selected or all platforms is selected
    if (!platform || platform == "all") {
      return games; // Return the games array if for all platforms filter is applied
    }
    return games.filter((game) =>
      game.platform.toLowerCase().includes(platform)
    );
  }
  //--------------------------------------Price Filter-------------------------------------
  const price = query.get("price");

  function handlePrice(games) {
    if (price == "0") {
      return games.filter((game) => game.price == 0);
    } else if (price == "30") {
      return games.filter((game) => game.price > 0 && game.price <= 30);
    } else if (price == "30,60") {
      return games.filter((game) => game.price > 30 && game.price <= 60);
    } else if (price == "60,90") {
      return games.filter((game) => game.price > 60 && game.price <= 90);
    } else if (price == "90") {
      return games.filter((game) => game.price > 90);
    }
    return games; // Return the games array if no price filter is applied
  }
  //--------------------------------------Shorting Filter-----------------------------------
  const short = query.get("short");

  function handleShortBy(games) {
    if (short === "popularity") {
      return [...games].sort((a, b) => b.review - a.review);
    } else if (short === "hightolow") {
      return [...games].sort((a, b) => b.price - a.price);
    } else if (short === "lowtohigh") {
      return [...games].sort((a, b) => a.price - b.price);
    } else if (short === "newest") {
      return [...games].sort((a, b) => {
        const dateA = new Date(a.releasedDate.split("/").reverse());
        const dateB = new Date(b.releasedDate.split("/").reverse());
        return dateB - dateA;
      });
    }
    return games; // Return the games array if no sorting is applied
  }

  useEffect(() => {
    if (search) {
      handleSearch();
    }
    // If there's no search term, then filter based on genres
    if (!search) {
      const filteredResult = GamesCategoryFilter();
      const filteredPlatform = handlePlatforn(filteredResult);
      const priceResult = handlePrice(filteredPlatform);
      const sortedResult = handleShortBy(priceResult);

      console.log("Genre Filter:-", filteredResult);
      console.log("Platform Filter:-", filteredPlatform);
      console.log("Price Filter:-", priceResult);
      console.log("Shorted Filter:-", sortedResult);

      setFilteredGames(sortedResult);
    }
  }, [games, genres, search, platform, price, short]);
  //GamesCategoryFilter returns the filtered result without directly setting the state.
  //handleShortBy takes the filtered result as input and returns the sorted result.
  //Both filtering and sorting are applied in the same useEffect hook, ensuring that the sorting operation is performed after filtering.
  console.log(selectedCategories);
  console.log(platform);

  function clearFilter() {
    console.log("clear Filter");
    setQuery({});
    setSelectedCategories([]);
  }

  return (
    <div className="mt-24">
      <Heading
        title="Big"
        highlight="games"
        description="Compete with 100 players on a remote island for winner takes showdown known issue where certain skin strategic"
      />
      {isLoading ? (
        <LoadingDots />
      ) : (
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-20">
          <nav className="mt-10 py-2 lg:py-6 shadow-lg rounded-xl border border-gray-800 bg-gray-900 ">
            <div className="container px-6 pt-3 lg:py-3 mx-auto flex">
              <div className="w-full lg:flex items-center justify-between">
                <h1 className="text-base font-medium capitalize px-3 border-l-4 text-gray-100 border-amber-600 lg:text-2xl">
                  <span className="tracking-wide">
                    {selectedCategories.join(" / ")}
                  </span>{" "}
                  Games
                </h1>
                <div className="relative mt-6 md:mt-0">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg
                      className="w-5 h-5 text-gray-500"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </span>
                  <input
                    onChange={(event) => {
                      const copy = new URLSearchParams(query);
                      copy.set("search", event.target.value);
                      setQuery(copy);
                      handleSearch;
                    }}
                    type="text"
                    value={search ? search : ""}
                    className="w-full md:w-96 py-2 pl-10 pr-4  placeholder:text-gray-300 border rounded-lg bg-gray-900 text-gray-300 border-gray-400 "
                    placeholder="Search"
                  />
                </div>
              </div>
              <div className="inline-flex items-end">
                <button
                  type="button"
                  onClick={() => setIsMobile(!isMobile)}
                  className="h-fit px-2 py-2 ml-4 items-center md:hidden text-white bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                >
                  <svg
                    className="w-7 h-7"
                    data-slot="icon"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M3.792 2.938A49.069 49.069 0 0 1 12 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 0 1 1.541 1.836v1.044a3 3 0 0 1-.879 2.121l-6.182 6.182a1.5 1.5 0 0 0-.439 1.061v2.927a3 3 0 0 1-1.658 2.684l-1.757.878A.75.75 0 0 1 9.75 21v-5.818a1.5 1.5 0 0 0-.44-1.06L3.13 7.938a3 3 0 0 1-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836Z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>

            <div className={`${isMobile ? "" : "hidden"} md:block`}>
              <section>
                <div className="container px-6 p-4 m-auto">
                  <div className="grid grid-cols-8 gap-3 lg:gap-6 md:grid-cols-8 lg:grid-cols-12">
                    <div className="col-span-4 lg:col-span-3">
                      <Select
                        onValueChange={(value) => {
                          const copy = new URLSearchParams(query);
                          copy.set("short", value);
                          setQuery(copy);
                        }}
                        value={short ? short : ""}
                      >
                        <SelectTrigger className="w-full text-gray-300 text-base bg-gray-900 border-gray-400">
                          <SelectValue placeholder="Short By" />
                        </SelectTrigger>
                        <SelectContent className="text-gray-300 bg-gray-900 border-gray-400">
                          <SelectGroup>
                            <SelectItem value="popularity">
                              Popularity
                            </SelectItem>
                            <SelectItem value="newest">Newest</SelectItem>
                            <SelectItem value="hightolow">
                              Price ( High - Low )
                            </SelectItem>
                            <SelectItem value="lowtohigh">
                              Price ( Low - High )
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="col-span-4 lg:col-span-3">
                      <Select
                        onValueChange={(value) => {
                          const copy = new URLSearchParams(query);
                          copy.set("price", value);
                          setQuery(copy);
                        }}
                        value={price ? price : ""}
                      >
                        <SelectTrigger className="w-full text-gray-300 text-base bg-gray-900 border-gray-400">
                          <SelectValue placeholder="Price Range" />
                        </SelectTrigger>
                        <SelectContent className="text-gray-300 bg-gray-900 border-gray-400">
                          <SelectGroup>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="0">Free</SelectItem>
                            <SelectItem value="30">less then $30</SelectItem>
                            <SelectItem value="30,60">$30 - $60</SelectItem>
                            <SelectItem value="60,90">$60 - $90</SelectItem>
                            <SelectItem value="90">Above $90</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="col-span-4 lg:col-span-3 lg:order-first">
                      <button
                        onClick={() => setShowCatogery(!showCategory)}
                        id="dropdownDefaultButton"
                        data-dropdown-toggle="dropdown"
                        className="w-full text-gray-300 bg-gray-900 border border-gray-400 rounded text-base px-5 py-2 text-center justify-between inline-flex items-center"
                        type="button"
                      >
                        Genres
                        <svg
                          className="w-2.5 h-2.5 ms-3 text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 10 6"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 4 4 4-4"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="col-span-4 lg:col-span-3">
                      <Select
                        onValueChange={(value) => {
                          const copy = new URLSearchParams(query);
                          copy.set("platform", value);
                          setQuery(copy);
                        }}
                        value={platform ? platform : ""}
                      >
                        <SelectTrigger className="w-full text-gray-300 text-base bg-gray-900 border-gray-400">
                          <SelectValue placeholder="PlatForm" />
                        </SelectTrigger>
                        <SelectContent className="text-gray-300 bg-gray-900 border-gray-400">
                          <SelectGroup>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="ps5">PS5</SelectItem>
                            <SelectItem value="xbox">XBOX</SelectItem>
                            <SelectItem value="pc">PC</SelectItem>
                            <SelectItem value="mobile">Mobile</SelectItem>
                            <SelectItem value="vr">VR</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </section>

              <div
                className={` ${
                  showCategory ? "" : "hidden"
                } mx-auto px-6 pb-4 max-h-40 overflow-y-auto mb-4 `}
              >
                <div className=" flex flex-wrap gap-2 lg:gap-4">
                  {Genres.map((catogery, index) => (
                    <div key={index} className="flex ">
                      <input
                        onChange={handleGenres}
                        id={catogery}
                        name={catogery}
                        type="checkbox"
                        value={genres ? genres : ""}
                        className="hidden peer"
                      />
                      <label
                        htmlFor={catogery}
                        className={`px-4 py-2 font-semibold ${
                          selectedCategories.includes(catogery.toLowerCase())
                            ? "text-gray-800 bg-gray-300"
                            : "text-gray-400 bg-gray-800 hover:bg-gray-700 hover:text-gray-200"
                        } border-2 border-gray-500 rounded-lg cursor-pointer `}
                      >
                        {catogery}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="px-6 pb-2 flex justify-between">
                <h1
                  onClick={clearFilter}
                  className="text-lg font-semibold text-amber-600 cursor-pointer"
                >
                  Clear Filter
                </h1>
                <h1 className="text-lg font-semibold text-amber-600">
                  {filteredGames.length} items
                </h1>
              </div>
            </div>
          </nav>
          <GameCardList games={filteredGames} />
        </div>
      )}
    </div>
  );
}
